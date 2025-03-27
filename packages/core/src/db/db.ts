import { createStorage } from "unstorage";
import type { StorageValue, Storage, Driver } from "unstorage";
import { open } from "lmdb";
import { nanoid } from "nanoid";
import { errors } from "./utils/errors";
import { join } from "pathe";

/**
 * DomeDB class.
 */
export class DomeDB {
  path = "./data/";
  ngin: Storage<StorageValue>;
  user: any;

  constructor(ngin: { engine: Driver<any, any> | undefined; path?: string }) {
    if (ngin.path) {
      this.path = ngin.path;
    }

    this.ngin = createStorage({
      driver: ngin.engine,
    });

    // create system collections
    this.ngin.setItem("__collections", JSON.stringify({}), {
      path: join(this.path, "__collections"),
    });

    this.ngin.setItem("__users", JSON.stringify({}), {
      path: join(this.path, "__collections"),
    });
  }

  public async createUser() {
    const id = nanoid();

    const collectionExists = await this.ngin.hasItem("__users", {
      path: join(this.path, "__collections"),
    });

    if (collectionExists) {
      await this.ngin.setItem(id, JSON.stringify({ id }), {
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

    await this.ngin.setItem(collectionName, JSON.stringify(schema), {
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
    const collectionExists = await this.ngin.hasItem(collection, {
      path: join(this.path, "__collections"),
    });

    console.log(collectionExists);
    if (collectionExists) {
      await this.ngin.setItem(nanoid(), JSON.stringify(data), {
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
    const collectionExists = await this.ngin.hasItem(collection, {
      path: join(this.path, "__collections"),
    });

    if (collectionExists) {
      const cleanPath = collection.startsWith("__")
        ? collection
        : this.user + "/" + collection;

      const db = open({
        path: join(this.path, cleanPath),
      });

      const values = db.getRange();

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
