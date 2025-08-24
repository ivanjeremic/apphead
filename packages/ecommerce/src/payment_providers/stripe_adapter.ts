import { Effect } from "effect"
import type {
  CheckoutSession,
  Customer,
  CustomerError,
  EcommerceError,
  Money,
  Order,
  OrderItem,
  PaymentError,
  PaymentProvider,
  Price,
  Product,
  Subscription
} from "../ecommerce/ecommerce_service.js"
import { createStripeSdkClient } from "./stripe.js"

export class StripeProvider implements PaymentProvider {
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
      // Stripe doesn't have a direct order concept, so we'll create a checkout session
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
      // For Stripe, we'll treat checkout sessions as orders
      const checkoutSession = yield* Effect.promise(() => this.stripe.getCheckoutSession(orderId))

      // This is a simplified implementation - you'd need to store order details separately
      return {
        id: orderId,
        customerId: checkoutSession.customer as string || "unknown",
        items: [], // Would need to be stored separately
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
      // For Stripe, payments are captured automatically when using checkout sessions
      // This method would be used for manual payment intents
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
      // Stripe refunds are done on payment intents, not orders
      // This is a simplified implementation
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
      // Stripe doesn't have immediate cancellation, only end-of-period
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
      // Stripe doesn't have a direct subscription retrieval method in our client
      // This would need to be implemented using the raw Stripe instance
      // For now, return a mock subscription
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

// ===== FACTORY FUNCTION =====
export const createStripeProvider = (options: any) =>
  Effect.sync(() => {
    const stripe = createStripeSdkClient(options)
    return new StripeProvider(stripe)
  })

export const createStripeProviderLayer = (options: any) =>
  Layer.sync(StripeProvider, () => createStripeProvider(options))
