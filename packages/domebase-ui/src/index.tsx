import { Domebase } from "domebase";
import { createDomebaseServer } from "@domebase/server";
import driverNode from "@domebase/driver-node";

export const domebase = new Domebase({
	driver: driverNode({ path: ".datadome" }),
	path: ".domebase",
});

const app = createDomebaseServer(domebase);

app.get("/", (c) => {
	return c.html(
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<link
					rel="stylesheet"
					href="https://cdn.simplecss.org/simple.min.css"
				/>
			</head>
			<body>
				<h1>Homepage</h1>
			</body>
		</html>,
	);
});

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
				{import.meta.env.PROD ? (
					<script type="module" src="/static/client.js" />
				) : (
					<script type="module" src="/src/client.tsx" />
				)}
			</head>
			<body>
				<div id="root" />
			</body>
		</html>,
	);
});

export default app;
