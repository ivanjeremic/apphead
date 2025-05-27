import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { createDevServer } from "caddy-dev-server";
import { Hono } from "hono";
import { serve } from "@hono/node-server";

// Utility to convert Web ReadableStream to Node.js Readable

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		{
			name: "my-back",
			configureServer(server) {
				server.httpServer?.once("listening", () => {
					const address = server.httpServer?.address();
					const clientPort = typeof address === "object" && address?.port;

					// APP
					const app = new Hono();

					app.get("/", (c) => {
						return c.text("Hello from Hono!");
					});

					serve({
						fetch: app.fetch,
						port: 8787,
					});

					createDevServer({ apiPort: 8787, frontendPort: Number(clientPort) });

					console.log(`Vite is running on port: ${clientPort}`);
					console.log(`Server is running on port: ${8787}`);
				});
			},
		},
	],
});
