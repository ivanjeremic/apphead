import { Apphead } from "@apphead/app"
import { createPayPalProvider, createStripeProvider, EcommerceService } from "@apphead/ecommerce"

// Example: instantiate payment providers
const paypalProvider = createPayPalProvider({
  clientId: process.env.PP_CLIENT_ID ?? "your-client-id",
  clientSecret: process.env.PP_CLIENT_SECRET ?? "your-client-secret",
  env: "sandbox"
})

const stripeProvider = createStripeProvider({
  apiKey: process.env.STRIPE_API_KEY ?? "your-stripe-key"
})

// Create the ecommerce service and pass it to Apphead
const ecommerceService = new EcommerceService({ providers: [paypalProvider, stripeProvider] })

const app = Apphead({ services: [ecommerceService] })

async function main() {
  const orderData = {
    customerId: "cus_123",
    items: [{ unitAmount: { currency: "USD", amount: 1200 }, quantity: 1 }]
  }

  // Keep API: app.ecommerce.createOrder(...)
  const order = await app.ecommerce.createOrder(orderData, "paypal")
  console.log(order)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
