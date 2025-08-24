import { Apphead } from "@apphead/app"
import { createEcommerceService } from "@apphead/ecommerce"
import { createPaymentProviderService } from "../../packages/ecommerce/src/create_payment_provider.js"
import { PayPalProvider } from "../../packages/ecommerce/src/payment_providers/paypal.js"
import { StripeProvider } from "../../packages/ecommerce/src/payment_providers/stripe.js"

// ===== BASIC USAGE EXAMPLE =====
// This shows how to use the ecommerce service with perfect autocomplete

async function basicEcommerceExample() {
  console.log("=== Basic Ecommerce Usage Example ===")

  // Create an ecommerce service with Stripe
  const ecommerceService = createEcommerceService({
    provider: "stripe",
    stripe: {
      apiKey: "sk_test_123",
      apiVersion: "2023-10-16",
      maxNetworkRetries: 3,
      timeoutMs: 30000
    }
  })

  // Create an ecommerce service with PayPal
  const paypalEcommerceService = createEcommerceService({
    provider: "paypal",
    paypal: {
      clientId: "your_paypal_client_id",
      clientSecret: "your_paypal_client_secret",
      env: "sandbox",
      timeoutMs: 30000,
      retries: 3,
      concurrency: 10
    }
  })

  // Create Apphead instance with ecommerce service
  const app = Apphead({
    services: [ecommerceService]
  })

  // Perfect autocomplete works here!
  try {
    // Create an order
    const order = await app.ecommerce.createOrder({
      customerId: "cus_123",
      items: [
        {
          name: "Premium Plan",
          quantity: 1,
          unitAmount: { currency: "USD", amount: 2500 } // $25.00
        }
      ],
      metadata: { source: "website" }
    })

    console.log("Order created:", order)

    // Get order details
    const orderDetails = await app.ecommerce.getOrder(order.id)
    console.log("Order details:", orderDetails)

    // Create a subscription
    const subscription = await app.ecommerce.createSubscription({
      customerId: "cus_123",
      priceId: "price_456",
      trialDays: 14,
      metadata: { source: "website" }
    })

    console.log("Subscription created:", subscription)
  } catch (error) {
    console.error("Error in ecommerce operations:", error)
  }
}

// ===== CONVENIENCE FUNCTIONS EXAMPLE =====
async function convenienceFunctionsExample() {
  console.log("\n=== Convenience Functions Example ===")

  // Import convenience functions
  const { createPayPalEcommerceService, createStripeEcommerceService } = await import("@apphead/ecommerce")

  // Create Stripe service using convenience function
  const stripeService = createStripeEcommerceService({
    apiKey: "sk_test_123",
    apiVersion: "2023-10-16",
    maxNetworkRetries: 3
  })

  // Create PayPal service using convenience function
  const paypalService = createPayPalEcommerceService({
    clientId: "your_paypal_client_id",
    clientSecret: "your_paypal_client_secret",
    env: "sandbox"
  })

  // Use both services
  const app = Apphead({
    services: [stripeService, paypalService]
  })

  console.log("Services available:", app.getServicesInfo())
}

// ===== BASIC PAYMENT PROVIDER EXAMPLE =====
// This shows how to use the payment provider service directly

async function basicPaymentProviderExample() {
  console.log("\n=== Basic Payment Provider Example ===")

  // Create a payment provider service with Stripe
  const stripeProvider = new StripeProvider({
    apiKey: "sk_test_123",
    apiVersion: "2023-10-16",
    maxNetworkRetries: 3,
    timeoutMs: 30000
  })
  const stripeService = createPaymentProviderService(stripeProvider)

  // Create a payment provider service with PayPal
  const paypalProvider = new PayPalProvider({
    clientId: "your_paypal_client_id",
    clientSecret: "your_paypal_client_secret",
    env: "sandbox",
    timeoutMs: 30000,
    retries: 3,
    concurrency: 10
  })
  const paypalService = createPaymentProviderService(paypalProvider)

  // Use stripeService or paypalService for shop operations...
}

// ===== RUN EXAMPLES =====
async function runExamples() {
  try {
    await basicEcommerceExample()
    await convenienceFunctionsExample()
    await basicPaymentProviderExample()

    console.log("\n=== All Examples Completed Successfully! ===")
  } catch (error) {
    console.error("Error running examples:", error)
  }
}

// Run examples if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runExamples()
}

export { basicEcommerceExample, basicPaymentProviderExample, convenienceFunctionsExample, runExamples }
