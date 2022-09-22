import { mkdir, access } from "fs/promises";
import { join, resolve } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import Fastify from "fastify";
import autoLoad from "@fastify/autoload";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PLUGIN_FOLDER = resolve("./plugins")
const PRISMA_FOLDER = resolve("./prisma")
const MEDIA_FOLDER = resolve("./media")
const logInfoServerStart = (t) => console.log(chalk.bgYellowBright(t));

export async function bootstrap({ isDev }) {
  const fastify = Fastify();

  try {
    await access(PLUGIN_FOLDER);
  } catch (error) {
    await mkdir(PLUGIN_FOLDER);
  }

  try {
    await access(PRISMA_FOLDER);
  } catch (error) {
    await mkdir(PRISMA_FOLDER);
  }

  try {
    await access(MEDIA_FOLDER);
  } catch (error) {
    await mkdir(MEDIA_FOLDER);
  }

  await fastify.register(import("@fastify/multipart"));
  await fastify.register(import("@fastify/swagger"), {
    routePrefix: "/documentation",
    swagger: {
      info: {
        title: "Test swagger",
        description: "Testing the Fastify swagger API",
        version: "0.1.0",
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
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

  await fastify.register(import(join(__dirname, "core/panel.js")));
  await fastify.register(import(join(__dirname, "core/plugins.js")));
  await fastify.register(import(join(__dirname, "core/prisma.js")));

  //??? log paths to see
  /* await fastify.register(autoLoad, {
    dir: join(__dirname, "core"),
  }); */

  /**
   * Run the server!
   */
  const start = async () => {
    const port = 3000;

    try {
      await fastify.listen({ port });

      logInfoServerStart(
        `Running ${isDev ? "Development" : "Production"} mode on port ${port}.`
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
