import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { createDevServer } from "caddy-dev-server";
import { Domebase } from "domebase";
import { createDomebaseServer } from "@domebase/plugin-backend";
import driverNode from "@domebase/driver-node";

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

					new Domebase({
						driver: driverNode({ path: ".datadome" }),
						path: ".domebase",
						plugins: [createDomebaseServer()],
					});

					createDevServer({ apiPort: 8787, frontendPort: Number(clientPort) });

					console.log(`Vite is running on port: ${clientPort}`);
					console.log(`Server is running on port: ${8787}`);
				});
			},
		},
	],
});
