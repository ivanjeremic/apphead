// stripe-sdk-client.ts
import { Effect, Layer } from "effect"
import Stripe from "stripe"
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

/** ---------- Options ---------- */
export type StripeSdkClientOptions = {
  /** Your secret key, e.g. sk_live_... */
  apiKey: string
  /** Pin your API version for safety (recommended). */
  apiVersion?: string // e.g. "2023-10-16"
  /** SDK network retries (exponential backoff). */
  maxNetworkRetries?: number // default 2
  /** Per-request timeout (ms). */
  timeoutMs?: number // default 20_000
  /** For Stripe Connect (acts on behalf of account). */
  stripeAccount?: string
  /** For platforms like Cloudflare Workers (optional). */
  httpClient?: Stripe.HttpClient
}

/** ---------- Input arg types ---------- */
export type CreateProductArgs = {
  name: string
  description?: string
  metadata?: Record<string, string | number | boolean>
  idempotencyKey?: string
}

export type CreatePriceArgs = {
  productId: string
  currency: string // e.g. "usd"
  unitAmount: number // in cents
  interval?: "day" | "week" | "month" | "year"
  metadata?: Record<string, string | number | boolean>
  idempotencyKey?: string
}

export type CreateSubscriptionArgs = {
  customerId: string
  priceId: string
  trialDays?: number
  metadata?: Record<string, string | number | boolean>
  /** Optional extras you might commonly use */
  paymentBehavior?:
    | "error_if_incomplete"
    | "default_incomplete"
    | "pending_if_incomplete"
  defaultPaymentMethod?: string // pm_xxx
  idempotencyKey?: string
}

/** ---------- Webshop/One-time purchase types ---------- */
export type Money = {
  currency: string // e.g. "usd"
  amount: number // in cents
}

export type OrderItem = {
  name: string
  description?: string
  amount: Money
  quantity: number
  metadata?: Record<string, string | number | boolean>
}

export type CreateCheckoutSessionArgs = {
  items: Array<OrderItem>
  customerId?: string // Optional - will create guest checkout if not provided
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, string | number | boolean>
  /** Optional extras */
  allowPromotionCodes?: boolean
  billingAddressCollection?: "auto" | "required"
  shippingAddressCollection?: {
    allowedCountries: Array<string> // e.g. ["US", "CA", "GB"]
  }
  /** For subscription products */
  subscriptionData?: {
    metadata?: Record<string, string | number | boolean>
  }
  idempotencyKey?: string
}

export type CreateCustomerArgs = {
  email: string
  name?: string
  phone?: string
  metadata?: Record<string, string | number | boolean>
  /** Optional extras */
  description?: string
  idempotencyKey?: string
}

export type UpdateCustomerArgs = {
  customerId: string
  email?: string
  name?: string
  phone?: string
  metadata?: Record<string, string | number | boolean>
  description?: string
}

