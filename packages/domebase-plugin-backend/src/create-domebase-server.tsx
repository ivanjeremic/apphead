import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import { trimTrailingSlash } from "hono/trailing-slash";
import { prettyJSON } from "hono/pretty-json";
import { serveStatic } from "@hono/node-server/serve-static";
import { serve } from "@hono/node-server";
import { proxy } from "hono/proxy";

export function createDomebaseServer({
	uiPath,
	port,
}: { uiPath?: string; port?: number } = {}) {
	const app = new Hono();

	console.log("uiPath", uiPath);

	app.use(secureHeaders());

	/* app.use(
		"/domebase/*",
		cors({
			origin: ["https://example.com", "https://example.org"],
			allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
			allowMethods: ["POST"],
			exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
			maxAge: 600,
			credentials: true,
		}),
	); */

	app.use(trimTrailingSlash());

	app.use(prettyJSON());

	// serve domebase-ui
	app.get(
		"/dome/*",
		serveStatic({
			root: "./ui",
		}),
	);

	return {
		name: "my-plugin",
		instance(domebase: any) {
			/**
			 * Domebase-API
			 */
			app.get("/api/books", async (c) => {
				const colls = await domebase.query({ collection: "__collections" });
				return c.json(colls);
			});

			/**
			 * Handle Websites & Webapps
			 */

			// serve website if it is static and not a fullstack app
			app.all("/", async (c) => {
				const serveStaticThisRequest = true;

				if (serveStaticThisRequest) {
					return serveStatic({ root: "./statics", index: "index.html" })(
						c,
						async () => {},
					);
				}

				// if it is a fullstack app, proxy the request to the backend server
				const url = new URL(c.req.url);
				const targetUrl = `http://localhost:3000${url.pathname}${url.search}`;
				return await proxy(targetUrl, c.req.raw);
			});

			//@TODO: check if it is a fullstack app

			serve({ port: port || 8787, fetch: app.fetch });
		},
	};
}
