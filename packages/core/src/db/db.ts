import { createStorage } from "unstorage";
import type { StorageValue, Storage, Driver } from "unstorage";
import { nanoid } from "nanoid";
import { errors } from "./utils/errors";
import { join } from "pathe";

type ENGINE = {
  driver: Driver<any, any>;
  handleQuery: (cleanPath: string) => any;
};

/**
 * DomeDB class.
 */
export class DomeDB {
  path = "./data/";
  kv: Storage<StorageValue>;
  handleQuery: (cleanPath: string) => any;
  user: any;

  constructor(ngin: { engine: ENGINE; path?: string }) {
    if (ngin.path) {
      this.path = ngin.path;
    }

    this.handleQuery = ngin.engine.handleQuery;

    this.kv = createStorage({
      driver: ngin.engine?.driver,
    });

    // create system collections
    this.kv.setItem("__collections", JSON.stringify({}), {
      path: join(this.path, "__collections"),
    });

    this.kv.setItem("__users", JSON.stringify({}), {
      path: join(this.path, "__collections"),
    });
  }

  public async createUser() {
    const id = nanoid();

    const collectionExists = await this.kv.hasItem("__users", {
      path: join(this.path, "__collections"),
    });

    if (collectionExists) {
      await this.kv.setItem(id, JSON.stringify({ id }), {
        path: join(this.path, "__users"),
      });
    } else {
      console.error(
        errors.shared.collectionDoesNotExist("__users in createUser")
      );
    }
  }

  /*
   * handle collections
   */
  public async createCollection(collectionName: string, schema?: any) {
    //check if valid collection name
    if (collectionName.includes("_")) {
      console.error(
        errors.createCollection.invalidCollectionName(collectionName)
      );
      return;
    }

    await this.kv.setItem(".domebase:"+collectionName, JSON.stringify(schema), {
      path: join(this.path, "__collections"),
    });
  }

  public async deleteCollection(collectionName: string) {
    //this.ngin.storage.remove(collectionName);
  }

  /**
   *
   * @param collectionName
   * @param data
   */
  public async insert({ collection, data }: { collection: string; data: any }) {
    const collectionExists = await this.kv.hasItem(collection, {
      path: join(this.path, "__collections"),
    });

    console.log(collectionExists);
    if (collectionExists) {
      await this.kv.setItem(nanoid(), JSON.stringify(data), {
        path: join(this.path, this.user, collection),
      });
    } else {
      console.error(errors.shared.collectionDoesNotExist(collection));
    }
  }

  /**
   *
   * @param param0
   * @returns {Promise<any>}
   */
  public async query({
    collection,
    filter,
    options,
  }: {
    collection: string;
    filter: any;
    options: any;
  }): Promise<any> {
    const collectionExists = await this.kv.hasItem(collection, {
      path: join(this.path, "__collections"),
    });

    if (collectionExists) {
      const cleanPath = collection.startsWith("__")
        ? collection
        : this.user + "/" + collection;

      //const values = await this.handleQuery(join(this.path, cleanPath));

      const values = await this.kv.getItems([{key: join(this.path, cleanPath)}]);

      return [...values];
    } else {
      console.error(
        errors.shared.collectionDoesNotExist(collection + " in query")
      );
    }
  }

  /*
   * handle delte documents
   */
  public async deleteOne(collectionName: string, query: string | object) {
    //await this.ngin.handleDelete(collectionName, query, true);
  }

  public async deleteMany(collectionName: string, query: string | object) {
    //await this.ngin.handleDelete(collectionName, query, false);
  }
}
