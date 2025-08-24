import { HttpClient, HttpClientRequest, HttpClientResponse } from "@effect/platform"
import { Context, Data, Duration, Effect, Layer, Redacted, Ref, Schedule, Schema, TSemaphore } from "effect"
import type {
  CheckoutSession,
  createPaymentProviderService,
  Customer,
  CustomerError,
  Money,
  Order,
  OrderItem,
  PaymentError,
  PaymentProvider,
  PaymentProviderService,
  Price,
  Product,
  Subscription
} from "../create_payment_provider.js"
import type { EcommerceError } from "../index.js"

/* -------------------------------- types -------------------------------- */

export type Env = "sandbox" | "live"

export interface PayPalOptions {
  clientId: Redacted.Redacted<string>
  clientSecret: Redacted.Redacted<string>
  env: Env
  timeoutMs?: number
  retries?: number
  concurrency?: number
}

/** Subscriptions/Catalog inputs */
export type CreateProductArgs = {
  name: string
  description?: string
  type?: "SERVICE" | "PHYSICAL" | "DIGITAL"
  category?: string
  idempotencyKey?: string
}

export type CreatePlanArgs = {
  productId: string
  name: string
  currency: string
  unitAmount: string
  intervalUnit?: "DAY" | "WEEK" | "MONTH" | "YEAR"
  intervalCount?: number
  trialDays?: number
  idempotencyKey?: string
}

export type CreateSubscriptionArgs = {
  planId: string
  quantity?: string
  returnUrl?: string
  cancelUrl?: string
  customId?: string
  idempotencyKey?: string
}

export type VerifyWebhookSignatureArgs = {
  authAlgo: string
  certUrl: string
  transmissionId: string
  transmissionSig: string
  transmissionTime: string
  webhookId: string
  rawBody: string
}

/** Orders (one-time checkout) inputs */
export type PayPalMoney = { currency: string; value: string }

export type PayPalOrderItem = {
  name: string
  quantity: string
  unit_amount: PayPalMoney
  sku?: string
  category?: "DIGITAL_GOODS" | "PHYSICAL_GOODS"
  tax?: PayPalMoney
}

export type AmountBreakdown = {
  item_total?: PayPalMoney
  tax_total?: PayPalMoney
  shipping?: PayPalMoney
  discount?: PayPalMoney
}

export type CreateOrderArgs = {
  intent?: "CAPTURE" | "AUTHORIZE"
  items: Array<PayPalOrderItem>
  amount: { currency: string; value: string; breakdown?: AmountBreakdown }
  invoiceId?: string
  shipping?: {
    name?: string
    address?: {
      address_line_1: string
      admin_area_2: string
      postal_code: string
      country_code: string
      address_line_2?: string
      admin_area_1?: string
    }
  }
  returnUrl?: string
  cancelUrl?: string
  idempotencyKey?: string
}

export type CaptureOrderArgs = { orderId: string; idempotencyKey?: string }
export type AuthorizeOrderArgs = { orderId: string; idempotencyKey?: string }
export type CaptureAuthorizationArgs = {
  authorizationId: string
  amount?: PayPalMoney
  finalCapture?: boolean
  invoiceId?: string
  idempotencyKey?: string
}
export type RefundCaptureArgs = {
  captureId: string
  amount?: PayPalMoney
  note?: string
  invoiceId?: string
  idempotencyKey?: string
}

/* ----------------------------- error models ---------------------------- */

export class PayPalHttpError extends Data.TaggedError("PayPalHttpError")<{
  status?: number
  message: string
  body?: unknown
}> {}

/* ------------------------------ service tag ---------------------------- */

