import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import nitro from "@analogjs/vite-plugin-nitro";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: "dist/client",
	},
	plugins: [
		react(),
		nitro(
			{
				ssr: true,
				entryServer: "src/main.server.tsx",
			},
			{
				output: {
					dir: ".output",
					publicDir: ".output/public",
				},
				publicAssets: [
					{ baseURL: "/", dir: resolve("./server/public/www") },
					{ baseURL: "/admin", dir: resolve("./public") },
				],
			},
		),
	],
});
