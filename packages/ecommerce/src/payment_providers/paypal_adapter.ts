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
import { PayPal, PayPalLive } from "./paypal.js"

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
      // We'll create a mock customer ID for now
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
      // PayPal doesn't have customer update API
      // Return the existing customer with updated fields
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
      // PayPal doesn't have customer retrieval API
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
      // Convert to PayPal plan
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

      // Convert PayPal order to our format
      return {
        id: orderId,
        customerId: "unknown", // PayPal doesn't expose customer ID in orders
        items: [], // Would need to parse PayPal response
        totalAmount: { currency: "USD", amount: 0 }, // Would need to parse PayPal response
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

      // Find approval link in PayPal response
      const approvalLink = result.links?.find((link) => link.rel === "approve")?.href

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
      // PayPal refunds are done on captures, not orders
      // This is a simplified implementation
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
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
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
      // PayPal doesn't have a direct subscription retrieval API
      // This would need to be implemented based on your business logic
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
export const createPayPalProvider = (options: any) =>
  Effect.gen(function*() {
    const paypal = yield* PayPal
    return new PayPalProvider(paypal)
  })

export const createPayPalProviderLayer = (options: any) =>
  Layer.provide(
    Layer.succeed(PayPal, PayPalLive(options)),
    Layer.effect(PayPalProvider, createPayPalProvider(options))
  )
