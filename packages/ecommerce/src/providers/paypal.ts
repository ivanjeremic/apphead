import { FetchHttpClient, HttpClient } from "@effect/platform"
import * as HttpBody from "@effect/platform/HttpBody"
import { Effect, Ref } from "effect"
import type { CheckoutSession, Customer, Money, Order, Price, Product, Subscription } from "../types.js"
import { PaymentError, PaymentProvider, PaymentProviderError } from "../utils/create_payment_provider.js"
import { formatMajorUnitString, sumLineItems } from "../utils/currency.js"
import { basicAuthHeader, ensureOk } from "../utils/helpers.js"

// Find a link by rel on a PayPal resource
function findLink(resource: any, rel: string): string | null {
  const links: Array<{ rel?: string; href?: string }> = resource?.links ?? []
  const target = rel.toLowerCase()
  for (const l of links) {
    const r = (l?.rel ?? "").toLowerCase()
    if (r === target && typeof l?.href === "string") return l.href
  }
  return null
}

// Extract the buyer approval URL from an Order response
function getApprovalUrl(order: any): string | null {
  return findLink(order, "approve") ?? findLink(order, "payer-action")
}

export type Env = "sandbox" | "live"

export interface PayPalProviderOptions {
  name?: string // default "paypal"
  clientId: string
  clientSecret: string
  env: Env
}

