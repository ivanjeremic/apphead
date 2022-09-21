#!/usr/bin/env node
import { join, resolve } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { bootstrap } from "../src/core/bootstrap.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isDev = process.env.NODE_ENV !== "production";

bootstrap({
  isDev,
  registerPanel: join(__dirname, "..", "src/core/registerPanel.js"),
  pluginSystem: join(__dirname, "..", "src/core/pluginSystem.js"),
  prisma: join(__dirname, "..", "src/core/prisma.js"),
  pluginPath: (name) => join(__dirname, "..", `plugins/${name}.js`),
  panelDistPath: join(__dirname, "..", "src/panel/dist"),
  pluginFolderPath: join(__dirname, "..", "plugins")
})