export class PayPal extends Context.Tag("services/PayPal")<
  PayPal,
  {
    createProduct: (args: CreateProductArgs) => Effect.Effect<any, PayPalHttpError>
    createPlan: (args: CreatePlanArgs) => Effect.Effect<any, PayPalHttpError>
    createSubscription: (args: CreateSubscriptionArgs) => Effect.Effect<any, PayPalHttpError>
    cancelSubscription: (
      subscriptionId: string,
      reason?: string
    ) => Effect.Effect<{ id: string; status: "CANCELLED" }, PayPalHttpError>
    suspendSubscription: (
      subscriptionId: string,
      reason?: string
    ) => Effect.Effect<{ id: string; status: "SUSPENDED" }, PayPalHttpError>
    verifyWebhookSignature: (
      args: VerifyWebhookSignatureArgs
    ) => Effect.Effect<any, PayPalHttpError>
    createOrder: (args: CreateOrderArgs) => Effect.Effect<any, PayPalHttpError>
    getOrder: (orderId: string) => Effect.Effect<any, PayPalHttpError>
    captureOrder: (args: CaptureOrderArgs) => Effect.Effect<any, PayPalHttpError>
    authorizeOrder: (args: AuthorizeOrderArgs) => Effect.Effect<any, PayPalHttpError>
    captureAuthorization: (args: CaptureAuthorizationArgs) => Effect.Effect<any, PayPalHttpError>
    voidAuthorization: (authorizationId: string) => Effect.Effect<void, PayPalHttpError>
    getCapture: (captureId: string) => Effect.Effect<any, PayPalHttpError>
    refundCapture: (args: RefundCaptureArgs) => Effect.Effect<any, PayPalHttpError>
  }
>() {}

/* ------------------------------ layer make ----------------------------- */

