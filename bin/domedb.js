#!/usr/bin/env node
import autoLoad from "fastify-autoload";
import { start } from "@fastify/restartable";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

export const isDev = process.env.NODE_ENV !== "production";

export const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);

/**
 * @param {any} db
 * @param {object} _opts
 * @returns {Promise<any>}
 * @description
 */
async function app(db, _opts) {
  // load core
  await db.register(import("@domedb/core"));

  // load plugins.
  await db.register(autoLoad, {
    dir: join(__dirname, "../plugins"),
    maxDepth: 1,
    forceESM: true,
  });

  // refresh on new route/plugin added.
  db.get("/restart", async (_req, _reply) => {
    await db.restart();

    return { status: "ok" };
  });
}

const { listen } = await start({
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

logger.info(`DomeDB running: ${address}:${port}`);
