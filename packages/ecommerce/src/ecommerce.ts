import { AppheadService } from "@apphead/app"
import { Effect } from "effect"
import type { Customer, Order, Price, Product, Subscription } from "./types.js"
import type { PaymentProvider } from "./utils/create_payment_provider.js"

type ProviderNameOf<T extends PaymentProvider<any>> = T["name"]
type ProvidersNameUnion<TProviders extends ReadonlyArray<PaymentProvider<any>>> = ProviderNameOf<TProviders[number]>

export type CreateOrderArgs = {
  customerId?: string
  items: ReadonlyArray<{ unitAmount: { currency: string; amount: number }; quantity: number }>
  metadata?: Record<string, string | number | boolean>
  capture?: "automatic" | "manual"
}

export type CreateCheckoutSessionArgs = {
  customerId?: string
  items: ReadonlyArray<{ unitAmount: { currency: string; amount: number }; quantity: number }>
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, string | number | boolean>
  idempotencyKey?: string
  capture?: "automatic" | "manual"
}

export type CapturePaymentArgs = { orderId: string; amount?: { currency: string; amount: number } }
export type RefundPaymentArgs = { orderId: string; amount?: { currency: string; amount: number } }
export type CreateSubscriptionArgs = {
  customerId: string
  priceId: string
  trialDays?: number
  metadata?: Record<string, string | number | boolean>
  idempotencyKey?: string
}
export type CancelSubscriptionArgs = { subscriptionId: string; reason?: string }

// Relaxed helper to avoid nested Promise types in signatures
type ProviderPromiseReturn<_M extends string> = any

export class EcommerceService<TProviders extends ReadonlyArray<PaymentProvider<string>>> extends AppheadService {
  readonly serviceName = "ecommerce"

  private readonly providersByName: Record<ProvidersNameUnion<TProviders>, PaymentProvider>
  public readonly ecommerce: this = this

  constructor(opts: { providers: TProviders }) {
    super()
    const providers = opts.providers
    this.providersByName = Object.fromEntries(
      providers.map((p) => [p.name as ProvidersNameUnion<TProviders>, p])
    ) as Record<ProvidersNameUnion<TProviders>, PaymentProvider>
  }

  // Required by AppheadService
  override getServiceInfo(): any {
    return { serviceName: this.serviceName }
  }

  // Helper
  private getProvider(name: ProvidersNameUnion<TProviders>): PaymentProvider {
    return this.providersByName[name]
  }
  private notSupported(method: string, provider: string): never {
    throw new Error(`[ecommerce] ${method} is not supported by provider "${provider}"`)
  }

  // Products (delegate if provider implements them)
  getProduct(productId: string, providerName: ProvidersNameUnion<TProviders>): Promise<Product> {
    const provider = this.getProvider(providerName)
    const fn = provider?.common?.onGetProduct
    if (typeof fn !== "function") this.notSupported("getProduct", providerName as string)
    return Effect.runPromise(fn(productId)) as Promise<Product>
  }

  listProducts(providerName: ProvidersNameUnion<TProviders>): Promise<ReadonlyArray<Product>> {
    const provider = this.getProvider(providerName)
    const fn = provider?.common?.onListProducts
    if (typeof fn !== "function") this.notSupported("listProducts", providerName as string)
    return Effect.runPromise(fn()) as Promise<ReadonlyArray<Product>>
  }

  // Prices
  getPrice(priceId: string, providerName: ProvidersNameUnion<TProviders>): Promise<Price> {
    const provider = this.getProvider(providerName)
    const fn = provider?.common?.onGetPrice
    if (typeof fn !== "function") this.notSupported("getPrice", providerName as string)
    return Effect.runPromise(fn(priceId)) as Promise<Price>
  }

  listPrices(providerName: ProvidersNameUnion<TProviders>): Promise<ReadonlyArray<Price>> {
    const provider = this.getProvider(providerName)
    const fn = provider?.common?.onListPrices
    if (typeof fn !== "function") this.notSupported("listPrices", providerName as string)
    return Effect.runPromise(fn()) as Promise<ReadonlyArray<Price>>
  }

