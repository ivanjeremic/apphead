import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { HomeLayout } from "./layouts/HomeLayout";
import { CollectionsPage } from "./pages/CollectionsPage";
import { Domebase } from "domebase";
import indexedDbDriver from "unstorage/drivers/indexedb";
import "./index.css";

export const domebase = new Domebase({
	driver: indexedDbDriver({ base: ".domebase" }),
});

const router = createBrowserRouter([
	{
		path: "/domebase",
		Component: HomeLayout,
		children: [
			{
				index: true,
				element: <h1>Home</h1>,
			},
			{
				path: "collections",
				loader: async () => {
					//const colls = await domebase.query({ collection: "__collections" });

					// Fetching collections from the API
					const res = await fetch("http://localhost:3002/domebase/api/books");

					const data = await res.json();

					console.log("data", data);
					return data;
				},
				Component: CollectionsPage,
			},
		],
	},
]);

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
