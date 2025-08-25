import { AppheadService } from "@apphead/app"
import { Effect } from "effect"
import type { Effect as TEffect } from "effect"
import type { PaymentProvider } from "./create_payment_provider.js"
import type { Customer, Money, Order, OrderItem, Price, Product, Subscription } from "./types.js"

type Store = {
  products: Map<string, Product>
  prices: Map<string, Price>
  customers: Map<string, Customer>
  orders: Map<string, Order>
  subscriptions: Map<string, Subscription>
}

// Helper type for provider name autocomplete
// Helper types to derive provider name union and method return types
type ProviderNameOf<P> = P extends { providerName: infer N extends string } ? N : never
type ProvidersNameUnion<TProviders extends ReadonlyArray<PaymentProvider>> = ProviderNameOf<TProviders[number]>
type MethodOf<T, K extends keyof T> = T[K] extends (...args: any) => any ? T[K] : never
type ProviderPromiseReturn<K extends keyof PaymentProvider> = ReturnType<MethodOf<PaymentProvider, K>> extends
  TEffect.Effect<infer A, any> ? A
  : ReturnType<MethodOf<PaymentProvider, K>>

export class EcommerceService<
  TProviders extends ReadonlyArray<PaymentProvider & { providerName: string }> = ReadonlyArray<
    PaymentProvider & { providerName: string }
  >
> extends AppheadService {
  readonly serviceName = "ecommerce" as const
  private store: Store = {
    products: new Map(),
    prices: new Map(),
    customers: new Map(),
    orders: new Map(),
    subscriptions: new Map()
  }

  private providerMap: Record<ProvidersNameUnion<TProviders>, PaymentProvider>

  constructor(paymentProviders: TProviders) {
    super()
    this.providerMap = Object.fromEntries(
      paymentProviders.map((p) => [
        p.providerName as ProvidersNameUnion<TProviders>,
        p as PaymentProvider
      ])
    ) as Record<ProvidersNameUnion<TProviders>, PaymentProvider>
  }

  // ---- Product Management ----
  async createProduct(product: Product): Promise<Product> {
    this.store.products.set(product.id, product)
    // Optionally sync to all payment providers
    for (const _provider of Object.values(this.providerMap)) {
      // Effect.runPromise(_provider.createProduct(product))
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
  async createPrice(price: Price): Promise<Price> {
    this.store.prices.set(price.id, price)
    for (const _provider of Object.values(this.providerMap)) {
      // Effect.runPromise(_provider.createPrice(price))
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
  async createCustomer(customer: Customer): Promise<Customer> {
    this.store.customers.set(customer.id, customer)
    for (const _provider of Object.values(this.providerMap)) {
      // Effect.runPromise(_provider.createCustomer(customer))
    }
    return customer
  }

  getServiceInfo(): { name: string; version: string } {
    return { name: "ecommerce", version: "1.0.0" }
  }

  async getCustomer(customerId: string): Promise<Customer | undefined> {
    return this.store.customers.get(customerId)
  }

  async listCustomers(): Promise<Array<Customer>> {
    return Array.from(this.store.customers.values())
  }

  // ---- Order Management ----
  async createOrder(
    order: Order,
    providerName: ProvidersNameUnion<TProviders>
  ): Promise<ProviderPromiseReturn<"createOrder">> {
    this.store.orders.set(order.id, order)
    const provider = this.providerMap[providerName]
    if (!provider) throw new Error("Payment provider not found")
    const orderArgs: any = {
      customerId: order.customerId,
      items: order.items
    }
    if (order.metadata !== undefined) orderArgs.metadata = order.metadata
    return Effect.runPromise(provider.createOrder(orderArgs))
  }

  async getOrder(orderId: string): Promise<Order | undefined> {
    return this.store.orders.get(orderId)
  }

  async listOrders(): Promise<Array<Order>> {
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
    providerName: ProvidersNameUnion<TProviders>
  ): Promise<ProviderPromiseReturn<"createCheckoutSession">> {
    const provider = this.providerMap[providerName]
    if (!provider) throw new Error("Payment provider not found")
    return Effect.runPromise(provider.createCheckoutSession(args))
  }

  // ---- Payment ----
  async capturePayment(
    args: { orderId: string; amount?: Money },
    providerName: ProvidersNameUnion<TProviders>
  ): Promise<ProviderPromiseReturn<"capturePayment">> {
    const provider = this.providerMap[providerName]
    if (!provider) throw new Error("Payment provider not found")
    return Effect.runPromise(provider.capturePayment(args))
  }

  async refundPayment(
    args: { orderId: string; amount?: Money; reason?: string },
    providerName: ProvidersNameUnion<TProviders>
  ): Promise<ProviderPromiseReturn<"refundPayment">> {
    const provider = this.providerMap[providerName]
    if (!provider) throw new Error("Payment provider not found")
    return Effect.runPromise(provider.refundPayment(args))
  }

  // ---- Subscription Management ----
  async createSubscription(
    subscription: Subscription,
    providerName: ProvidersNameUnion<TProviders>
  ): Promise<ProviderPromiseReturn<"createSubscription">> {
    this.store.subscriptions.set(subscription.id, subscription)
    const provider = this.providerMap[providerName]
    if (!provider) throw new Error("Payment provider not found")
    const subArgs: any = {
      customerId: subscription.customerId,
      priceId: subscription.priceId
    }
    if (subscription.trialEnd && subscription.currentPeriodStart) {
      subArgs.trialDays = Math.floor(
        (subscription.trialEnd.getTime() - subscription.currentPeriodStart.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    }
    if (subscription.metadata !== undefined) subArgs.metadata = subscription.metadata
    return Effect.runPromise(provider.createSubscription(subArgs))
  }

  async cancelSubscription(
    args: { subscriptionId: string; reason?: string },
    providerName: ProvidersNameUnion<TProviders>
  ): Promise<ProviderPromiseReturn<"cancelSubscription">> {
    const provider = this.providerMap[providerName]
    if (!provider) throw new Error("Payment provider not found")
    return Effect.runPromise(provider.cancelSubscription(args))
  }

  async getSubscription(subscriptionId: string): Promise<Subscription | undefined> {
    return this.store.subscriptions.get(subscriptionId)
  }

  async listSubscriptions(): Promise<Array<Subscription>> {
    return Array.from(this.store.subscriptions.values())
  }
}
