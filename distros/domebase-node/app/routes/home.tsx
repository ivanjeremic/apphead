import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { domedb } from "server/app";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export function loader({ context }: Route.LoaderArgs) {
	/* const posts = domedb.query("posts"); */
	return { message: context.VALUE_FROM_EXPRESS };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	return <Welcome message={loaderData.message} />;
}
