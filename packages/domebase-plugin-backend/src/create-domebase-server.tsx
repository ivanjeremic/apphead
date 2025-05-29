import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import { trimTrailingSlash } from "hono/trailing-slash";
import { prettyJSON } from "hono/pretty-json";
import { serveStatic } from "@hono/node-server/serve-static";
import { serve } from "@hono/node-server";
import { proxy } from "hono/proxy";
/* import ui from "@domebase/ui" with { type: "url" }; */

export function createDomebaseServer({
	basePath,
	port,
}: { basePath?: string; port?: number } = {}) {
	const app = new Hono().basePath(basePath || "/");

	/* console.log(`Path to static assets (dist): ${ui}`); */

	app.use(secureHeaders());

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

	return {
		name: "my-plugin",
		instance(domebase: any) {
			/**
			 * API
			 */
			const routes = app
				.get("/books", async (c) => {
					const colls = await domebase.query({ collection: "__collections" });
					return c.json(colls);
				})
				.get("/v1/query", async (c) => {
					const colls = await domebase.query({ collection: "__collections" });
					return c.json(colls);
				});

			/**
			 * Handle Websites & Webapps
			 */

			// serve domebase-ui
			app.use(
				"/dist/*",
				serveStatic({
					root: "./dist",
					rewriteRequestPath: (path) => path.replace(/^\/dist/, ""),
				}),
			);

			// serve webapp with proxy if it is a fullstack app
			app.all("*", async (c) => {
				const url = new URL(c.req.url);
				const targetUrl = `http://localhost:3000${url.pathname}${url.search}`;
				return await proxy(targetUrl, c.req.raw);
			});

			// else serve website if it is static and not a fullstack app
			//@TODO: check if it is a fullstack app

			serve({ port: port || 8787, fetch: app.fetch });
			return { app, routes };
		},
	};
}
