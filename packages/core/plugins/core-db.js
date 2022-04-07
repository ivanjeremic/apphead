import { open } from 'lmdb';
import ObjectID from 'bson-objectid';
import produceDocs from '../utils/utils.js';

class CrudUtil {
  /**
   * Storage Engine
   *
   * @param {*} opts
   */
  constructor(opts) {
    this.db = opts.db;

    this.hasOfflineCache = opts.hasOfflineCache;

    this.currentDB = (node) =>
      open({
        path: `.domedb/databases/${this.db}/${node}`,
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
    await this.currentDB(collection).put('collection_meta', {
      label: collection,
      createdAt: Date.now(),
    });
  }

  /**
   * Find a Single Document
   *
   * @param {string} collection
   * @param {string} key
   * @returns {Promise<any>} data
   */
  async findOne(collection, key) {
    //const doc = await this.currentDB(collection).get(key);
    const doce = this.currentDB(collection).getEntry(key);

    /* 
    
    db.getRange({ start, end })
	.filter(({ key, value }) => test(key))
	.forEach(({ key, value }) => {
		// for each key-value pair in the given range that matched the filter
	})
    */

    return doce;
  }

  /**
   * Find Multiple Documents
   *
   * @param {string} collection
   * @param {string} key
   * @returns {Promise<any>} data
   */
  async find(collection, key) {
    //const doc = await this.currentDB(collection).get(key);
    const doce = this.currentDB(collection).getEntry(key);

    return doce;
  }

  /**
   * Insert a Single Document
   *
   * @param {string} collection
   * @param {*} value
   */
  async insertOne(collection, value) {
    await this.currentDB(collection).put(String(ObjectID()), value);
  }

  /**
   * Insert Multiple Documents
   *
   * @param {string} collection
   * @param {*} value
   */
  async insertMany(collection, value) {
    const insertedDocuments = await produceDocs(this.currentDB(collection), value);

    return insertedDocuments;
  }

  /**
   * remove document
   *
   * @param {string} collection
   * @param {string} doc
   */
  async remove(collection, doc) {
    await this.currentDB(collection).remove(doc, 'value1');
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
   * create collection
   */
  db.post('/createCollection', async (request, reply) => {
    await currentDB.createCollection(request.body.name);

    reply.send({ status: 'success', info: `Added new Collection [${request.body.name}]` });
  });

  /**
   * Find a Single Document
   */
  db.post('/findOne', async (request, reply) => {
    const data = await currentDB.findOne(
      request.body.database,
      request.body.collection,
      request.body.key
    );

    reply.send({ data: data });
  });

  /**
   * Find Multiple Documents
   */
  db.post('/find', async (request, reply) => {
    const data = await currentDB.findOne(
      request.body.database,
      request.body.collection,
      request.body.key
    );

    reply.send({ data: data });
  });

  /**
   * Insert a Single Document
   */
  db.post('/insertOne', async (request, reply) => {
    await currentDB.insertOne(request.body.collection, request.body.value);

    reply.send({ status: 'success', info: `Added new Document [${request.body.value}]` });
  });

  /**
   * Insert Multiple Documents
   */
  db.post('/insertMany', async (request, reply) => {
    const insertedDocuments = await currentDB.insertMany(
      request.body.collection,
      request.body.value
    );

    reply.send({
      status: 'success',
      operation: 'insertMany',
      collection: request.body.collection,
      insertedDocuments,
    });
  });

  // remove document
  db.post('/remove', async (request, _reply) => {
    await currentDB.remove(request.body.documentID, 'doc');
  });
}
