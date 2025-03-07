import { StorageValue, Storage } from "unstorage";
import protobuf from "protobufjs";
import { open } from "lmdb";
import { env } from "bun";

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
  ngin: Storage<StorageValue>;
  path = "./data/";
  constructor(ngin: Storage<StorageValue>) {
    this.ngin = ngin;
  }

  /**
   * handle collections
   */
  public async createCollection(collectionName: string, schema?: any) {
    await this.ngin.setItem(collectionName, JSON.stringify(schema), {
      path: this.path + "__collections",
    });
  }

  public async createCollectionSchema(collectionName: string, schema?: any) {
    protobuf.parse(schema);
  }

  public async deleteCollection(collectionName: string) {
    //this.ngin.storage.remove(collectionName);
  }

  /**
   * handle document inserts
   */
  public async insertOne(collectionName: string, data: any) {
    //await this.ngin.handleInsert(collectionName, data, true);
  }

  public async insertMany(collectionName: string, data: any[]) {
    //await this.ngin.handleInsert(collectionName, data, false);
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

  public async findMany(collectionName, query) {
    const db = open({
      path: "./data/" + "__collections",
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
