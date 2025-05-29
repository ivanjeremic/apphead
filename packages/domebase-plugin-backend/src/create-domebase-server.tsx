import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import { trimTrailingSlash } from "hono/trailing-slash";
import { prettyJSON } from "hono/pretty-json";
import { serveStatic } from "@hono/node-server/serve-static";
import { serve } from "@hono/node-server";
/* import ui from "@domebase/ui" with { type: "url" }; */
import { resolve, join } from "node:path";
// Convert the URL to a file path

export function createDomebaseServer({
	basePath,
	port,
}: { basePath?: string; port?: number } = {}) {
	const app = new Hono().basePath(basePath || "/");

	/* console.log(`Path to static assets (dist): ${ui}`); */

	app.use(secureHeaders());

	app.use(
		"/api/*",
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
			const root = resolve(".", "web");
			const jo = join(".", "web");
			console.log(`Root directory: ${root}`);
			console.log(`JOIN directory: ${jo}`);

			app.use(
				"/dist/*",
				serveStatic({
					root: "./dist",
					rewriteRequestPath: (path) => path.replace(/^\/dist/, ""),
				}),
			);

			/**
			 * API
			 */
			const routes = app
				.get("/", async (c) => {
					const colls = await domebase.query({ collection: "__collections" });
					return c.text("Hello from Hono!");
				})
				.get("/books", async (c) => {
					const colls = await domebase.query({ collection: "__collections" });
					return c.json(colls);
				})
				.get("/v1/query", async (c) => {
					const colls = await domebase.query({ collection: "__collections" });
					return c.json(colls);
				});

			serve({ port: port || 8787, fetch: app.fetch });
			return { app, routes };
		},
	};
}
