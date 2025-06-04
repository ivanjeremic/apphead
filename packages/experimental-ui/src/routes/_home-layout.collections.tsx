import { createFileRoute } from "@tanstack/react-router";
import { domebase } from "@/main";

const getColls = async () => {
	const data = await domebase.query({ collection: "__collections" });

	return data;
};

export const Route = createFileRoute("/_home-layout/collections")({
	component: App,
	loader: () => getColls(),
});

interface Collection {
	id: string;
	collectionName: string;
	schema?: Record<string, unknown>;
}

function App() {
	const loader = Route.useLoaderData() as {
		data: Collection[];
	};

	return (
		<div>
			<h1>Collection</h1>
			<ul>
				{loader.data.map((collection: Collection) => (
					<li key={collection.id}>{collection.collectionName}</li>
				))}
			</ul>
		</div>
	);
}
