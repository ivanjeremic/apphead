import { resolve } from "node:path";
// Detect the Nitro preset (runtime environment)
const preset = process.env.NITRO_PRESET || "node_server";

// Detect local development
const isDev =
  process.argv.includes("dev") || process.env.NODE_ENV === "development";

const storageConfig = {
  customDb: {
    driver: "driver-lmdb",
  },
  vercelDb: {
    driver: "vercel-kv",
  },
  cloundflareKV: {
    driver: "cloudflare-kv-binding",
  },
};

// Explicitly assign storage based on runtime
const selectedStorage =
  isDev || ["node_server", "bun", "deno_server"].includes(preset)
    ? storageConfig.customDb // ✅ Always use `customDb` for dev, Node.js, Bun, and Deno
    : preset === "vercel"
      ? storageConfig.vercelDb
      : preset === "cloudflare_module"
        ? storageConfig.cloundflareKV
        : storageConfig.customDb; // ✅ Fallback (should never hit, but ensures safety)

// Define a unique output directory for each deployment target
const outputDir = `.output-${preset}`;

//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  preset,
  output: {
    dir: outputDir, // ✅ Custom output directory based on target
  },
  storage: {
    db: selectedStorage, // "db" alias dynamically assigned
    ...storageConfig, // Keep other storage configs
  },
  compatibilityDate: "2025-03-17",
  publicAssets: [
    { baseURL: "/admin", dir: resolve("./server/public") },
    { baseURL: "/assets", dir: resolve("./server/public/assets") },
  ],
});
