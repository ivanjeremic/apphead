#!/usr/bin/env node
import autoLoad from "fastify-autoload";
import { start } from "@fastify/restartable";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

export const isDev = process.env.NODE_ENV !== "production";

export const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);

/**
 * @description app entry.
 */
// eslint-disable-next-line no-unused-vars
async function app(db, opts) {
  /**
   * @description load core.
   */
  await db.register(import("@domedb/core"));

  /**
   * @description load plugins.
   */
  await db.register(autoLoad, {
    dir: join(__dirname, "../plugins"),
    maxDepth: 1,
    forceESM: true,
  });

  /**
   * @description refresh on new route/plugin added.
   */
  // eslint-disable-next-line no-unused-vars
  db.get("/restart", async (req, reply) => {
    await db.restart();

    return { status: "ok" };
  });
}

const {
  // eslint-disable-next-line no-unused-vars
  stop, restart, listen, inject,
} = await start({
  protocol: "http", // or 'https'
  // key: ...,
  // cert: ...,
  // add all other options that you would pass to fastify
  pluginTimeout: isDev ? 20000 : undefined,
  logger: true,
  host: "127.0.0.1",
  port: 3000,
  app,
});

const { address, port } = await listen();

console.log("DomeDB running", address, port);