  // Customers
  getCustomer(customerId: string, providerName: ProvidersNameUnion<TProviders>): Promise<Customer> {
    const provider = this.getProvider(providerName)
    const fn = provider?.common?.onGetCustomer
    if (typeof fn !== "function") this.notSupported("getCustomer", providerName as string)
    return Effect.runPromise(fn(customerId)) as Promise<Customer>
  }

  listCustomers(providerName: ProvidersNameUnion<TProviders>): Promise<ReadonlyArray<Customer>> {
    const provider = this.getProvider(providerName)
    const fn = provider?.common?.onListCustomers
    if (typeof fn !== "function") this.notSupported("listCustomers", providerName as string)
    return Effect.runPromise(fn()) as Promise<ReadonlyArray<Customer>>
  }

  // Orders
  getOrder(orderId: string, providerName: ProvidersNameUnion<TProviders>): Promise<Order> {
    const provider = this.getProvider(providerName)
    const fn = provider?.oneTime?.onGetOrder
    if (typeof fn !== "function") this.notSupported("getOrder", providerName as string)
    return Effect.runPromise(fn(orderId)) as Promise<Order>
  }

  listOrders(providerName: ProvidersNameUnion<TProviders>): Promise<ReadonlyArray<Order>> {
    const provider = this.getProvider(providerName)
    const fn = provider?.oneTime?.onListOrders
    if (typeof fn !== "function") this.notSupported("listOrders", providerName as string)
    return Effect.runPromise(fn()) as Promise<ReadonlyArray<Order>>
  }

  // Subscriptions
  getSubscription(subscriptionId: string, providerName: ProvidersNameUnion<TProviders>): Promise<Subscription> {
    const provider = this.getProvider(providerName)
    const fn = provider?.recurring?.onGetSubscription
    if (typeof fn !== "function") this.notSupported("getSubscription", providerName as string)
    return Effect.runPromise(fn(subscriptionId)) as Promise<Subscription>
  }

  listSubscriptions(providerName: ProvidersNameUnion<TProviders>): Promise<ReadonlyArray<Subscription>> {
    const provider = this.getProvider(providerName)
    const fn = provider?.recurring?.onListSubscriptions
    if (typeof fn !== "function") this.notSupported("listSubscriptions", providerName as string)
    return Effect.runPromise(fn()) as Promise<ReadonlyArray<Subscription>>
  }

  // Delegated actions
  createOrder(
    orderArgs: CreateOrderArgs,
    providerName: ProvidersNameUnion<TProviders>
  ): Promise<ProviderPromiseReturn<"createOrder">> {
    const provider = this.getProvider(providerName)
    return Effect.runPromise(provider.oneTime.onCreateOrder(orderArgs))
  }

  createCheckoutSession(
    args: CreateCheckoutSessionArgs,
    providerName: ProvidersNameUnion<TProviders>
  ): Promise<ProviderPromiseReturn<"createCheckoutSession">> {
    const provider = this.getProvider(providerName)
    return Effect.runPromise(provider.oneTime.onCreateCheckoutSession(args))
  }

  capturePayment(
    args: CapturePaymentArgs,
    providerName: ProvidersNameUnion<TProviders>
  ): Promise<ProviderPromiseReturn<"capturePayment">> {
    const provider = this.getProvider(providerName)
    return Effect.runPromise(provider.oneTime.onCapturePayment(args))
  }

  refundPayment(
    args: RefundPaymentArgs,
    providerName: ProvidersNameUnion<TProviders>
  ): Promise<ProviderPromiseReturn<"refundPayment">> {
    const provider = this.getProvider(providerName)
    return Effect.runPromise(provider.oneTime.onRefundPayment(args))
  }

  createSubscription(
    args: CreateSubscriptionArgs,
    providerName: ProvidersNameUnion<TProviders>
  ): Promise<ProviderPromiseReturn<"createSubscription">> {
    const provider = this.getProvider(providerName)
    return Effect.runPromise(provider.recurring.onCreateSubscription(args))
  }

  cancelSubscription(
    args: CancelSubscriptionArgs,
    providerName: ProvidersNameUnion<TProviders>
  ): Promise<ProviderPromiseReturn<"cancelSubscription">> {
    const provider = this.getProvider(providerName)
    return Effect.runPromise(provider.recurring.onCancelSubscription(args))
  }
}
