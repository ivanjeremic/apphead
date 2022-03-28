import { open } from "lmdb";

class CrudUtil {
  /**
   * @param {*} opts 
   */
  constructor(opts) {
    this.db = opts.db

    this.currentDB = (collection) => open({
      path: `.domedb/databases/${this.db}/${collection}`,
      // any options go here, we can turn on compression like this:
      compression: true,
    });
  }

  /**
   * @param {string} collection
   * @description create collection
   */
   async createCollection(collection) {
    await this.currentDB(collection).put(collection, {collectionMeta: {}});
  }

  /**
   * @param {string} collection 
   * @param {string} key 
   * @returns {Promise<any>}
   * @description get document from collection
   */
   async get(collection, key) {
    const doc = await this.currentDB(collection).get(key)

    return doc
  }

  /**
   * @param {string} collection
   * @param {string} key
   * @param {*} value 
   * @description write to document
   */
  async write(collection, key, value) {
    await this.currentDB(collection).put(key, value);
  }

  /**
   * @param {string} collection 
   * @param {string} document 
   * @description remove document
   */
  async remove(collection, document) {
    await this.currentDB(collection).remove(document, 'value1');
  }
}

/**
 * @param {*} db 
 * @param {*} opts 
 * @param {*} next 
 */
export default async function (db, opts, next) {
  const currentDB = new CrudUtil({
    db: "todolist",
  })

  // add collection
   db.post("/create-collection", async (request, reply) => {
   await currentDB.createCollection(request.body.name)

   reply.send({ status: "success", info: `Added new Collection [${request.body.name}]`});
  })

  // get document
   db.post("/get", async (request, reply) => {
    const data = await currentDB.get(request.body.collection, request.body.key)
 
    reply.send({ data: data });
   })

  // add document
   db.post("/write", async (request, reply) => {
    await currentDB.write(request.body.collection, request.body.key, request.body.value)
 
    reply.send({ status: "success" });
   })

  // remove document
   db.post("/remove", async (request, reply) => {
    await currentDB.remove(request.body.documentID)
   })

  
}
