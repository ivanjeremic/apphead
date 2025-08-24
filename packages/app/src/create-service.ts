import type { ServiceRegistry } from "./types.js"

/**
 * Create a service definition for Apphead
 * This is the ONLY way to create services - clean and simple
 * @param serviceName The name of the service
 * @param service The actual service instance
 */
export function createService<T extends keyof ServiceRegistry>(
  serviceName: T,
  service: ServiceRegistry[T]
) {
  return {
    __apphead: {
      serviceName,
      service
    }
  }
}

// Legacy functions for backward compatibility (can be removed later)
export function isAppheadService(obj: any): obj is any {
  return obj && typeof obj === "object" && "__apphead" in obj
}

export function extractServiceInfo(obj: any) {
  return obj.__apphead
}
