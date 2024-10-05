import { defineDriver } from "unstorage";
import { open } from "lmdb";

const db = open({
  path: "ad-data",
  // any options go here, we can turn on compression like this:
  compression: true,
});

export const lmdbDriver = defineDriver((options) => {
  return {
    name: "lmbd-driver",
    options,
    async hasItem(key, _opts) {
      return db.doesExist(key);
    },
    async getItem(key, _opts) {
      return db.get(key);
    },
    async setItem(key, value, _opts) {
      return db.put(key, value);
    },
    async removeItem(key, _opts) {
      return db.remove(key);
    },
    async getKeys(base, _opts) {
      return db.getKeys();
    },
    async clear(base, _opts) {
      const keys = db.getKeys();

      await Promise.all(
        keys.map((chunk) => {
          return db.remove(chunk);
        })
      );
    },
  };
});
