import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home-layout/")({
	component: App,
});

function App() {
	return <h1>Homas</h1>;
}
