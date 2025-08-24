// Core types for Apphead services
// Base service interface that all services must implement
export interface BaseServiceInfo {
  getServiceInfo(): { name: string; version: string }
}

export interface ServiceRegistry {
  auth: any
  ecommerce: any
  email: any
  users: any
}
// BaseService is now imported from shared types

// Service definitions for the registry (internal use only)
export interface AppheadService {
  __apphead: {
    serviceName: string
    service: any
  }
}

// Type-safe service array
export type AppheadServices = Array<AppheadService>

// Apphead instance type (dynamically generated based on services)
export type AppheadInstance<T extends keyof ServiceRegistry = keyof ServiceRegistry> =
  & {
    [K in T]: ServiceRegistry[K]
  }
  & {
    // Utility methods
    getService<T extends keyof ServiceRegistry>(name: T): ServiceRegistry[T] | undefined
    hasService(name: string): boolean
    getServicesInfo(): Array<{ name: string; version: string }>
    getRawServices(): Record<string, any>
  }

// Configuration for the Apphead function
export interface AppheadConfig {
  services: AppheadServices
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
