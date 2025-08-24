# 🏪 Unified E-commerce Service

A clean, EffectTS-based ecommerce service that provides a unified interface for multiple payment providers (PayPal, Stripe) with support for both subscriptions and one-time purchases.

## 🎯 **Key Features**

- ✅ **Unified Interface** - Same code works with PayPal and Stripe
- ✅ **EffectTS Integration** - Functional programming with error handling
- ✅ **Subscription Support** - SaaS billing, recurring payments
- ✅ **Webshop Support** - One-time purchases, digital products
- ✅ **Customer Management** - Create, update, retrieve customers
- ✅ **Order Management** - Handle orders, payments, refunds
- ✅ **Type Safety** - Full TypeScript support with shared types

## 🏗️ **Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                    Your Application                        │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│              UnifiedEcommerceService                       │
│              (High-level wrapper)                          │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                EcommerceService                            │
│              (Core interface)                              │
└─────────────────────┬───────────────────────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        │                           │
┌───────▼────────┐        ┌────────▼────────┐
│ PayPalProvider │        │ StripeProvider  │
│ (PayPal API)   │        │ (Stripe API)    │
└────────────────┘        └─────────────────┘
```

## 📦 **Installation**

```bash
# Install dependencies
npm install effect @effect/platform

# For Stripe
npm install stripe

# For PayPal (already included)
```

## 🚀 **Quick Start**

### 1. **Basic Setup**

```typescript
import { Effect, Layer } from "effect";
import { createEcommerceService, EcommerceService } from "./ecommerce_service";
import { createPayPalProviderLayer } from "./payment_providers/paypal_adapter";
import { createStripeProviderLayer } from "./payment_providers/stripe_adapter";

// Choose your payment provider
const paypalLayer = createPayPalProviderLayer({
  clientId: "your_paypal_client_id",
  clientSecret: "your_paypal_client_secret",
  env: "sandbox",
});

const stripeLayer = createStripeProviderLayer({
  apiKey: "your_stripe_secret_key",
  apiVersion: "2023-10-16",
});

// Create the service
const ecommerceService = createEcommerceService(paypalLayer); // or stripeLayer
```

### 2. **Create a Customer**

```typescript
const customer = await Effect.runPromise(
  ecommerceService.createCustomer({
    email: "customer@example.com",
    name: "John Doe",
    metadata: { source: "website" },
  })
);

console.log("Customer created:", customer.id);
```

### 3. **Create a Product & Price**

```typescript
// Create product
const product = await Effect.runPromise(
  ecommerceService.createProduct({
    name: "Premium Plan",
    description: "Access to all features",
    type: "SERVICE",
    metadata: { plan: "premium" },
  })
);

// Create price
const price = await Effect.runPromise(
  ecommerceService.createPrice({
    productId: product.id,
    currency: "USD",
    unitAmount: 2500, // $25.00
    interval: "month",
  })
);
```

### 4. **Create a Subscription**

```typescript
const subscription = await Effect.runPromise(
  ecommerceService.createSubscription({
    customerId: customer.id,
    priceId: price.id,
    trialDays: 14,
    metadata: { source: "website" },
  })
);
```

### 5. **Create a One-time Order**

```typescript
const order = await Effect.runPromise(
  ecommerceService.createOrder({
    customerId: customer.id,
    items: [
      {
        name: "Setup Fee",
        quantity: 1,
        unitAmount: { currency: "USD", amount: 1000 }, // $10.00
      },
    ],
    metadata: { type: "setup" },
  })
);
```

### 6. **Create Checkout Session**

```typescript
const checkoutSession = await Effect.runPromise(
  ecommerceService.createCheckoutSession({
    customerId: customer.id,
    items: [
      {
        name: "Premium Add-on",
        quantity: 1,
        unitAmount: { currency: "USD", amount: 500 }, // $5.00
      },
    ],
    successUrl: "https://yoursite.com/success",
    cancelUrl: "https://yoursite.com/cancel",
  })
);
```

## 🔄 **Switching Payment Providers**

The beauty of this system is that you can switch between PayPal and Stripe with **zero code changes**:

```typescript
// Same code works with both providers!
const paypalService = createEcommerceService(paypalLayer);
const stripeService = createEcommerceService(stripeLayer);

