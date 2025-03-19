import { DomeDB } from "@apphead/core";

const db = new DomeDB({
  engine: useStorage("db"),
  path: ".domebase",
});

export default defineEventHandler(async (event) => {
  await db.createCollection("flowers", [
    { field: "make", index: 1, type: "string" },
    { field: "model", index: 2, type: "string" },
    { field: "year", index: 3, type: "int32" },
  ]);

  const data = await db.query({
    collection: "__collections",
    filter: { id: "any" },
    options: { limit: 10, sort: "asc", fields: ["make", "model"] },
  });

  return {
    data,
  };
});
