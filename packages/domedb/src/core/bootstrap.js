import Fastify from "fastify";

export function bootstrap({
  isDev,
  registerPanelPath,
  pluginSystemPath,
  pluginPath,
}) {
  console.log("400 ", registerPanelPath);

  const fastify = Fastify();

  fastify.register(import("@fastify/multipart"));
  fastify.register(import(registerPanelPath), {});
  fastify.register(import(pluginSystemPath), { pluginPath });

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
