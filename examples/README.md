# 🚀 Apphead Examples

This directory contains examples showing how to use Apphead services with perfect TypeScript autocomplete.

## ✨ What's New

The examples now demonstrate the **new service factory pattern** that provides:

- **Perfect Autocomplete**: Full TypeScript support for all service options
- **Clean API**: Simple service creation with `createService()`
- **Flexible Configuration**: Services handle their own setup internally
- **Type Safety**: Compile-time validation of all configurations

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

### **1. Basic Ecommerce Usage** (`src/basic-usage.ts`)

Shows how to create and use the ecommerce service with perfect autocomplete:

```typescript
import { Apphead } from "@apphead/app"
import { createEcommerceService } from "@apphead/ecommerce"

// Create ecommerce service with full autocomplete
const ecommerceService = createEcommerceService({
  provider: "stripe", // ← Autocomplete shows "stripe" | "paypal"
  stripe: {
    apiKey: "sk_test_123",
    apiVersion: "2023-10-16", // ← Autocomplete shows available options
    maxNetworkRetries: 3,
    timeoutMs: 30000
  }
})

// Use with Apphead
const app = Apphead({
  services: [ecommerceService]
})

// Perfect autocomplete works here!
const order = await app.ecommerce.createOrder({
  customerId: "cus_123",
  items: [{ name: "Premium Plan", quantity: 1, unitAmount: { currency: "USD", amount: 2500 } }]
})
```

### **2. Full App Example** (`src/full-app-example.ts`)

Demonstrates using multiple services together:

```typescript
import { Apphead, createService } from "@apphead/app"
import { createEcommerceService } from "@apphead/ecommerce"

// Create all services
const authService = createService("auth", new MockAuthService({
  providers: ["github", "google"],
  session: { maxAge: 3600 }
}))

const ecommerceService = createEcommerceService({
  provider: "stripe",
  stripe: { apiKey: "sk_test_123" }
})

const emailService = createService("email", new MockEmailService({
  provider: "sendgrid",
  apiKey: "SG_123",
  fromEmail: "noreply@example.com"
}))

// Use all services together
const app = Apphead({
  services: [authService, ecommerceService, emailService]
})

// Perfect autocomplete for all services!
await app.auth.signInWithOAuth({ provider: "github" })
await app.ecommerce.createOrder(orderData)
await app.email.sendWelcomeEmail(user)
```

### **3. Environment Configuration** (`src/full-app-example.ts`)

Shows how to configure different environments:

```typescript
// Development environment
const devApp = Apphead({
  services: [
    createService("auth", new MockAuthService({
      providers: ["github"],
      session: { maxAge: 1800 } // 30 minutes for dev
    })),
    createEcommerceService({
      provider: "stripe",
      stripe: { apiKey: "sk_test_dev_123" }
    })
  ]
})

// Production environment
const prodApp = Apphead({
  services: [
    createService("auth", new MockAuthService({
      providers: ["github", "google", "email"],
      session: { maxAge: 86400 } // 24 hours for prod
    })),
    createEcommerceService({
      provider: "stripe",
      stripe: { apiKey: "sk_live_prod_456" }
    })
  ]
})
```

## 🎯 Key Benefits

### **Perfect Autocomplete**
- **Service Options**: Full autocomplete for all configuration options
- **Method Calls**: Complete method signatures with parameter types
- **Type Safety**: Compile-time validation prevents runtime errors

### **Clean API**
- **Single Function**: Only `createService()` to create services
- **Direct Passing**: Pass service instances directly, not configuration objects
- **Flexible**: Create services however you prefer, then register them

### **Service Factory Pattern**
```typescript
// Create service with full configuration
const ecommerceService = createEcommerceService({
  provider: "stripe",
  stripe: {
    apiKey: "sk_test_123",
    apiVersion: "2023-10-16"
  }
})

// Register with Apphead
const app = Apphead({
  services: [ecommerceService]
})

// Use with perfect autocomplete
app.ecommerce.createOrder(orderData)
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
