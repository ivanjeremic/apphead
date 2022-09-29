import { join } from "path";
import { __dirname } from "../utils/helpers.js";

export default async function registerPanel(fastify, options) {
  fastify.register(import("@fastify/static"), {
    root: join(__dirname, "..", "panel/dist"),
  });
  fastify.get("/admin", function (req, reply) {
    reply.sendFile("index.html");
  });
  fastify.get("/admin/*", function (req, reply) {
    reply.sendFile("index.html");
  });
}