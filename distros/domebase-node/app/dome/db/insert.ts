import { domedb } from "~/utils/domedb";

export default defineEventHandler(async (event) => {
  // Read JSON from the request body
  const body = await readBody(event);

  const { hasErrors, errorList } = await domedb.createCollection(
    body.collectionName,
    body.fields
  );

  if (hasErrors) {
    return {
      success: false,
      message: errorList,
    };
  }

  return {
    success: true,
    message: `Collection '${body.collectionName}' created successfully.`,
  };
});
