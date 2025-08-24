// stripe-sdk-client.ts
import Stripe from "stripe"

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

export type CreatePaymentIntentArgs = {
  amount: number // in cents
  currency: string // e.g. "usd"
  customerId?: string
  metadata?: Record<string, string | number | boolean>
  /** Optional extras */
  automaticPaymentMethods?: {
    enabled: boolean
  }
  paymentMethodTypes?: Array<string> // e.g. ["card", "sepa_debit"]
  description?: string
  idempotencyKey?: string
}

export type RefundPaymentIntentArgs = {
  paymentIntentId: string
  amount?: number // in cents, omit for full refund
  reason?: "duplicate" | "fraudulent" | "requested_by_customer"
  metadata?: Record<string, string | number | boolean>
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

/** ---------- Client factory ---------- */
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

  // ===== SUBSCRIPTION METHODS (existing) =====
  const createProduct = (args: CreateProductArgs) =>
    stripe.products.create(
      {
        name: args.name,
        ...(args.description ? { description: args.description } : {}),
        ...(args.metadata ? { metadata: args.metadata } : {})
      },
      reqOpts(args.idempotencyKey)
    )

  const createPrice = (args: CreatePriceArgs) =>
    stripe.prices.create(
      {
        currency: args.currency,
        unit_amount: args.unitAmount,
        product: args.productId,
        recurring: { interval: args.interval ?? "month" },
        ...(args.metadata ? { metadata: args.metadata } : {})
      },
      reqOpts(args.idempotencyKey)
    )

  const createSubscription = (args: CreateSubscriptionArgs) =>
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
    )

  const cancelSubscriptionNow = (subscriptionId: string) => stripe.subscriptions.del(subscriptionId, reqOpts())

  const cancelSubscriptionAtPeriodEnd = (subscriptionId: string) =>
    stripe.subscriptions.update(
      subscriptionId,
      { cancel_at_period_end: true },
      reqOpts()
    )

  // ===== WEBSHOP/ONE-TIME PURCHASE METHODS =====
  const createCheckoutSession = (args: CreateCheckoutSessionArgs) =>
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
    )

  const createSubscriptionCheckoutSession = (args: CreateCheckoutSessionArgs & { priceId: string }) =>
    stripe.checkout.sessions.create(
      {
        mode: "subscription",
        line_items: [{
          price: args.priceId,
          quantity: 1
        }],
        ...(args.customerId ? { customer: args.customerId } : {}),
        success_url: args.successUrl,
        cancel_url: args.cancelUrl,
        ...(args.metadata ? { metadata: args.metadata } : {}),
        ...(args.subscriptionData ? { subscription_data: args.subscriptionData } : {}),
        ...(args.allowPromotionCodes ? { allow_promotion_codes: true } : {}),
        ...(args.billingAddressCollection ? { billing_address_collection: args.billingAddressCollection } : {}),
        ...(args.shippingAddressCollection ? { shipping_address_collection: args.shippingAddressCollection } : {})
      },
      reqOpts(args.idempotencyKey)
    )

  const createPaymentIntent = (args: CreatePaymentIntentArgs) =>
    stripe.paymentIntents.create(
      {
        amount: args.amount,
        currency: args.currency,
        ...(args.customerId ? { customer: args.customerId } : {}),
        ...(args.metadata ? { metadata: args.metadata } : {}),
        ...(args.automaticPaymentMethods ? { automatic_payment_methods: args.automaticPaymentMethods } : {}),
        ...(args.paymentMethodTypes ? { payment_method_types: args.paymentMethodTypes } : {}),
        ...(args.description ? { description: args.description } : {})
      },
      reqOpts(args.idempotencyKey)
    )

  const confirmPaymentIntent = (paymentIntentId: string, paymentMethodId: string) =>
    stripe.paymentIntents.confirm(
      paymentIntentId,
      { payment_method: paymentMethodId },
      reqOpts()
    )

  const capturePaymentIntent = (paymentIntentId: string, amount?: number) =>
    stripe.paymentIntents.capture(
      paymentIntentId,
      amount ? { amount } : {},
      reqOpts()
    )

  const cancelPaymentIntent = (paymentIntentId: string) => stripe.paymentIntents.cancel(paymentIntentId, reqOpts())

  const refundPaymentIntent = (args: RefundPaymentIntentArgs) =>
    stripe.refunds.create(
      {
        payment_intent: args.paymentIntentId,
        ...(args.amount ? { amount: args.amount } : {}),
        ...(args.reason ? { reason: args.reason } : {}),
        ...(args.metadata ? { metadata: args.metadata } : {})
      },
      reqOpts(args.idempotencyKey)
    )

  // ===== CUSTOMER MANAGEMENT =====
  const createCustomer = (args: CreateCustomerArgs) =>
    stripe.customers.create(
      {
        email: args.email,
        ...(args.name ? { name: args.name } : {}),
        ...(args.phone ? { phone: args.phone } : {}),
        ...(args.metadata ? { metadata: args.metadata } : {}),
        ...(args.description ? { description: args.description } : {})
      },
      reqOpts(args.idempotencyKey)
    )

  const updateCustomer = (args: UpdateCustomerArgs) =>
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
    )

  const getCustomer = (customerId: string) => stripe.customers.retrieve(customerId, reqOpts())

  const listCustomers = (limit = 100) => stripe.customers.list({ limit }, reqOpts())

  // ===== UTILITY METHODS =====
  const getCheckoutSession = (sessionId: string) => stripe.checkout.sessions.retrieve(sessionId, reqOpts())

  const getPaymentIntent = (paymentIntentId: string) => stripe.paymentIntents.retrieve(paymentIntentId, reqOpts())

  const listPaymentIntents = (limit = 100, customerId?: string) =>
    stripe.paymentIntents.list(
      {
        limit,
        ...(customerId ? { customer: customerId } : {})
      },
      reqOpts()
    )

  return {
    // Expose the raw Stripe instance if you ever need it:
    _stripe: stripe,

    // ===== SUBSCRIPTION METHODS =====
    createProduct,
    createPrice,
    createSubscription,
    cancelSubscriptionNow,
    cancelSubscriptionAtPeriodEnd,

    // ===== WEBSHOP/ONE-TIME PURCHASE METHODS =====
    createCheckoutSession,
    createSubscriptionCheckoutSession,
    createPaymentIntent,
    confirmPaymentIntent,
    capturePaymentIntent,
    cancelPaymentIntent,
    refundPaymentIntent,

    // ===== CUSTOMER MANAGEMENT =====
    createCustomer,
    updateCustomer,
    getCustomer,
    listCustomers,

    // ===== UTILITY METHODS =====
    getCheckoutSession,
    getPaymentIntent,
    listPaymentIntents
  }
}

