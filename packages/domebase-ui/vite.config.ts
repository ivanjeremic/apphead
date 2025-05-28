import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { createDevServer } from "caddy-dev-server";
//@ts-ignore
import { Domebase } from "domebase";
//@ts-ignore
import { createDomebaseServer } from "@domebase/plugin-backend";
//@ts-ignore
import driverNode from "@domebase/driver-node";
import getPort from "get-port";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const isDev = mode === "development";
	return {
		logLevel: "silent",
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		plugins: [
			react(),
			tailwindcss(),
			{
				name: "my-back",
				configureServer(server) {
					server.httpServer?.once("listening", () => {
						const address = server.httpServer?.address();
						const clientPort = typeof address === "object" && address?.port;

						getPort({ port: 8787 }).then((port) => {
							new Domebase({
								driver: driverNode({ path: ".datadome" }),
								path: ".domebase",
								plugins: [
									createDomebaseServer({
										basePath: isDev ? "/" : "/api",
										port,
									}),
								],
							});

							createDevServer({
								apiPort: port,
								frontendPort: Number(clientPort),
							});
						});
					});
				},
			},
		],
	};
});
