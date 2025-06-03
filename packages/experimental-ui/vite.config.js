import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { resolve } from "node:path";

import { createDevServer } from "caddy-dev-server";
import { Domebase } from "domebase";
//@ts-ignore
import { createDomebaseServer } from "@domebase/plugin-backend";
//@ts-ignore
import driverNode from "@domebase/driver-node";
import getPort from "get-port";

const caddyConfig = (adminPort, port, clientPort) => /* caddyfile */ `
      {
        admin localhost:${adminPort}
      }
      
      :3002 {
        redir /domebase /domebase/
        redir /domebase/api /domebase/api/
		
		handle / {
    	reverse_proxy localhost:${port} {
      	header_up Host {host}
      	header_up X-Real-IP {remote_host}
      	header_up X-Forwarded-For {remote_host}
      	header_up X-Forwarded-Proto {scheme}
    	}
  	 }
    
      handle /domebase/api/* {
        reverse_proxy localhost:${port} {
          header_up Host {host}
					header_up X-Real-IP {remote_host}
      		header_up X-Forwarded-For {remote_host}
      		header_up X-Forwarded-Proto {scheme}
        }
      }

			 # Proxy Vite dev server for frontend on /domebase/*
  		handle /domebase/* {
    		reverse_proxy localhost:${clientPort} {
      		header_up Host {host}
      		header_up X-Real-IP {remote_host}
      		header_up X-Forwarded-For {remote_host}
      		header_up X-Forwarded-Proto {scheme}
    		}
  		}
      
     	# Proxy Vite HMR websocket requests (critical!)
  		handle_path /domebase/__vite_ws {
    		reverse_proxy localhost:${clientPort} {
      		header_up Host {host}
      		header_up Upgrade {>Upgrade}
      		header_up Connection {>Connection}
    		}
  		}

  		# Proxy Vite ping for websocket health checks
  		handle_path /domebase/__vite_ping {
    		reverse_proxy localhost:${clientPort} {
      		header_up Host {host}
    		}
  		}
    }
      `;

// https://vitejs.dev/config/
export default defineConfig({
	base: "/domebase/",
	logLevel: "silent",
	plugins: [
		TanStackRouterVite({ autoCodeSplitting: true }),
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
									port,
								}),
							],
						});

						getPort().then((adminPort) => {
							createDevServer({
								caddyfile: caddyConfig(adminPort, port, clientPort),
							});
						});
					});
				});
			},
		},
		tailwindcss(),
		viteReact(),
	],
	test: {
		globals: true,
		environment: "jsdom",
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
});