/** ---------- Stripe SDK Client Factory ---------- */
export function createStripeSdkClient(opts: StripeSdkClientOptions) {
  const {
    apiKey,
    apiVersion = "2023-10-16",
    httpClient,
    maxNetworkRetries = 2,
    stripeAccount,
    timeoutMs = 20_000
  } = opts

  if (!apiKey) throw new Error("Stripe API key (opts.apiKey) is required.")

  const stripe = new Stripe(apiKey, {
    apiVersion,
    maxNetworkRetries,
    timeout: timeoutMs,
    ...(httpClient ? { httpClient } : {})
  })

  const reqOpts = (idempotencyKey?: string): Stripe.RequestOptions => ({
    ...(idempotencyKey ? { idempotencyKey } : {}),
    ...(stripeAccount ? { stripeAccount } : {})
  })

  return {
    _stripe: stripe,
    createProduct: (args: CreateProductArgs) =>
      stripe.products.create(
        {
          name: args.name,
          ...(args.description ? { description: args.description } : {}),
          ...(args.metadata ? { metadata: args.metadata } : {})
        },
        reqOpts(args.idempotencyKey)
      ),
    createPrice: (args: CreatePriceArgs) =>
      stripe.prices.create(
        {
          currency: args.currency,
          unit_amount: args.unitAmount,
          product: args.productId,
          recurring: { interval: args.interval ?? "month" },
          ...(args.metadata ? { metadata: args.metadata } : {})
        },
        reqOpts(args.idempotencyKey)
      ),
    createSubscription: (args: CreateSubscriptionArgs) =>
      stripe.subscriptions.create(
        {
          customer: args.customerId,
          items: [{ price: args.priceId }],
          ...(typeof args.trialDays === "number"
            ? { trial_period_days: args.trialDays }
            : {}),
          ...(args.metadata ? { metadata: args.metadata } : {}),
          ...(args.paymentBehavior
            ? { payment_behavior: args.paymentBehavior }
            : {}),
          ...(args.defaultPaymentMethod
            ? { default_payment_method: args.defaultPaymentMethod }
            : {})
        },
        reqOpts(args.idempotencyKey)
      ),
    cancelSubscriptionNow: (subscriptionId: string) => stripe.subscriptions.del(subscriptionId, reqOpts()),
    cancelSubscriptionAtPeriodEnd: (subscriptionId: string) =>
      stripe.subscriptions.update(
        subscriptionId,
        { cancel_at_period_end: true },
        reqOpts()
      ),
    createCheckoutSession: (args: CreateCheckoutSessionArgs) =>
      stripe.checkout.sessions.create(
        {
          mode: "payment", // one-time payment
          line_items: args.items.map((item) => ({
            price_data: {
              currency: item.amount.currency,
              product_data: {
                name: item.name,
                ...(item.description ? { description: item.description } : {}),
                ...(item.metadata ? { metadata: item.metadata } : {})
              },
              unit_amount: item.amount.amount
            },
            quantity: item.quantity
          })),
          ...(args.customerId ? { customer: args.customerId } : {}),
          success_url: args.successUrl,
          cancel_url: args.cancelUrl,
          ...(args.metadata ? { metadata: args.metadata } : {}),
          ...(args.allowPromotionCodes ? { allow_promotion_codes: true } : {}),
          ...(args.billingAddressCollection ? { billing_address_collection: args.billingAddressCollection } : {}),
          ...(args.shippingAddressCollection ? { shipping_address_collection: args.shippingAddressCollection } : {})
        },
        reqOpts(args.idempotencyKey)
      ),
    getCheckoutSession: (sessionId: string) => stripe.checkout.sessions.retrieve(sessionId, reqOpts()),
    createCustomer: (args: CreateCustomerArgs) =>
      stripe.customers.create(
        {
          email: args.email,
          ...(args.name ? { name: args.name } : {}),
          ...(args.phone ? { phone: args.phone } : {}),
          ...(args.metadata ? { metadata: args.metadata } : {}),
          ...(args.description ? { description: args.description } : {})
        },
        reqOpts(args.idempotencyKey)
      ),
    updateCustomer: (args: UpdateCustomerArgs) =>
      stripe.customers.update(
        args.customerId,
        {
          ...(args.email ? { email: args.email } : {}),
          ...(args.name ? { name: args.name } : {}),
          ...(args.phone ? { phone: args.phone } : {}),
          ...(args.metadata ? { metadata: args.metadata } : {}),
          ...(args.description ? { description: args.description } : {})
        },
        reqOpts()
      ),
    getCustomer: (customerId: string) => stripe.customers.retrieve(customerId, reqOpts())
  }
}

/** ---------- StripeProvider Implementation ---------- */
export class StripeProvider implements PaymentProvider {
  static providerName = "stripe" as const
  constructor(private stripe: ReturnType<typeof createStripeSdkClient>) {}

