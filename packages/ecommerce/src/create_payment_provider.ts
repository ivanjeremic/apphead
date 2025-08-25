import type { CheckoutSession, Customer, Money, Order, OrderItem, Price, Product, Subscription } from "./types.js"

import { Context, Data, Effect, Layer } from "effect"

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

// ===== PAYMENT PROVIDER INTERFACE =====
export interface PaymentProvider {
  /** Optional instance property mirroring the static providerName for better inference */
  readonly providerName?: string
  // Customer management
  createCustomer(args: {
    email: string
    name?: string
    phone?: string
    metadata?: Record<string, string | number | boolean>
  }): Effect.Effect<Customer, CustomerError>

  updateCustomer(args: {
    customerId: string
    email?: string
    name?: string
    phone?: string
    metadata?: Record<string, string | number | boolean>
  }): Effect.Effect<Customer, CustomerError>

  getCustomer(customerId: string): Effect.Effect<Customer, CustomerError>

  // Product management
  createProduct(args: {
    name: string
    description?: string
    type: "SERVICE" | "PHYSICAL" | "DIGITAL"
    category?: string
    metadata?: Record<string, string | number | boolean>
  }): Effect.Effect<Product, PaymentProviderError>

  createPrice(args: {
    productId: string
    currency: string
    unitAmount: number
    interval?: "day" | "week" | "month" | "year"
    metadata?: Record<string, string | number | boolean>
  }): Effect.Effect<Price, PaymentProviderError>

  // Order management
  createOrder(args: {
    customerId: string
    items: Array<OrderItem>
    metadata?: Record<string, string | number | boolean>
  }): Effect.Effect<Order, PaymentProviderError>

  getOrder(orderId: string): Effect.Effect<Order, PaymentProviderError>

  // Checkout and payments
  createCheckoutSession(args: {
    customerId?: string
    items: Array<OrderItem>
    successUrl: string
    cancelUrl: string
    metadata?: Record<string, string | number | boolean>
  }): Effect.Effect<CheckoutSession, PaymentError>

  capturePayment(args: {
    orderId: string
    amount?: Money
  }): Effect.Effect<Order, PaymentError>

  refundPayment(args: {
    orderId: string
    amount?: Money
    reason?: string
  }): Effect.Effect<Order, PaymentError>

  // Subscription management
  createSubscription(args: {
    customerId: string
    priceId: string
    trialDays?: number
    metadata?: Record<string, string | number | boolean>
  }): Effect.Effect<Subscription, PaymentProviderError>

  cancelSubscription(args: {
    subscriptionId: string
    reason?: string
  }): Effect.Effect<Subscription, PaymentProviderError>

  getSubscription(subscriptionId: string): Effect.Effect<Subscription, PaymentProviderError>
}

// ===== PAYMENT PROVIDER SERVICE IMPLEMENTATION =====
export class PaymentProviderService {
  constructor(private provider: PaymentProvider) {}

  getServiceInfo() {
    return { name: "PaymentProviderService", version: "1.0.0" }
  }

  // Customer management
  createCustomer(args: {
    email: string
    name?: string
    phone?: string
    metadata?: Record<string, string | number | boolean>
  }) {
    return this.provider.createCustomer(args)
  }

  updateCustomer(args: {
    customerId: string
    email?: string
    name?: string
    phone?: string
    metadata?: Record<string, string | number | boolean>
  }) {
    return this.provider.updateCustomer(args)
  }

  getCustomer(customerId: string) {
    return this.provider.getCustomer(customerId)
  }

  // Product management
  createProduct(args: {
    name: string
    description?: string
    type: "SERVICE" | "PHYSICAL" | "DIGITAL"
    category?: string
    metadata?: Record<string, string | number | boolean>
  }) {
    return this.provider.createProduct(args)
  }

  createPrice(args: {
    productId: string
    currency: string
    unitAmount: number
    interval?: "day" | "week" | "month" | "year"
    metadata?: Record<string, string | number | boolean>
  }) {
    return this.provider.createPrice(args)
  }

  // Order management
  createOrder(args: {
    customerId: string
    items: Array<OrderItem>
    metadata?: Record<string, string | number | boolean>
  }) {
    return this.provider.createOrder(args)
  }

  getOrder(orderId: string) {
    return this.provider.getOrder(orderId)
  }

  // Checkout and payments
  createCheckoutSession(args: {
    customerId?: string
    items: Array<OrderItem>
    successUrl: string
    cancelUrl: string
    metadata?: Record<string, string | number | boolean>
  }) {
    return this.provider.createCheckoutSession(args)
  }

  capturePayment(args: {
    orderId: string
    amount?: Money
  }) {
    return this.provider.capturePayment(args)
  }

  refundPayment(args: {
    orderId: string
    amount?: Money
    reason?: string
  }) {
    return this.provider.refundPayment(args)
  }

  // Subscription management
  createSubscription(args: {
    customerId: string
    priceId: string
    trialDays?: number
    metadata?: Record<string, string | number | boolean>
  }) {
    return this.provider.createSubscription(args)
  }

  cancelSubscription(args: {
    subscriptionId: string
    reason?: string
  }) {
    return this.provider.cancelSubscription(args)
  }

  getSubscription(subscriptionId: string) {
    return this.provider.getSubscription(subscriptionId)
  }

  // Utility methods
  calculateOrderTotal(items: Array<OrderItem>): Money {
    const total = items.reduce((sum, item) => sum + (item.unitAmount.amount * item.quantity), 0)
    const currency = items[0]?.unitAmount.currency || "USD"
    return { currency, amount: total }
  }

  validateOrder(items: Array<OrderItem>): Effect.Effect<void, PaymentProviderError> {
    if (items.length === 0) {
      return Effect.fail(
        new PaymentProviderError({
          code: "INVALID_ORDER",
          message: "Order must contain at least one item"
        })
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

  // Shop-like helpers
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
        unitAmount: {
          currency: args.price.currency,
          amount: args.price.unitAmount
        },
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
}

// ===== FACTORY FUNCTIONS =====
export const createPaymentProviderService = (provider: PaymentProvider): PaymentProviderService => {
  return new PaymentProviderService(provider)
}

export class PaymentProviderServiceTag extends Context.Tag("PaymentProviderService")<
  PaymentProviderServiceTag,
  PaymentProviderService
>() {}

// Usage with Layer:
export const createPaymentProviderServiceLayer = (provider: PaymentProvider) =>
  Layer.succeed(PaymentProviderServiceTag, createPaymentProviderService(provider))
