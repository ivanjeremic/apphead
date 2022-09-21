import { createWriteStream } from "fs";
import { unlink } from "fs/promises";
import { pipeline } from "stream/promises";

export default async function pluginSystem(fastify, options) {
  // install plugin
  fastify.post("/plugins/install", async (request, reply) => {
    const fileOptions = { limits: { fileSize: 1000 } };
    const data = await request.file(fileOptions);
    await pipeline(
      data.file,
      createWriteStream(options.pluginPath(data.filename))
    );

    const { default: runPlugin } = await import(
      options.pluginPath(data.filename)
    );
    const plugin = await runPlugin();

    // onInstall hook
    plugin.onInstall();

    reply.send();
  });

  // activate plugin
  fastify.get("/plugin/activate", async (request, reply) => {
    // activate
    reply.send();
  });

  // delete plugin
  fastify.delete("/plugin/delete/:pluginName", async (request, reply) => {
    const { pluginName } = request.params;
    const { default: runPlugin } = await import(options.pluginPath(pluginName));
    const plugin = await runPlugin();

    // onInstall hook
    plugin.onRemove();
    await unlink(options.pluginPath(pluginName));

    reply.send();
  });

  // process plugin api endpoint request.
  fastify.get("/plugin/:pluginName/:api/:endpoint", async (request, reply) => {
    const { pluginName, api, endpoint } = request.params;
    const { default: runPlugin } = await import(options.pluginPath(pluginName));
    const plugin = await runPlugin();

    if (!!api && !!endpoint) {
      plugin[api][endpoint](request, reply);
    }

    return { name: plugin.name };
  });
}
