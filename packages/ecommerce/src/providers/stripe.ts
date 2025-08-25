import { Effect } from "effect"
import type { PaymentProvider } from "../create_payment_provider.js"
import type { CheckoutSession, Customer, Money, Order, OrderItem, Price, Product, Subscription } from "../types.js"

export interface StripeProviderOptions {
  apiKey: string
  apiVersion?: string
}

export class StripeProvider implements PaymentProvider {
  static providerName = "stripe" as const
  readonly providerName = StripeProvider.providerName
  constructor(private readonly _opts: StripeProviderOptions) {}

  // Customer
  createCustomer(
    args: { email: string; name?: string; phone?: string; metadata?: Record<string, string | number | boolean> }
  ) {
    const prefix = this._opts.apiVersion ? "st_v" : "st"
    const c: Customer = {
      id: `${prefix}_cus_${Date.now()}`,
      email: args.email,
      ...(args.name !== undefined ? { name: args.name } : {}),
      ...(args.phone !== undefined ? { phone: args.phone } : {}),
      ...(args.metadata !== undefined ? { metadata: args.metadata } : {})
    }
    return Effect.succeed(c)
  }
  updateCustomer(
    args: {
      customerId: string
      email?: string
      name?: string
      phone?: string
      metadata?: Record<string, string | number | boolean>
    }
  ) {
    const c: Customer = {
      id: args.customerId,
      email: args.email ?? "unknown@example.com",
      ...(args.name !== undefined ? { name: args.name } : {}),
      ...(args.phone !== undefined ? { phone: args.phone } : {}),
      ...(args.metadata !== undefined ? { metadata: args.metadata } : {})
    }
    return Effect.succeed(c)
  }
  getCustomer(customerId: string) {
    const c: Customer = { id: customerId, email: "unknown@example.com" }
    return Effect.succeed(c)
  }

  // Catalog
  createProduct(
    args: {
      name: string
      description?: string
      type: "SERVICE" | "PHYSICAL" | "DIGITAL"
      category?: string
      metadata?: Record<string, string | number | boolean>
    }
  ) {
    const p: Product = {
      id: `st_prod_${Date.now()}`,
      name: args.name,
      type: args.type,
      ...(args.description !== undefined ? { description: args.description } : {}),
      ...(args.category !== undefined ? { category: args.category } : {}),
      ...(args.metadata !== undefined ? { metadata: args.metadata } : {})
    }
    return Effect.succeed(p)
  }
  createPrice(
    args: {
      productId: string
      currency: string
      unitAmount: number
      interval?: "day" | "week" | "month" | "year"
      metadata?: Record<string, string | number | boolean>
    }
  ) {
    const pr: Price = {
      id: `st_price_${Date.now()}`,
      productId: args.productId,
      currency: args.currency,
      unitAmount: args.unitAmount,
      ...(args.interval !== undefined ? { interval: args.interval } : {}),
      ...(args.metadata !== undefined ? { metadata: args.metadata } : {})
    }
    return Effect.succeed(pr)
  }

  // Orders
  createOrder(
    args: { customerId: string; items: Array<OrderItem>; metadata?: Record<string, string | number | boolean> }
  ) {
    const amount: Money = {
      currency: args.items[0]?.unitAmount.currency ?? "USD",
      amount: args.items.reduce((sum, i) => sum + i.unitAmount.amount * i.quantity, 0)
    }
    const order: Order = {
      id: `st_order_${Date.now()}`,
      customerId: args.customerId,
      items: args.items,
      totalAmount: amount,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
      ...(args.metadata !== undefined ? { metadata: args.metadata } : {})
    }
    return Effect.succeed(order)
  }
  getOrder(orderId: string) {
    const order: Order = {
      id: orderId,
      customerId: "unknown",
      items: [],
      totalAmount: { currency: "USD", amount: 0 },
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date()
      // metadata omitted
    }
    return Effect.succeed(order)
  }

  // Checkout/Payments
  createCheckoutSession(
    args: {
      customerId?: string
      items: Array<OrderItem>
      successUrl: string
      cancelUrl: string
      metadata?: Record<string, string | number | boolean>
    }
  ) {
    const amount: Money = {
      currency: args.items[0]?.unitAmount.currency ?? "USD",
      amount: args.items.reduce((sum, i) => sum + i.unitAmount.amount * i.quantity, 0)
    }
    const cs: CheckoutSession = {
      id: `st_cs_${Date.now()}`,
      amount,
      status: "open",
      successUrl: args.successUrl,
      cancelUrl: args.cancelUrl,
      ...(args.customerId !== undefined ? { customerId: args.customerId } : {}),
      ...(args.metadata !== undefined ? { metadata: args.metadata } : {})
    }
    return Effect.succeed(cs)
  }
  capturePayment(args: { orderId: string; amount?: Money }) {
    const order: Order = {
      id: args.orderId,
      customerId: "unknown",
      items: [],
      totalAmount: args.amount ?? { currency: "USD", amount: 0 },
      status: "paid",
      createdAt: new Date(),
      updatedAt: new Date()
      // metadata omitted
    }
    return Effect.succeed(order)
  }
  refundPayment(args: { orderId: string; amount?: Money; reason?: string }) {
    const order: Order = {
      id: args.orderId,
      customerId: "unknown",
      items: [],
      totalAmount: args.amount ?? { currency: "USD", amount: 0 },
      status: "refunded",
      createdAt: new Date(),
      updatedAt: new Date(),
      ...(args.reason !== undefined ? { metadata: { reason: args.reason } } : {})
    }
    return Effect.succeed(order)
  }

  // Subscriptions
  createSubscription(
    args: {
      customerId: string
      priceId: string
      trialDays?: number
      metadata?: Record<string, string | number | boolean>
    }
  ) {
    const now = Date.now()
    const sub: Subscription = {
      id: `st_sub_${now}`,
      customerId: args.customerId,
      priceId: args.priceId,
      status: "active",
      currentPeriodStart: new Date(now),
      currentPeriodEnd: new Date(now + 30 * 24 * 60 * 60 * 1000),
      ...(typeof args.trialDays === "number"
        ? { trialEnd: new Date(now + args.trialDays * 24 * 60 * 60 * 1000) }
        : {}),
      ...(args.metadata !== undefined ? { metadata: args.metadata } : {})
    }
    return Effect.succeed(sub)
  }
  cancelSubscription(args: { subscriptionId: string; reason?: string }) {
    const now = Date.now()
    const sub: Subscription = {
      id: args.subscriptionId,
      customerId: "unknown",
      priceId: "unknown",
      status: "cancelled",
      currentPeriodStart: new Date(now),
      currentPeriodEnd: new Date(now),
      ...(args.reason !== undefined ? { metadata: { reason: args.reason } } : {})
    }
    return Effect.succeed(sub)
  }
  getSubscription(_subscriptionId: string) {
    const now = Date.now()
    const sub: Subscription = {
      id: `st_sub_${now}`,
      customerId: "unknown",
      priceId: "unknown",
      status: "active",
      currentPeriodStart: new Date(now),
      currentPeriodEnd: new Date(now + 30 * 24 * 60 * 60 * 1000)
      // metadata omitted
    }
    return Effect.succeed(sub)
  }
}
