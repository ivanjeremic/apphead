import { DB } from "./db/db";
import { createStorage } from "unstorage";
import { lmdbDriver } from "./db/storage-engines/dataDomFS";

const storage = createStorage({
  driver: lmdbDriver({ path: "./bess" }),
});

export const db = new DB(storage);

db.createCollection("pederi", [
  { field: "make", index: 1, type: "string" },
  { field: "model", index: 2, type: "string" },
  { field: "year", index: 3, type: "int32" },
]);

const vals = await db.findMany("__collections", "personal");
//const vals = await db.findOne("__collections", "personal");

console.log(vals);
