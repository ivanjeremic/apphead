// src/lmdb.ts
import { defineDriver } from "unstorage";
import { open } from "lmdb";
var DRIVER_NAME = "lmdb";
var lmdb_default = defineDriver((opts) => {
  let db = null;
  let currentPath = null;
  const getDbInstance = (client_opts) => {
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
      const doesExist = getDbInstance(client_opts).doesExist(key);
      if (doesExist) {
        return true;
      }
      const db2 = getDbInstance(client_opts);
      const data = db2.get(key);
      if (data) {
        return true;
      }
      return false;
    },
    async getItem(keyd, client_opts) {
      const db2 = getDbInstance(client_opts);
      const filtered = db2.getRange().asArray.map(({ key, value }) => ({
        id: key,
        ...JSON.parse(value)
      }));
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
