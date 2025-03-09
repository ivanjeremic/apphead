import { DB } from "./db/db";
import { lmdbDriver } from "./db/storage-engines/dataDomFS";

export const db = new DB({
  driver: lmdbDriver({ path: "./bess" }),
});

db.createCollection("stones", [
  { field: "make", index: 1, type: "string" },
  { field: "model", index: 2, type: "string" },
  { field: "year", index: 3, type: "int32" },
]);

//const vals = await db.findMany("__collections", "personal");
await db.insert("stones", { breed: "kies" });

const vals = await db.query(
  "stones",
  { id: "any" },
  { limit: 10, sort: "asc", fields: ["make", "model"] }
);

console.log(vals);
