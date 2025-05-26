import { createFileRoute } from "@tanstack/react-router";
import "../App.css";

export const Route = createFileRoute("/about")({
	component: About,
});

function About() {
	return (
		<div className="App">
			<header className="App-header">About</header>
		</div>
	);
}
