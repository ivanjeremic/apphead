export type Money = {
  currency: string
  amount: number
}

export type Customer = {
  id: string
  email: string
  name?: string
  phone?: string
  metadata?: Record<string, string | number | boolean>
}

export type Product = {
  id: string
  name: string
  description?: string
  type: "SERVICE" | "PHYSICAL" | "DIGITAL"
  category?: string
  metadata?: Record<string, string | number | boolean>
}

export type Price = {
  id: string
  productId: string
  currency: string
  unitAmount: number
  interval?: "day" | "week" | "month" | "year"
  metadata?: Record<string, string | number | boolean>
}

export type OrderItem = {
  name: string
  description?: string
  quantity: number
  unitAmount: Money
  metadata?: Record<string, string | number | boolean>
}

export type Order = {
  id: string
  customerId: string
  items: Array<OrderItem>
  totalAmount: Money
  status: "pending" | "paid" | "cancelled" | "refunded"
  metadata?: Record<string, string | number | boolean>
  createdAt: Date
  updatedAt: Date
}

export type Subscription = {
  id: string
  customerId: string
  priceId: string
  status: "active" | "cancelled" | "past_due" | "unpaid"
  currentPeriodStart: Date
  currentPeriodEnd: Date
  trialEnd?: Date
  metadata?: Record<string, string | number | boolean>
}

export type CheckoutSession = {
  id: string
  customerId?: string
  amount: Money
  status: "open" | "complete" | "expired"
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, string | number | boolean>
}
