import { Apphead } from "@apphead/app"
import { EcommerceService, PayPalProvider, StripeProvider } from "@apphead/ecommerce"

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

// Create ecommerce service with providers (class-based)
const ecommerceService = new EcommerceService([
  paypalProvider,
  stripeProvider
])

const app = Apphead({ services: [ecommerceService] })

async function main() {
  // Example usage of the ecommerce service
  const orderData = {
    id: "order-001",
    customerId: "customer-id-123",
    items: [
      { name: "Premium Plan", quantity: 1, unitAmount: { currency: "USD", amount: 9999 } }
    ],
    totalAmount: { currency: "USD", amount: 9999 },
    status: "pending" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: { source: "example" }
  }
  // Specify provider (autocomplete works: "paypal" | "stripe")
  const order = await app.ecommerce.createOrder(orderData, "paypal")
  console.log("Order created:", order)
}

main().catch(console.error)
