/* 
Default collections
- users
- roles
*/

import { db } from "../../bin/apphead.js";

export default async function collections(app, options) {
  app.get("/admin/collections/getCollectionNames", async (request, reply) => {
    const { database } = request.query;
    try {
      reply.send([{name:"users"},{name:"cars"}]);
    } catch (error) {
      console.dir(error);
    }
  });

  app.post("/admin/collections/createCollection", async (request, reply) => {
    const { database, collection } = request.body;

    console.log(...db)
   /*  try {
      const db = await app.mongo.client.db(database);
      await db.createCollection(collection);
    } catch (error) {
      console.dir(error);
    } finally {
      //await fastify.mongo.client.close();
    } */
  });

  app.post("/admin/collections/insertOne", async (request, reply) => {
    const { database, collection, document } = request.body;
    try {
      const db = app.mongo.client.db(database);
      const coll = db.collection(collection);
      const result = await coll.insertOne(document);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } catch (error) {
      console.dir(error);
    } finally {
      await app.mongo.client.close();
    }
  });

  app.post("/admin/collection/insertMany", async (request, reply) => {
    const { database, collection, documents } = request.body;
    try {
      const db = app.mongo.client.db(database);
      const coll = db.collection(collection);
      const result = await coll.insertMany(documents);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } catch (error) {
      console.dir(error);
    } finally {
      await app.mongo.client.close();
    }
  });

  app.put("/admin/collections/updateOne", async (request, reply) => {
    //
  });

  app.put("/admin/collections/updateMany", async (request, reply) => {
    //
  });

  app.put("/admin/collections/replaceOne", async (request, reply) => {
    //
  });

  app.delete("/admin/collections/deleteOne", async (request, reply) => {
    //
  });

  app.delete("/admin/collections/deleteMany", async (request, reply) => {
    //
  });
}
