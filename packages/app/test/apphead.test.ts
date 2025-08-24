import { describe, expect, it } from "vitest"
import { Apphead, type AppheadService, createService } from "../src/index.js"

// Mock services for testing
class MockAuthService {
  getServiceInfo() {
    return { name: "auth", version: "1.0.0" }
  }

  async getSession() {
    return { userId: "test_user", isAuthenticated: true }
  }

  async signInWithOAuth(params: { provider: string }) {
    return { userId: "test_user", provider: params.provider }
  }

  async signOut() {
    return Promise.resolve()
  }
}

class MockEcommerceService {
  getServiceInfo() {
    return { name: "ecommerce", version: "1.0.0" }
  }

  async createOrder(orderData: any) {
    return { orderId: "test_order", status: "pending", ...orderData }
  }

  async getOrder(orderId: string) {
    return { orderId, status: "completed", total: 99.99 }
  }

  async createSubscription(subscriptionData: any) {
    return { subscriptionId: "test_sub", status: "active", ...subscriptionData }
  }
}

// Create service exports
const authService: AppheadService<"auth"> = {
  __apphead: {
    serviceName: "auth",
    service: new MockAuthService()
  }
}

const ecommerceService: AppheadService<"ecommerce"> = {
  __apphead: {
    serviceName: "ecommerce",
    service: new MockEcommerceService()
  }
}

describe("Apphead", () => {
  it("should create an app instance with services", () => {
    const app = Apphead({
      services: [authService, ecommerceService]
    })

    expect(app.auth).toBeDefined()
    expect(app.ecommerce).toBeDefined()
    expect(app.auth.getServiceInfo).toBeDefined()
    expect(app.ecommerce.getServiceInfo).toBeDefined()
  })

  it("should provide utility methods", () => {
    const app = Apphead({
      services: [authService, ecommerceService]
    })

    expect(app.getService).toBeDefined()
    expect(app.hasService).toBeDefined()
    expect(app.getServicesInfo).toBeDefined()
    expect(app.getRawServices).toBeDefined()
  })

  it("should validate service interface", () => {
    const app = Apphead({
      services: [authService, ecommerceService]
    })

    const servicesInfo = app.getServicesInfo()
    expect(servicesInfo).toHaveLength(2)
    expect(servicesInfo[0]).toEqual({ name: "auth", version: "1.0.0" })
    expect(servicesInfo[1]).toEqual({ name: "ecommerce", version: "1.0.0" })
  })

  it("should check service availability", () => {
    const app = Apphead({
      services: [authService, ecommerceService]
    })

    expect(app.hasService("auth")).toBe(true)
    expect(app.hasService("ecommerce")).toBe(true)
    expect(app.hasService("email")).toBe(false)
  })

  it("should get services by name", () => {
    const app = Apphead({
      services: [authService, ecommerceService]
    })

    const auth = app.getService("auth")
    const ecommerce = app.getService("ecommerce")
    const email = app.getService("email")

    expect(auth).toBeDefined()
    expect(ecommerce).toBeDefined()
    expect(email).toBeUndefined()
  })

  it("should work with partial services", () => {
    const app = Apphead({
      services: [authService]
    })

    expect(app.auth).toBeDefined()
    expect(app.hasService("auth")).toBe(true)
    expect(app.hasService("ecommerce")).toBe(false)
  })
})

describe("createService", () => {
  it("should create a service definition", () => {
    const mockService = new MockAuthService()
    const serviceDef = createService("auth", mockService)

    expect(serviceDef.__apphead.serviceName).toBe("auth")
    expect(serviceDef.__apphead.service).toBe(mockService)
  })

  it("should work with Apphead", () => {
    const mockService = new MockAuthService()
    const serviceDef = createService("auth", mockService)

    const app = Apphead({
      services: [serviceDef]
    })

    expect(app.auth).toBeDefined()
    expect(app.auth.getServiceInfo()).toEqual({ name: "auth", version: "1.0.0" })
  })
})

describe("Service methods", () => {
  it("should call service methods correctly", async () => {
    const app = Apphead({
      services: [authService, ecommerceService]
    })

    const session = await app.auth.getSession()
    expect(session).toEqual({ userId: "test_user", isAuthenticated: true })

    const order = await app.ecommerce.createOrder({ items: [] })
    expect(order.orderId).toBe("test_order")
    expect(order.status).toBe("pending")
  })

  it("should handle OAuth sign in", async () => {
    const app = Apphead({
      services: [authService]
    })

    const result = await app.auth.signInWithOAuth({ provider: "github" })
    expect(result.userId).toBe("test_user")
    expect(result.provider).toBe("github")
  })
})