// This works identically for both:
const customer = await Effect.runPromise(
  paypalService.createCustomer({ email: "test@example.com" })
);

const customer2 = await Effect.runPromise(
  stripeService.createCustomer({ email: "test@example.com" })
);
```

## 📋 **Available Methods**

### **Customer Management**
- `createCustomer()` - Create new customer
- `updateCustomer()` - Update customer information
- `getCustomer()` - Retrieve customer details

### **Product Management**
- `createProduct()` - Create product
- `createPrice()` - Create pricing plan

### **Order Management**
- `createOrder()` - Create order
- `getOrder()` - Retrieve order details

### **Checkout & Payments**
- `createCheckoutSession()` - Create checkout session
- `capturePayment()` - Capture payment
- `refundPayment()` - Process refund

### **Subscription Management**
- `createSubscription()` - Create subscription
- `cancelSubscription()` - Cancel subscription
- `getSubscription()` - Get subscription details

## 🎨 **Advanced Usage**

### **Using Effect Layers**

```typescript
import { Effect, Layer } from "effect";

const program = Effect.gen(function* () {
  const ecommerceService = yield* EcommerceService;
  
  const customer = yield* ecommerceService.createCustomer({
    email: "test@example.com",
    name: "Test User",
  });
  
  return customer;
});

const result = yield* Effect.provide(program, paypalLayer);
```

### **Error Handling**

```typescript
import { EcommerceError, PaymentError, CustomerError } from "./ecommerce_service";

const result = await Effect.runPromise(
  Effect.gen(function* () {
    try {
      return yield* ecommerceService.createCustomer({
        email: "invalid-email",
      });
    } catch (error) {
      if (error instanceof CustomerError) {
        console.log("Customer error:", error.message);
      } else if (error instanceof EcommerceError) {
        console.log("Ecommerce error:", error.message);
      }
      throw error;
    }
  })
);
```

### **Custom Validation**

```typescript
// Validate order before creating
const validationResult = await Effect.runPromise(
  ecommerceService.validateOrder(orderItems)
);

if (validationResult._tag === "Failure") {
  console.log("Order validation failed:", validationResult.cause.message);
  return;
}

// Create order if validation passes
const order = await Effect.runPromise(
  ecommerceService.createOrder({
    customerId,
    items: orderItems,
  })
);
```

## 🔧 **Configuration Options**

### **PayPal Options**
```typescript
const paypalOptions = {
  clientId: "your_client_id",
  clientSecret: "your_client_secret",
  env: "sandbox" | "live",
  timeoutMs: 30000,
  retries: 3,
  concurrency: 10,
};
```

### **Stripe Options**
```typescript
const stripeOptions = {
  apiKey: "your_secret_key",
  apiVersion: "2023-10-16",
  maxNetworkRetries: 3,
  timeoutMs: 30000,
};
```

## 🧪 **Testing**

```typescript
import { runExamples } from "./example_usage";

// Run both PayPal and Stripe examples
await runExamples();
```

## 📚 **Type Definitions**

All types are exported from the main service:

```typescript
import {
  Customer,
  Product,
  Price,
  Order,
  OrderItem,
  Subscription,
  CheckoutSession,
  Money,
  EcommerceError,
  PaymentError,
  CustomerError,
} from "./ecommerce_service";
```

## 🚨 **Error Handling**

The service uses EffectTS error types for robust error handling:

- **`EcommerceError`** - General ecommerce errors
- **`PaymentError`** - Payment processing errors
- **`CustomerError`** - Customer-related errors

Each error includes:
- `code` - Error code for programmatic handling
- `message` - Human-readable error message
- `details` - Additional error context

## 🔮 **Future Enhancements**

- [ ] Support for more payment providers (Square, Adyen)
- [ ] Webhook handling
- [ ] Analytics and reporting
- [ ] Multi-currency support
- [ ] Inventory management
- [ ] Tax calculation
- [ ] Shipping integration

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📄 **License**

MIT License - see LICENSE file for details.

---

**Built with ❤️ using EffectTS for robust, functional ecommerce operations.**
