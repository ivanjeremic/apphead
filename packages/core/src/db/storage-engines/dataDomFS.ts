import fsDriver from "unstorage/drivers/fs";
import { parseHTML, parseJSON, toJSON } from "linkedom";
import { defineDriver } from "unstorage";
import { open, RootDatabaseOptionsWithPath } from "lmdb";
import * as prettier from "prettier";
import { createStorageEngine } from "../utils/createStorageEngine";

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

export const dataDOMFS = createStorageEngine((storage) => ({
  UNSAFE_custom_external_kv: fsDriver({ base: "./tmp" }),
  async createCollection(collectionName: string, schema?: any) {
    const tmp = await prettier.format(`<ul created-at="${Date.now()}"></ul>`, {
      semi: false,
      parser: "html",
    });

    storage.setItem(collectionName, tmp);
  },
  async handleInsert(
    collectionName: string,
    data: any | Array<any>,
    inInsertOne: boolean
  ) {
    const collectionData = await storage.get(collectionName);
    const { document } = parseHTML(collectionData);
    const list = document.querySelector("ul");

    const createDocument = () => document.createElement("li");

    if (inInsertOne) {
      const newDoc = createDocument();

      if (newDoc) {
        newDoc.setAttribute("id", "dd");

        for (const [key, value] of Object.entries(data)) {
          newDoc.setAttribute(key, String(value));
        }

        list?.appendChild(newDoc);
      }
    } else {
      for (const item of data) {
        const newDoc = createDocument();

        if (newDoc) {
          newDoc.setAttribute("id", "dd");

          for (const [key, value] of Object.entries(item)) {
            newDoc.setAttribute(key, String(value));
          }

          list?.appendChild(newDoc);
        }
      }
    }

    const tmp = await prettier.format(list?.outerHTML, {
      semi: false,
      parser: "html",
    });

    storage.set(collectionName, tmp);
  },
  // find
  /* private async findHandler(
      collectionName: string,
      query: any,
      inFindOne: boolean
    ) {
      const collectionData = await this.ngin.storage.get(collectionName);
  
      const { list } = this.ngin.datadom(collectionData);
  
      list.querySelector({});
  
      if (inFindOne) {
        if (newDoc) {
          newDoc.setAttribute("id", "dd");
  
          for (const [key, value] of Object.entries(data)) {
            newDoc.setAttribute(key, String(value));
          }
  
          list.appendChild(newDoc);
        }
      } else {
        for (const item of query) {
          if (newDoc) {
            newDoc.setAttribute("id", "dd");
  
            for (const [key, value] of Object.entries(item)) {
              newDoc.setAttribute(key, String(value));
            }
  
            list.appendChild(newDoc);
          }
        }
      }
  
      const tmp = await prettier.format(list.outerHTML, {
        semi: false,
        parser: "html",
      });
  
      this.ngin.storage.set(collectionName, tmp);
    } */

  // delete
  async handleDelete(
    collectionName: string,
    query: string | object,
    isDeleteOne: boolean
  ) {
    const collectionData = await storage.get(collectionName);
    const { document } = parseHTML(collectionData);
    const list = document.querySelector("ul");

    let rm = false;

    if (list) {
      for (const doc of Array.from(list.children)) {
        for (const key of Object.keys(query)) {
          if (doc.getAttribute(key) === query[key]) {
            rm = true;
          } else {
            rm = false;
            break;
          }
        }

        // del here
        if (rm) {
          doc.remove();
          rm = false;
          const tmp = await prettier.format(list.outerHTML, {
            semi: false,
            parser: "html",
          });
          storage.set(collectionName, tmp);
          if (isDeleteOne) break;
        }
      }
    }
  },
}));
