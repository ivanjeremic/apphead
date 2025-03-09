import {
  StorageValue,
  Storage,
  createStorage,
  CreateStorageOptions,
} from "unstorage";
import protobuf from "protobufjs";
import { open } from "lmdb";
import { nanoid } from "nanoid";

/**
 * Creates a Protobuf schema dynamically from an array of field definitions.
 * @param {string} name - The name of the message type.
 * @param {Array} fields - The schema definition array.
 * @returns {protobuf.Type} - The generated Protobuf Type.
 */
function createSchema(name, fields) {
  const messageType = new protobuf.Type(name);

  fields.forEach((field) => {
    messageType.add(new protobuf.Field(field.field, field.index, field.type));
  });

  return messageType;
}

export class DB {
  path = "./data/";
  ngin: Storage<StorageValue>;

  constructor(ngin: CreateStorageOptions | undefined) {
    this.ngin = createStorage(ngin);
  }

  /**
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
   * handle document inserts
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
      throw new Error(`collection '${collectionName}' does not exist`);
    }
  }

  /**
   * handle find documents
   */
  public async findOne(collectionName, query) {
    const db = open({
      path: "./data/" + "__collections",
    });
    const item = await db.get(query);
    return item;
  }

  public async query(collectionName, query, options) {
    const db = open({
      path: "./data/" + collectionName,
    });

    const values = db.getRange();
    return [...values];
  }

  /**
   * handle delte documents
   */
  public async deleteOne(collectionName: string, query: string | object) {
    //await this.ngin.handleDelete(collectionName, query, true);
  }

  public async deleteMany(collectionName: string, query: string | object) {
    //await this.ngin.handleDelete(collectionName, query, false);
  }
}
