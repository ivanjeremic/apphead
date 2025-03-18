// scripts/start-frontend.js
const { exec } = require("child_process");
const path = require("path");

const frontendPath = path.resolve(process.cwd(), "..", "frontend");
const command = `cd ${frontendPath} && bun run start`; // Force node

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});
