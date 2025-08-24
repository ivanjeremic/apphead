import { createService } from "@apphead/app"
import type { EcommerceService } from "./ecommerce_service.js"
import { EcommerceServiceImpl } from "./ecommerce_service.js"
import { PayPalProvider } from "./payment_providers/paypal_adapter.js"
import { StripeProvider } from "./payment_providers/stripe_adapter.js"

// Configuration options for ecommerce service
export interface EcommerceServiceOptions {
  provider: "stripe" | "paypal"
  // Stripe specific options
  stripe?: {
    apiKey: string
    apiVersion?: string
    maxNetworkRetries?: number
    timeoutMs?: number
  }
  // PayPal specific options
  paypal?: {
    clientId: string
    clientSecret: string
    env: "sandbox" | "live"
    timeoutMs?: number
    retries?: number
    concurrency?: number
  }
  // General options
  metadata?: Record<string, string | number | boolean>
}

/**
 * Create an ecommerce service with the specified configuration
 * This function provides perfect autocomplete for all options
 */
export function createEcommerceService(options: EcommerceServiceOptions) {
  let paymentProvider: any

  // Create the appropriate payment provider based on configuration
  if (options.provider === "stripe") {
    if (!options.stripe?.apiKey) {
      throw new Error("Stripe API key is required when provider is 'stripe'")
    }

    // Import Stripe SDK and create provider
    const { createStripeSdkClient } = require("./payment_providers/stripe.js")
    const stripeClient = createStripeSdkClient({
      apiKey: options.stripe.apiKey,
      apiVersion: options.stripe.apiVersion || "2023-10-16",
      maxNetworkRetries: options.stripe.maxNetworkRetries || 3,
      timeoutMs: options.stripe.timeoutMs || 30000
    })

    paymentProvider = new StripeProvider(stripeClient)
  } else if (options.provider === "paypal") {
    if (!options.paypal?.clientId || !options.paypal?.clientSecret) {
      throw new Error("PayPal client ID and secret are required when provider is 'paypal'")
    }

    // Import PayPal SDK and create provider
    const { PayPal } = require("./payment_providers/paypal.js")
    const paypalClient = new PayPal({
      clientId: options.paypal.clientId,
      clientSecret: options.paypal.clientSecret,
      env: options.paypal.env || "sandbox",
      timeoutMs: options.paypal.timeoutMs || 30000,
      retries: options.paypal.retries || 3,
      concurrency: options.paypal.concurrency || 10
    })

    paymentProvider = new PayPalProvider(paypalClient)
  } else {
    throw new Error(`Unsupported provider: ${options.provider}`)
  }

  // Create the ecommerce service implementation
  const ecommerceService = new EcommerceServiceImpl(paymentProvider)

  // Return the service wrapped with createService for Apphead
  return createService("ecommerce", ecommerceService)
}

/**
 * Convenience function for creating Stripe-based ecommerce service
 */
export function createStripeEcommerceService(stripeOptions: {
  apiKey: string
  apiVersion?: string
  maxNetworkRetries?: number
  timeoutMs?: number
}) {
  return createEcommerceService({
    provider: "stripe",
    stripe: stripeOptions
  })
}

/**
 * Convenience function for creating PayPal-based ecommerce service
 */
export function createPayPalEcommerceService(paypalOptions: {
  clientId: string
  clientSecret: string
  env?: "sandbox" | "live"
  timeoutMs?: number
  retries?: number
  concurrency?: number
}) {
  return createEcommerceService({
    provider: "paypal",
    paypal: paypalOptions
  })
}
