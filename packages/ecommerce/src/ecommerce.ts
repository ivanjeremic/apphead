import type { CheckoutSession, Customer, Money, Order, OrderItem, Price, Product, Subscription } from "./types.js"

import type { PaymentProvider } from "./create_payment_provider.js"

type Store = {
  products: Map<string, Product>
  prices: Map<string, Price>
  customers: Map<string, Customer>
  orders: Map<string, Order>
  subscriptions: Map<string, Subscription>
}

export class EcommerceService {
  private store: Store = {
    products: new Map(),
    prices: new Map(),
    customers: new Map(),
    orders: new Map(),
    subscriptions: new Map()
  }

  constructor(
    private paymentProviders: Record<string, PaymentProvider>
  ) {}

  // ---- Product Management ----
  async createProduct(product: Product) {
    this.store.products.set(product.id, product)
    // Optionally sync to all payment providers
    for (const provider of Object.values(this.paymentProviders)) {
      await provider.createProduct(product)
    }
    return product
  }

  async getProduct(productId: string) {
    return this.store.products.get(productId)
  }

  async listProducts() {
    return Array.from(this.store.products.values())
  }

  // ---- Price Management ----
  async createPrice(price: Price) {
    this.store.prices.set(price.id, price)
    for (const provider of Object.values(this.paymentProviders)) {
      await provider.createPrice(price)
    }
    return price
  }

  async getPrice(priceId: string) {
    return this.store.prices.get(priceId)
  }

  async listPrices() {
    return Array.from(this.store.prices.values())
  }

  // ---- Customer Management ----
  async createCustomer(customer: Customer) {
    this.store.customers.set(customer.id, customer)
    for (const provider of Object.values(this.paymentProviders)) {
      await provider.createCustomer(customer)
    }
    return customer
  }

  async getCustomer(customerId: string) {
    return this.store.customers.get(customerId)
  }

  async listCustomers() {
    return Array.from(this.store.customers.values())
  }

  // ---- Order Management ----
  async createOrder(order: Order, providerName: string) {
    this.store.orders.set(order.id, order)
    const provider = this.paymentProviders[providerName]
    if (!provider) throw new Error("Payment provider not found")
    return provider.createOrder({
      customerId: order.customerId,
      items: order.items,
      metadata: order.metadata
    })
  }

  async getOrder(orderId: string) {
    return this.store.orders.get(orderId)
  }

  async listOrders() {
    return Array.from(this.store.orders.values())
  }

  // ---- Checkout ----
  async createCheckoutSession(
    args: {
      customerId?: string
      items: Array<OrderItem>
      successUrl: string
      cancelUrl: string
      metadata?: Record<string, string | number | boolean>
    },
    providerName: string
  ) {
    const provider = this.paymentProviders[providerName]
    if (!provider) throw new Error("Payment provider not found")
    return provider.createCheckoutSession(args)
  }

  // ---- Payment ----
  async capturePayment(
    args: { orderId: string; amount?: Money },
    providerName: string
  ) {
    const provider = this.paymentProviders[providerName]
    if (!provider) throw new Error("Payment provider not found")
    return provider.capturePayment(args)
  }

  async refundPayment(
    args: { orderId: string; amount?: Money; reason?: string },
    providerName: string
  ) {
    const provider = this.paymentProviders[providerName]
    if (!provider) throw new Error("Payment provider not found")
    return provider.refundPayment(args)
  }

  // ---- Subscription Management ----
  async createSubscription(subscription: Subscription, providerName: string) {
    this.store.subscriptions.set(subscription.id, subscription)
    const provider = this.paymentProviders[providerName]
    if (!provider) throw new Error("Payment provider not found")
    return provider.createSubscription({
      customerId: subscription.customerId,
      priceId: subscription.priceId,
      trialDays: subscription.trialEnd
        ? Math.floor(
          (subscription.trialEnd.getTime() - subscription.currentPeriodStart.getTime()) /
            (1000 * 60 * 60 * 24)
        )
        : undefined,
      metadata: subscription.metadata
    })
  }

  async cancelSubscription(
    args: { subscriptionId: string; reason?: string },
    providerName: string
  ) {
    const provider = this.paymentProviders[providerName]
    if (!provider) throw new Error("Payment provider not found")
    return provider.cancelSubscription(args)
  }

  async getSubscription(subscriptionId: string) {
    return this.store.subscriptions.get(subscriptionId)
  }

  async listSubscriptions() {
    return Array.from(this.store.subscriptions.values())
  }
}
