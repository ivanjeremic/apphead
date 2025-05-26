import { spawn } from "bun";

const caddyfileString = `
:3003 {
  reverse_proxy localhost:3000
}
`;

const caddyProcess = spawn({
	cmd: ["caddy", "run", "--adapter", "caddyfile", "--config", "-"],
	stdin: new TextEncoder().encode(caddyfileString),
	stdout: "inherit",
	stderr: "inherit",
});

console.log("🚀 Caddy launched on http://localhost:3003");
