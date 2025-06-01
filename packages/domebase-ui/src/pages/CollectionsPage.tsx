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
			<ul>
				{loader.data.map((collection: Collection) => (
					<li key={collection.id}>{collection.collectionName}</li>
				))}
			</ul>
		</div>
	);
}
