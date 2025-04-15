import { domedb } from "~/utils/domedb";

export default defineEventHandler(async (event) => {
  await domedb.createCollection("flowers", [
    { field: "make", index: 1, type: "string" },
    { field: "model", index: 2, type: "string" },
    { field: "year", index: 3, type: "int32" },
  ]);

  const data = await domedb.query({
    collection: "__collections",
    filter: { id: "any" },
    options: { limit: 10, sort: "asc", fields: ["make", "model"] },
  });

  return {
    data,
  };
});
