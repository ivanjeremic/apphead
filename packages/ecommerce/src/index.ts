// Export the main ecommerce service factory
export { createEcommerceService } from "./create-ecommerce-service.js"

// Export types and interfaces
export type {
  CheckoutSession,
  Customer,
  CustomerError,
  EcommerceError,
  Money,
  Order,
  OrderItem,
  PaymentError,
  Price,
  Product,
  Subscription
} from "./ecommerce_service.js"

// Export the main EcommerceService interface
export type { EcommerceService } from "./ecommerce_service.js"

// Export payment provider interfaces
export type { PaymentProvider } from "./ecommerce_service.js"

// Export provider implementations
export { PayPalProvider } from "./payment_providers/paypal_adapter.js"
export { StripeProvider } from "./payment_providers/stripe_adapter.js"

// Export utility functions
export { createEcommerceService as createService } from "./create-ecommerce-service.js"
