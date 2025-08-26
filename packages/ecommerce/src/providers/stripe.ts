import { Effect } from "effect"
import StripePkg from "stripe"
import type { CheckoutSession, Customer, Money, Order, Price, Product, Subscription } from "../types.js"
import { CustomerError, PaymentError, PaymentProvider, PaymentProviderError } from "../utils/create_payment_provider.js"
import { sumLineItems } from "../utils/currency.js"

export interface StripeProviderOptions {
  apiKey: string
  apiVersion?: string
}

export function Stripe(opts: StripeProviderOptions): PaymentProvider<"stripe"> {
  const name = "stripe" as const
  const stripe = new StripePkg(opts.apiKey)

  const toAmount = (items: Array<{ unitAmount: Money; quantity: number }>) => sumLineItems(items)

  const toPPError = (code: string, err: unknown) =>
    new PaymentProviderError({ code, message: err instanceof Error ? err.message : String(err), details: err })
  const toPayError = (code: string, err: unknown) =>
    new PaymentError({
      code,
      message: err instanceof Error ? err.message : String(err),
      paymentProvider: name,
      details: err
    })
  const toCustError = (code: string, err: unknown) =>
    new CustomerError({ code, message: err instanceof Error ? err.message : String(err), details: err })

  return new PaymentProvider({
    name,
    policy: {
      // ...existing code...
    },
    common: {
      onCreateCustomer: (args: any) =>
        Effect.tryPromise(() =>
          stripe.customers.create({
            email: args.email,
            ...(args.name !== undefined ? { name: args.name } : {}),
            ...(args.phone !== undefined ? { phone: args.phone } : {}),
            ...(args.metadata ? { metadata: args.metadata as Record<string, string> } : {})
          })
        ).pipe(
          Effect.map((c): Customer => ({
            id: c.id,
            email: c.email ?? args.email,
            ...(c.name ? { name: c.name } : {}),
            ...(c.phone ? { phone: c.phone } : {}),
            ...(c.metadata && Object.keys(c.metadata).length ? { metadata: c.metadata as any } : {})
          })),
          Effect.mapError((e) => toCustError("CUSTOMER_CREATE_FAILED", e))
        ),

      onUpdateCustomer: (args: any) =>
        Effect.tryPromise(() =>
          stripe.customers.update(args.customerId, {
            ...(args.email !== undefined ? { email: args.email } : {}),
            ...(args.name !== undefined ? { name: args.name } : {}),
            ...(args.phone !== undefined ? { phone: args.phone } : {}),
            ...(args.metadata ? { metadata: args.metadata as Record<string, string> } : {})
          })
        ).pipe(
          Effect.map((c): Customer => ({
            id: c.id,
            email: c.email ?? args.email ?? "unknown",
            ...(c.name ? { name: c.name } : {}),
            ...(c.phone ? { phone: c.phone } : {}),
            ...(c.metadata && Object.keys(c.metadata).length ? { metadata: c.metadata as any } : {})
          })),
          Effect.mapError((e) => toCustError("CUSTOMER_UPDATE_FAILED", e))
        ),

      onGetCustomer: (customerId: string) =>
        Effect.tryPromise(() => stripe.customers.retrieve(customerId)).pipe(
          Effect.map((c) => {
            if ((c as StripePkg.DeletedCustomer).deleted) throw new Error("Customer deleted")
            const cust = c as StripePkg.Customer
            const out: Customer = {
              id: cust.id,
              email: cust.email ?? "unknown",
              ...(cust.name ? { name: cust.name } : {}),
              ...(cust.phone ? { phone: cust.phone } : {})
            }
            return out
          }),
          Effect.mapError((e) => toCustError("CUSTOMER_GET_FAILED", e))
        ),

      onCreateProduct: (args: any) =>
        Effect.tryPromise(() =>
          stripe.products.create({
            name: args.name,
            ...(args.description !== undefined ? { description: args.description } : {}),
            ...(args.metadata ? { metadata: args.metadata as Record<string, string> } : {})
          })
        ).pipe(
          Effect.map((p): Product => ({
            id: p.id,
            name: p.name,
            type: args.type,
            ...(args.category ? { category: args.category } : {}),
            ...(p.description ? { description: p.description } : {}),
            ...(p.metadata && Object.keys(p.metadata).length ? { metadata: p.metadata as any } : {})
          })),
          Effect.mapError((e) => toPPError("PRODUCT_CREATE_FAILED", e))
        ),

      onCreatePrice: (args: any) =>
        Effect.tryPromise(() =>
          stripe.prices.create({
            product: args.productId,
            currency: args.currency.toLowerCase(),
            unit_amount: args.unitAmount,
            ...(args.interval ? { recurring: { interval: args.interval } } : {}),
            ...(args.metadata ? { metadata: args.metadata as Record<string, string> } : {})
          } as StripePkg.PriceCreateParams)
        ).pipe(
          Effect.map((pr): Price => ({
            id: pr.id,
            productId: args.productId,
            currency: pr.currency.toUpperCase(),
            unitAmount: pr.unit_amount ?? args.unitAmount,
            ...(pr.recurring?.interval ? { interval: pr.recurring.interval as any } : {}),
            ...(pr.metadata && Object.keys(pr.metadata).length ? { metadata: pr.metadata as any } : {})
          })),
          Effect.mapError((e) => toPPError("PRICE_CREATE_FAILED", e))
        )
    },

    oneTime: {
      onCreateOrder: (args: any) => {
        const total = toAmount(args.items)
        return Effect.tryPromise(() =>
          stripe.paymentIntents.create({
            amount: total.amount,
            currency: total.currency.toLowerCase(),
            ...(args.capture === "manual" ? { capture_method: "manual" } : {}),
            ...(args.metadata ? { metadata: args.metadata as Record<string, string> } : {})
          })
        ).pipe(
          Effect.map((pi): Order => ({
            id: pi.id,
            customerId: args.customerId,
            items: args.items,
            totalAmount: total,
            status: pi.status === "succeeded" ? "paid" : "pending",
            createdAt: new Date(),
            updatedAt: new Date(),
            ...(args.metadata ? { metadata: args.metadata } : {})
          })),
          Effect.mapError((e) => toPPError("ORDER_CREATE_FAILED", e))
        )
      },

      onGetOrder: (orderId: string) =>
        Effect.tryPromise(() => stripe.paymentIntents.retrieve(orderId)).pipe(
          Effect.map((pi): Order => ({
            id: pi.id,
            customerId: "unknown",
            items: [],
            totalAmount: { currency: pi.currency.toUpperCase(), amount: pi.amount ?? 0 },
            status: pi.status === "succeeded" ? "paid" : "pending",
            createdAt: new Date((pi.created ?? Math.floor(Date.now() / 1000)) * 1000),
            updatedAt: new Date()
          })),
          Effect.mapError((e) => toPPError("ORDER_GET_FAILED", e))
        ),

      onCreateCheckoutSession: (args: any) => {
        const total = toAmount(args.items)
        return Effect.tryPromise(() =>
          stripe.checkout.sessions.create({
            mode: "payment",
            success_url: args.successUrl,
            cancel_url: args.cancelUrl,
            ...(args.customerId ? { customer: args.customerId } : {}),
            line_items: args.items.map((i: any) => ({
              price_data: {
                currency: i.unitAmount.currency.toLowerCase(),
                unit_amount: i.unitAmount.amount,
                product_data: { name: i.name, ...(i.description ? { description: i.description } : {}) }
              },
              quantity: i.quantity
            })),
            payment_intent_data: {
              ...(args.capture === "manual" ? { capture_method: "manual" } : {})
            },
            ...(args.metadata ? { metadata: args.metadata as Record<string, string> } : {})
          })
        ).pipe(
          Effect.map((s): CheckoutSession => ({
            id: s.id,
            ...(s.customer ? { customerId: String(s.customer) } : {}),
            amount: total,
            status: (s.status ?? "open") as "open" | "complete" | "expired",
            successUrl: args.successUrl,
            cancelUrl: args.cancelUrl,
            ...(args.metadata ? { metadata: args.metadata } : {})
          })),
          Effect.mapError((e) => toPayError("CHECKOUT_CREATE_FAILED", e))
        )
      },

      onCapturePayment: (args: any) =>
        Effect.tryPromise(() => stripe.paymentIntents.capture(args.orderId)).pipe(
          Effect.map((pi): Order => ({
            id: pi.id,
            customerId: "unknown",
            items: [],
            totalAmount: { currency: pi.currency.toUpperCase(), amount: pi.amount ?? 0 },
            status: "paid",
            createdAt: new Date((pi.created ?? Math.floor(Date.now() / 1000)) * 1000),
            updatedAt: new Date()
          })),
          Effect.mapError((e) => toPayError("PAYMENT_CAPTURE_FAILED", e))
        ),

      onRefundPayment: (args: any) =>
        Effect.tryPromise(() =>
          stripe.refunds.create({
            payment_intent: args.orderId,
            ...(args.amount ? { amount: args.amount.amount } : {}),
            ...(args.reason ? { reason: "requested_by_customer" as const } : {})
          })
        ).pipe(
          Effect.map((_r): Order => ({
            id: args.orderId,
            customerId: "unknown",
            items: [],
            totalAmount: { currency: args.amount?.currency ?? "USD", amount: args.amount?.amount ?? 0 },
            status: "refunded",
            createdAt: new Date(),
            updatedAt: new Date()
          })),
          Effect.mapError((e) => toPayError("PAYMENT_REFUND_FAILED", e))
        )
    },

    recurring: {
      onCreateSubscription: (args: any) =>
        Effect.tryPromise(() =>
          stripe.subscriptions.create({
            customer: args.customerId,
            items: [{ price: args.priceId }],
            ...(args.trialDays !== undefined ? { trial_period_days: args.trialDays } : {}),
            ...(args.metadata ? { metadata: args.metadata as Record<string, string> } : {})
          })
        ).pipe(
          Effect.map((s): Subscription => ({
            id: s.id,
            customerId: args.customerId,
            priceId: args.priceId,
            currentPeriodStart: new Date((s as any).current_period_start * 1000),
            currentPeriodEnd: new Date((s as any).current_period_end * 1000),
            status: s.status === "active"
              ? "active"
              : s.status === "past_due"
              ? "past_due"
              : s.status === "unpaid"
              ? "unpaid"
              : "active",
            ...(args.metadata ? { metadata: args.metadata } : {})
          })),
          Effect.mapError((e) => toPPError("SUBSCRIPTION_CREATE_FAILED", e))
        ),

      onCancelSubscription: (args: any) =>
        Effect.tryPromise(() => stripe.subscriptions.cancel(args.subscriptionId)).pipe(
          Effect.map((s): Subscription => ({
            id: s.id,
            customerId: String(s.customer ?? "unknown"),
            priceId: s.items.data[0]?.price.id ?? "unknown",
            currentPeriodStart: new Date((s as any).current_period_start * 1000),
            currentPeriodEnd: new Date((s as any).current_period_end * 1000),
            status: "cancelled"
          })),
          Effect.mapError((e) => toPPError("SUBSCRIPTION_CANCEL_FAILED", e))
        ),

      onGetSubscription: (subscriptionId: string) =>
        Effect.tryPromise(() => stripe.subscriptions.retrieve(subscriptionId)).pipe(
          Effect.map((s): Subscription => ({
            id: s.id,
            customerId: String(s.customer ?? "unknown"),
            priceId: s.items.data[0]?.price.id ?? "unknown",
            currentPeriodStart: new Date((s as any).current_period_start * 1000),
            currentPeriodEnd: new Date((s as any).current_period_end * 1000),
            status: s.status === "active"
              ? "active"
              : s.status === "past_due"
              ? "past_due"
              : s.status === "unpaid"
              ? "unpaid"
              : "active"
          })),
          Effect.mapError((e) => toPPError("SUBSCRIPTION_GET_FAILED", e))
        )
    }
  })
}
