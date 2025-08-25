import { Data, Effect } from "effect"
import type { CheckoutSession, Customer, Money, Order, OrderItem, Price, Product, Subscription } from "./types.js"

// ===== ERROR TYPES =====
export class PaymentProviderError extends Data.TaggedError("PaymentProviderError")<{
  code: string
  message: string
  details?: unknown
}> {}

export class PaymentError extends Data.TaggedError("PaymentError")<{
  code: string
  message: string
  paymentProvider: string
  details?: unknown
}> {}

export class CustomerError extends Data.TaggedError("CustomerError")<{
  code: string
  message: string
  customerId?: string
  details?: unknown
}> {}

// ===== Handler types =====
type RequireAll<T> = { [K in keyof T]-?: T[K] }

export type CommonHandlers = {
  onCreateCustomer: (args: {
    email: string
    name?: string
    phone?: string
    metadata?: Record<string, string | number | boolean>
  }) => Effect.Effect<Customer, CustomerError>

  onUpdateCustomer: (args: {
    customerId: string
    email?: string
    name?: string
    phone?: string
    metadata?: Record<string, string | number | boolean>
  }) => Effect.Effect<Customer, CustomerError>

  onGetCustomer: (customerId: string) => Effect.Effect<Customer, CustomerError>

  onCreateProduct: (args: {
    name: string
    description?: string
    type: "SERVICE" | "PHYSICAL" | "DIGITAL"
    category?: string
    metadata?: Record<string, string | number | boolean>
  }) => Effect.Effect<Product, PaymentProviderError>

  onCreatePrice: (args: {
    productId: string
    currency: string
    unitAmount: number
    interval?: "day" | "week" | "month" | "year"
    metadata?: Record<string, string | number | boolean>
  }) => Effect.Effect<Price, PaymentProviderError>
}

export type OneTimeHandlers = {
  onCreateOrder: (args: {
    customerId: string
    items: Array<OrderItem>
    metadata?: Record<string, string | number | boolean>
  }) => Effect.Effect<Order, PaymentProviderError>

  onGetOrder: (orderId: string) => Effect.Effect<Order, PaymentProviderError>

  onCreateCheckoutSession: (args: {
    customerId?: string
    items: Array<OrderItem>
    successUrl: string
    cancelUrl: string
    metadata?: Record<string, string | number | boolean>
  }) => Effect.Effect<CheckoutSession, PaymentError>

  onCapturePayment: (args: { orderId: string; amount?: Money }) => Effect.Effect<Order, PaymentError>

  onRefundPayment: (args: { orderId: string; amount?: Money; reason?: string }) => Effect.Effect<Order, PaymentError>
}

export type RecurringHandlers = {
  onCreateSubscription: (args: {
    customerId: string
    priceId: string
    trialDays?: number
    metadata?: Record<string, string | number | boolean>
  }) => Effect.Effect<Subscription, PaymentProviderError>

  onCancelSubscription: (
    args: { subscriptionId: string; reason?: string }
  ) => Effect.Effect<Subscription, PaymentProviderError>

  onGetSubscription: (subscriptionId: string) => Effect.Effect<Subscription, PaymentProviderError>
}

export type PaymentProviderCommonSpec = RequireAll<CommonHandlers>
export type PaymentProviderOneTimeSpec = RequireAll<OneTimeHandlers>
export type PaymentProviderRecurringSpec = RequireAll<RecurringHandlers>

export type PaymentProviderOptions = {
  name: string
  common: PaymentProviderCommonSpec
  oneTime?: PaymentProviderOneTimeSpec
  recurring?: PaymentProviderRecurringSpec
}

// ===== Constructible PaymentProvider =====
export class PaymentProvider {
  readonly providerName: string
  private readonly spec: PaymentProviderOptions

  constructor(options: PaymentProviderOptions) {
    this.providerName = options.name
    this.spec = options
  }

  // Common
  createCustomer(args: Parameters<CommonHandlers["onCreateCustomer"]>[0]) {
    return this.spec.common.onCreateCustomer(args)
  }
  updateCustomer(args: Parameters<CommonHandlers["onUpdateCustomer"]>[0]) {
    return this.spec.common.onUpdateCustomer(args)
  }
  getCustomer(customerId: string) {
    return this.spec.common.onGetCustomer(customerId)
  }
  createProduct(args: Parameters<CommonHandlers["onCreateProduct"]>[0]) {
    return this.spec.common.onCreateProduct(args)
  }
  createPrice(args: Parameters<CommonHandlers["onCreatePrice"]>[0]) {
    return this.spec.common.onCreatePrice(args)
  }

