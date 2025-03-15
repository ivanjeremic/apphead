import { DomeDB } from "./db/db";
import { nodeStorageEngine } from "./db/storage-engines/lmdb";

export const db = new DomeDB({
  engine: nodeStorageEngine(),
});

db.user = "myuser";

//await db.createUser();

await db.createCollection("flowers", [
  { field: "make", index: 1, type: "string" },
  { field: "model", index: 2, type: "string" },
  { field: "year", index: 3, type: "int32" },
]);

await db.insert({
  collection: "flowers",
  data: { make: "ford", model: "f150", year: 2021 },
});

const data = await db.query({
  collection: "__collections",
  filter: { id: "any" },
  options: { limit: 10, sort: "asc", fields: ["make", "model"] },
});

console.log(data);
