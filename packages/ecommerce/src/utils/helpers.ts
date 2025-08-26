import { Effect } from "effect"
import { PaymentProviderError } from "./create_payment_provider.js"

// Portable Basic auth header value (Node, Workers, Deno, Bun)
export function basicAuthHeader(user: string, pass: string): string {
  // @ts-ignore Node branch
  if (typeof Buffer !== "undefined" && typeof (Buffer as any).from === "function") {
    // @ts-ignore
    return `Basic ${(Buffer as any).from(`${user}:${pass}`, "utf8").toString("base64")}`
  }
  if (typeof btoa !== "undefined") {
    const bytes = new TextEncoder().encode(`${user}:${pass}`)
    let bin = ""
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i])
    return `Basic ${btoa(bin)}`
  }
  throw new Error("No Base64 encoder available")
}

// Ensure HTTP 2xx, with JSON->text fallback for error details
export const ensureOk = (res: any, op: string, provider: string) =>
  Effect.gen(function*() {
    const status: number = res.status
    if (status >= 200 && status < 300) return res

    const body: unknown = yield* res.json.pipe(
      Effect.catchAll(() => res.text.pipe(Effect.catchAll(() => Effect.succeed<unknown>(undefined))))
    )

    return yield* Effect.fail(
      new PaymentProviderError({
        code: "HTTP_ERROR",
        message: `[${provider}] ${op} failed with status ${status}`,
        details: { status, body }
      })
    )
  })
