import { defineDriver } from "unstorage";
import { open } from "lmdb";
import type { Database } from "lmdb";

interface CLIENT_OPTS {
  lmdb_path?: string;
}

const DRIVER_NAME = "lmdb";

export default defineDriver((opts?: { path: string }) => {
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
    const newPath = client_opts
      ? client_opts.lmdb_path
      : opts?.path || "./data";

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
      const doesExist = getDbInstance(client_opts).doesExist(key);
      if (doesExist) {
        return true;
      }
      // Check if the key exists in the database
      const db = getDbInstance(client_opts);
      const data = db.get(key);
      if (data) {
        // If the key exists, return true
        return true;
      }
      // If the key does not exist, return false
      return false;
    },
    async getItem(keyd, client_opts) {
      const db = getDbInstance(client_opts);

      const filtered = db.getRange().asArray.map(({ key, value }) => ({
        id: key,
        ...JSON.parse(value),
      }));
      /*         .filter((item) => item.collectionName === "__users"); */

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
