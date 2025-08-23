import { Effect, Layer, Context } from "effect";
import { createEcommerceService, EcommerceService } from "./ecommerce_service";
import { createPayPalProviderLayer } from "./payment_providers/paypal_adapter";
import { createStripeProviderLayer } from "./payment_providers/stripe_adapter";

// ===== CONFIGURATION =====
const paypalOptions = {
  clientId: "your_paypal_client_id",
  clientSecret: "your_paypal_client_secret",
  env: "sandbox" as const,
  timeoutMs: 30000,
  retries: 3,
  concurrency: 10,
};

const stripeOptions = {
  apiKey: "your_stripe_secret_key",
  apiVersion: "2023-10-16",
  maxNetworkRetries: 3,
  timeoutMs: 30000,
};

// ===== LAYER SETUP =====
const PayPalLayer = createPayPalProviderLayer(paypalOptions);
const StripeLayer = createStripeProviderLayer(stripeOptions);

// ===== UNIFIED ECOMMERCE SERVICE =====
export class UnifiedEcommerceService {
  constructor(private ecommerceService: EcommerceService) {}

  // ===== CUSTOMER MANAGEMENT =====
  async createCustomer(email: string, name?: string) {
    return Effect.runPromise(
      this.ecommerceService.createCustomer({
        email,
        name,
        metadata: { source: "unified_service" },
      })
    );
  }

  // ===== PRODUCT MANAGEMENT =====
  async createProduct(name: string, description?: string, type: "SERVICE" | "PHYSICAL" | "DIGITAL" = "SERVICE") {
    return Effect.runPromise(
      this.ecommerceService.createProduct({
        name,
        description,
        type,
        metadata: { source: "unified_service" },
      })
    );
  }

  async createPrice(productId: string, currency: string, unitAmount: number, interval?: "month" | "year") {
    return Effect.runPromise(
      this.ecommerceService.createPrice({
        productId,
        currency,
        unitAmount,
        interval,
        metadata: { source: "unified_service" },
      })
    );
  }

  // ===== ORDER MANAGEMENT =====
  async createOrder(customerId: string, items: Array<{ name: string; quantity: number; unitAmount: number; currency: string }>) {
    const orderItems = items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      unitAmount: { currency: item.currency, amount: item.unitAmount },
    }));

    return Effect.runPromise(
      this.ecommerceService.createOrder({
        customerId,
        items: orderItems,
        metadata: { source: "unified_service" },
      })
    );
  }

  // ===== CHECKOUT AND PAYMENTS =====
  async createCheckoutSession(
    customerId: string,
    items: Array<{ name: string; quantity: number; unitAmount: number; currency: string }>,
    successUrl: string,
    cancelUrl: string
  ) {
    const orderItems = items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      unitAmount: { currency: item.currency, amount: item.unitAmount },
    }));

    return Effect.runPromise(
      this.ecommerceService.createCheckoutSession({
        customerId,
        items: orderItems,
        successUrl,
        cancelUrl,
        metadata: { source: "unified_service" },
      })
    );
  }

  async capturePayment(orderId: string) {
    return Effect.runPromise(
      this.ecommerceService.capturePayment({ orderId })
    );
  }

  // ===== SUBSCRIPTION MANAGEMENT =====
  async createSubscription(customerId: string, priceId: string, trialDays?: number) {
    return Effect.runPromise(
      this.ecommerceService.createSubscription({
        customerId,
        priceId,
        trialDays,
        metadata: { source: "unified_service" },
      })
    );
  }

  async cancelSubscription(subscriptionId: string, reason?: string) {
    return Effect.runPromise(
      this.ecommerceService.cancelSubscription({
        subscriptionId,
        reason,
      })
    );
  }

  // ===== UTILITY METHODS =====
  calculateOrderTotal(items: Array<{ quantity: number; unitAmount: number }>): number {
    return items.reduce((sum, item) => sum + (item.quantity * item.unitAmount), 0);
  }
}

