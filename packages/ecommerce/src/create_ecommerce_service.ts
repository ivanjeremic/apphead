class CreateEcommerceService {
  constructor() {
    console.log("CreateEcommerceService constructor")
  }

  async createProduct(onProductCreatedCallback: () => Promise<void>) {
    await onProductCreatedCallback()
  }

  async createOrder(onOrderCreatedCallback: () => Promise<void>) {
    await onOrderCreatedCallback()
  }

  async createSubscription(onSubscriptionCreatedCallback: () => Promise<void>) {
    await onSubscriptionCreatedCallback()
  }
}

export default CreateEcommerceService
