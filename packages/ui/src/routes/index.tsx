import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

async function getCollectionList() {
	const res = await fetch("http://localhost:3001/api/db/query", {
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

export const Route = createFileRoute("/")({
	component: App,
	loader: () => getCollectionList(),
});

function App() {
	const collection = Route.useLoaderData();
	const [collectionName, setCollectionName] = useState("");

	const handleAddCollection = async () => {
		const res = await fetch("http://localhost:3001/api/db/insert", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ collectionName, fields: "{}" }),
		});
		const data = await res.json();

		if (!data.success && data.message) {
			// biome-ignore lint/complexity/noForEach: <explanation>
			data.message.forEach((message: string) => {
				console.error(message);
			});
		}
	};

	const handleDeleteCollection = async (id: string) => {
		const res = await fetch("http://localhost:3001/api/db/deleteOne", {
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

	return (
		<div>
			<h1>Collections</h1>
			<span>
				<input
					type="text"
					placeholder="Collection Name"
					value={collectionName}
					onChange={(e) => setCollectionName(e.target.value)}
				/>
				<button type="button" onClick={handleAddCollection}>
					Add Collection
				</button>
			</span>
			<ul>
				{collection.data.map(
					(item: { id: string; collectionName: string }, index: number) => (
						<li key={item.id}>
							<span>{item.collectionName}</span>
							<span>
								<button
									type="button"
									onClick={() => handleDeleteCollection(item.id)}
								>
									Delete
								</button>
							</span>
						</li>
					),
				)}
			</ul>
		</div>
	);
}
