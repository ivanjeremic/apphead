import { defineDriver } from "unstorage";
import { open, RootDatabaseOptionsWithPath, Database } from "lmdb";

export interface LMDBOptions {
  /**
   * The name of the database to use.
   * @default "unstorage"
   */
  databaseName?: string;

  /**
   * The name of the collection to use.
   * @default "unstorage"
   */
  collectionName?: string;
}

const DRIVER_NAME = "lmdb";

export const lmdbDriver = defineDriver((opts: RootDatabaseOptionsWithPath) => {
  const getLMDBClient = (client_opts?: RootDatabaseOptionsWithPath) => {
    const lmdbClient = open(client_opts || opts);
    return lmdbClient;
  };

  return {
    name: DRIVER_NAME,
    options: opts,
    getInstance: getLMDBClient,
    async hasItem(key, _opts) {
      const doesExist = getLMDBClient().doesExist(key);
      return doesExist;
    },
    async getItem(key) {
      const item = getLMDBClient().get(key);
      return item;
    },
    async setItem(key, value, client_opts) {
      getLMDBClient(client_opts).put(key, value);
      return;
    },
    async removeItem(key) {
      getLMDBClient().remove(key);
    },
    async getKeys() {
      async function getKeys() {
        return new Promise((resolve, reject) => {
          try {
            resolve(getLMDBClient().getKeys());
          } catch (error) {
            reject(error);
          }
        });
      }

      return (await getKeys()) as unknown as Array<string>;
    },
    async clear() {
      const keys = getLMDBClient().getKeys();

      keys.map((chunk) => {
        getLMDBClient().remove(chunk);
      });
    },
    async getMeta(key) {
      //const document = await getDB().findOne({ key });
      console.log(key);
      return {
        mtime: new Date(),
        birthtime: new Date(),
      };
    },
    dispose() {
      return getLMDBClient().close();
    },
  };
});
