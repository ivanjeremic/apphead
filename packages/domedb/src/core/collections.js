import { client } from "../../bin/domedb.js";

export default async function collections(fastify, options) {
  fastify.post("/admin/collection/insertOne", async (request, reply) => {
    const { database, collection, document } = request.body;
    try {
      const db = client.db(database);
      const coll = db.collection(collection);

      const result = await coll.insertOne(document);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } catch (error) {
      console.dir(error);
    } finally {
      await client.close();
    }
  });

  fastify.post("/admin/collection/insertMany", async (request, reply) => {
    const { database, collection, documents } = request.body;
    try {
      const _database = client.db(database);
      const _collection = _database.collection(collection);

      const options = { ordered: true };
      const result = await _collection.insertMany(documents, options);
      console.log(`${result.insertedCount} documents were inserted`);
    } catch (error) {
      console.dir(error);
    } finally {
      await client.close();
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
