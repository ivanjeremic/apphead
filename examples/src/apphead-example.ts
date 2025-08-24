import { Apphead } from "@apphead/app"
import { createEcommerceService, PayPalProvider, StripeProvider } from "@apphead/ecommerce"

// Example: instantiate payment providers
const paypalProvider = new PayPalProvider({
  clientId: "your_paypal_client_id",
  clientSecret: "your_paypal_client_secret",
  env: "sandbox"
})
const stripeProvider = new StripeProvider({
  apiKey: "your_stripe_secret_key",
  apiVersion: "2023-10-16"
})

// Create ecommerce service with providers
const ecommerceService = createEcommerceService({
  paymentProviders: {
    paypal: paypalProvider,
    stripe: stripeProvider
  }
})

const app = Apphead({
  services: [ecommerceService]
})

async function main() {
  // Example usage of the ecommerce service
  const orderData = {
    customerId: "customer-id-123",
    items: [
      { name: "Premium Plan", quantity: 1, unitAmount: { currency: "USD", amount: 9999 } }
    ],
    metadata: { source: "example" }
  }
  // Specify provider (e.g., "paypal" or "stripe")
  const order = await app.ecommerce.createOrder(orderData, "paypal")
  console.log("Order created:", order)
}

main().catch(console.error)
