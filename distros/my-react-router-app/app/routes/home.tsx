import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { domebase } from "~/server/api";
import { useLoaderData } from "react-router";

export async function loader({ context }: Route.LoaderArgs) {
	const colls = await domebase.query({ collection: "__collections" });

	return colls;
}

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React dddRouter!" },
	];
}

export default function Home() {
	const collections = useLoaderData();

	return (
		<>
			{collections.data.map((item: any) => {
				return (
					<div key={item.id}>
						<h1>{item.collectionName}</h1>
					</div>
				);
			})}
			<h1>d</h1>
			<Welcome />
		</>
	);
}
