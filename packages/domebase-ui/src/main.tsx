import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { HomeLayout } from "./layouts/HomeLayout";
import { CollectionsPage } from "./pages/CollectionsPage";
import { Domebase } from "domebase";
import indexedDbDriver from "unstorage/drivers/indexedb";
import "./index.css";
import { HomePage } from "./pages/HomePage";
import { FunctionsPage } from "./pages/FunctionsPage";
import { ThemeEditorPage } from "./pages/ThemeEditorPage";
import { UsersPage } from "./pages/UsersPage";

export const domebase = new Domebase({
	baseURL: "/",
	driver: indexedDbDriver({ base: ".domebase" }),
});

const router = createBrowserRouter(
	[
		{
			Component: HomeLayout,
			children: [
				{
					index: true,
					Component: HomePage,
				},
				{
					path: "collections",
					loader: async () => {
						const data = await domebase.query({ collection: "__collections" });

						return data;
					},
					Component: CollectionsPage,
				},
				{
					path: "users",
					loader: async () => {
						/* const data = await domebase.query({ collection: "__collections" });

						return data; */
					},
					Component: UsersPage,
				},
				{
					path: "functions",
					loader: async () => {
						// Placeholder for future page loader
					},
					Component: FunctionsPage,
				},
				{
					path: "website",
					loader: async () => {
						// Placeholder for future page loader
					},
					Component: ThemeEditorPage,
				},
			],
		},
	],
	{
		basename: "/domebase",
	},
);

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
