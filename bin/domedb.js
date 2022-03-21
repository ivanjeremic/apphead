#!/usr/bin/env node
import autoLoad from "fastify-autoload";
import { start } from "@fastify/restartable";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

export const isDev = process.env.NODE_ENV !== "production";

export const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);

async function domedb(app, opts) {
  // load core
  await app.register(import("../core/core.js"));

  // load plugins
  await app.register(autoLoad, {
    dir: join(__dirname, "../plugins"),
    maxDepth: 1,
    forceESM: true,
  });

  // refresh on new route/plugin added
  app.get("/restart", async (req, reply) => {
    await app.restart();

    return { status: "ok" };
  });
}

const { stop, restart, listen, inject } = await start({
  protocol: "http", // or 'https'
  // key: ...,
  // cert: ...,
  // add all other options that you would pass to fastify
  pluginTimeout: isDev ? 20000 : undefined,
  logger: true,
  host: "127.0.0.1",
  port: 3000,
  app: domedb,
});

const { address, port } = await listen();

console.log("DomeDB running", address, port);
