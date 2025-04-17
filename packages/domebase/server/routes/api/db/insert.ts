import { domedb } from "~/utils/domedb";

export default defineEventHandler(async (event) => {
  // Read JSON from the request body
  const body = await readBody(event);

  await domedb.createCollection(body.collectionName, body.fields);

  return {
    success: true,
    message: `Collection '${body.collectionName}' created successfully.`,
  };
});
