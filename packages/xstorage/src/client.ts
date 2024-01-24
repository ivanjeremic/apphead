import { nanoid } from "nanoid";

/**
 * @description STORAGE ENGINE
 */

/**
 * @description (insert): ""
 *
 * @description (update): ""
 *
 * @description (upsert): ""
 */
interface INSTRUCTION {
  operation: "insert" | "update" | "upsert";
  database: string;
  collection: string;
  records: any[];
}

/**
 * @description (remove): documents removed with the "remove" task can be restored at any time
 * and are not able to be deleted permanently since they are considered as still existing data in the system
 * which is likely to be restored, similar to (document drafts).
 *
 * @description (delete): documents delted with the "delete" task can as well be restored if needed altough
 * it can not be guaranteed that they still exist,they are marked as non existing lower priority data in the system (tombstone) and
 * can be erased automatically by the system if needed (disk/egde space), or by the administrator by setting up a maxAge
 * or deleting them manually permanently.
 */
interface INSTRUCTION_RM {
  operation: "remove" | "delete";
  database: string;
  collection: string;
  ids: string[];
}

/**
 * The JavaScript client. Class for creating the client and interacting with the database.
 */
export class AppHeadClient {
  async insert({ collection, data }: { collection: string; data: any[] }) {
    const insertFN = async (record: any) => {
      const id = nanoid();

      return useStorage()
        .getItem(`${collection}-page-${1}`)
        .then((ids: any) => {
          useStorage().setItem(`${collection}-page-${1}`, [
            [id, { id, data: record }],
            ...ids,
          ]);
        });
    };

    if (Array.isArray(data)) {
      for (const record of data) {
        await insertFN(record);
      }
    } else {
      await insertFN(data);
    }
  }

  async find({
    collection,
    perPage,
  }: {
    collection: string;
    perPage?: number;
  }) {
    let data: any | null = [];

    const collectionIndex: [] | null = await useStorage().getItem(
      `${collection}-page-${1}`
    );

    const indexMap = new Map<string, any>(collectionIndex);

    for (const [id, doc] of Array.from(indexMap)) {
      data = [...data, doc];
    }

    return data;
  }

  async delete({ collection, ids }: { collection: string; ids: any[] }) {
    for (const id of ids) {
      await useStorage().removeItem(id);
      const collIds: any[] | null = await useStorage().getItem(
        `${collection}-page-${1}`
      );

      const iDMap = new Map<string, string>(collIds);

      iDMap.delete(id);

      await useStorage().setItem(`${collection}-page-${1}`, Array.from(iDMap));
    }
  }

  async addCollection(name: string) {
    //await this.storage.setItem(collectionName, { collectionName });
    if (!(await useStorage().hasItem(`collections-page-${1}`))) {
      await useStorage().setItem(`collections-page-${1}`, []);
    }

    await useStorage().setItem(`${name}-page-${1}`, []);

    await this.insert({
      collection: "collections",
      data: [{ name }],
    });
  }

  async removeCollection() {
    "rm";
  }

  async getCollections() {
    ("");
  }
}
