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

class Auth {
  currentUser: any;

  async createUser(username: string) {
    return {
      id: nanoid(),
      username,
    };
  }

  async registerUsernamePassword(username: string, password: string) {
    this.currentUser = username;
    return true;
  }

  async loginUsernamePassword(username: string, password: string) {
    this.currentUser = username;
    return true;
  }
}

/**
 * DomeDB class.
 */
export class DomeDB extends Auth {
  path = "./data/";
  ngin: Storage<StorageValue>;
  user: any;

  constructor(ngin: { engine: Driver<any, any> | undefined }) {
    super();

    this.ngin = createStorage({
      driver: ngin.engine,
    });
  }

  /*
   * handle collections
   */
  public async createCollection(collectionName: string, schema?: any) {
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
        path: this.path + collectionName,
      });
    } else {
      console.error(errors.insertErrors.collectionDoesNotExist);
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
    const db = open({
      path: "./data/" + collection,
    });

    const values = db.getRange();
    return [...values];
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
