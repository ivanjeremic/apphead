import { extractServiceInfo, isAppheadService } from "./create-service.js"
import type { AppheadConfig, AppheadInstance, ServiceRegistry } from "./types.js"

/**
 * Main Apphead function that creates an application instance with the specified services
 * @param config Configuration object containing the services array
 * @returns An AppheadInstance with all the configured services
 */
export function Apphead(config: AppheadConfig): AppheadInstance {
  // Validate that all services are valid Apphead services
  const validServices = config.services.filter(isAppheadService)

  if (validServices.length !== config.services.length) {
    const invalidServices = config.services.filter((service) => !isAppheadService(service))
    throw new Error(`Invalid services provided: ${invalidServices.map((s) => typeof s).join(", ")}`)
  }

  // Create service instances by extracting the actual service implementations
  const serviceInstances = validServices.reduce((acc, serviceExport) => {
    const { service, serviceName } = extractServiceInfo(serviceExport)

    // Ensure the service implements BaseService
    if (typeof (service as any).getServiceInfo !== "function") {
      throw new Error(`Service ${serviceName} must implement BaseService interface`)
    }

    acc[serviceName] = service as any
    return acc
  }, {} as Record<string, any>)

  // Add utility methods to the instance
  const appInstance = {
    ...serviceInstances,

    /**
     * Get a specific service by name
     */
    getService<T extends keyof ServiceRegistry>(name: T): ServiceRegistry[T] | undefined {
      return serviceInstances[name]
    },

    /**
     * Check if a service is available
     */
    hasService(name: string): boolean {
      return name in serviceInstances
    },

    /**
     * Get information about all available services
     */
    getServicesInfo(): Array<{ name: string; version: string }> {
      return Object.entries(serviceInstances).map(([name, service]) => {
        try {
          return (service as any).getServiceInfo()
        } catch {
          return { name, version: "unknown" }
        }
      })
    },

    /**
     * Get the raw service instances (for advanced use cases)
     */
    getRawServices(): Record<string, any> {
      return { ...serviceInstances }
    }
  }

  return appInstance as unknown as AppheadInstance
}

/**
 * Type-safe helper to create an Apphead instance with specific services
 * This provides better type inference for the returned instance
 */
export function createApphead<T extends keyof ServiceRegistry>(
  services: Array<any>
): AppheadInstance<T> {
  return Apphead({ services }) as AppheadInstance<T>
}
