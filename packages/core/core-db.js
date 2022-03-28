import fs from "fs/promises";
import { open } from "lmdb";

class CrudUtil {
  constructor(opts) {
    this.db = opts.db
    this.collection = opts.collection
    this.currentDB = (collection) => open({
      path: `.domedb/databases/${this.db}/${collection}`,
      // any options go here, we can turn on compression like this:
      compression: true,
    });

  }

  /**
   * 
   * @description create collection
   */
   async createCollection(key) {
    await this.currentDB().put(key, {collectionMeta: {}});
  }

  /**
   * 
   * @param {*} document 
   * @returns {Promise<any>}
   */
   async get(document) {
    const doc = await this.currentDB.get(document)

    return doc
  }

  /**
   * 
   * @description write to document
   */
  async write(key, value) {
    await this.currentDB.put(key, value);
  }

  /**
   * 
   * @param {*} document 
   */
  async remove(document) {
    let db = open({
      path: `.domedb/databases/${this.db}/${this.collection}`,
      // any options go here, we can turn on compression like this:
      compression: true,
    });

    await db.remove(document, 'value1');

    db.close()
  }
}


export default async function (db, opts, next) {
  const currentDB = new CrudUtil({
    db: "todolist",
    collection: "users"
  })

  // add collection
   db.post("/create-collection", async (request, reply) => {
   await currentDB.createCollection(request.body.name)

   reply.send({ status: "success", info: `Added new Collection [${request.body.name}]`});
  })

  // get document
   db.get("/get", async (request, reply) => {
    await currentDB.get("users")
 
    reply.send({ data: "ok" });
   })

  // add document
   db.post("/write", async (request, reply) => {
    await currentDB.write("users")
 
    reply.send({ status: "success", info: `Added new document [${request.body.name}]`});
   })

  // remove document
   db.post("/remove", async (request, reply) => {
    await currentDB.remove(request.body.documentID)
   })

  
}
