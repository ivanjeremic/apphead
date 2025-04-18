import { createStorage } from "unstorage";
import type { StorageValue, Storage, Driver } from "unstorage";
import { nanoid } from "nanoid";
import { checkErrors } from "./utils/errors";
import { join } from "pathe";

/**
 * DomeDB class.
 */
export class DomeDB {
  path = "./data/";
  kv: Storage<StorageValue>;
  handleQuery: (cleanPath: string) => any;
  user: any;

  constructor(ngin: { driver: Driver<any, any>; path?: string }) {
    if (ngin.path) {
      this.path = ngin.path;
    }

    this.kv = createStorage({
      driver: ngin.driver,
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

    const { hasErrors, errorList } = checkErrors([
      {
        condition: collectionExists,
        msg: (errors) => errors.shared.collectionDoesNotExist("__users"),
      },
    ]);

    if (hasErrors) {
      return { hasErrors, errorList };
    }

    await this.kv.setItem(id, JSON.stringify({ id }), {
      path: join(this.path, "__users"),
    });
  }

  /*
   * handle collections
   */
  public async createCollection(collectionName: string, schema?: any) {
    const collectionExists = await this.kv.hasItem(collectionName, {
      path: join(this.path, "__collections"),
    });

    const { hasErrors, errorList } = checkErrors([
      {
        condition: collectionName.includes("_"),
        msg: (errors) =>
          errors.createCollection.invalidCollectionName(collectionName),
      },
      {
        condition: collectionExists,
        msg: (errors) =>
          errors.createCollection.collectionAlreadyExists(collectionName),
      },
    ]);

    if (hasErrors) {
      return { hasErrors, errorList };
    }

    /* await this.kv.setItem(collectionName, JSON.stringify(schema), {
      path: join(this.path, "__collections"),
    }); */

    await this.insert({
      collection: "__collections",
      data: { collectionName, schema },
    });

    return { hasErrors, errorList };
  }

  public async deleteCollection(collectionName: string) {
    //this.ngin.storage.remove(collectionName);
  }

  /**
   *
   * @param collectionName
   * @param data
   *
   * @TODO THE ID NEEDS TO BE CHANGES TO BE creatorId:fields
   */
  public async insert({ collection, data }: { collection: string; data: any }) {
    const collectionExists = await this.kv.hasItem(collection, {
      path: join(this.path, "__collections"),
    });

    const { hasErrors, errorList } = checkErrors([
      {
        condition: !collectionExists,
        msg: (errors) => errors.shared.collectionDoesNotExist(collection),
      },
    ]);

    if (hasErrors) {
      return { hasErrors, errorList };
    }

    await this.kv.setItem(nanoid(), JSON.stringify(data), {
      path: join(this.path, this.user, collection),
    });
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

    const { hasErrors, errorList } = checkErrors([
      {
        condition: !collectionExists,
        msg: (errors) => errors.shared.collectionDoesNotExist(collection),
      },
    ]);

    if (hasErrors) {
      return { hasErrors, errorList };
    }

    const cleanPath = collection.startsWith("__")
      ? collection
      : `${this.user}/${collection}`;

    const values = await this.kv.getItem(join(this.path, cleanPath), {
      path: join(this.path, cleanPath),
    });

    /* console.log("values", Object.entries(...values));

    const data = Array(values).map((item) => ({
      id: item.key,
      ...item.value,
    }));

    console.log("data", data); */

    /* const result = [];
    for await (const item of values) {
      // Apply filtering logic if needed
      if (Object.entries(filter).every(([key, value]) => item[key] === value)) {
        result.push(item);
      }
    }    */

    return values;
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
