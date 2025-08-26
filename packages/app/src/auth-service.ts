import { AppheadService } from "./apphead-service.js"

// Core types
export type AuthUser = {
  id: string
  email: string
  name?: string
  avatarUrl?: string
  createdAt: Date
  updatedAt: Date
}
export type AuthSession = {
  id: string
  userId: string
  user: AuthUser
  createdAt: Date
  expiresAt?: Date
}
export type AuthError = { code: string; message: string; details?: unknown }
export type AuthResult<T> = { data: T; error: null } | { data: null; error: AuthError }

// Shared args example
export type SignInWithPasswordArgs = { email: string; password: string }

type AnyFn = (...args: Array<any>) => any
type FnKeys<T> = {
  [K in keyof T]: T[K] extends AnyFn ? K : never
}[keyof T]

type ProviderUnion<TProviders extends ReadonlyArray<{ name: string }>> = TProviders[number]
export type ProvidersNameUnion<TProviders extends ReadonlyArray<{ name: string }>> = ProviderUnion<TProviders>["name"]

type WithProviderName<F, PN> = F extends (...args: infer A) => infer R ? (...args: [...A, PN?]) => R : never

// Facade built from all function members on the provider union
export type AuthFacade<TProviders extends ReadonlyArray<{ name: string }>> = {
  [K in Exclude<FnKeys<ProviderUnion<TProviders>>, "constructor" | "getServiceInfo" | "serviceName" | "name">]:
    WithProviderName<ProviderUnion<TProviders>[K], ProvidersNameUnion<TProviders>>
}

// Runtime core (no implements of the facade; we return a typed intersection via factory)
class AuthServiceCore<TProviders extends ReadonlyArray<{ name: string }>> extends AppheadService {
  readonly serviceName = "auth"
  public readonly auth: this = this

  private readonly providersByName: Record<ProvidersNameUnion<TProviders>, ProviderUnion<TProviders>>
  private readonly defaultProviderName: ProvidersNameUnion<TProviders>

  constructor(opts: { providers: TProviders; defaultProviderName?: ProvidersNameUnion<TProviders> }) {
    super()
    const entries = opts.providers.map((p) => [p.name as ProvidersNameUnion<TProviders>, p] as const)
    this.providersByName = Object.fromEntries(entries) as Record<
      ProvidersNameUnion<TProviders>,
      ProviderUnion<TProviders>
    >
    this.defaultProviderName = opts.defaultProviderName ?? (entries[0]?.[0] as ProvidersNameUnion<TProviders>)
    if (!this.defaultProviderName) throw new Error("AuthService: at least one auth provider is required")
    this.#bindProviderMethods()
  }

  override getServiceInfo(): any {
    return { serviceName: this.serviceName }
  }

  private getProvider(name?: ProvidersNameUnion<TProviders>): ProviderUnion<TProviders> {
    const n = (name ?? this.defaultProviderName) as ProvidersNameUnion<TProviders>
    const p = this.providersByName[n]
    if (!p) throw new Error(`auth: provider "${String(name)}" not found`)
    return p
  }

  // Attach delegates so app.auth.<method>(..., providerName?) works.
  #bindProviderMethods() {
    const exclude = new Set<string>(["constructor", "getServiceInfo", "serviceName", "name"])
    const allMethodNames = new Set<string>()

    const providers = Object.values(this.providersByName) as Array<ProviderUnion<TProviders>>
    for (const p of providers) {
      const proto = Object.getPrototypeOf(p) as object | null
      const protoKeys = proto ? Object.getOwnPropertyNames(proto) : []
      const ownKeys = Object.keys(p as Record<string, unknown>)
      for (const k of [...protoKeys, ...ownKeys]) {
        const fn = (p as any)[k]
        if (exclude.has(k)) continue
        if (typeof fn === "function") allMethodNames.add(k)
      }
    }

    for (const method of allMethodNames) {
      if (Object.prototype.hasOwnProperty.call(this, method)) continue
      Object.defineProperty(this, method, {
        enumerable: true,
        configurable: false,
        writable: false,
        value: (...callArgs: Array<any>) => {
          let providerName: string | undefined
          const maybeName = callArgs.length ? callArgs[callArgs.length - 1] : undefined
          if (typeof maybeName === "string" && (this.providersByName as any)[maybeName]) {
            providerName = callArgs.pop()
          }
          const provider = this.getProvider(providerName as any)
          const impl = (provider as any)[method]
          if (typeof impl !== "function") {
            throw new Error(`auth provider "${(provider as any).name}" does not implement "${method}"`)
          }
          return impl.apply(provider, callArgs)
        }
      })
    }
  }
}

// Public type = core instance augmented with provider methods for autocomplete
export type AuthService<TProviders extends ReadonlyArray<{ name: string }>> =
  & AuthServiceCore<TProviders>
  & AuthFacade<TProviders>

// Factory to construct a typed service instance
export function AuthService<const TProviders extends ReadonlyArray<{ name: string }>>(
  opts: { providers: TProviders; defaultProviderName?: ProvidersNameUnion<TProviders> }
): AuthService<TProviders> {
  return new AuthServiceCore(opts) as AuthService<TProviders>
}
