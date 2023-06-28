// APPHEAD JAVASCRIPT CACHE
export class AJC {
  constructor(options) {
    this.cacheMaxAge = options.cacheMaxAge;
    setInterval(() => {
      console.log("cacheState:", this.cache);
    }, 5000);
  }
  cache = new Map([["AJC", "AJC"]]);

  async getCollectionNames() {
    const data = Array.from(this.cache.keys()).map((name) => ({
      name,
    }));
    return data;
  }

  async createCollection(info) {
    const { database, collection } = info;

    this.cache.set(collection, collection);
  }

  async insertOne(info) {
    const { database, collection, document } = info;

    this.cache.set(collection, document);
  }

  async insertMany(info) {
    const { database, collection, documents } = info;

    /**
     * // documents
     * [{database, collection, data: {...} }]
     */
    for (const doc in documents) {
      this.cache.set(collection, doc);
    }
  }

  async updateOne(info) {
    const { database, collection, documents } = info;
  }

  async updateMany(info) {
    const { database, collection, documents } = info;
  }

  async replaceOne(info) {
    const { database, collection, documents } = info;
  }

  async deleteOne(info) {
    const { database, collection, documents } = info;
  }

  async deleteMany(info) {
    const { database, collection, documents } = info;

    for (const doc in documents) {
      this.cache.delete(doc);
    }
  }
}
