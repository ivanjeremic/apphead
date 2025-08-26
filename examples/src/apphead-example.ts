import { Apphead, AuthService, SignInWithPassword } from "@apphead/app"
import { EcommerceService, PayPal, Stripe } from "@apphead/ecommerce"

// Example: instantiate payment providers
const paypalProvider = PayPal({
  clientId: process.env.PP_CLIENT_ID ?? "your-client-id",
  clientSecret: process.env.PP_CLIENT_SECRET ?? "your-client-secret",
  env: "sandbox"
})

const stripeProvider = Stripe({
  apiKey: process.env.STRIPE_API_KEY ?? "your-stripe-key"
})

const ecommerce = new EcommerceService({ providers: [paypalProvider, stripeProvider] })

// Auth: password provider and service
const auth = AuthService({
  providers: [SignInWithPassword({ sessionTtlMs: 1000 * 60 * 60 * 24 })] // 24h session TTL
})

const app = Apphead({ services: [auth, ecommerce] })

// Demo both auth and ecommerce without removing previous example
async function demoAuthAndEcommerce() {
  // Auth sign-in (Supabase-like)
  const { data: authData, error: authError } = await app.auth.signInWithPassword({
    email: "example@email.com",
    password: "example-password"
  })
  if (authError) {
    console.error("auth error:", authError)
    return
  }
  console.log("signed in user:", authData.user.email, "session:", authData.session.id)

  // Ecommerce: create a Stripe order
  const stripeOrder = await app.ecommerce.createOrder(
    {
      items: [{ unitAmount: { currency: "USD", amount: 1299 }, quantity: 1 }],
      capture: "automatic"
    },
    "stripe"
  )
  console.log("stripe order:", stripeOrder.id, stripeOrder.totalAmount)

  // Ecommerce: create a PayPal checkout session (get approval URL)
  const ppSession = await app.ecommerce.createCheckoutSession(
    {
      items: [{ unitAmount: { currency: "USD", amount: 2499 }, quantity: 1 }],
      successUrl: "https://example.com/success",
      cancelUrl: "https://example.com/cancel",
      capture: "automatic"
    },
    "paypal"
  )
  console.log("paypal session:", ppSession.id, (ppSession as any).approveUrl ?? "(no approve url)")

  // Optional: sign out
  await app.auth.signOut(authData.session.id)
  console.log("signed out")
}

demoAuthAndEcommerce().catch(console.error)
