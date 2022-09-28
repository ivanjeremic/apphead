export default async function collections(fastify, options) {
  fastify.post("/admin/collections/createCollection", async (request, reply) => {
    const { database, collection } = request.body;
    try {
      const _database = fastify.mongo.client.db(database);
      await _database.createCollection(collection);
    } catch (error) {
      console.dir(error);
    } finally {
      await fastify.mongo.client.close();
    }
  });

  fastify.post("/admin/collections/insertOne", async (request, reply) => {
    const { database, collection, document } = request.body;
    try {
      const _database = fastify.mongo.client.db(database);
      const _collection = _database.collection(collection);
      const result = await _collection.insertOne(document);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } catch (error) {
      console.dir(error);
    } finally {
      await fastify.mongo.client.close();
    }
  });

  fastify.post("/admin/collection/insertMany", async (request, reply) => {
    const { database, collection, documents } = request.body;
    try {
      const _database = fastify.mongo.client.db(database);
      const _collection = _database.collection(collection);
      const result = await _collection.insertMany(documents);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } catch (error) {
      console.dir(error);
    } finally {
      await fastify.mongo.client.close();
    }
  });

  fastify.post("/collections/insertOne", async (request, reply) => {
    //
  });

  fastify.post("/collections/insertMany", async (request, reply) => {
    //
  });

  fastify.put("/collections/updateOne", async (request, reply) => {
    //
  });

  fastify.put("/collections/updateMany", async (request, reply) => {
    //
  });

  fastify.put("/collections/replaceOne", async (request, reply) => {
    //
  });

  fastify.delete("/collections/deleteOne", async (request, reply) => {
    //
  });

  fastify.delete("/collections/deleteMany", async (request, reply) => {
    //
  });
}
