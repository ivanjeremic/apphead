import { Effect, Context, Data, Layer } from "effect";

// ===== SHARED TYPES =====
export type Money = {
  currency: string; // e.g. "USD", "EUR"
  amount: number; // in smallest currency unit (cents for USD)
};

export type Customer = {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  metadata?: Record<string, string | number | boolean>;
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  type: "SERVICE" | "PHYSICAL" | "DIGITAL";
  category?: string;
  metadata?: Record<string, string | number | boolean>;
};

export type Price = {
  id: string;
  productId: string;
  currency: string;
  unitAmount: number;
  interval?: "day" | "week" | "month" | "year"; // for subscriptions
  metadata?: Record<string, string | number | boolean>;
};

export type OrderItem = {
  name: string;
  description?: string;
  quantity: number;
  unitAmount: Money;
  metadata?: Record<string, string | number | boolean>;
};

export type Order = {
  id: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: Money;
  status: "pending" | "paid" | "cancelled" | "refunded";
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
};

export type Subscription = {
  id: string;
  customerId: string;
  priceId: string;
  status: "active" | "cancelled" | "past_due" | "unpaid";
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  trialEnd?: Date;
  metadata?: Record<string, string | number | boolean>;
};

export type CheckoutSession = {
  id: string;
  customerId?: string;
  amount: Money;
  status: "open" | "complete" | "expired";
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string | number | boolean>;
};

// ===== ERROR TYPES =====
export class EcommerceError extends Data.TaggedError("EcommerceError")<{
  code: string;
  message: string;
  details?: unknown;
}> {}

export class PaymentError extends Data.TaggedError("PaymentError")<{
  code: string;
  message: string;
  paymentProvider: string;
  details?: unknown;
}> {}

export class CustomerError extends Data.TaggedError("CustomerError")<{
  code: string;
  message: string;
  customerId?: string;
  details?: unknown;
}> {}

// ===== PAYMENT PROVIDER INTERFACE =====
export interface PaymentProvider {
  // Customer management
  createCustomer: (args: {
    email: string;
    name?: string;
    phone?: string;
    metadata?: Record<string, string | number | boolean>;
  }) => Effect.Effect<Customer, CustomerError>;

  updateCustomer: (args: {
    customerId: string;
    email?: string;
    name?: string;
    phone?: string;
    metadata?: Record<string, string | number | boolean>;
  }) => Effect.Effect<Customer, CustomerError>;

  getCustomer: (customerId: string) => Effect.Effect<Customer, CustomerError>;

  // Product management
  createProduct: (args: {
    name: string;
    description?: string;
    type: "SERVICE" | "PHYSICAL" | "DIGITAL";
    category?: string;
    metadata?: Record<string, string | number | boolean>;
  }) => Effect.Effect<Product, EcommerceError>;

  createPrice: (args: {
    productId: string;
    currency: string;
    unitAmount: number;
    interval?: "day" | "week" | "month" | "year";
    metadata?: Record<string, string | number | boolean>;
  }) => Effect.Effect<Price, EcommerceError>;

  // Order management
  createOrder: (args: {
    customerId: string;
    items: OrderItem[];
    metadata?: Record<string, string | number | boolean>;
  }) => Effect.Effect<Order, EcommerceError>;

  getOrder: (orderId: string) => Effect.Effect<Order, EcommerceError>;

  // Checkout and payments
  createCheckoutSession: (args: {
    customerId?: string;
    items: OrderItem[];
    successUrl: string;
    cancelUrl: string;
    metadata?: Record<string, string | number | boolean>;
  }) => Effect.Effect<CheckoutSession, PaymentError>;

  capturePayment: (args: {
    orderId: string;
    amount?: Money;
  }) => Effect.Effect<Order, PaymentError>;

  refundPayment: (args: {
    orderId: string;
    amount?: Money;
    reason?: string;
  }) => Effect.Effect<Order, PaymentError>;

  // Subscription management
  createSubscription: (args: {
    customerId: string;
    priceId: string;
    trialDays?: number;
    metadata?: Record<string, string | number | boolean>;
  }) => Effect.Effect<Subscription, EcommerceError>;

  cancelSubscription: (args: {
    subscriptionId: string;
    reason?: string;
  }) => Effect.Effect<Subscription, EcommerceError>;

  getSubscription: (subscriptionId: string) => Effect.Effect<Subscription, EcommerceError>;
}

// ===== ECOMMERCE SERVICE =====
export class EcommerceService extends Context.Tag("services/EcommerceService")<
  EcommerceService,
  PaymentProvider
