import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import httpProxy from "http-proxy";
import getPort from "get-port";

/* import { Hono } from "hono";
import { proxy } from "hono/proxy";
import { serve } from "@hono/node-server"; */

// Utility to convert Web ReadableStream to Node.js Readable

// https://vite.dev/config/
export default defineConfig({
	base: "/admin/",
	plugins: [
		react(),
		{
			name: "my-back",
			configureServer(server) {
				server.httpServer?.once("listening", () => {
					getPort().then((serverPort) => {
						const address = server.httpServer?.address();
						const clientPort = typeof address === "object" && address?.port;

						httpProxy
							.createProxyServer({
								target: `http://localhost:${clientPort}`,
							})
							.listen(serverPort);

						// APP
						/* const app = new Hono();
	 
						 app.get("/", (c) => {
							 return proxy(`http://${"localhost"}:${port}`);
						 });
	 
						 serve({
							 fetch: app.fetch,
							 port: 8787,
						 }); */

						console.log(`Vite is running on port: ${clientPort}`);
						console.log(`Server is running on port: ${serverPort}`);
					});
				});
			},
		},
	],
});
