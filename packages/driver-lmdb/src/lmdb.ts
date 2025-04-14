import { defineDriver } from "unstorage";
import { open } from "lmdb";
import type { Database, RootDatabaseOptionsWithPath } from "lmdb";

export interface LmdbOptions {
  /**
   * The file path for the LMDB database.
   * @default "./data"
   */
  path?: string;
}

const DRIVER_NAME = "lmdb";

export default defineDriver((opts: LmdbOptions) => {
  let db: Database | null = null;

  // Lazy initialization of LMDB instance
  /* const getDbInstance = (client_opts?: RootDatabaseOptionsWithPath) => {
    if (!db) {
      db = open(client_opts || { path: opts.path || "./data" });
    }
    return db;
  }; */

  const getDbInstance = (client_opts?: RootDatabaseOptionsWithPath) => {
    return open(client_opts || opts);
  };

  return {
    name: DRIVER_NAME,
    options: opts,
    getInstance: () => getDbInstance(),
    async hasItem(key, client_opts) {
      return getDbInstance(client_opts).doesExist(key);
    },
    async getItem(key, client_opts) {
      const db = getDbInstance(client_opts);

      const values = db.getRange();

      //return getDbInstance(client_opts).getAsync(key);
      return values;
    },
    async setItem(key, value, client_opts) {
      getDbInstance(client_opts).put(key, value);
      return;
    },
    async removeItem(key, client_opts) {
      getDbInstance(client_opts).remove(key);
      return;
    },
    async getMeta(key, client_opts) {
      const db = getDbInstance(client_opts);

      const data = db.get(key);
      return data
        ? { mtime: data.modifiedAt ?? null, birthtime: data.createdAt ?? null }
        : {};
    },
    async getKeys(prefix = "") {
      const db = getDbInstance({});
      const keys: string[] = [];
      for (const key of db.getKeys({ start: prefix })) {
        keys.push(String(key));
      }
      return keys;
    },
    async clear(base, client_opts) {
      const db = getDbInstance(client_opts);

      db.drop();
    },
    dispose() {
      if (db) {
        db.close();
        db = null;
      }
    },
  };
});
