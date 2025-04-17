import { domedb } from "~/utils/domedb";

export default defineEventHandler(async (event) => {
  // Read JSON from the request body
  const body = await readBody(event);

  const data = await domedb.query({
    collection: body.collectionName,
    filter: { id: "any" },
    options: { limit: 10, sort: "asc", fields: ["make", "model"] },
  });

  return {
    data,
  };
});
