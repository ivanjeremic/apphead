//@ts-nocheck
import Fastify from "fastify";
import autoLoad from "fastify-autoload";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const isDev = process.env.NODE_ENV !== "production";

export const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);

const db = Fastify({
  pluginTimeout: isDev ? 20000 : undefined,
  logger: true,
});

await db.register(autoLoad, {
  dir: join(__dirname, "routes"),
  maxDepth: 1,
  forceESM: true,
});

await db.register(autoLoad, {
  dir: join(__dirname, "plugins"),
  maxDepth: 1,
  forceESM: true,
});

try {
  await db.listen(3000);
} catch (err) {
  db.log.error(err);

  process.exit(1);
}
