// Abstract base class for all Apphead services
export abstract class AppheadService {
  static serviceName: string
  abstract getServiceInfo(): { name: string; version: string }
}
