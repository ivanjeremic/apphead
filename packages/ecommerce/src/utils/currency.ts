import type { Money } from "../types.js"

// ISO-4217 currency exponents. Default to 2 when unknown.
const EXPONENTS: Record<string, number> = {
  // zero-decimal
  JPY: 0,
  KRW: 0,
  VND: 0,
  CLP: 0,
  XOF: 0,
  XAF: 0,
  XPF: 0,
  KMF: 0,
  DJF: 0,
  // three-decimal (examples)
  KWD: 3,
  BHD: 3,
  JOD: 3,
  TND: 3,
  OMR: 3
}

export function getExponent(currency: string): number {
  const code = currency.toUpperCase()
  return EXPONENTS[code] ?? 2
}

export function isZeroDecimal(currency: string): boolean {
  return getExponent(currency) === 0
}

// Format Money into a major-units string with correct precision for APIs like PayPal
export function formatMajorUnitString(money: Money): string {
  const exp = getExponent(money.currency)
  if (exp === 0) return String(money.amount)
  const factor = Math.pow(10, exp)
  return (money.amount / factor).toFixed(exp)
}

// Convert major units (string or number) to integer minor units using currency exponent.
// Rounding: half away from zero (typical for payment amounts).
export function toMinorUnits(currency: string, major: number | string): number {
  const exp = getExponent(currency)
  if (exp === 0) {
    if (typeof major === "number") return Math.round(major)
    const m = major.trim()
    const sign = m.startsWith("-") ? -1 : 1
    const digits = m.replace(/[^0-9]/g, "")
    return sign * Number(BigInt(digits || "0"))
  }

  // Number path (fast, acceptable if inputs are not huge)
  if (typeof major === "number") {
    const factor = Math.pow(10, exp)
    return Math.round(major * factor)
  }

  // String path (precise): parse decimal manually to avoid float drift
  let s = major.trim()
  const sign = s.startsWith("-") ? -1 : 1
  if (s.startsWith("+") || s.startsWith("-")) s = s.slice(1)
  // Keep only digits and dot; assume dot decimal separator
  s = s.replace(/[^0-9.]/g, "")
  if (s === "" || s === ".") return 0

  const [intPartRaw, fracPartRaw = ""] = s.split(".")
  const intPart = intPartRaw.replace(/^0+(?=\d)/, "") // strip leading zeros (keep single zero)
  const fracPadded = (fracPartRaw.match(/^\d+/)?.[0] ?? "").padEnd(exp + 1, "0") // pad to exp+1 for rounding
  const frac = fracPadded.slice(0, exp)
  const next = fracPadded.charCodeAt(exp) // next digit to decide rounding
  let base = BigInt(((intPart || "0") + frac) || "0")

  // half away from zero rounding
  if (!Number.isNaN(next) && next >= 53 /* '5' */) {
    base = base + 1n
  }

  const result = Number(base)
  return sign * result
}

// Sum line items expressed in minor units
export function sumLineItems(items: Array<{ unitAmount: Money; quantity: number }>): Money {
  const currency = items[0]?.unitAmount.currency ?? "USD"
  const amount = items.reduce((sum, i) => sum + i.unitAmount.amount * i.quantity, 0)
  return { currency, amount }
}

// Ensure same currency when adding/subtracting
export function assertSameCurrency(a: Money, b: Money): void {
  if (a.currency.toUpperCase() !== b.currency.toUpperCase()) {
    throw new Error(`Currency mismatch: ${a.currency} vs ${b.currency}`)
  }
}
export function addMoney(a: Money, b: Money): Money {
  assertSameCurrency(a, b)
  return { currency: a.currency, amount: a.amount + b.amount }
}

// Allocate an integer amount across ratios using the Largest Remainder Method.
// Guarantees the parts are integers and sum exactly to total.
export function allocateMinorUnits(total: number, ratios: ReadonlyArray<number>): Array<number> {
  if (!Number.isInteger(total) || total < 0) throw new Error("total must be a non-negative integer")
  if (!ratios.length) throw new Error("ratios must not be empty")
  const sum = ratios.reduce((s, r) => s + (r > 0 ? r : 0), 0)
  if (sum <= 0) throw new Error("sum of positive ratios must be > 0")

  const raw = ratios.map((r) => (r > 0 ? (total * r) / sum : 0))
  const floors = raw.map((x) => Math.floor(x))
  let remainder = total - floors.reduce((s, x) => s + x, 0)

  const fracs = raw.map((x, i) => ({ i, frac: x - Math.floor(x) }))
  fracs.sort((a, b) => b.frac - a.frac) // descending by fractional part

  for (let k = 0; k < fracs.length && remainder > 0; k++) {
    floors[fracs[k].i] += 1
    remainder -= 1
  }
  return floors
}
