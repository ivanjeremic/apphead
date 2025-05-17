/* import { domedb } from "../dome";

export default async function delete_one() {
	// Read JSON from the request body
	const body = {};

	try {
		await domedb.deleteOne(body.collection, body.id);
	} catch (error) {
		console.error("Error deleting item:", error);
	}

	return {
		success: true,
		message: `Deleted '${body.collection}' successfully.`,
	};
}
 */