// ===== USAGE EXAMPLES =====
export const runPayPalExample = async () => {
  console.log("🚀 Running PayPal E-commerce Example...");

  const program = Effect.gen(function* () {
    const ecommerceService = yield* EcommerceService;
    
    // Create customer
    console.log("📧 Creating customer...");
    const customer = yield* ecommerceService.createCustomer({
      email: "john.doe@example.com",
      name: "John Doe",
      metadata: { source: "paypal_example" },
    });
    console.log("✅ Customer created:", customer.id);

    // Create product
    console.log("🛍️ Creating product...");
    const product = yield* ecommerceService.createProduct({
      name: "Premium SaaS Plan",
      description: "Access to all premium features",
      type: "SERVICE",
      metadata: { plan: "premium" },
    });
    console.log("✅ Product created:", product.id);

    // Create price
    console.log("💰 Creating price...");
    const price = yield* ecommerceService.createPrice({
      productId: product.id,
      currency: "USD",
      unitAmount: 2500, // $25.00
      interval: "month",
      metadata: { billing: "monthly" },
    });
    console.log("✅ Price created:", price.id);

    // Create subscription
    console.log("📅 Creating subscription...");
    const subscription = yield* ecommerceService.createSubscription({
      customerId: customer.id,
      priceId: price.id,
      trialDays: 14,
      metadata: { source: "paypal_example" },
    });
    console.log("✅ Subscription created:", subscription.id);

    // Create order for one-time purchase
    console.log("🛒 Creating order...");
    const order = yield* ecommerceService.createOrder({
      customerId: customer.id,
      items: [
        {
          name: "One-time Setup Fee",
          quantity: 1,
          unitAmount: { currency: "USD", amount: 1000 }, // $10.00
        },
      ],
      metadata: { type: "setup_fee" },
    });
    console.log("✅ Order created:", order.id);

    // Create checkout session
    console.log("💳 Creating checkout session...");
    const checkoutSession = yield* ecommerceService.createCheckoutSession({
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
      metadata: { type: "addon_purchase" },
    });
    console.log("✅ Checkout session created:", checkoutSession.id);

    return {
      customer,
      product,
      price,
      subscription,
      order,
      checkoutSession,
    };
  });

  const result = yield* Effect.provide(program, PayPalLayer);
  console.log("🎉 PayPal example completed successfully!");
  return result;
};

export const runStripeExample = async () => {
  console.log("🚀 Running Stripe E-commerce Example...");

  const program = Effect.gen(function* () {
    const ecommerceService = yield* EcommerceService;
    
    // Create customer
    console.log("📧 Creating customer...");
    const customer = yield* ecommerceService.createCustomer({
      email: "jane.smith@example.com",
      name: "Jane Smith",
      metadata: { source: "stripe_example" },
    });
    console.log("✅ Customer created:", customer.id);

    // Create product
    console.log("🛍️ Creating product...");
    const product = yield* ecommerceService.createProduct({
      name: "Enterprise Plan",
      description: "Full enterprise features with support",
      type: "SERVICE",
      metadata: { plan: "enterprise" },
    });
    console.log("✅ Product created:", product.id);

    // Create price
    console.log("💰 Creating price...");
    const price = yield* ecommerceService.createPrice({
      productId: product.id,
      currency: "USD",
      unitAmount: 9900, // $99.00
      interval: "month",
      metadata: { billing: "monthly" },
    });
    console.log("✅ Price created:", price.id);

    // Create subscription
    console.log("📅 Creating subscription...");
    const subscription = yield* ecommerceService.createSubscription({
      customerId: customer.id,
      priceId: price.id,
      trialDays: 30,
      metadata: { source: "stripe_example" },
    });
    console.log("✅ Subscription created:", subscription.id);

    // Create checkout session
    console.log("💳 Creating checkout session...");
    const checkoutSession = yield* ecommerceService.createCheckoutSession({
      customerId: customer.id,
      items: [
        {
          name: "Implementation Service",
          quantity: 1,
          unitAmount: { currency: "USD", amount: 5000 }, // $50.00
        },
      ],
      successUrl: "https://yoursite.com/success",
      cancelUrl: "https://yoursite.com/cancel",
      metadata: { type: "implementation" },
    });
    console.log("✅ Checkout session created:", checkoutSession.id);

    return {
      customer,
      product,
      price,
      subscription,
      checkoutSession,
    };
  });

  const result = yield* Effect.provide(program, StripeLayer);
  console.log("🎉 Stripe example completed successfully!");
  return result;
};

// ===== MAIN FUNCTION =====
export const runExamples = async () => {
  try {
    console.log("🏪 Starting Unified E-commerce Examples...\n");

    // Run PayPal example
    const paypalResult = await runPayPalExample();
    console.log("\n📊 PayPal Results:", JSON.stringify(paypalResult, null, 2));

    console.log("\n" + "=".repeat(50) + "\n");

    // Run Stripe example
    const stripeResult = await runStripeExample();
    console.log("\n📊 Stripe Results:", JSON.stringify(stripeResult, null, 2));

    console.log("\n🎯 Both examples completed successfully!");
    console.log("✨ The same code works with both PayPal and Stripe!");
    
  } catch (error) {
    console.error("❌ Error running examples:", error);
  }
};

// Uncomment to run examples
// runExamples();
