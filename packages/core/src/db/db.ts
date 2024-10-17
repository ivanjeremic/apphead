import { NGIN } from "./utils/createStorageEngine";

export class DB {
  ngin: NGIN;

  constructor(ngin: NGIN) {
    this.ngin = ngin;
  }

  /**
   * handle collections
   */
  public async createCollection(collectionName: string, schema?: any) {
    await this.ngin.createCollection(collectionName, schema);
  }

  public async createCollectionSchema(collectionName: string, schema?: any) {
    //
  }

  public async deleteCollection(collectionName: string) {
    //this.ngin.storage.remove(collectionName);
  }

  /**
   * handle document inserts
   */
  public async insertOne(collectionName: string, data: any) {
    await this.ngin.handleInsert(collectionName, data, true);
  }

  public async insertMany(collectionName: string, data: any[]) {
    await this.ngin.handleInsert(collectionName, data, false);
  }

  /**
   * handle find documents
   */
  public async findOne(collectionName, query) {
    const collectionData = [];
    return collectionData;
  }

  public async findMany(collectionName, query) {
    const collectionData = [];
    return collectionData;
  }

  /**
   * handle delte documents
   */
  public async deleteOne(collectionName: string, query: string | object) {
    await this.ngin.handleDelete(collectionName, query, true);
  }

  public async deleteMany(collectionName: string, query: string | object) {
    await this.ngin.handleDelete(collectionName, query, false);
  }
}
