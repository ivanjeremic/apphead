import { defineDriver } from "unstorage";
import { open, RootDatabaseOptionsWithPath } from "lmdb";

const DRIVER_NAME = "lmdb";

export const lmdbDriver = defineDriver((opts: RootDatabaseOptionsWithPath) => {
  const getLMDBClient = () => {
    const lmdbClient = open(opts);

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
    async setItem(key, value) {
      getLMDBClient().put(key, value);
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