>() {}

// ===== SERVICE IMPLEMENTATION =====
export class EcommerceServiceImpl implements PaymentProvider {
  constructor(private provider: PaymentProvider) {}

  // ===== CUSTOMER MANAGEMENT =====
  createCustomer = (args: {
    email: string;
    name?: string;
    phone?: string;
    metadata?: Record<string, string | number | boolean>;
  }) => this.provider.createCustomer(args);

  updateCustomer = (args: {
    customerId: string;
    email?: string;
    name?: string;
    phone?: string;
    metadata?: Record<string, string | number | boolean>;
  }) => this.provider.updateCustomer(args);

  getCustomer = (customerId: string) => this.provider.getCustomer(customerId);

  // ===== PRODUCT MANAGEMENT =====
  createProduct = (args: {
    name: string;
    description?: string;
    type: "SERVICE" | "PHYSICAL" | "DIGITAL";
    category?: string;
    metadata?: Record<string, string | number | boolean>;
  }) => this.provider.createProduct(args);

  createPrice = (args: {
    productId: string;
    currency: string;
    unitAmount: number;
    interval?: "day" | "week" | "month" | "year";
    metadata?: Record<string, string | number | boolean>;
  }) => this.provider.createPrice(args);

  // ===== ORDER MANAGEMENT =====
  createOrder = (args: {
    customerId: string;
    items: OrderItem[];
    metadata?: Record<string, string | number | boolean>;
  }) => this.provider.createOrder(args);

  getOrder = (orderId: string) => this.provider.getOrder(orderId);

  // ===== CHECKOUT AND PAYMENTS =====
  createCheckoutSession = (args: {
    customerId?: string;
    items: OrderItem[];
    successUrl: string;
    cancelUrl: string;
    metadata?: Record<string, string | number | boolean>;
  }) => this.provider.createCheckoutSession(args);

  capturePayment = (args: {
    orderId: string;
    amount?: Money;
  }) => this.provider.capturePayment(args);

  refundPayment = (args: {
    orderId: string;
    amount?: Money;
    reason?: string;
  }) => this.provider.refundPayment(args);

  // ===== SUBSCRIPTION MANAGEMENT =====
  createSubscription = (args: {
    customerId: string;
    priceId: string;
    trialDays?: number;
    metadata?: Record<string, string | number | boolean>;
  }) => this.provider.createSubscription(args);

  cancelSubscription = (args: {
    subscriptionId: string;
    reason?: string;
  }) => this.provider.cancelSubscription(args);

  getSubscription = (subscriptionId: string) => this.provider.getSubscription(subscriptionId);

  // ===== UTILITY METHODS =====
  calculateOrderTotal = (items: OrderItem[]): Money => {
    const total = items.reduce((sum, item) => sum + (item.unitAmount.amount * item.quantity), 0);
    const currency = items[0]?.unitAmount.currency || "USD";
    return { currency, amount: total };
  };

  validateOrder = (items: OrderItem[]): Effect.Effect<void, EcommerceError> => {
    if (items.length === 0) {
      return Effect.fail(new EcommerceError({
        code: "INVALID_ORDER",
        message: "Order must contain at least one item"
      }));
    }

    const currencies = new Set(items.map(item => item.unitAmount.currency));
    if (currencies.size > 1) {
      return Effect.fail(new EcommerceError({
        code: "MIXED_CURRENCIES",
        message: "All items in an order must use the same currency"
      }));
    }

    return Effect.void;
  };
}

// ===== FACTORY FUNCTIONS =====
export const createEcommerceService = (provider: PaymentProvider): EcommerceServiceImpl => {
  return new EcommerceServiceImpl(provider);
};

export const createEcommerceServiceLayer = (provider: PaymentProvider) =>
  Layer.succeed(EcommerceService, createEcommerceService(provider));

// ===== USAGE EXAMPLES =====
/*
// Create service with PayPal provider
const paypalProvider = new PayPalProvider(paypalOptions);
const ecommerceService = createEcommerceService(paypalProvider);

// Create service with Stripe provider  
const stripeProvider = new StripeProvider(stripeOptions);
const ecommerceService = createEcommerceService(stripeProvider);

// Use the unified interface
const order = await ecommerceService.createOrder({
  customerId: "cus_123",
  items: [
    {
      name: "Premium Plan",
      quantity: 1,
      unitAmount: { currency: "USD", amount: 2500 }
    }
  ]
}).runPromise();

// The same code works with both PayPal and Stripe!
*/
