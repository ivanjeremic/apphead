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
	console.log("__dirname__dirname", __dirname);
	return {
		base: "/domebase/",
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
								driver: driverNode(),
								plugins: [
									createDomebaseServer({
										basePath: isDev ? "/" : "/api",
										port,
									}),
								],
							});

							getPort().then((adminPort) => {
								createDevServer({
									caddyfile: `
	{
		admin localhost:${adminPort}
	}
	
	:3002 {
		redir /domebase /domebase/
		redir /domebase/api /domebase/api/
	
		handle_path /domebase/api/* {
		reverse_proxy localhost:${port} {
    		header_up Host {host}
    }
	}

	 @frontend not path /domebase/api/*
		handle /domebase* {
			reverse_proxy localhost:${clientPort} {
    		header_up Host {host}
    }
	}
	}
	`,
								});
							});
						});
					});
				},
			},
		],
	};
});
