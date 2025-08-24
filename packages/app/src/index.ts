export { AppheadService } from "./apphead-service.js"
// Main exports for @apphead/app package
export { Apphead, createApphead } from "./apphead.js"
export { createService, extractServiceInfo, isAppheadService } from "./create-service.js"

// Export all types
export type {
  AppheadConfig,
  AppheadInstance,
  AppheadServices,
  AuthService,
  EcommerceService,
  EmailService,
  ServiceRegistry,
  UserService
} from "./types.js"
