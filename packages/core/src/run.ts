import { parseArgs } from "util";
import { DB } from "./db/db";
import { dataDomFS } from "./db/storage-engines/dataDomFS";

export const db = new DB(dataDomFS);

const { values, positionals } = parseArgs({
  args: Bun.argv,
  options: {
    createCollection: {
      type: "string",
    },
    insert: {
      type: "boolean",
    },
    insertMany: {
      type: "boolean",
    },
    deleteOne: {
      type: "boolean",
    },
    deleteMany: {
      type: "boolean",
    },
  },
  strict: true,
  allowPositionals: true,
});

switch (true) {
  case values.insert:
    db.insertOne("users", { name: "Ivan", age: 33 });
    break;
  case values.insertMany:
    db.insertMany("users", [
      { name: "Franz", age: 33 },
      { name: "Ivan", age: 33 },
      { name: "Lopa", age: 33 },
      { name: "Kevin", age: 50 },
      { name: "Fred", age: 50 },
      { name: "Nik", age: 50 },
      { name: "Bob", age: 13 },
      { name: "Lex", age: 13 },
      { name: "Martin", age: 13 },
    ]);
    break;
  case values.createCollection !== undefined:
    db.createCollection(values.createCollection);
    break;
  case values.deleteOne:
    db.deleteOne("users", { id: "dd" });
    break;
  case values.deleteMany:
    db.deleteMany("users", { age: "33" });
    break;
  default:
    break;
}