export function PayPal(opts: PayPalProviderOptions): PaymentProvider<"paypal"> {
  const name = "paypal" as const
  const baseUrl = opts.env === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"

  // Provide HttpClient for each call (self-contained)
  const runHttp = <A, E, R>(eff: Effect.Effect<A, E, R>) => eff.pipe(Effect.provide(FetchHttpClient.layer))

  // Token cache (in-memory per provider instance)
  type Token = { value: string; exp: number } // epoch ms
  const tokenRef = Ref.unsafeMake<Token | undefined>(undefined)

  const getAccessTokenEnv = Effect.gen(function*() {
    const now = Date.now()
    const cached = yield* Ref.get(tokenRef)
    if (cached && cached.exp - 5_000 > now) return { access_token: cached.value }

    const client = yield* HttpClient.HttpClient
    const res = yield* client.post(`${baseUrl}/v1/oauth2/token`, {
      headers: {
        Authorization: basicAuthHeader(opts.clientId, opts.clientSecret),
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
      },
      body: HttpBody.text(new URLSearchParams({ grant_type: "client_credentials" }).toString())
    })
    const ok = yield* ensureOk(res, "oauth2", "paypal")
    const json = (yield* ok.json) as any
    const ttlSec = typeof json.expires_in === "number" ? json.expires_in : 300
    const token: Token = { value: json.access_token as string, exp: now + ttlSec * 1000 }
    yield* Ref.set(tokenRef, token)
    return { access_token: token.value }
  }).pipe(Effect.mapError((e) => new PaymentProviderError({ code: "AUTH_FAILED", message: String(e), details: e })))

  const toAmount = (items: Array<{ unitAmount: Money; quantity: number }>): Money => sumLineItems(items)

  const mapSubStatus = (s: string): Subscription["status"] =>
    s === "ACTIVE" ? "active" : s === "SUSPENDED" ? "past_due" : s === "CANCELLED" ? "cancelled" : "active"

  return new PaymentProvider({
    name,
    policy: {
      timeoutMs: 15_000,
      maxRetries: 2,
      handlers: {
        "oneTime.onCreateOrder": { maxRetries: 0 },
        "oneTime.onCreateCheckoutSession": { maxRetries: 0 },
        "recurring.onCreateSubscription": { maxRetries: 0 }
      }
    },
    common: {
      onCreateCustomer: (args: {
        email: string
        name?: string
        phone?: string
        metadata?: Record<string, string | number | boolean>
      }) =>
        Effect.succeed<Customer>({
          id: `pp_cus_${Date.now()}`,
          email: args.email,
          ...(args.name ? { name: args.name } : {}),
          ...(args.phone ? { phone: args.phone } : {}),
          ...(args.metadata ? { metadata: args.metadata } : {})
        }),
      onUpdateCustomer: (args: { customerId: string; email?: string; name?: string }) =>
        Effect.succeed({
          id: args.customerId,
          email: args.email ?? "unknown",
          ...(args.name ? { name: args.name } : {})
        }),
      onGetCustomer: (customerId: string) => Effect.succeed({ id: customerId, email: "unknown" }),
      onCreateProduct: (args: {
        name: string
        type: Product["type"]
        description?: string
        category?: string
        metadata?: Record<string, string | number | boolean>
      }) =>
        Effect.succeed<Product>({
          id: `pp_prod_${Date.now()}`,
          name: args.name,
          type: args.type,
          ...(args.description ? { description: args.description } : {}),
          ...(args.category ? { category: args.category } : {}),
          ...(args.metadata ? { metadata: args.metadata } : {})
        }),
      onCreatePrice: (args: {
        productId: string
        currency: Money["currency"]
        unitAmount: Money
        interval?: Price["interval"]
        metadata?: Record<string, string | number | boolean>
      }) =>
        Effect.succeed<Price>({
          id: `pp_price_${Date.now()}`,
          productId: args.productId,
          currency: args.currency,
          unitAmount: args.unitAmount.amount,
          ...(args.interval ? { interval: args.interval } : {}),
          ...(args.metadata ? { metadata: args.metadata } : {})
        })
    },

    oneTime: {
      onCreateOrder: (args: any) => {
        const amount = sumLineItems(args.items)
        return runHttp(
          Effect.gen(function*() {
            const client = yield* HttpClient.HttpClient
            const { access_token } = yield* getAccessTokenEnv
            const res = yield* client.post(`${baseUrl}/v2/checkout/orders`, {
              headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
                ...(args.idempotencyKey ? { "PayPal-Request-Id": args.idempotencyKey } : {})
              },
              body: HttpBody.text(
                JSON.stringify({
                  intent: "CAPTURE",
                  processing_instruction: args.capture === "automatic"
                    ? "ORDER_COMPLETE_ON_PAYMENT_APPROVAL"
                    : "NO_INSTRUCTION",
                  purchase_units: [
                    { amount: { currency_code: amount.currency, value: formatMajorUnitString(amount) } }
                  ]
                })
              )
            })
            const ok = yield* ensureOk(res, "orders.create", "paypal")
            const pp = (yield* ok.json) as any
            const approveUrl = getApprovalUrl(pp)
            const order: Order = {
              id: pp.id,
              customerId: args.customerId,
              items: args.items,
              totalAmount: amount,
              status: "pending",
              createdAt: new Date(),
              updatedAt: new Date(),
              ...(approveUrl ? { approveUrl } : {}),
              ...(args.metadata ? { metadata: args.metadata } : {})
            }
            return order
          })
        ).pipe(
          Effect.mapError(
            (e) =>
              new PaymentProviderError({
                code: "ORDER_CREATE_FAILED",
                message: (e as any).message ?? String(e),
                details: e
              })
          )
        )
      },

      onGetOrder: (orderId: string) =>
        runHttp(
          Effect.gen(function*() {
            const client = yield* HttpClient.HttpClient
            const { access_token } = yield* getAccessTokenEnv
            const res = yield* client.get(`${baseUrl}/v2/checkout/orders/${orderId}`, {
              headers: { Authorization: `Bearer ${access_token}`, Accept: "application/json" }
            })
            const ok = yield* ensureOk(res, "orders.get", "paypal")
            const pp = (yield* ok.json) as any as { id: string; status: string }
            const order: Order = {
              id: pp.id,
              customerId: "unknown",
              items: [],
              totalAmount: { currency: "USD", amount: 0 },
              status: pp.status === "COMPLETED" ? "paid" : pp.status === "VOIDED" ? "cancelled" : "pending",
              createdAt: new Date(),
              updatedAt: new Date()
            }
            return order
          })
        ),

      onCreateCheckoutSession: (args: any) => {
        const amount = toAmount(args.items)
        return runHttp(
          Effect.gen(function*() {
            const client = yield* HttpClient.HttpClient
            const { access_token } = yield* getAccessTokenEnv
            const res = yield* client.post(`${baseUrl}/v2/checkout/orders`, {
              headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
                ...(args.idempotencyKey ? { "PayPal-Request-Id": args.idempotencyKey } : {})
              },
              body: HttpBody.text(
                JSON.stringify({
                  intent: "CAPTURE",
                  processing_instruction: args.capture === "automatic"
                    ? "ORDER_COMPLETE_ON_PAYMENT_APPROVAL"
                    : "NO_INSTRUCTION",
                  purchase_units: [
                    { amount: { currency_code: amount.currency, value: formatMajorUnitString(amount) } }
                  ],
                  application_context: { return_url: args.successUrl, cancel_url: args.cancelUrl }
                })
              )
            })
            const ok = yield* ensureOk(res, "checkout.create", "paypal")
            const pp = (yield* ok.json) as any
            const approveUrl = getApprovalUrl(pp)
            const cs: CheckoutSession = {
              id: pp.id,
              ...(args.customerId ? { customerId: args.customerId } : {}),
              amount,
              status: "open",
              successUrl: args.successUrl,
              cancelUrl: args.cancelUrl,
              ...(approveUrl ? { approveUrl } : {}),
              ...(args.metadata ? { metadata: args.metadata } : {})
            }
            return cs
          })
        ).pipe(
          Effect.mapError(
            (e) =>
              new PaymentError({
                code: "CHECKOUT_CREATE_FAILED",
                message: (e as any).message ?? String(e),
                paymentProvider: name,
                details: e
              })
          )
        )
      },

      onCapturePayment: (args: any) =>
        runHttp(
          Effect.gen(function*() {
            const client = yield* HttpClient.HttpClient
            const { access_token } = yield* getAccessTokenEnv
            const res = yield* client.post(`${baseUrl}/v2/checkout/orders/${args.orderId}/capture`, {
              headers: { Authorization: `Bearer ${access_token}`, Accept: "application/json" }
            })
            yield* ensureOk(res, "orders.capture", "paypal")
            const order: Order = {
              id: args.orderId,
              customerId: "unknown",
              items: [],
              totalAmount: { currency: args.amount?.currency ?? "USD", amount: args.amount?.amount ?? 0 },
              status: "paid",
              createdAt: new Date(),
              updatedAt: new Date()
            }
            return order
          })
        ).pipe(
          Effect.mapError(
            (e) =>
              new PaymentError({
                code: "PAYMENT_CAPTURE_FAILED",
                message: (e as any).message ?? String(e),
                paymentProvider: name,
                details: e
              })
          )
        ),

      onRefundPayment: (args: any) =>
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
      onCreateSubscription: (args: any) => {
        const dayMs = 86_400_000
        const startTime = args.trialDays !== undefined
          ? new Date(Date.now() + args.trialDays * dayMs).toISOString()
          : undefined
        return runHttp(
          Effect.gen(function*() {
            const client = yield* HttpClient.HttpClient
            const { access_token } = yield* getAccessTokenEnv
            const res = yield* client.post(`${baseUrl}/v1/billing/subscriptions`, {
              headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
                ...(args.idempotencyKey ? { "PayPal-Request-Id": args.idempotencyKey } : {})
              },
              body: HttpBody.text(
                JSON.stringify({
                  plan_id: args.priceId,
                  ...(startTime ? { start_time: startTime } : {}),
                  ...(args.metadata ? { custom_id: JSON.stringify(args.metadata) } : {})
                })
              )
            })
            const ok = yield* ensureOk(res, "subs.create", "paypal")
            const pp = (yield* ok.json) as any as {
              id: string
              status: string
              plan_id: string
              start_time?: string
              billing_info?: { next_billing_time?: string }
            }
            const now = new Date()
            const start = pp.start_time ? new Date(pp.start_time) : now
            const end = pp.billing_info?.next_billing_time
              ? new Date(pp.billing_info.next_billing_time)
              : new Date(start.getTime() + 30 * dayMs)
            const sub: Subscription = {
              id: pp.id,
              customerId: args.customerId,
              priceId: pp.plan_id,
              currentPeriodStart: start,
              currentPeriodEnd: end,
              status: mapSubStatus(pp.status),
              ...(args.metadata ? { metadata: args.metadata } : {})
            }
            return sub
          })
        ).pipe(
          Effect.mapError(
            (e) =>
              new PaymentProviderError({
                code: "SUBSCRIPTION_CREATE_FAILED",
                message: (e as any).message ?? String(e),
                details: e
              })
          )
        )
      },

      onCancelSubscription: (args: any) =>
        runHttp(
          Effect.gen(function*() {
            const client = yield* HttpClient.HttpClient
            const { access_token } = yield* getAccessTokenEnv
            const res = yield* client.post(`${baseUrl}/v1/billing/subscriptions/${args.subscriptionId}/cancel`, {
              headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: HttpBody.text(JSON.stringify({ reason: args.reason ?? "user_requested" }))
            })
            yield* ensureOk(res, "subs.cancel", "paypal")
            const now = new Date()
            const sub: Subscription = {
              id: args.subscriptionId,
              customerId: "unknown",
              priceId: "unknown",
              currentPeriodStart: now,
              currentPeriodEnd: now,
              status: "cancelled"
            }
            return sub
          })
        ).pipe(
          Effect.mapError(
            (e) =>
              new PaymentProviderError({
                code: "SUBSCRIPTION_CANCEL_FAILED",
                message: (e as any).message ?? String(e),
                details: e
              })
          )
        ),

      onGetSubscription: (subscriptionId: string) =>
        runHttp(
          Effect.gen(function*() {
            const client = yield* HttpClient.HttpClient
            const { access_token } = yield* getAccessTokenEnv
            const res = yield* client.get(`${baseUrl}/v1/billing/subscriptions/${subscriptionId}`, {
              headers: { Authorization: `Bearer ${access_token}`, Accept: "application/json" }
            })
            const ok = yield* ensureOk(res, "subs.get", "paypal")
            const pp = (yield* ok.json) as any as {
              id: string
              status: string
              plan_id: string
              start_time?: string
              billing_info?: { next_billing_time?: string }
              subscriber?: { payer_id?: string }
            }
            const dayMs = 86_400_000
            const start = pp.start_time ? new Date(pp.start_time) : new Date()
            const end = pp.billing_info?.next_billing_time
              ? new Date(pp.billing_info.next_billing_time)
              : new Date(start.getTime() + 30 * dayMs)
            const sub: Subscription = {
              id: pp.id,
              customerId: pp.subscriber?.payer_id ?? "unknown",
              priceId: pp.plan_id,
              currentPeriodStart: start,
              currentPeriodEnd: end,
              status: mapSubStatus(pp.status)
            }
            return sub
          })
        ).pipe(
          Effect.mapError(
            (e) =>
              new PaymentProviderError({
                code: "SUBSCRIPTION_GET_FAILED",
                message: (e as any).message ?? String(e),
                details: e
              })
          )
        )
    }
  })
}
