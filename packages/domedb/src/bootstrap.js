import { mkdir, access } from "fs/promises";
import { join, resolve } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import Fastify from "fastify";
import autoLoad from "@fastify/autoload";
import helmet from "@fastify/helmet";
import chalk from "chalk";
import { IS_DEV } from "./utils/CONSTANTS.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PLUGIN_FOLDER = resolve("./plugins");
const MEDIA_FOLDER = resolve("./media");
const logInfoServerStart = (t) => console.log(chalk.bgYellowBright(t));

export async function bootstrap() {
  const fastify = Fastify();

  try {
    await access(PLUGIN_FOLDER);
  } catch (error) {
    await mkdir(PLUGIN_FOLDER);
  }

  try {
    await access(MEDIA_FOLDER);
  } catch (error) {
    await mkdir(MEDIA_FOLDER);
  }

  await fastify.register(helmet);
  await fastify.register(import("@fastify/multipart"));
  await fastify.register(import("@fastify/swagger"), {
    routePrefix: "/documentation",
    swagger: {
      info: {
        title: "Admin API",
        description: "Admin API",
        version: "0.1.0",
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Back to Dashboard",
      },
      host: "localhost",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [
        { name: "user", description: "User related end-points" },
        { name: "code", description: "Code related end-points" },
      ],
      definitions: {
        User: {
          type: "object",
          required: ["id", "email"],
          properties: {
            id: { type: "string", format: "uuid" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string", format: "email" },
          },
        },
      },
      securityDefinitions: {
        apiKey: {
          type: "apiKey",
          name: "apiKey",
          in: "header",
        },
      },
    },
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
  });

  await fastify.register(autoLoad, {
    dir: join(__dirname, "core"),
    forceESM: true
  });

  /**
   * Run the server!
   */
  const start = async () => {
    const port = 3000;

    try {
      await fastify.listen({ port });

      logInfoServerStart(
        `Running ${IS_DEV ? "Development" : "Production"} mode on port ${port}.`
      );
    } catch (err) {
      fastify.log.error(err);
      console.log(err);
      process.exit(1);
    }
  };

  await start();
  await fastify.ready();
  fastify.swagger();
}