  // ===== CUSTOMER MANAGEMENT =====
  createCustomer = (args: {
    email: string
    name?: string
    phone?: string
    metadata?: Record<string, string | number | boolean>
  }): Effect.Effect<Customer, CustomerError> =>
    Effect.gen(function*() {
      const result = yield* Effect.promise(() =>
        this.stripe.createCustomer({
          email: args.email,
          name: args.name,
          phone: args.phone,
          metadata: args.metadata,
          idempotencyKey: `cust_${Date.now()}`
        })
      )

      return {
        id: result.id,
        email: result.email,
        name: result.name || undefined,
        phone: result.phone || undefined,
        metadata: result.metadata || {}
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
      const result = yield* Effect.promise(() =>
        this.stripe.updateCustomer({
          customerId: args.customerId,
          email: args.email,
          name: args.name,
          phone: args.phone,
          metadata: args.metadata
        })
      )

      return {
        id: result.id,
        email: result.email,
        name: result.name || undefined,
        phone: result.phone || undefined,
        metadata: result.metadata || {}
      }
    })

  getCustomer = (customerId: string): Effect.Effect<Customer, CustomerError> =>
    Effect.gen(function*() {
      const result = yield* Effect.promise(() => this.stripe.getCustomer(customerId))

      return {
        id: result.id,
        email: result.email,
        name: result.name || undefined,
        phone: result.phone || undefined,
        metadata: result.metadata || {}
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
      const result = yield* Effect.promise(() =>
        this.stripe.createProduct({
          name: args.name,
          description: args.description,
          metadata: {
            ...args.metadata,
            type: args.type,
            category: args.category
          },
          idempotencyKey: `prod_${Date.now()}`
        })
      )

      return {
        id: result.id,
        name: result.name,
        description: result.description || undefined,
        type: (result.metadata?.type as "SERVICE" | "PHYSICAL" | "DIGITAL") || "SERVICE",
        category: result.metadata?.category || undefined,
        metadata: result.metadata || {}
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
      const result = yield* Effect.promise(() =>
        this.stripe.createPrice({
          productId: args.productId,
          currency: args.currency,
          unitAmount: args.unitAmount,
          interval: args.interval,
          metadata: args.metadata,
          idempotencyKey: `price_${Date.now()}`
        })
      )

      return {
        id: result.id,
        productId: result.product as string,
        currency: result.currency,
        unitAmount: result.unit_amount || 0,
        interval: result.recurring?.interval as "day" | "week" | "month" | "year" || undefined,
        metadata: result.metadata || {}
      }
    })

  // ===== ORDER MANAGEMENT =====
  createOrder = (args: {
    customerId: string
    items: Array<OrderItem>
    metadata?: Record<string, string | number | boolean>
  }): Effect.Effect<Order, EcommerceError> =>
    Effect.gen(function*() {
      const checkoutSession = yield* this.createCheckoutSession({
        customerId: args.customerId,
        items: args.items,
        successUrl: "https://yoursite.com/success",
        cancelUrl: "https://yoursite.com/cancel",
        metadata: args.metadata
      })

      return {
        id: checkoutSession.id,
        customerId: args.customerId,
        items: args.items,
        totalAmount: checkoutSession.amount,
        status: "pending",
        metadata: args.metadata || {},
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

  getOrder = (orderId: string): Effect.Effect<Order, EcommerceError> =>
    Effect.gen(function*() {
      const checkoutSession = yield* Effect.promise(() => this.stripe.getCheckoutSession(orderId))

      return {
        id: orderId,
        customerId: checkoutSession.customer as string || "unknown",
        items: [],
        totalAmount: {
          currency: checkoutSession.currency || "usd",
          amount: checkoutSession.amount_total || 0
        },
        status: checkoutSession.status === "complete" ? "paid" : "pending",
        metadata: checkoutSession.metadata || {},
        createdAt: new Date(checkoutSession.created * 1000),
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
      const result = yield* Effect.promise(() =>
        this.stripe.createCheckoutSession({
          customerId: args.customerId,
          items: args.items,
          successUrl: args.successUrl,
          cancelUrl: args.cancelUrl,
          metadata: args.metadata,
          idempotencyKey: `checkout_${Date.now()}`
        })
      )

      return {
        id: result.id,
        customerId: result.customer as string || undefined,
        amount: {
          currency: result.currency || "usd",
          amount: result.amount_total || 0
        },
        status: result.status === "complete" ? "complete" : "open",
        successUrl: args.successUrl,
        cancelUrl: args.cancelUrl,
        metadata: args.metadata || {}
      }
    })

  capturePayment = (args: {
    orderId: string
    amount?: Money
  }): Effect.Effect<Order, PaymentError> =>
    Effect.gen(function*() {
      const order = yield* this.getOrder(args.orderId)

      return {
        ...order,
        status: "paid",
        updatedAt: new Date()
      }
    })

  refundPayment = (args: {
    orderId: string
    amount?: Money
    reason?: string
  }): Effect.Effect<Order, PaymentError> =>
    Effect.gen(function*() {
      const order = yield* this.getOrder(args.orderId)

      return {
        ...order,
        status: "refunded",
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
      const result = yield* Effect.promise(() =>
        this.stripe.createSubscription({
          customerId: args.customerId,
          priceId: args.priceId,
          trialDays: args.trialDays,
          metadata: args.metadata,
          idempotencyKey: `sub_${Date.now()}`
        })
      )

      return {
        id: result.id,
        customerId: result.customer as string,
        priceId: result.items.data[0]?.price.id || args.priceId,
        status: result.status as "active" | "cancelled" | "past_due" | "unpaid",
        currentPeriodStart: new Date(result.current_period_start * 1000),
        currentPeriodEnd: new Date(result.current_period_end * 1000),
        ...(result.trial_end ? { trialEnd: new Date(result.trial_end * 1000) } : {}),
        metadata: result.metadata || {}
      }
    })

  cancelSubscription = (args: {
    subscriptionId: string
    reason?: string
  }): Effect.Effect<Subscription, EcommerceError> =>
    Effect.gen(function*() {
      const result = yield* Effect.promise(() => this.stripe.cancelSubscriptionAtPeriodEnd(args.subscriptionId))

      return {
        id: result.id,
        customerId: result.customer as string,
        priceId: result.items.data[0]?.price.id || "unknown",
        status: "cancelled",
        currentPeriodStart: new Date(result.current_period_start * 1000),
        currentPeriodEnd: new Date(result.current_period_end * 1000),
        metadata: result.metadata || {}
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

/** ---------- Factory Functions ---------- */
export const createStripeProvider = (options: StripeSdkClientOptions) =>
  Effect.sync(() => {
    const stripe = createStripeSdkClient(options)
    return new StripeProvider(stripe)
  })

export const createStripeProviderLayer = (options: StripeSdkClientOptions) =>
  Layer.sync(StripeProvider, () => createStripeProvider(options))

// Usage:
const stripeProvider = new StripeProvider() /* ... */
const paymentService = createPaymentProviderService(stripeProvider)
