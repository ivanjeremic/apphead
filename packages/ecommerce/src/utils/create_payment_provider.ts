import { Data, Duration, Effect, Schedule } from "effect"

export class PaymentProviderError extends Data.TaggedError("PaymentProviderError")<{
  code: string
  message: string
  details?: unknown
}> {}

export class PaymentError extends Data.TaggedError("PaymentError")<{
  code: string
  message: string
  paymentProvider: string
  details?: unknown
}> {}

export class CustomerError extends Data.TaggedError("CustomerError")<{
  code: string
  message: string
  customerId?: string
  details?: unknown
}> {}

export interface ProviderPolicyConfig {
  timeoutMs?: number
  maxRetries?: number
  backoffMs?: number
  jitter?: boolean
  handlers?: Record<string, Partial<ProviderPolicyConfig>>
  log?: (level: "debug" | "error", msg: string, meta?: unknown) => void
}

type AnyEffect = Effect.Effect<any, any, any>

function makePolicy(cfg: ProviderPolicyConfig = {}) {
  const {
    backoffMs = 100,
    handlers = {},
    jitter = true,
    log = (lvl, msg, meta) =>
      lvl === "debug" ? console.debug(`[provider] ${msg}`) : console.error(`[provider] ${msg}`, meta),
    maxRetries = 2,
    timeoutMs = 15_000
  } = cfg

  const buildSchedule = (mr: number, bo: number, j: boolean) => {
    const base = Schedule.exponential(Duration.millis(bo))
    const exp = j ? Schedule.jittered(base) : base
    return exp.pipe(Schedule.compose(Schedule.recurs(mr)))
  }

  const apply = (label: string, eff: AnyEffect): AnyEffect => {
    const o = handlers[label] ?? {}
    const to = o.timeoutMs ?? timeoutMs
    const mr = o.maxRetries ?? maxRetries
    const bo = o.backoffMs ?? backoffMs
    const j = o.jitter ?? jitter

    const schedule = buildSchedule(mr, bo, j)
    const withRetry = mr > 0 ? eff.pipe(Effect.retry(schedule)) : eff

    // Fail after `to` ms using a delayed failure and race
    const timeoutEff = Effect.fail(
      new PaymentProviderError({
        code: "TIMEOUT",
        message: `${label} timed out after ${to}ms`
      })
    ).pipe(Effect.delay(Duration.millis(to)))

    return withRetry.pipe(
      Effect.race(timeoutEff),
      Effect.timed,
      Effect.tap(([d]) => Effect.sync(() => log("debug", `${label} ok in ${Duration.toMillis(d)}ms`))),
      Effect.map(([, value]) => value),
      Effect.tapError((e) => Effect.sync(() => log("error", `${label} error`, e)))
    )
  }

  return { apply }
}

function wrapHandlers(
  obj: any,
  wrapEffect: (label: string, eff: AnyEffect) => AnyEffect,
  prefix: string
): any {
  if (!obj || typeof obj !== "object") return obj
  const out: any = Array.isArray(obj) ? [] : {}
  for (const key of Object.keys(obj)) {
    const value = obj[key]
    const label = `${prefix}.${key}`
    if (typeof value === "function") {
      out[key] = (...args: Array<any>) => wrapEffect(label, value(...args) as AnyEffect)
    } else if (value && typeof value === "object") {
      out[key] = wrapHandlers(value, wrapEffect, label)
    } else {
      out[key] = value
    }
  }
  return out
}

export class PaymentProvider<Name extends string = string> {
  readonly name: Name
  readonly common: any
  readonly oneTime: any
  readonly recurring: any

  constructor(cfg: {
    name: Name
    common: any
    oneTime: any
    recurring: any
    policy?: ProviderPolicyConfig
  }) {
    this.name = cfg.name
    if (cfg.policy) {
      const policy = makePolicy(cfg.policy)
      const applyPolicy = (label: string, eff: AnyEffect) => policy.apply(`${this.name}.${label}`, eff)
      this.common = wrapHandlers(cfg.common, applyPolicy, "common")
      this.oneTime = wrapHandlers(cfg.oneTime, applyPolicy, "oneTime")
      this.recurring = wrapHandlers(cfg.recurring, applyPolicy, "recurring")
    } else {
      this.common = cfg.common
      this.oneTime = cfg.oneTime
      this.recurring = cfg.recurring
    }
  }
}
