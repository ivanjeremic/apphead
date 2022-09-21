import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";

export default async function pluginSystem(fastify, options) {
  // install plugin
  fastify.post("/plugins/install", async (request, reply) => {
    const fileOptions = { limits: { fileSize: 1000 } };
    const data = await request.file(fileOptions);
    await pipeline(data.file, createWriteStream(data.filename));
    reply.send();
  });

  // delete plugin
  fastify.post("/plugin/delete", async (request, reply) => {
    const fileOptions = { limits: { fileSize: 1000 } };
    const data = await request.file(fileOptions);
    await pipeline(data.file, createWriteStream(data.filename));
    reply.send();
  });

  // process plugin api endpoint request.
  fastify.get("/plugins/:pluginName/:api/:endpoint", async (request, reply) => {
    // @ts-ignore
    const { pluginName, api, endpoint } = request.params;
    const { default: runPlugin } = await import(`../plugins/${pluginName}.js`);
    const data = await runPlugin();

    if (!!api && !!endpoint) {
      data[api][endpoint](request, reply);
    }

    return { name: data.name };
  });
}
