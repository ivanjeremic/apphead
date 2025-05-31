import { useLoaderData } from "react-router";

export function CollectionsPage() {
	const loader = useLoaderData();
	return (
		<div>
			<ul>
				{loader.data.map((collection: any) => (
					<li key={collection.id}>{collection.collectionName}</li>
				))}
			</ul>
		</div>
	);
}
