import { Effect } from "effect"
import { PaymentError, PaymentProvider, PaymentProviderError } from "../create_payment_provider.js"
import type { CheckoutSession, Customer, Money, Order, Price, Product, Subscription } from "../types.js"

export type Env = "sandbox" | "live"

export interface PayPalProviderOptions {
  clientId: string
  clientSecret: string
  env: Env
}

export function createPayPalProvider(_opts: PayPalProviderOptions): PaymentProvider {
  const name = "paypal" as const
  const baseUrl = _opts.env === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"

  // OAuth2
  const getAccessToken = Effect.tryPromise(async () => {
    const res = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${_opts.clientId}:${_opts.clientSecret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({ grant_type: "client_credentials" }).toString()
    })
    if (!res.ok) throw new Error(`PayPal auth failed: ${res.status}`)
    return (await res.json()) as { access_token: string }
  }).pipe(
    Effect.mapError((e) => new PaymentProviderError({ code: "AUTH_FAILED", message: String(e) }))
  )

  const authFetchJson = <T>(
    path: string,
    init: RequestInit
  ): Effect.Effect<T, PaymentProviderError> =>
    getAccessToken.pipe(
      Effect.flatMap(({ access_token }) =>
        Effect.tryPromise(async () => {
          const res = await fetch(`${baseUrl}${path}`, {
            ...init,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
              ...(init.headers ?? {})
            }
          })
          if (!res.ok) {
            const body = await res.text().catch(() => "")
            throw new Error(`HTTP ${res.status}: ${body}`)
          }
          return (await res.json()) as T
        })
      ),
      Effect.mapError((e) =>
        new PaymentProviderError({
          code: "HTTP_ERROR",
          message: e instanceof Error ? e.message : String(e),
          details: e
        })
      )
    )

  const mapStatus = (s: string): Subscription["status"] =>
    s === "ACTIVE" ? "active" : s === "SUSPENDED" ? "past_due" : s === "CANCELLED" ? "cancelled" : "active"

  return new PaymentProvider({
    name,
    common: {
      onCreateCustomer: (args) =>
        // Map to your domain; PayPal has "vault" APIs if you need real customers
        Effect.succeed<Customer>({
          id: `pp_cus_${Date.now()}`,
          email: args.email,
          ...(args.name ? { name: args.name } : {}),
          ...(args.phone ? { phone: args.phone } : {}),
          ...(args.metadata ? { metadata: args.metadata } : {})
        }),
      onUpdateCustomer: (args) =>
        Effect.succeed({
          id: args.customerId,
          email: args.email ?? "unknown",
          ...(args.name ? { name: args.name } : {})
        }),
      onGetCustomer: (customerId) => Effect.succeed({ id: customerId, email: "unknown" }),
      onCreateProduct: (args) =>
        Effect.succeed<Product>({
          id: `pp_prod_${Date.now()}`,
          name: args.name,
          type: args.type,
          ...(args.description ? { description: args.description } : {}),
          ...(args.category ? { category: args.category } : {}),
          ...(args.metadata ? { metadata: args.metadata } : {})
        }),
      onCreatePrice: (args) =>
        Effect.succeed<Price>({
          id: `pp_price_${Date.now()}`,
          productId: args.productId,
          currency: args.currency,
          unitAmount: args.unitAmount,
          ...(args.interval ? { interval: args.interval } : {}),
          ...(args.metadata ? { metadata: args.metadata } : {})
        })
    },

    oneTime: {
      onCreateOrder: (args) => {
        const amount: Money = {
          currency: args.items[0]?.unitAmount.currency ?? "USD",
          amount: args.items.reduce((sum, i) => sum + i.unitAmount.amount * i.quantity, 0)
        }
        // Create PayPal order
        return authFetchJson<{ id: string }>(`/v2/checkout/orders`, {
          method: "POST",
          body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: { currency_code: amount.currency, value: (amount.amount / 100).toFixed(2) }
              }
            ]
          })
        }).pipe(
          Effect.map((pp) => ({
            id: pp.id,
            customerId: args.customerId,
            items: args.items,
            totalAmount: amount,
            status: "pending",
            createdAt: new Date(),
            updatedAt: new Date(),
            ...(args.metadata ? { metadata: args.metadata } : {})
          } satisfies Order)),
          Effect.mapError((e) =>
            new PaymentProviderError({ code: "ORDER_CREATE_FAILED", message: e.message, details: e })
          )
        )
      },

      onGetOrder: (orderId) =>
        authFetchJson<{ id: string; status: string; purchase_units?: Array<any> }>(`/v2/checkout/orders/${orderId}`, {
          method: "GET"
        }).pipe(
          Effect.map((pp) => ({
            id: pp.id,
            customerId: "unknown",
            items: [],
            totalAmount: { currency: "USD", amount: 0 },
            status: pp.status === "COMPLETED" ? "paid" : pp.status === "VOIDED" ? "cancelled" : "pending",
            createdAt: new Date(),
            updatedAt: new Date()
          } satisfies Order))
        ),

      onCreateCheckoutSession: (args) => {
        const amount: Money = {
          currency: args.items[0]?.unitAmount.currency ?? "USD",
          amount: args.items.reduce((sum, i) => sum + i.unitAmount.amount * i.quantity, 0)
        }
        // Reuse created order as a “session”-like result
        return authFetchJson<{ id: string; status: string }>(`/v2/checkout/orders`, {
          method: "POST",
          body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
              { amount: { currency_code: amount.currency, value: (amount.amount / 100).toFixed(2) } }
            ],
            application_context: { return_url: args.successUrl, cancel_url: args.cancelUrl }
          })
        }).pipe(
          Effect.map((pp) => ({
            id: pp.id,
            ...(args.customerId ? { customerId: args.customerId } : {}),
            amount,
            status: "open",
            successUrl: args.successUrl,
            cancelUrl: args.cancelUrl,
            ...(args.metadata ? { metadata: args.metadata } : {})
          } satisfies CheckoutSession)),
          Effect.mapError(
            (e) =>
              new PaymentError({
                code: "CHECKOUT_CREATE_FAILED",
                message: e.message,
                paymentProvider: name,
                details: e
              })
          )
        )
      },

      onCapturePayment: (args) =>
        authFetchJson<{ id: string; status: string }>(`/v2/checkout/orders/${args.orderId}/capture`, {
          method: "POST"
        }).pipe(
          Effect.map((_cap) => ({
            id: args.orderId,
            customerId: "unknown",
            items: [],
            totalAmount: { currency: args.amount?.currency ?? "USD", amount: args.amount?.amount ?? 0 },
            status: "paid",
            createdAt: new Date(),
            updatedAt: new Date()
          } satisfies Order)),
          Effect.mapError(
            (e) =>
              new PaymentError({
                code: "PAYMENT_CAPTURE_FAILED",
                message: e.message,
                paymentProvider: name,
                details: e
              })
          )
        ),

      onRefundPayment: (args) =>
        // Real flow: capture -> refund using capture_id. Here we emulate.
        Effect.succeed<Order>({
          id: args.orderId,
          customerId: "unknown",
          items: [],
          totalAmount: { currency: args.amount?.currency ?? "USD", amount: args.amount?.amount ?? 0 },
          status: "refunded",
          createdAt: new Date(),
          updatedAt: new Date()
        })
    },

    recurring: {
      // Create a subscription from a plan (we treat priceId as PayPal plan_id)
      onCreateSubscription: (args) => {
        const dayMs = 86_400_000
        const startTime = args.trialDays !== undefined
          ? new Date(Date.now() + args.trialDays * dayMs).toISOString()
          : undefined
        return authFetchJson<{
          id: string
          status: string
          start_time?: string
          billing_info?: { next_billing_time?: string }
          plan_id: string
        }>(`/v1/billing/subscriptions`, {
          method: "POST",
          body: JSON.stringify({
            plan_id: args.priceId,
            ...(startTime ? { start_time: startTime } : {}),
            ...(args.metadata ? { custom_id: JSON.stringify(args.metadata) } : {})
          })
        }).pipe(
          Effect.map((pp): Subscription => {
            const now = new Date()
            const start = pp.start_time ? new Date(pp.start_time) : now
            const end = pp.billing_info?.next_billing_time
              ? new Date(pp.billing_info.next_billing_time)
              : new Date(start.getTime() + 30 * dayMs)
            return {
              id: pp.id,
              customerId: args.customerId,
              priceId: pp.plan_id,
              currentPeriodStart: start,
              currentPeriodEnd: end,
              status: mapStatus(pp.status),
              ...(args.metadata ? { metadata: args.metadata } : {})
            }
          }),
          Effect.mapError((e) =>
            new PaymentProviderError({ code: "SUBSCRIPTION_CREATE_FAILED", message: e.message, details: e })
          )
        )
      },

      onCancelSubscription: (args) =>
        authFetchJson<unknown>(`/v1/billing/subscriptions/${args.subscriptionId}/cancel`, {
          method: "POST",
          body: JSON.stringify({ reason: args.reason ?? "user_requested" })
        }).pipe(
          // PayPal returns 204 No Content on success; we synthesize the domain object.
          Effect.map((): Subscription => {
            const now = new Date()
            return {
              id: args.subscriptionId,
              customerId: "unknown",
              priceId: "unknown",
              currentPeriodStart: now,
              currentPeriodEnd: now,
              status: "cancelled"
            }
          }),
          Effect.mapError((e) =>
            new PaymentProviderError({ code: "SUBSCRIPTION_CANCEL_FAILED", message: e.message, details: e })
          )
        ),

      onGetSubscription: (subscriptionId: string) =>
        authFetchJson<{
          id: string
          status: string
          plan_id: string
          start_time?: string
          billing_info?: { next_billing_time?: string }
          subscriber?: { payer_id?: string }
        }>(`/v1/billing/subscriptions/${subscriptionId}`, {
          method: "GET"
        }).pipe(
          Effect.map((pp): Subscription => {
            const dayMs = 86_400_000
            const start = pp.start_time ? new Date(pp.start_time) : new Date()
            const end = pp.billing_info?.next_billing_time
              ? new Date(pp.billing_info.next_billing_time)
              : new Date(start.getTime() + 30 * dayMs)
            return {
              id: pp.id,
              customerId: pp.subscriber?.payer_id ?? "unknown",
              priceId: pp.plan_id,
              currentPeriodStart: start,
              currentPeriodEnd: end,
              status: mapStatus(pp.status)
            }
          }),
          Effect.mapError((e) =>
            new PaymentProviderError({ code: "SUBSCRIPTION_GET_FAILED", message: e.message, details: e })
          )
        )
    }
  })
}