export const PayPalLive = (options: PayPalOptions) =>
  Layer.scoped(
    PayPal,
    Effect.gen(function*() {
      const client = yield* HttpClient.HttpClient

      const base = options.env === "live"
        ? "https://api-m.paypal.com"
        : "https://api-m.sandbox.paypal.com"

      const timeoutMs = options.timeoutMs ?? 20_000
      const maxRetries = options.retries ?? 2
      const concurrency = options.concurrency ?? 16

      // Global gate for rate limiting
      const gate = yield* TSemaphore.make(concurrency)
      const withGate = <A, E>(eff: Effect.Effect<A, E>) => TSemaphore.withPermits(gate, 1)(eff)

      // Cache OAuth token in-memory
      type Token = { accessToken: string; expiresAt: number }
      const tokenRef = yield* Ref.make<Token | null>(null)
      const tokenGate = yield* TSemaphore.make(1)

      const toBase64Ascii = (s: string): string => {
        const g: any = globalThis as any
        if (typeof g.btoa === "function") return g.btoa(s)
        if (g.Buffer) return g.Buffer.from(s, "utf-8").toString("base64")
        // fallback
        const bytes = new TextEncoder().encode(s)
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
        let out = "", i = 0
        for (; i + 2 < bytes.length; i += 3) {
          const n = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]
          out += chars[(n >>> 18) & 63] + chars[(n >>> 12) & 63] + chars[(n >>> 6) & 63] + chars[n & 63]
        }
        if (i < bytes.length) {
          let n = bytes[i] << 16
          out += chars[(n >>> 18) & 63] + chars[(n >>> 12) & 63]
          if (i + 1 < bytes.length) {
            n |= bytes[i + 1] << 8
            out += chars[(n >>> 6) & 63] + "="
          } else {
            out += "=="
          }
        }
        return out
      }

      // OAuth token management
      const getAccessToken = Effect.gen(function*() {
        const now = Date.now()
        const cached = yield* Ref.get(tokenRef)
        if (cached && now < cached.expiresAt - 60_000) return cached.accessToken

        yield* TSemaphore.withPermits(tokenGate, 1)(
          Effect.gen(function*() {
            const again = yield* Ref.get(tokenRef)
            if (again && Date.now() < again.expiresAt - 60_000) return

            const basic = toBase64Ascii(
              `${Redacted.value(options.clientId)}:${Redacted.value(options.clientSecret)}`
            )

            const req = HttpClientRequest.post(`${base}/v1/oauth2/token`).pipe(
              HttpClientRequest.acceptJson,
              HttpClientRequest.setHeader("Authorization", `Basic ${basic}`),
              HttpClientRequest.bodyUrlParams({ grant_type: "client_credentials" })
            )

            const res = yield* Effect.scoped(client.execute(req)).pipe(
              Effect.timeout(Duration.millis(timeoutMs))
            )

            const parsed = yield* HttpClientResponse.schemaJson(Schema.Any)(res)

            if (typeof parsed === "object" && parsed && "access_token" in parsed && "expires_in" in parsed) {
              const token: Token = {
                accessToken: parsed.access_token as string,
                expiresAt: Date.now() + (parsed.expires_in as number) * 1000
              }
              yield* Ref.set(tokenRef, token)
            } else {
              throw new Error("Invalid OAuth response format")
            }
          })
        )

        const fresh = yield* Ref.get(tokenRef)
        if (!fresh) {
          return yield* Effect.fail(
            new PayPalHttpError({ message: "OAuth token cache empty" })
          )
        }
        return fresh.accessToken
      })

      // Helper functions
      const withBearer = (req: HttpClientRequest.HttpClientRequest, token: string) =>
        req.pipe(HttpClientRequest.setHeader("Authorization", `Bearer ${token}`))

      const withJsonHeaders = (req: HttpClientRequest.HttpClientRequest) =>
        req.pipe(
          HttpClientRequest.acceptJson,
          HttpClientRequest.setHeader("Prefer", "return=representation")
        )

      const retryPolicy = Schedule.recurs(maxRetries)

      const runJson = (req: HttpClientRequest.HttpClientRequest) =>
        withGate(
          Effect.scoped(client.execute(req)).pipe(
            Effect.timeout(Duration.millis(timeoutMs)),
            Effect.flatMap(
              HttpClientResponse.matchStatus({
                "2xx": (res) => HttpClientResponse.schemaJson(Schema.Any)(res),
                orElse: (res) =>
                  Effect.fail(
                    new PayPalHttpError({
                      status: res.status,
                      message: `HTTP ${res.status}`
                    })
                  )
              })
            ),
            Effect.retry(retryPolicy)
          )
        )

      const runNoBody204 = (req: HttpClientRequest.HttpClientRequest) =>
        withGate(
          Effect.scoped(client.execute(req)).pipe(
            Effect.timeout(Duration.millis(timeoutMs)),
            Effect.flatMap(
              HttpClientResponse.matchStatus({
                204: () => Effect.void,
                orElse: (res) => Effect.fail(new PayPalHttpError({ status: res.status, message: `HTTP ${res.status}` }))
              })
            ),
            Effect.retry(retryPolicy)
          )
        )

      // Money mapping helper
      const m = (x: Money) => ({ currency_code: x.currency, value: x.value })
      const mapBreakdown = (b?: AmountBreakdown) =>
        b
          ? {
            ...(b.item_total ? { item_total: m(b.item_total) } : {}),
            ...(b.tax_total ? { tax_total: m(b.tax_total) } : {}),
            ...(b.shipping ? { shipping: m(b.shipping) } : {}),
            ...(b.discount ? { discount: m(b.discount) } : {})
          }
          : undefined

      // Catalog + Subscriptions
      const createProduct = (args: CreateProductArgs) =>
        Effect.gen(function*() {
          const req0 = HttpClientRequest.post(`${base}/v1/catalogs/products`)
          const req1 = args.idempotencyKey
            ? req0.pipe(HttpClientRequest.setHeader("PayPal-Request-Id", args.idempotencyKey))
            : req0
          const req2 = yield* req1.pipe(
            HttpClientRequest.bodyJson({
              name: args.name,
              type: args.type ?? "SERVICE",
              ...(args.description ? { description: args.description } : {}),
              ...(args.category ? { category: args.category } : {})
            })
          )
          const token = yield* getAccessToken
          const req = withBearer(withJsonHeaders(req2), token)
          return yield* runJson(req)
        })

      const createPlan = (args: CreatePlanArgs) =>
        Effect.gen(function*() {
          const billing_cycles: Array<any> = []
          if (typeof args.trialDays === "number" && args.trialDays > 0) {
            billing_cycles.push({
              tenure_type: "TRIAL",
              sequence: 1,
              total_cycles: 1,
              frequency: { interval_unit: "DAY", interval_count: args.trialDays }
            })
          }
          billing_cycles.push({
            tenure_type: "REGULAR",
            sequence: billing_cycles.length + 1,
            total_cycles: 0,
            frequency: {
              interval_unit: args.intervalUnit ?? "MONTH",
              interval_count: args.intervalCount ?? 1
            },
            pricing_scheme: {
              fixed_price: { value: args.unitAmount, currency_code: args.currency }
            }
          })

          const req0 = HttpClientRequest.post(`${base}/v1/billing/plans`)
          const req1 = args.idempotencyKey
            ? req0.pipe(HttpClientRequest.setHeader("PayPal-Request-Id", args.idempotencyKey))
            : req0
          const req2 = yield* req1.pipe(
            HttpClientRequest.bodyJson({
              product_id: args.productId,
              name: args.name,
              status: "ACTIVE",
              billing_cycles,
              payment_preferences: {
                auto_bill_outstanding: true,
                setup_fee_failure_action: "CONTINUE",
                payment_failure_threshold: 3
              }
            })
          )
          const token = yield* getAccessToken
          const req = withBearer(withJsonHeaders(req2), token)
          return yield* runJson(req)
        })

      const createSubscription = (args: CreateSubscriptionArgs) =>
        Effect.gen(function*() {
          const req0 = HttpClientRequest.post(`${base}/v1/billing/subscriptions`)
          const req1 = args.idempotencyKey
            ? req0.pipe(HttpClientRequest.setHeader("PayPal-Request-Id", args.idempotencyKey))
            : req0
          const req2 = yield* req1.pipe(
            HttpClientRequest.bodyJson({
              plan_id: args.planId,
              ...(args.quantity ? { quantity: args.quantity } : {}),
              ...(args.customId ? { custom_id: args.customId } : {}),
              ...(args.returnUrl || args.cancelUrl
                ? {
                  application_context: {
                    user_action: "SUBSCRIBE_NOW",
                    ...(args.returnUrl ? { return_url: args.returnUrl } : {}),
                    ...(args.cancelUrl ? { cancel_url: args.cancelUrl } : {})
                  }
                }
                : {})
            })
          )
          const token = yield* getAccessToken
          const req = withBearer(withJsonHeaders(req2), token)
          return yield* runJson(req)
        })

      const cancelSubscription = (
        subscriptionId: string,
        reason = "User requested cancellation"
      ) =>
        Effect.gen(function*() {
          const req0 = HttpClientRequest.post(
            `${base}/v1/billing/subscriptions/${subscriptionId}/cancel`
          )
          const req1 = yield* req0.pipe(HttpClientRequest.bodyJson({ reason }))
          const token = yield* getAccessToken
          const req = withBearer(req1, token)
          yield* runNoBody204(req)
          return { id: subscriptionId, status: "CANCELLED" as const }
        })

      const suspendSubscription = (
        subscriptionId: string,
        reason = "Pause requested"
      ) =>
        Effect.gen(function*() {
          const req0 = HttpClientRequest.post(
            `${base}/v1/billing/subscriptions/${subscriptionId}/suspend`
          )
          const req1 = yield* req0.pipe(HttpClientRequest.bodyJson({ reason }))
          const token = yield* getAccessToken
          const req = withBearer(req1, token)
          yield* runNoBody204(req)
          return { id: subscriptionId, status: "SUSPENDED" as const }
        })

      const verifyWebhookSignature = (a: VerifyWebhookSignatureArgs) =>
        Effect.gen(function*() {
          const req0 = HttpClientRequest.post(
            `${base}/v1/notifications/verify-webhook-signature`
          )
          const req1 = yield* req0.pipe(
            HttpClientRequest.bodyJson({
              auth_algo: a.authAlgo,
              cert_url: a.certUrl,
              transmission_id: a.transmissionId,
              transmission_sig: a.transmissionSig,
              transmission_time: a.transmissionTime,
              webhook_id: a.webhookId,
              webhook_event: JSON.parse(a.rawBody)
            })
          )
          const token = yield* getAccessToken
          const req = withBearer(withJsonHeaders(req1), token)
          return yield* runJson(req)
        })

      // Orders (v2)
      const createOrder = (args: CreateOrderArgs) =>
        Effect.gen(function*() {
          const items = args.items.map((it) => ({
            name: it.name,
            quantity: it.quantity,
            unit_amount: m(it.unit_amount),
            ...(it.tax ? { tax: m(it.tax) } : {}),
            ...(it.sku ? { sku: it.sku } : {}),
            ...(it.category ? { category: it.category } : {})
          }))

          const purchaseUnit: any = {
            ...(args.invoiceId ? { invoice_id: args.invoiceId } : {}),
            items,
            amount: {
              currency_code: args.amount.currency,
              value: args.amount.value,
              ...(args.amount.breakdown
                ? { breakdown: mapBreakdown(args.amount.breakdown) }
                : {})
            }
          }

          if (args.shipping?.address) {
            purchaseUnit.shipping = {
              ...(args.shipping.name ? { name: { full_name: args.shipping.name } } : {}),
              address: args.shipping.address
            }
          }

          const body = {
            intent: args.intent ?? "CAPTURE",
            purchase_units: [purchaseUnit],
            ...(args.returnUrl || args.cancelUrl
              ? {
                application_context: {
                  user_action: "PAY_NOW",
                  ...(args.returnUrl ? { return_url: args.returnUrl } : {}),
                  ...(args.cancelUrl ? { cancel_url: args.cancelUrl } : {})
                }
              }
              : {})
          }

          const req0 = HttpClientRequest.post(`${base}/v2/checkout/orders`)
          const req1 = args.idempotencyKey
            ? req0.pipe(HttpClientRequest.setHeader("PayPal-Request-Id", args.idempotencyKey))
            : req0
          const req2 = yield* req1.pipe(HttpClientRequest.bodyJson(body))
          const token = yield* getAccessToken
          const req = withBearer(withJsonHeaders(req2), token)
          return yield* runJson(req)
        })

      const getOrder = (orderId: string) =>
        Effect.gen(function*() {
          const req0 = HttpClientRequest.get(`${base}/v2/checkout/orders/${orderId}`).pipe(
            HttpClientRequest.acceptJson
          )
          const token = yield* getAccessToken
          const req = withBearer(req0, token)
          return yield* runJson(req)
        })

      const captureOrder = ({ idempotencyKey, orderId }: CaptureOrderArgs) =>
        Effect.gen(function*() {
          const req0 = HttpClientRequest.post(
            `${base}/v2/checkout/orders/${orderId}/capture`
          )
          const req1 = idempotencyKey
            ? req0.pipe(HttpClientRequest.setHeader("PayPal-Request-Id", idempotencyKey))
            : req0
          const token = yield* getAccessToken
          const req = withBearer(withJsonHeaders(req1), token)
          return yield* runJson(req)
        })

      const authorizeOrder = ({ idempotencyKey, orderId }: AuthorizeOrderArgs) =>
        Effect.gen(function*() {
          const req0 = HttpClientRequest.post(
            `${base}/v2/checkout/orders/${orderId}/authorize`
          )
          const req1 = idempotencyKey
            ? req0.pipe(HttpClientRequest.setHeader("PayPal-Request-Id", idempotencyKey))
            : req0
          const token = yield* getAccessToken
          const req = withBearer(withJsonHeaders(req1), token)
          return yield* runJson(req)
        })

      const captureAuthorization = (a: CaptureAuthorizationArgs) =>
        Effect.gen(function*() {
          const req0 = HttpClientRequest.post(
            `${base}/v2/payments/authorizations/${a.authorizationId}/capture`
          )
          const req1 = a.idempotencyKey
            ? req0.pipe(HttpClientRequest.setHeader("PayPal-Request-Id", a.idempotencyKey))
            : req0
          const req2 = yield* req1.pipe(
            HttpClientRequest.bodyJson({
              ...(a.amount ? { amount: m(a.amount) } : {}),
              ...(a.invoiceId ? { invoice_id: a.invoiceId } : {}),
              ...(a.finalCapture !== undefined ? { final_capture: a.finalCapture } : { final_capture: true })
            })
          )
          const token = yield* getAccessToken
          const req = withBearer(withJsonHeaders(req2), token)
          return yield* runJson(req)
        })

      const voidAuthorization = (authorizationId: string) =>
        Effect.gen(function*() {
          const req0 = HttpClientRequest.post(
            `${base}/v2/payments/authorizations/${authorizationId}/void`
          )
          const token = yield* getAccessToken
          const req = withBearer(req0, token)
          yield* runNoBody204(req)
        })

      const getCapture = (captureId: string) =>
        Effect.gen(function*() {
          const req0 = HttpClientRequest.get(`${base}/v2/payments/captures/${captureId}`).pipe(
            HttpClientRequest.acceptJson
          )
          const token = yield* getAccessToken
          const req = withBearer(req0, token)
          return yield* runJson(req)
        })

      const refundCapture = (a: RefundCaptureArgs) =>
        Effect.gen(function*() {
          const req0 = HttpClientRequest.post(
            `${base}/v2/payments/captures/${a.captureId}/refund`
          )
          const req1 = a.idempotencyKey
            ? req0.pipe(HttpClientRequest.setHeader("PayPal-Request-Id", a.idempotencyKey))
            : req0
          const req2 = yield* req1.pipe(
            HttpClientRequest.bodyJson({
              ...(a.amount ? { amount: m(a.amount) } : {}),
              ...(a.note ? { note_to_payer: a.note } : {}),
              ...(a.invoiceId ? { invoice_id: a.invoiceId } : {})
            })
          )
          const token = yield* getAccessToken
          const req = withBearer(withJsonHeaders(req2), token)
          return yield* runJson(req)
        })

      return {
        createProduct,
        createPlan,
        createSubscription,
        cancelSubscription,
        suspendSubscription,
        verifyWebhookSignature,
        createOrder,
        getOrder,
        captureOrder,
        authorizeOrder,
        captureAuthorization,
        voidAuthorization,
        getCapture,
        refundCapture
      } as PayPal["Type"]
    })
  )

