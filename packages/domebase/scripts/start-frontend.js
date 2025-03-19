// scripts/start-frontend.js
const { exec } = require("child_process");
const path = require("path");

const frontendPath = path.resolve(process.cwd(), "..", "frontend");
const command = `cd ${frontendPath} && bun run start`;

try {
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

  console.info("FRONTEND STARTED ON http://localhost:3000/");
} catch (error) {
  console.error(error);
}
