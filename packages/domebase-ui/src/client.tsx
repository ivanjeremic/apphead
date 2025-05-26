import { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
/* import type { AppType } from "./index.js";
import { hc } from "hono/client"; */

/* const ClockButton = () => {
	const client = hc<AppType>("/");
	const [response, setResponse] = useState<string | null>(null);

	const handleClick = async () => {
		const response = await client.domebase.books.$get();
		const data = await response.json();
		console.log(data);

		setResponse(JSON.stringify(data, null, 2));
	};

	return (
		<div>
			<button type="button" onClick={handleClick}>
				Get Server Time
			</button>
			{response && <pre>{response}</pre>}
		</div>
	);
};
 */

/* function App() {
	return (
		<>
			<h1>Hello hono/jsx/dom!</h1>
			<h2>Example of useState()</h2>
			<Counter />
			<h2>Example of API fetch()</h2>
			<ClockButton />
		</>
	);
} */

function Counter() {
	const [count, setCount] = useState(0);
	return (
		<button type="button" onClick={() => setCount(count + 1)}>
			You clicked me {count} times
		</button>
	);
}

// router
const router = createBrowserRouter([
	{
		index: true,
		path: "/domebase",
		Component: Counter,
	},
]);

const root = document.getElementById("root");

if (!root) {
	throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