/* ---------------------- PaymentProvider Implementation ---------------------- */

export class PayPalProvider implements PaymentProvider {
  constructor(private paypal: PayPal) {}

  // ===== CUSTOMER MANAGEMENT =====
  createCustomer = (args: {
    email: string
    name?: string
    phone?: string
    metadata?: Record<string, string | number | boolean>
  }): Effect.Effect<Customer, CustomerError> =>
    Effect.gen(function*() {
      // PayPal doesn't have a direct customer creation API
      const customerId = `paypal_cust_${Date.now()}`
      return {
        id: customerId,
        email: args.email,
        name: args.name,
        phone: args.phone,
        metadata: args.metadata
      }
    })

  updateCustomer = (args: {
    customerId: string
    email?: string
    name?: string
    phone?: string
    metadata?: Record<string, string | number | boolean>
  }): Effect.Effect<Customer, CustomerError> =>
    Effect.gen(function*() {
      return {
        id: args.customerId,
        email: args.email || "unknown@example.com",
        name: args.name,
        phone: args.phone,
        metadata: args.metadata
      }
    })

  getCustomer = (customerId: string): Effect.Effect<Customer, CustomerError> =>
    Effect.gen(function*() {
      return {
        id: customerId,
        email: "unknown@example.com",
        name: "Unknown Customer",
        metadata: {}
      }
    })

