import type { AppheadService as AppheadServiceBase } from "./apphead-service.js"

// Core types for Apphead services
// Base service interface that all services must implement
export interface BaseServiceInfo {
  getServiceInfo(): { name: string; version: string }
}

// Derive service registry keys from static serviceName
export type ServiceNameOf<T> = T extends { serviceName: infer N extends string } ? N : never

// Type-safe service array: only raw instances extending AppheadService
export type AppheadServices = ReadonlyArray<AppheadServiceBase>

// Map a tuple/array of services to a registry shape keyed by their static serviceName
export type ServicesToRegistry<S extends ReadonlyArray<AppheadServiceBase>> = {
  [K in S[number] as ServiceNameOf<K>]: K
}

// Apphead instance type (dynamically generated based on provided services)
export type AppheadInstance<S extends ReadonlyArray<AppheadServiceBase>> =
  & ServicesToRegistry<S>
  & {
    // Utility methods
    getService<K extends keyof ServicesToRegistry<S>>(name: K): ServicesToRegistry<S>[K] | undefined
    hasService(name: string): boolean
    getServicesInfo(): Array<{ name: string; version: string }>
    getRawServices(): Record<string, any>
  }

// Configuration for the Apphead function (generic over provided services)
export interface AppheadConfig<S extends ReadonlyArray<AppheadServiceBase> = ReadonlyArray<AppheadServiceBase>> {
  services: S
}

// Placeholder service interfaces (these would be imported from actual packages)
export interface AuthService extends BaseServiceInfo {
  signInWithOAuth(params: { provider: string }): Promise<any>
  getSession(): Promise<any>
  signOut(): Promise<void>
}

export interface EcommerceService extends BaseServiceInfo {
  createOrder(order: any, providerName: string): Promise<any>
  getOrder(orderId: string): Promise<any>
  createSubscription(subscription: any, providerName: string): Promise<any>
}

export interface EmailService extends BaseServiceInfo {
  sendEmail(params: { to: string; subject: string; body: string }): Promise<any>
  sendWelcomeEmail(user: any): Promise<any>
}

export interface UserService extends BaseServiceInfo {
  createUser(userData: any): Promise<any>
  getUser(userId: string): Promise<any>
  updateUser(userId: string, userData: any): Promise<any>
}
