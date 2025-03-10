import { DomeDB } from "./db/db";
import { lmdbDriver } from "./db/storage-engines/dataDomFS";

export const db = new DomeDB({
  driver: lmdbDriver({ path: "./bess" }),
});

db.createCollection("languages", [
  { field: "make", index: 1, type: "string" },
  { field: "model", index: 2, type: "string" },
  { field: "year", index: 3, type: "int32" },
]);

// rest api shape: /db/insert/collection=stones&make=string&model=string&year=int32
await db.insert("languageasdsadasds", { lang: "english" });

const data = await db.query({
  collection: "languages",
  filter: { id: "any" },
  options: { limit: 10, sort: "asc", fields: ["make", "model"] },
});

console.log(data);
