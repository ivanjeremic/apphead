import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
/* import { ipRestriction } from "hono/ip-restriction";
import { getConnInfo } from "hono/bun"; */
import { cors } from "hono/cors";
import { trimTrailingSlash } from "hono/trailing-slash";
import { prettyJSON } from "hono/pretty-json";
import { serveStatic } from "@hono/node-server/serve-static";

export function createDomebaseServer(domebase: any) {
	const app = new Hono();

	app.use("/*", serveStatic({ root: "./static" }));

	app.use(secureHeaders());

	/* app.use(
		"*",
		ipRestriction(getConnInfo, {
			denyList: [],
			allowList: ["127.0.0.1", "::1"],
		}),
	); */

	app.use(
		"/domebase/*",
		cors({
			origin: ["https://example.com", "https://example.org"],
			allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
			allowMethods: ["POST"],
			exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
			maxAge: 600,
			credentials: true,
		}),
	);

	app.use(trimTrailingSlash());

	app.use(prettyJSON());

	/**
	 * API
	 */
	const routes = app
		.get("/domebase/books", async (c) => {
			const colls = await domebase.query({ collection: "__collections" });
			return c.json(colls);
		})
		.get("/domebase/v1/query", async (c) => {
			const colls = await domebase.query({ collection: "__collections" });
			return c.json(colls);
		});

	// Add more routes here as needed

	return { app, routes }; // The function returns the Hono instance
}
