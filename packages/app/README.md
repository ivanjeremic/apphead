# 🚀 @apphead/app

The core Apphead package that provides a unified interface for all your application services. Write your core services once and use them across multiple applications with perfect type safety and autocomplete.

## ✨ Features

- **🔄 Unified Service Interface** - One API for all your services
- **🎯 Perfect TypeScript Support** - Full autocomplete and type safety
- **🚀 Zero Configuration** - Just import services and use them
- **🔧 Flexible Architecture** - Mix and match services as needed
- **📦 Service Registry** - Automatic service discovery and validation

## 🏗️ Architecture

```
Your App → Apphead → Service Registry → Individual Services
                ↓
        Unified API with perfect autocomplete
```

## 📦 Installation

```bash
npm install @apphead/app
# or
pnpm add @apphead/app
# or
yarn add @apphead/app
```

## 🚀 Quick Start

### 1. **Import Services**

```typescript
import { authService, ecommerceService } from "@apphead";
```

### 2. **Create App Instance**

```typescript
import { Apphead } from "@apphead/app";

const app = Apphead({
  services: [authService, ecommerceService]
});
```

### 3. **Use Services with Perfect Autocomplete**

```typescript
// Perfect autocomplete works here!
const session = await app.auth.getSession();
const order = await app.ecommerce.createOrder(orderData);
```

## 🎯 Core Concepts

### **Service Registry**

Apphead automatically creates a service registry based on the services you provide:

```typescript
// When you pass these services:
services: [authService, ecommerceService]

// Apphead creates an instance with:
app.auth      // AuthService instance
app.ecommerce // EcommerceService instance
```

### **Type Safety**

Full TypeScript support with perfect autocomplete:

```typescript
const app = Apphead({
  services: [authService, ecommerceService]
});

// TypeScript knows exactly what's available
app.  // ← Shows: auth, ecommerce
app.auth.  // ← Shows all auth methods
app.ecommerce.  // ← Shows all ecommerce methods
```

### **Service Validation**

Apphead automatically validates that all services implement the required interface:

```typescript
// All services must implement BaseService
interface BaseService {
  getServiceInfo(): { name: string; version: string };
}
```

## 🔧 API Reference

### **Apphead Function**

```typescript
function Apphead(config: { services: AppheadServices }): AppheadInstance
```

**Parameters:**
- `config.services` - Array of services to include

**Returns:**
- `AppheadInstance` - Object with all services and utility methods

### **Utility Methods**

```typescript
const app = Apphead({ services: [...] });

// Get a specific service
app.getService("auth") // Returns AuthService or undefined

// Check if a service is available
app.hasService("email") // Returns boolean

// Get info about all services
app.getServicesInfo() // Returns array of service info

// Get raw service instances
app.getRawServices() // Returns all services as plain object
```

### Registering Services

Pass service instances directly (classes extending AppheadService). No wrappers are needed.

```typescript
import { Apphead } from "@apphead/app";
import { EcommerceService } from "@apphead/ecommerce";

const ecommerce = new EcommerceService([]);
const app = Apphead({ services: [ecommerce] });
```

## 📚 Usage Examples

### **Basic Usage**

```typescript
import { Apphead } from "@apphead/app";
import { authService, ecommerceService, emailService } from "@apphead";

const app = Apphead({
  services: [authService, ecommerceService, emailService]
});

// Use any service with perfect autocomplete
const session = await app.auth.getSession();
const order = await app.ecommerce.createOrder(orderData);
const emailResult = await app.email.sendWelcomeEmail(user);
```

### **Partial Services**

```typescript
// Only use some services
const app = Apphead({
  services: [authService, ecommerceService]
});

// These work
await app.auth.getSession();
await app.ecommerce.createOrder(orderData);

// This would cause a TypeScript error (good!)
// await app.email.sendEmail({ to: "", subject: "", body: "" });
```

### **Dynamic Service Access**

```typescript
const app = Apphead({ services: [...] });

// Check if a service is available
if (app.hasService("email")) {
  await app.email.sendEmail(emailData);
}

// Get a service dynamically
const auth = app.getService("auth");
if (auth) {
  await auth.signInWithOAuth({ provider: "github" });
}
```

### **Real-World Scenario**

```typescript
const app = Apphead({
  services: [authService, ecommerceService, emailService, userService]
});

try {
  // User signs in
  const authResult = await app.auth.signInWithOAuth({ provider: "github" });
  
  // Create an order
  const order = await app.ecommerce.createOrder({
    items: [{ name: "Premium Plan", quantity: 1, price: 99.99 }]
  });
  
  // Send confirmation email
  await app.email.sendEmail({
    to: "customer@example.com",
    subject: "Order Confirmation",
    body: `Your order ${order.orderId} has been created!`
  });
  
  // Update user profile
  await app.users.updateUser(authResult.userId, {
    lastOrderId: order.orderId
  });
  
} catch (error) {
  console.error("Error:", error);
}
```

## 🏗️ Creating Your Own Services

### **1. Extend AppheadService**

```typescript
import { AppheadService } from "@apphead/app";

class MyCustomService extends AppheadService {
  static serviceName = "custom";
  getServiceInfo() { return { name: "custom", version: "1.0.0" }; }
  async doSomething() { return "Hello from custom service!"; }
}
```

### **2. Use in Your App**

```typescript
const app = Apphead({ services: [new MyCustomService()] });
```

## 🔍 Type Definitions

### **Service Registry**

```typescript
interface ServiceRegistry {
  auth: AuthService;
  ecommerce: EcommerceService;
  email: EmailService;
  users: UserService;
}
```

### **Apphead Instance**

```typescript
type AppheadInstance<T extends keyof ServiceRegistry = keyof ServiceRegistry> = {
  [K in T]: ServiceRegistry[K];
};
```

### **Service Definition**

```typescript
interface AppheadService<T extends keyof ServiceRegistry> {
  __apphead: {
    serviceName: T;
    service: ServiceRegistry[T];
  };
}
```

## 🧪 Testing

```typescript
import { Apphead } from "@apphead/app";

// Mock services for testing
const mockAuthService = {
  __apphead: {
    serviceName: "auth" as const,
    service: {
      getServiceInfo: () => ({ name: "auth", version: "test" }),
      getSession: jest.fn().mockResolvedValue({ userId: "test" })
    }
  }
};

const app = Apphead({
  services: [mockAuthService]
});

// Test your app logic
const session = await app.auth.getSession();
expect(session.userId).toBe("test");
```

## 🚀 Advanced Usage

### **Service Composition**

```typescript
// Create different app instances for different purposes
const adminApp = Apphead({
  services: [authService, userService, adminService]
});

const customerApp = Apphead({
  services: [authService, ecommerceService, emailService]
});

const apiApp = Apphead({
  services: [authService, ecommerceService, userService, emailService]
});
```

### **Dynamic Service Loading**

```typescript
async function createAppWithDynamicServices(serviceNames: string[]) {
  const services = await Promise.all(
    serviceNames.map(async (name) => {
      const module = await import(`@apphead/${name}`);
      return module[`${name}Service`];
    })
  );
  
  return Apphead({ services });
}

const app = await createAppWithDynamicServices(["auth", "ecommerce"]);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ for developers who want to write code once and use it everywhere.**
