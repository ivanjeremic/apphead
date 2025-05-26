import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
//import { serveStatic } from 'hono/bun'; // or hono/node depending on your env

const app = new Hono();

// ✅ Handle root route `/` as a regular Hono route
app.get("/", (c) => {
	return c.text("Welcome to the root route!");
});

// Serve static files for the SPA
app.use("/domebase/assets/*", serveStatic({ root: "./dist" }));
app.use("/domebase/*", serveStatic({ path: "./dist/index.html" }));

app.get("/domebase/api", (c) => c.text("Hello Node.js!"));

serve({
	fetch: app.fetch,
	port: 8787,
});
