// Detect the Nitro preset (runtime environment)
const preset = process.env.NITRO_PRESET || "";

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

//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  storage: {
    db: selectedStorage, // "db" alias dynamically assigned
    ...storageConfig, // Keep other storage configs
  },
  compatibilityDate: "2025-03-17",
});
