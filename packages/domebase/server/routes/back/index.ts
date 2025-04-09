// server/routes/remix.ts
import { defineEventHandler, toNodeListener } from "h3";
import path from "node:path";
import { broadcastDevReady } from "@remix-run/node";
import { createRequestHandler } from "@react-router/express";
import express from "express";

// ✅ Get Nitro project root
const ROOT_DIR = import.meta.env?.NITRO_APP_ROOT || process.cwd();
const BUILD_DIR = path.resolve(ROOT_DIR, "build");

// ✅ Create Express app
const app = express();

let nodeListener: ReturnType<typeof toNodeListener>;

const ready = (async () => {
  // Use path from project root
  const build = await import(path.join(BUILD_DIR, "server", "index.js"));

  const remixHandler = createRequestHandler({ build });

  if (process.env.NODE_ENV === "development") {
    broadcastDevReady(build, "http://localhost:3000");
  }

  app.all("*", remixHandler);

  nodeListener = toNodeListener(app);
})();

export default defineEventHandler(async (event) => {
  await ready;
  return nodeListener(event.node.req, event.node.res);
});
