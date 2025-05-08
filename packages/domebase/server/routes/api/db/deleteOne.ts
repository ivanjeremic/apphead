import { domedb } from "~/utils/domedb";

export default defineEventHandler(async (event) => {
	// Read JSON from the request body
	const body = await readBody(event);

	try {
		await domedb.deleteOne(body.collection, body.id);
	} catch (error) {
		console.error("Error deleting item:", error);
	}

	/* if (hasErrors) {
    return {
      success: false,
      message: errorList,
    };
  } */

	return {
		success: true,
		message: `Deleted '${body.collection}' successfully.`,
	};
});
