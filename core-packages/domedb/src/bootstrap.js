import Fastify from "fastify";
import { join } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const isDev = process.env.NODE_ENV !== "production";

export function bootstrap(isDev) {
  const fastify = Fastify();

  fastify.register(import("@fastify/static"), {
    root: join(__dirname, "..", "panel/dist"),
  });

  fastify.get("/", function (req, reply) {
    reply.sendFile("index.html");
  });

  fastify.register(import("@fastify/multipart"));

  fastify.register(import("./pluginSystem.js"), {});

  /**
   * Run the server!
   */
  const start = async () => {
    try {
      await fastify.listen({ port: 3000 });
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };
  start();
}
