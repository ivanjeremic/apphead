import { Domebase } from "domebase";
import { createDomebaseServer } from "@domebase/plugin-backend";
import driverNode from "@domebase/driver-node";
import { hc } from "hono/client";

export const domebase = new Domebase({
	driver: driverNode({ path: ".datadome" }),
	path: ".domebase",
	plugins: [createDomebaseServer()],
});

const { app, routes } = domebase.plugin.get("my-plugin");

export type AppType = typeof routes;

export const client = hc<AppType>("/");

app.get("/domebase", (c: any) => {
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
