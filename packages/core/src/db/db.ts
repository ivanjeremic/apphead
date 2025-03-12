import {
  StorageValue,
  Storage,
  createStorage,
  CreateStorageOptions,
  Driver,
} from "unstorage";
import { open } from "lmdb";
import { nanoid } from "nanoid";
import { errors } from "./utils/errors";

/**
 * DomeDB class.
 */
export class DomeDB {
  path = "./data/";
  ngin: Storage<StorageValue>;
  user: any;

  constructor(ngin: { engine: Driver<any, any> | undefined }) {
    this.ngin = createStorage({
      driver: ngin.engine,
    });

    // create system collections
    this.ngin.setItem("__collections", JSON.stringify({}), {
      path: this.path + "__collections",
    });

    this.ngin.setItem("__users", JSON.stringify({}), {
      path: this.path + "__collections",
    });
  }

  public async createUser() {
    const id = nanoid();

    const collectionExists = await this.ngin.hasItem("__users", {
      path: this.path + "__collections",
    });

    if (collectionExists) {
      await this.ngin.setItem(id, JSON.stringify({ id }), {
        path: this.path + "__users",
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
      path: this.path + "__collections",
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
  public async insert(collectionName: string, data: any) {
    const collectionExists = await this.ngin.hasItem(collectionName, {
      path: this.path + "__collections",
    });

    if (collectionExists) {
      await this.ngin.setItem(nanoid(), JSON.stringify(data), {
        path: this.path + this.user + "/" + collectionName,
      });
    } else {
      console.error(errors.shared.collectionDoesNotExist(collectionName));
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
      path: this.path + "__collections",
    });

    if (collectionExists) {
      const db = open({
        path: this.path + this.user + "/" + collection,
      });

      const values = db.getRange();
      return new Promise((resolve, reject) => {
        try {
          resolve([...values]);
        } catch (error) {
          reject(error);
        }
      });
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
