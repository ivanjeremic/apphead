import { DomeDB } from "./db/db";
import { nodeStorageEngine } from "./db/storage-engines/lmdb";

export const db = new DomeDB({
  engine: nodeStorageEngine(),
});

db.user = "myuser";

//await db.createUser();

await db.createCollection("animals", [
  { field: "make", index: 1, type: "string" },
  { field: "model", index: 2, type: "string" },
  { field: "year", index: 3, type: "int32" },
]);

// rest api shape: /db/insert/collection=stones&make=string&model=string&year=int32
await db.insert({
  collection: "animals",
  data: { make: "ford", model: "f150", year: 2021 },
});

const data = await db.query({
  collection: "animals",
  filter: { id: "any" },
  options: { limit: 10, sort: "asc", fields: ["make", "model"] },
});

console.log(data);