  // ===== PRODUCT MANAGEMENT =====
  createProduct = (args: {
    name: string
    description?: string
    type: "SERVICE" | "PHYSICAL" | "DIGITAL"
    category?: string
    metadata?: Record<string, string | number | boolean>
  }): Effect.Effect<Product, EcommerceError> =>
    Effect.gen(function*() {
      const result = yield* this.paypal.createProduct({
        name: args.name,
        description: args.description,
        type: args.type,
        category: args.category,
        idempotencyKey: `prod_${Date.now()}`
      })

      return {
        id: result.id || `paypal_prod_${Date.now()}`,
        name: args.name,
        description: args.description,
        type: args.type,
        category: args.category,
        metadata: args.metadata
      }
    })

  createPrice = (args: {
    productId: string
    currency: string
    unitAmount: number
    interval?: "day" | "week" | "month" | "year"
    metadata?: Record<string, string | number | boolean>
  }): Effect.Effect<Price, EcommerceError> =>
    Effect.gen(function*() {
      const result = yield* this.paypal.createPlan({
        productId: args.productId,
        name: `Plan for ${args.unitAmount / 100} ${args.currency.toUpperCase()}`,
        currency: args.currency.toUpperCase(),
        unitAmount: (args.unitAmount / 100).toString(),
        intervalUnit: args.interval?.toUpperCase() as "DAY" | "WEEK" | "MONTH" | "YEAR" || "MONTH",
        intervalCount: 1,
        idempotencyKey: `plan_${Date.now()}`
      })

      return {
        id: result.id || `paypal_price_${Date.now()}`,
        productId: args.productId,
        currency: args.currency,
        unitAmount: args.unitAmount,
        interval: args.interval,
        metadata: args.metadata
      }
    })

