# 🚀 Apphead Examples

This directory contains examples showing how to use Apphead services with perfect TypeScript autocomplete.

## ✨ What's New

The examples now demonstrate the class-based service pattern:

- **Perfect Autocomplete**: Full TypeScript support for all service options
- **Clean API**: Pass service instances directly (no wrappers)
- **Flexible Configuration**: Each service handles its own setup
- **Type Safety**: Compile-time validation of configurations

## 🏃‍♂️ Quick Start

```bash
# Install dependencies
pnpm install

# Run basic ecommerce example
pnpm start

# Run specific examples
pnpm auth
pnpm ecommerce
pnpm full-app

# Watch mode for development
pnpm dev
```

## 📚 Examples

### **1. Basic Ecommerce Usage** (`src/apphead-example.ts`)

Create and use the ecommerce service with provider-aware autocomplete:

```typescript
import { Apphead } from "@apphead/app"
import { EcommerceService, PayPalProvider, StripeProvider } from "@apphead/ecommerce"

// Instantiate payment providers
const paypal = new PayPalProvider({
  clientId: "your_paypal_client_id",
  clientSecret: "your_paypal_client_secret",
  env: "sandbox"
})
const stripe = new StripeProvider({ apiKey: "sk_test_123", apiVersion: "2023-10-16" })

// Create ecommerce service with providers (class-based)
const ecommerceService = new EcommerceService([paypal, stripe])

// Register raw service instance (no wrappers needed)
const app = Apphead({ services: [ecommerceService] })

// Provider name autocompletes to available providers (e.g., "paypal" | "stripe")
await app.ecommerce.createOrder({
  id: "order-001",
  customerId: "cus_123",
  items: [{ name: "Premium Plan", quantity: 1, unitAmount: { currency: "USD", amount: 2500 } }],
  totalAmount: { currency: "USD", amount: 2500 },
  status: "pending",
  createdAt: new Date(),
  updatedAt: new Date(),
  metadata: { plan: "premium" }
}, "paypal")
```

### **2. Multiple Services**

Register any services by passing their instances directly:

```typescript
import { Apphead } from "@apphead/app"
import { EcommerceService } from "@apphead/ecommerce"

const app = Apphead({ services: [new EcommerceService([])] })

// Use with perfect autocomplete
// await app.auth.signInWithOAuth({ provider: "github" })
// await app.email.sendWelcomeEmail(user)
```

### **3. Environment Configuration**

Create different service instances per environment and pass them to Apphead:

```typescript
const devApp = Apphead({ services: [new EcommerceService([stripeDev]) ] })
const prodApp = Apphead({ services: [new EcommerceService([stripeProd]) ] })
```

## 🎯 Key Benefits

### **Perfect Autocomplete**
- **Service Options**: Full autocomplete for all configuration options
- **Method Calls**: Complete method signatures with parameter types
- **Type Safety**: Compile-time validation prevents runtime errors

### **Clean API**
- **Direct Passing**: Pass service instances directly (no wrappers)
- **Flexible**: Create services however you prefer, then register them

### **Registering Services**
```typescript
const ecommerceService = new EcommerceService([/* providers */])
const app = Apphead({ services: [ecommerceService] })
```

## 🔧 Available Services

### **Ecommerce Service**
- **Provider**: Stripe or PayPal
- **Features**: Orders, subscriptions, payments
- **Configuration**: API keys, timeouts, retries

### **Auth Service** (Mock)
- **Providers**: GitHub, Google, Email
- **Features**: OAuth, sessions, user management
- **Configuration**: Session timeouts, provider lists

### **Email Service** (Mock)
- **Providers**: SendGrid, SES, Mailgun
- **Features**: Email sending, templates
- **Configuration**: API keys, from addresses

## 🚀 Running Examples

```bash
# Basic ecommerce usage
pnpm start

# Full app with multiple services
pnpm full-app

# Watch mode for development
pnpm dev

# Run specific examples
pnpm auth
pnpm ecommerce
```

## 📖 Next Steps

1. **Explore Examples**: Run different examples to see the patterns
2. **Modify Services**: Change configurations and see autocomplete in action
3. **Add New Services**: Create your own services using the same pattern
4. **Build Your App**: Use these patterns in your own applications

## 🤝 Contributing

Feel free to:
- Add new examples
- Improve existing examples
- Suggest new service patterns
- Report any issues

---

**Built with ❤️ to show the power of Apphead's service factory pattern!**
