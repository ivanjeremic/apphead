import { Domebase } from "domebase";
import { createDomebaseServer } from "@domebase/server";
import driverNode from "@domebase/driver-node";
import { hc } from "hono/client";

function myPlugin() {
	return {
		name: "my-plugin",
		instance(domebase: Domebase) {
			console.log("my-plugin", domebase.path);
		},
	};
}

export const domebase = new Domebase({
	driver: driverNode({ path: ".datadome" }),
	path: ".domebase",
	plugins: [myPlugin()],
});

const { app, routes } = createDomebaseServer(domebase);

domebase.plugin.get("my-plugin");

export type AppType = typeof routes;

export const client = hc<AppType>("/");

app.get("/domebase", (c) => {
	return c.html(
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<link
					rel="stylesheet"
					href="https://cdn.simplecss.org/simple.min.css"
				/>
				{
					//@ts-ignore
					import.meta.env.PROD ? (
						<script type="module" src="/static/client.js" />
					) : (
						<script type="module" src="/src/client.tsx" />
					)
				}
			</head>
			<body>
				<div id="root" />
			</body>
		</html>,
	);
});

export default app;
