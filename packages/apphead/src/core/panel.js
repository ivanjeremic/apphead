import { join } from "path";
import { __dirname } from "../utils/helpers.js";

export default async function registerPanel(app, options) {
  app.register(import("@fastify/static"), {
    root: join(__dirname, "..", "panel/dist"),
  });
  app.get("/admin", function (req, reply) {
    reply.sendFile("index.html");
  });
  app.get("/admin/*", function (req, reply) {
    reply.sendFile("index.html");
  });
}