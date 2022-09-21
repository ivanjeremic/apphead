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
  registerPanelPath: join(__dirname, "..", "src/core/registerPanel.js"),
  pluginSystemPath: join(__dirname, "..", "src/core/pluginSystem.js"),
  pluginPath: (name) => join(__dirname, "..", `src/plugins/${name}.js`)
})


