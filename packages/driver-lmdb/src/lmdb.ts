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

interface CLIENT_OPTS {
  lmdb_path?: string;
}

const DRIVER_NAME = "lmdb";

export default defineDriver((opts: LmdbOptions) => {
  // Lazy initialization of LMDB instance
  /* const getDbInstance = (client_opts?: RootDatabaseOptionsWithPath) => {
    if (!db) {
      db = open(client_opts || { path: opts.path || "./data" });
    }
    return db;
  }; */

  let db: Database | null = null;
  let currentPath: string | null = null;

  const getDbInstance = (client_opts?: CLIENT_OPTS): Database => {
    const newPath = client_opts ? client_opts.lmdb_path : opts.path;

    if (!db || currentPath !== newPath) {
      db = open({ path: newPath || "./data" });
      currentPath = newPath || null;
    }

    return db;
  };

  return {
    name: DRIVER_NAME,
    options: opts,
    getInstance: () => getDbInstance(),
    async hasItem(key, client_opts) {
      return getDbInstance(client_opts).doesExist(key);
    },
    async getItem(keyd, client_opts) {
      const db = getDbInstance(client_opts);

      const filtered = db.getRange().asArray.map(({ key, value }) => ({
        id: key,
        ...JSON.parse(value),
      }));

      console.log("filtered", filtered);

      return filtered;
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
