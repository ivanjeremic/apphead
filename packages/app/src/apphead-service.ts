// Abstract base class for all Apphead services
export abstract class AppheadService {
  abstract readonly serviceName: string
  abstract getServiceInfo(): { name: string; version: string }
}
