import { useLoaderData } from "react-router";

interface Collection {
	id: string;
	collectionName: string;
	schema?: Record<string, unknown>;
}

export function CollectionsPage() {
	const loader = useLoaderData();

	return (
		<div>
			<h1 style={{ textDecoration: "underline", fontWeight: "bolder" }}>
				Collections
			</h1>
			<ul>
				{loader.data.map((collection: Collection) => (
					<li key={collection.id}>{collection.collectionName}</li>
				))}
			</ul>
		</div>
	);
}
