import { join } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import Fastify from "fastify";
import autoLoad from "@fastify/autoload";
import pc from "picocolors";
import { IS_DEV } from "../../../utils/CONSTANTS.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logInfoServerStart = (t) => console.log(pc.green(pc.italic(t)));

export async function apphead_fastify() {
  const app = Fastify();

  await app.register(import("@fastify/cors"), {
    // put your options here
    origin: (origin, cb) => {
      // @ts-ignore
      const hostname = new URL(origin).hostname;
      if (hostname === "localhost") {
        //  Request from localhost will pass
        cb(null, true);
        return;
      }
      // Generate an error on other origins, disabling access
      cb(new Error("Not allowed"), false);
    },
  });
  await app.register(import("@fastify/helmet"));
  await app.register(import("@fastify/multipart"));
  await app.register(import("@fastify/swagger"), {
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

  await app.register(autoLoad, {
    dir: join(__dirname, "plugins"),
    forceESM: true,
  });

  const port = 3001;

  try {
    await app.listen({ port });

    logInfoServerStart(
      `Running AppHead in ${
        IS_DEV ? "Development" : "Production"
      } mode on port ${port}.`
    );
  } catch (err) {
    app.log.error(err);
    console.log(err);
    process.exit(1);
  }

  await app.ready();
  app.swagger();
}