  // One-time
  createOrder(args: Parameters<OneTimeHandlers["onCreateOrder"]>[0]) {
    return this.spec.oneTime
      ? this.spec.oneTime.onCreateOrder(args)
      : this.notSupportedProvider<Order>("createOrder", "one-time")
  }
  getOrder(orderId: string) {
    return this.spec.oneTime
      ? this.spec.oneTime.onGetOrder(orderId)
      : this.notSupportedProvider<Order>("getOrder", "one-time")
  }
  createCheckoutSession(args: Parameters<OneTimeHandlers["onCreateCheckoutSession"]>[0]) {
    return this.spec.oneTime
      ? this.spec.oneTime.onCreateCheckoutSession(args)
      : this.notSupportedPayment<CheckoutSession>("createCheckoutSession", "one-time")
  }
  capturePayment(args: Parameters<OneTimeHandlers["onCapturePayment"]>[0]) {
    return this.spec.oneTime
      ? this.spec.oneTime.onCapturePayment(args)
      : this.notSupportedPayment<Order>("capturePayment", "one-time")
  }
  refundPayment(args: Parameters<OneTimeHandlers["onRefundPayment"]>[0]) {
    return this.spec.oneTime
      ? this.spec.oneTime.onRefundPayment(args)
      : this.notSupportedPayment<Order>("refundPayment", "one-time")
  }

  // Recurring
  createSubscription(args: Parameters<RecurringHandlers["onCreateSubscription"]>[0]) {
    return this.spec.recurring
      ? this.spec.recurring.onCreateSubscription(args)
      : this.notSupportedProvider<Subscription>("createSubscription", "recurring")
  }
  cancelSubscription(args: Parameters<RecurringHandlers["onCancelSubscription"]>[0]) {
    return this.spec.recurring
      ? this.spec.recurring.onCancelSubscription(args)
      : this.notSupportedProvider<Subscription>("cancelSubscription", "recurring")
  }
  getSubscription(subscriptionId: string) {
    return this.spec.recurring
      ? this.spec.recurring.onGetSubscription(subscriptionId)
      : this.notSupportedProvider<Subscription>("getSubscription", "recurring")
  }

  // Helpers available to all providers
  calculateOrderTotal(items: Array<OrderItem>): Money {
    const total = items.reduce((sum, item) => sum + item.unitAmount.amount * item.quantity, 0)
    const currency = items[0]?.unitAmount.currency || "USD"
    return { currency, amount: total }
  }

  validateOrder(items: Array<OrderItem>): Effect.Effect<void, PaymentProviderError> {
    if (items.length === 0) {
      return Effect.fail(
        new PaymentProviderError({ code: "INVALID_ORDER", message: "Order must contain at least one item" })
      )
    }
    const currencies = new Set(items.map((item) => item.unitAmount.currency))
    if (currencies.size > 1) {
      return Effect.fail(
        new PaymentProviderError({
          code: "MIXED_CURRENCIES",
          message: "All items in an order must use the same currency"
        })
      )
    }
    return Effect.void
  }

  buyProduct(args: {
    customer: Customer
    product: Product
    price: Price
    quantity?: number
    metadata?: Record<string, string | number | boolean>
  }) {
    return this.createOrder({
      customerId: args.customer.id,
      items: [{
        name: args.product.name,
        quantity: args.quantity ?? 1,
        unitAmount: { currency: args.price.currency, amount: args.price.unitAmount },
        ...(args.product.description ? { description: args.product.description } : {}),
        ...(args.metadata ? { metadata: args.metadata } : {})
      }]
    })
  }

  createCustomerSubscription(args: {
    customer: Customer
    price: Price
    trialDays?: number
    metadata?: Record<string, string | number | boolean>
  }) {
    return this.createSubscription({
      customerId: args.customer.id,
      priceId: args.price.id,
      ...(typeof args.trialDays === "number" ? { trialDays: args.trialDays } : {}),
      ...(args.metadata ? { metadata: args.metadata } : {})
    })
  }

  private notSupportedProvider<A>(
    method: string,
    capability: "one-time" | "recurring"
  ): Effect.Effect<A, PaymentProviderError> {
    return Effect.fail(
      new PaymentProviderError({
        code: "NOT_SUPPORTED",
        message: `${this.providerName} does not support ${capability} payments (${method})`
      })
    )
  }

  private notSupportedPayment<A>(
    method: string,
    capability: "one-time" | "recurring"
  ): Effect.Effect<A, PaymentError> {
    return Effect.fail(
      new PaymentError({
        code: "NOT_SUPPORTED",
        message: `${this.providerName} does not support ${capability} payments (${method})`,
        paymentProvider: this.providerName
      })
    )
  }
}