/** ---------- Example usage ---------- */
// (async () => {
//   const stripe = createStripeSdkClient({
//     apiKey: process.env.STRIPE_SECRET_KEY!,
//     apiVersion: "2023-10-16",
//     // stripeAccount: "acct_...",
//   });
//
//   // ===== SUBSCRIPTION FLOW =====
//   const product = await stripe.createProduct({
//     name: "Pro Plan",
//     description: "Pro features",
//     idempotencyKey: "prod-pro-plan-1",
//   });
//
//   const price = await stripe.createPrice({
//     productId: product.id,
//     currency: "usd",
//     unitAmount: 1200,
//     interval: "month",
//     idempotencyKey: "price-pro-plan-monthly",
//   });
//
//   const subscription = await stripe.createSubscription({
//     customerId: "cus_123",
//     priceId: price.id,
//     trialDays: 14,
//     idempotencyKey: "sub-cus_123-pro-monthly",
//   });
//
//   // ===== WEBSHOP/ONE-TIME PURCHASE FLOW =====
//   // Create a customer for the webshop
//   const customer = await stripe.createCustomer({
//     email: "customer@example.com",
//     name: "John Doe",
//     idempotencyKey: "cust-john-doe-1",
//   });
//
//   // Create a checkout session for one-time purchase
//   const checkoutSession = await stripe.createCheckoutSession({
//     items: [
//       {
//         name: "Premium T-Shirt",
//         description: "High-quality cotton t-shirt",
//         amount: { currency: "usd", amount: 2500 }, // $25.00
//         quantity: 2,
//       },
//       {
//         name: "Shipping",
//         amount: { currency: "usd", amount: 500 }, // $5.00
//         quantity: 1,
//       },
//     ],
//     customerId: customer.id,
//     successUrl: "https://yoursite.com/success",
//     cancelUrl: "https://yoursite.com/cancel",
//     allowPromotionCodes: true,
//     billingAddressCollection: "required",
//     shippingAddressCollection: {
//       allowedCountries: ["US", "CA", "GB"],
//     },
//     idempotencyKey: "checkout-tshirt-order-1",
//   });
//
//   // Alternative: Create a payment intent for custom checkout
//   const paymentIntent = await stripe.createPaymentIntent({
//     amount: 5500, // $55.00 total
//     currency: "usd",
//     customerId: customer.id,
//     description: "Premium T-Shirt Order",
//     automaticPaymentMethods: { enabled: true },
//     idempotencyKey: "pi-tshirt-order-1",
//   });
//
//   // ===== SUBSCRIPTION CHECKOUT SESSION =====
//   const subscriptionCheckout = await stripe.createSubscriptionCheckoutSession({
//     priceId: price.id,
//     customerId: customer.id,
//     successUrl: "https://yoursite.com/subscription-success",
//     cancelUrl: "https://yoursite.com/subscription-cancel",
//     allowPromotionCodes: true,
//     idempotencyKey: "sub-checkout-1",
//   });
//
//   console.log({
//     // Subscriptions
//     product,
//     price,
//     subscription,
//     // Webshop
//     customer,
//     checkoutSession,
//     paymentIntent,
//     subscriptionCheckout,
//   });
//
//   // ===== REFUND EXAMPLE =====
//   // await stripe.refundPaymentIntent({
//   //   paymentIntentId: paymentIntent.id,
//   //   reason: "requested_by_customer",
//   //   idempotencyKey: "refund-tshirt-1",
//   // });
//
//   // ===== CANCEL SUBSCRIPTION =====
//   // await stripe.cancelSubscriptionNow(subscription.id);
//   // await stripe.cancelSubscriptionAtPeriodEnd(subscription.id);
// })();
