// src/lmdb.ts
import { defineDriver } from "unstorage";
import { open } from "lmdb";
var DRIVER_NAME = "lmdb";
var lmdb_default = defineDriver((opts) => {
  let db = null;
  const getDbInstance = (client_opts) => {
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
      return getDbInstance(client_opts).getAsync(key);
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
      const db2 = getDbInstance(client_opts);
      const data = db2.get(key);
      return data ? { mtime: data.modifiedAt ?? null, birthtime: data.createdAt ?? null } : {};
    },
    async getKeys(prefix = "") {
      const db2 = getDbInstance({});
      const keys = [];
      for (const key of db2.getKeys({ start: prefix })) {
        keys.push(String(key));
      }
      return keys;
    },
    async clear(base, client_opts) {
      const db2 = getDbInstance(client_opts);
      db2.drop();
    },
    dispose() {
      if (db) {
        db.close();
        db = null;
      }
    }
  };
});
export {
  lmdb_default as default
};
