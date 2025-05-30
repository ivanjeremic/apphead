import { Domebase } from "domebase";
import { createDomebaseServer } from "@domebase/plugin-backend";
import driverNode from "@domebase/driver-node";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Get the directory name of the current module file
// If using ESM:
const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);

const packageRoot = path.join(currentDir, "..");

// Now, join 'dist' from the package root
const distPath = path.join(packageRoot, "ui");

new Domebase({
	driver: driverNode(),
	plugins: [createDomebaseServer({ uiPath: distPath })],
});
