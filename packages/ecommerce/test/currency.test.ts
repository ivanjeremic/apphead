import { describe, expect, it } from "bun:test"
import {
  addMoney,
  allocateMinorUnits,
  formatMajorUnitString,
  getExponent,
  isZeroDecimal,
  sumLineItems,
  toMinorUnits
} from "../src/utils/currency.js"

describe("currency utils", () => {
  it("getExponent and isZeroDecimal", () => {
    expect(getExponent("USD")).toBe(2)
    expect(getExponent("usd")).toBe(2)
    expect(getExponent("JPY")).toBe(0)
    expect(isZeroDecimal("JPY")).toBe(true)
    expect(getExponent("KWD")).toBe(3)
    expect(isZeroDecimal("KWD")).toBe(false)
    expect(getExponent("UNKNOWN")).toBe(2)
  })

  it("formatMajorUnitString formats according to exponent", () => {
    expect(formatMajorUnitString({ currency: "USD", amount: 1234 })).toBe("12.34")
    expect(formatMajorUnitString({ currency: "JPY", amount: 1234 })).toBe("1234")
    expect(formatMajorUnitString({ currency: "KWD", amount: 1234 })).toBe("1.234")
  })

  it("toMinorUnits handles strings and numbers with correct rounding", () => {
    expect(toMinorUnits("USD", 12.34)).toBe(1234)
    expect(toMinorUnits("USD", "12.34")).toBe(1234)
    expect(toMinorUnits("JPY", 1234)).toBe(1234)
    expect(toMinorUnits("JPY", "1234")).toBe(1234)
    // rounding half away from zero
    expect(toMinorUnits("KWD", "1.2344")).toBe(1234)
    expect(toMinorUnits("KWD", "1.2345")).toBe(1235)
    expect(toMinorUnits("USD", "-1.2345")).toBe(-1235)
  })

  it("sumLineItems adds minor units", () => {
    const items = [
      { unitAmount: { currency: "USD", amount: 250 }, quantity: 2 }, // $5.00
      { unitAmount: { currency: "USD", amount: 125 }, quantity: 1 } // $1.25
    ]
    const total = sumLineItems(items)
    expect(total).toEqual({ currency: "USD", amount: 625 })
  })

  it("addMoney sums same-currency amounts", () => {
    const a = { currency: "usd", amount: 500 }
    const b = { currency: "USD", amount: 125 }
    expect(addMoney(a, b)).toEqual({ currency: "usd", amount: 625 })
  })

  it("allocateMinorUnits splits remainders accurately", () => {
    expect(allocateMinorUnits(100, [1, 1, 1])).toEqual([34, 33, 33])
    expect(allocateMinorUnits(101, [1, 2])).toEqual([34, 67])
    expect(allocateMinorUnits(5, [3, 1, 1])).toEqual([3, 1, 1])
  })
})
