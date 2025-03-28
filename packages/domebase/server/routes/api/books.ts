import { DomeDB } from "@domebase/core";
import { open } from "lmdb";

function lmdbEngine() {
  return {
    driver: useStorage("db"),
    handleQuery: async (cleanPath: string) => {
      const db = open({
        path: cleanPath,
      });

      const values = db.getRange();

      return values;
    },
  };
}

const db = new DomeDB({
  engine: lmdbEngine(),
  path: ".domebase",
});

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": "*", // Allow all origins (or specify frontend URL)
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

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
