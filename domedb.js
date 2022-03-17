import autoLoad from "fastify-autoload";
import { start } from "@fastify/restartable";
import FastifyVite from "fastify-vite";
import renderer from "fastify-vite-react";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

export const isDev = process.env.NODE_ENV !== "production";

const root = import.meta.url;

export const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);

async function domedb(app, opts) {
  // opts are the options passed to start()
  console.log("plugin loaded", opts);

  // load core
  await app.register(import("./core/core.js"));

  // load plugins
  await app.register(autoLoad, {
    dir: join(__dirname, "plugins"),
    maxDepth: 1,
    forceESM: true,
  });

  await app.register(FastifyVite, {
    root,
    renderer,
  });

  // refresh on new route/plugin added
  app.get("/restart", async (req, reply) => {
    await app.restart();

    return { status: "ok" };
  });
}

const { stop, restart, listen, inject, vite } = await start({
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

await vite.commands();

const { address, port } = await listen();

console.log("server listening on", address, port);
