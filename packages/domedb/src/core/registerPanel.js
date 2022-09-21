export default async function registerPanel(fastify, options) {
  fastify.register(import("@fastify/static"), {
    root: options.panelDistPath,
  });
  fastify.get("/admin", function (req, reply) {
    reply.sendFile("index.html");
  });
}
