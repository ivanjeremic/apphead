/**
 *
 * @param collection
 */
export const handleAddCollection = async (collection: string) => {
	const res = await fetch("/api/db/insert", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ collection, fields: "{}" }),
	});
	const data = await res.json();

	if (!data.success && data.message) {
		// biome-ignore lint/complexity/noForEach: <explanation>
		data.message.forEach((message: string) => {
			console.error(message);
		});
	}
};

/**
 *
 * @returns {Promise<unknown>}
 */
export async function getCollectionList() {
	const res = await fetch("/api/db/query", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ collectionName: "__collections" }),
	});

	const data = await res.json();
	console.log(data);
	return data;
}

/**
 *
 * @param id
 */
export const handleDeleteCollection = async (id: string) => {
	const res = await fetch("/api/db/deleteOne", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ collection: "__collections", id }),
	});
	const data = await res.json();

	console.log(data);

	if (!data.success && data.message) {
		// biome-ignore lint/complexity/noForEach: <explanation>
		data.message.forEach((message: string) => {
			console.error(message);
		});
	}
};
