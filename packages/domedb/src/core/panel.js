import { join } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function registerPanel(fastify, options) {
  fastify.register(import("@fastify/static"), {
    root: join(__dirname, "..", "panel/dist"),
  });
  fastify.get("/admin", function (req, reply) {
    reply.sendFile("index.html");
  });
}
