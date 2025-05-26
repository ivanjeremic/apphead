import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/domebase",
	server: {
		proxy: {
			"/domebase/api": "http://localhost:8787", // existing
			// ADD THIS:
			"^/($|\\?)": "http://localhost:8787",
		},
	},
	plugins: [TanStackRouterVite({ autoCodeSplitting: true }), viteReact()],
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
