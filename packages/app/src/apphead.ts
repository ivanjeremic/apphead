// Apphead now only accepts raw AppheadService instances
import type { AppheadService as AppheadServiceBase } from "./apphead-service.js"
import type { AppheadConfig, AppheadInstance, ServicesToRegistry } from "./types.js"

/**
 * Main Apphead function that creates an application instance with the specified services
 * @param config Configuration object containing the services array
 * @returns An AppheadInstance with all the configured services
 */
export function Apphead<S extends ReadonlyArray<AppheadServiceBase>>(config: AppheadConfig<S>): AppheadInstance<S> {
  // Only raw AppheadService instances are supported
  const serviceInstances = config.services.reduce((acc, item) => {
    const service = item as any
    const serviceName = service?.serviceName ?? service?.constructor?.serviceName
    if (
      service &&
      typeof service.getServiceInfo === "function" &&
      typeof serviceName === "string" &&
      serviceName.length > 0
    ) {
      acc[serviceName] = service as any
      return acc
    }
    throw new Error(
      "Invalid service provided to Apphead. Pass instances of classes extending AppheadService with a serviceName."
    )
  }, {} as Record<string, any>)

  // Add utility methods to the instance
  const appInstance = {
    ...serviceInstances,

    /**
     * Get a specific service by name
     */
    getService<K extends keyof ServicesToRegistry<S>>(name: K): ServicesToRegistry<S>[K] | undefined {
      return serviceInstances[name as string]
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

  return appInstance as unknown as AppheadInstance<S>
}

/**
 * Type-safe helper to create an Apphead instance with specific services
 * This provides better type inference for the returned instance
 */
export function createApphead<S extends ReadonlyArray<AppheadServiceBase>>(
  services: S
): AppheadInstance<S> {
  return Apphead({ services })
}
