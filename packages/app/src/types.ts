// Core types for Apphead services
export interface ServiceRegistry {
  auth: AuthService
  ecommerce: EcommerceService
  email: EmailService
  users: UserService
}

// Base service interface that all services must implement
export interface BaseService {
  // Common methods that all services should have
  getServiceInfo(): { name: string; version: string }
}

// Service definitions for the registry (internal use only)
export interface AppheadService<T extends keyof ServiceRegistry> {
  __apphead: {
    serviceName: T
    service: ServiceRegistry[T]
  }
}

// Type-safe service array
export type AppheadServices = Array<AppheadService<keyof ServiceRegistry>>

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
export interface AuthService extends BaseService {
  signInWithOAuth(params: { provider: string }): Promise<any>
  getSession(): Promise<any>
  signOut(): Promise<void>
}

export interface EcommerceService extends BaseService {
  createOrder(orderData: any): Promise<any>
  getOrder(orderId: string): Promise<any>
  createSubscription(subscriptionData: any): Promise<any>
}

export interface EmailService extends BaseService {
  sendEmail(params: { to: string; subject: string; body: string }): Promise<any>
  sendWelcomeEmail(user: any): Promise<any>
}

export interface UserService extends BaseService {
  createUser(userData: any): Promise<any>
  getUser(userId: string): Promise<any>
  updateUser(userId: string, userData: any): Promise<any>
}