  // ===== ORDER MANAGEMENT =====
  createOrder = (args: {
    customerId: string
    items: Array<OrderItem>
    metadata?: Record<string, string | number | boolean>
  }): Effect.Effect<Order, EcommerceError> =>
    Effect.gen(function*() {
      const result = yield* this.paypal.createOrder({
        items: args.items.map((item) => ({
          name: item.name,
          quantity: item.quantity.toString(),
          unit_amount: {
            currency: item.unitAmount.currency,
            value: (item.unitAmount.amount / 100).toString()
          },
          ...(item.description ? { description: item.description } : {}),
          ...(item.metadata ? { metadata: item.metadata } : {})
        })),
        amount: {
          currency: args.items[0].unitAmount.currency,
          value: (args.items.reduce((sum, item) => sum + (item.unitAmount.amount * item.quantity), 0) / 100).toString()
        },
        idempotencyKey: `order_${Date.now()}`
      })

      return {
        id: result.id || `paypal_order_${Date.now()}`,
        customerId: args.customerId,
        items: args.items,
        totalAmount: {
          currency: args.items[0].unitAmount.currency,
          amount: args.items.reduce((sum, item) => sum + (item.unitAmount.amount * item.quantity), 0)
        },
        status: "pending",
        metadata: args.metadata,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

  getOrder = (orderId: string): Effect.Effect<Order, EcommerceError> =>
    Effect.gen(function*() {
      const result = yield* this.paypal.getOrder(orderId)
      return {
        id: orderId,
        customerId: "unknown",
        items: [],
        totalAmount: { currency: "USD", amount: 0 },
        status: "pending",
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

  // ===== CHECKOUT AND PAYMENTS =====
  createCheckoutSession = (args: {
    customerId?: string
    items: Array<OrderItem>
    successUrl: string
    cancelUrl: string
    metadata?: Record<string, string | number | boolean>
  }): Effect.Effect<CheckoutSession, PaymentError> =>
    Effect.gen(function*() {
      const result = yield* this.paypal.createOrder({
        items: args.items.map((item) => ({
          name: item.name,
          quantity: item.quantity.toString(),
          unit_amount: {
            currency: item.unitAmount.currency,
            value: (item.unitAmount.amount / 100).toString()
          }
        })),
        amount: {
          currency: args.items[0].unitAmount.currency,
          value: (args.items.reduce((sum, item) => sum + (item.unitAmount.amount * item.quantity), 0) / 100).toString()
        },
        returnUrl: args.successUrl,
        cancelUrl: args.cancelUrl,
        idempotencyKey: `checkout_${Date.now()}`
      })

      const approvalLink = result.links?.find((link: any) => link.rel === "approve")?.href

      return {
        id: result.id || `paypal_checkout_${Date.now()}`,
        customerId: args.customerId,
        amount: {
          currency: args.items[0].unitAmount.currency,
          amount: args.items.reduce((sum, item) => sum + (item.unitAmount.amount * item.quantity), 0)
        },
        status: "open",
        successUrl: args.successUrl,
        cancelUrl: args.cancelUrl,
        metadata: args.metadata
      }
    })

  capturePayment = (args: {
    orderId: string
    amount?: Money
  }): Effect.Effect<Order, PaymentError> =>
    Effect.gen(function*() {
      const result = yield* this.paypal.captureOrder({
        orderId: args.orderId,
        idempotencyKey: `capture_${Date.now()}`
      })

      return {
        id: args.orderId,
        customerId: "unknown",
        items: [],
        totalAmount: args.amount || { currency: "USD", amount: 0 },
        status: "paid",
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

  refundPayment = (args: {
    orderId: string
    amount?: Money
    reason?: string
  }): Effect.Effect<Order, PaymentError> =>
    Effect.gen(function*() {
      return {
        id: args.orderId,
        customerId: "unknown",
        items: [],
        totalAmount: args.amount || { currency: "USD", amount: 0 },
        status: "refunded",
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

  // ===== SUBSCRIPTION MANAGEMENT =====
  createSubscription = (args: {
    customerId: string
    priceId: string
    trialDays?: number
    metadata?: Record<string, string | number | boolean>
  }): Effect.Effect<Subscription, EcommerceError> =>
    Effect.gen(function*() {
      const result = yield* this.paypal.createSubscription({
        planId: args.priceId,
        idempotencyKey: `sub_${Date.now()}`
      })

      return {
        id: result.id || `paypal_sub_${Date.now()}`,
        customerId: args.customerId,
        priceId: args.priceId,
        status: "active",
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        ...(args.trialDays ? { trialEnd: new Date(Date.now() + args.trialDays * 24 * 60 * 60 * 1000) } : {}),
        metadata: args.metadata
      }
    })

  cancelSubscription = (args: {
    subscriptionId: string
    reason?: string
  }): Effect.Effect<Subscription, EcommerceError> =>
    Effect.gen(function*() {
      yield* this.paypal.cancelSubscription(args.subscriptionId, args.reason)
      return {
        id: args.subscriptionId,
        customerId: "unknown",
        priceId: "unknown",
        status: "cancelled",
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(),
        metadata: {}
      }
    })

  getSubscription = (subscriptionId: string): Effect.Effect<Subscription, EcommerceError> =>
    Effect.gen(function*() {
      return {
        id: subscriptionId,
        customerId: "unknown",
        priceId: "unknown",
        status: "active",
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        metadata: {}
      }
    })
}

/* ---------------------- Factory Functions ---------------------- */

export const createPayPalProvider = (options: PayPalOptions) =>
  Effect.gen(function*() {
    const paypal = yield* PayPal
    return new PayPalProvider(paypal)
  })

export const createPayPalProviderLayer = (options: PayPalOptions) =>
  Layer.provide(
    Layer.succeed(PayPal, PayPalLive(options)),
    Layer.effect(PayPalProvider, createPayPalProvider(options))
  )

// Usage:
const paypalProvider = new PayPalProvider() /* ... */
const paymentService = createPaymentProviderService(paypalProvider)
