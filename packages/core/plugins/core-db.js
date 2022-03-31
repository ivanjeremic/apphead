//@ts-check
import { open } from 'lmdb';

class CrudUtil {
  /**
   * Storage Engine
   *
   * @param {*} opts
   */
  constructor(opts) {
    this.db = opts.db;

    this.hasOfflineCache = opts.hasOfflineCache;

    this.currentDB = (collection) =>
      open({
        path: `.domedb/databases/${this.db}/${collection}`,
        // any options go here, we can turn on compression like this:
        compression: true,
      });
  }

  /**
   * create collection
   *
   * @param {string} collection
   */
  async createCollection(collection) {
    await this.currentDB(collection).put(collection, { collectionMeta: {} });
  }

  /**
   * get document from collection
   *
   * @param {string} collection
   * @param {string} key
   * @returns {Promise<any>} data
   */
  async get(collection, key) {
    const doc = await this.currentDB(collection).get(key);

    return doc;
  }

  /**
   * write to document2
   *
   * @param {string} collection
   * @param {string} key
   * @param {*} value
   */
  async write(collection, key, value) {
    await this.currentDB(collection).put(key, value);
  }

  /**
   * remove document
   *
   * @param {string} collection
   * @param {string} document
   */
  async remove(collection, document) {
    await this.currentDB(collection).remove(document, 'value1');
  }
}

/**
 * core-db plugin
 *
 * @param {*} db
 * @param {*} _opts
 * @param {*} _next
 */
export default async function (db, _opts, _next) {
  const currentDB = new CrudUtil({
    db: 'todolist',
  });

  /**
   * add collection
   */
  db.post('/create-collection', async (request, reply) => {
    await currentDB.createCollection(request.body.name);

    reply.send({ status: 'success', info: `Added new Collection [${request.body.name}]` });
  });

  /**
   * get document
   */
  db.post('/get/:collection/:', async (request, reply) => {
    const data = await currentDB.get(request.body.collection, request.body.key);

    reply.send({ data: data });
  });

  /* ************ */
  /* add document */
  /* ************ */
  db.post('/write', async (request, reply) => {
    await currentDB.write(request.body.collection, request.body.key, request.body.value);

    reply.send({ status: 'success' });
  });

  // remove document
  db.post('/remove', async (request, _reply) => {
    await currentDB.remove(request.body.documentID);
  });
}
