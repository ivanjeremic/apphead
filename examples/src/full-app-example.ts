import { Apphead, createService } from "@apphead/app"
import { createEcommerceService } from "@apphead/ecommerce"

// ===== MOCK SERVICES FOR DEMO =====
// In real usage, these would come from @apphead/auth, @apphead/email, etc.

class MockAuthService {
  constructor(private config: { providers: Array<string>; session: { maxAge: number } }) {}

  getServiceInfo() {
    return { name: "auth", version: "1.0.0" }
  }

  async signInWithOAuth(params: { provider: string }) {
    console.log(`Signing in with ${params.provider}`)
    return { userId: "user_123", provider: params.provider }
  }

  async getSession() {
    return { userId: "user_123", isAuthenticated: true }
  }

  async signOut() {
    console.log("Signing out user")
  }
}

class MockEmailService {
  constructor(private config: { provider: string; apiKey: string; fromEmail: string }) {}

  getServiceInfo() {
    return { name: "email", version: "1.0.0" }
  }

  async sendEmail(params: { to: string; subject: string; body: string }) {
    console.log(`Sending email to ${params.to}: ${params.subject}`)
    return { messageId: "msg_123", status: "sent" }
  }

  async sendWelcomeEmail(user: any) {
    console.log(`Sending welcome email to ${user.email}`)
    return { messageId: "welcome_456", status: "sent" }
  }
}

// ===== FULL APP EXAMPLE =====
async function fullAppExample() {
  console.log("=== Full App Example ===")

  // Create all services
  const authService = createService(
    "auth",
    new MockAuthService({
      providers: ["github", "google"],
      session: { maxAge: 3600 }
    })
  )

  const ecommerceService = createEcommerceService({
    provider: "stripe",
    stripe: {
      apiKey: "sk_test_123",
      apiVersion: "2023-10-16"
    }
  })

  const emailService = createService(
    "email",
    new MockEmailService({
      provider: "sendgrid",
      apiKey: "SG_123",
      fromEmail: "noreply@example.com"
    })
  )

  // Create Apphead instance with all services
  const app = Apphead({
    services: [authService, ecommerceService, emailService]
  })

  // Perfect autocomplete works for all services!
  try {
    // User signs in
    const authResult = await app.auth.signInWithOAuth({ provider: "github" })
    console.log("User signed in:", authResult)

    // Create an order
    const order = await app.ecommerce.createOrder({
      customerId: "cus_123",
      items: [
        { name: "Premium Plan", quantity: 1, unitAmount: { currency: "USD", amount: 2500 } }
      ]
    })
    console.log("Order created:", order)

    // Send confirmation email
    const emailResult = await app.email.sendEmail({
      to: "customer@example.com",
      subject: "Order Confirmation",
      body: `Your order ${order.id} has been created!`
    })
    console.log("Confirmation email sent:", emailResult)

    // Check available services
    console.log("Available services:", app.getServicesInfo())
    console.log("Has email service:", app.hasService("email"))
  } catch (error) {
    console.error("Error in full app example:", error)
  }
}

// ===== ENVIRONMENT CONFIGURATION EXAMPLE =====
async function environmentConfigurationExample() {
  console.log("\n=== Environment Configuration Example ===")

  // Development environment
  const devApp = Apphead({
    services: [
      createService(
        "auth",
        new MockAuthService({
          providers: ["github"],
          session: { maxAge: 1800 } // 30 minutes for dev
        })
      ),
      createEcommerceService({
        provider: "stripe",
        stripe: { apiKey: "sk_test_dev_123" }
      })
    ]
  })

  // Production environment
  const prodApp = Apphead({
    services: [
      createService(
        "auth",
        new MockAuthService({
          providers: ["github", "google", "email"],
          session: { maxAge: 86400 } // 24 hours for prod
        })
      ),
      createEcommerceService({
        provider: "stripe",
        stripe: { apiKey: "sk_live_prod_456" }
      }),
      createService(
        "email",
        new MockEmailService({
          provider: "sendgrid",
          apiKey: "SG_live_789",
          fromEmail: "noreply@mycompany.com"
        })
      )
    ]
  })

  console.log("Dev app services:", devApp.getServicesInfo())
  console.log("Prod app services:", prodApp.getServicesInfo())
}

// ===== RUN EXAMPLES =====
async function runExamples() {
  try {
    await fullAppExample()
    await environmentConfigurationExample()

    console.log("\n=== All Examples Completed Successfully! ===")
  } catch (error) {
    console.error("Error running examples:", error)
  }
}

// Run examples if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runExamples()
}

export { environmentConfigurationExample, fullAppExample, runExamples }
