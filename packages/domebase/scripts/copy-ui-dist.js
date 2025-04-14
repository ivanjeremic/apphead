import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define source and target directories
const sourceDir = path.resolve(__dirname, "../../ui/dist");
const targetDir = path.resolve(__dirname, "../server/public");

async function copyDist() {
  try {
    // Clean the target directory
    console.log(`Cleaning target directory: ${targetDir}`);
    await fs.emptyDir(targetDir);

    // Copy the contents of the source directory to the target directory
    console.log(`Copying files from ${sourceDir} to ${targetDir}`);
    await fs.copy(sourceDir, targetDir);

    console.log("Files copied successfully!");
  } catch (error) {
    console.error("Error during copy operation:", error);
    process.exit(1);
  }
}

copyDist();
