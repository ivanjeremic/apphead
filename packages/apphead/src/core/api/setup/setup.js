import { mkdir, access } from "node:fs/promises";
import { totalmem, freemem } from "node:os";
import { apphead_fastify } from "../../web-frameworks/fastify/fastify.js";
import { AJC } from "../database/AJC.js";

export async function setup(options) {
  const cache = new AJC(options.cacheMaxAge);

  console.log("totalmem", (totalmem() / (1024 * 1024)));
  console.log("freemem", (freemem() / (1024 * 1024)));

  try {
    await access(".apphead");
  } catch (error) {
    await mkdir(".apphead");
    await mkdir(`./.apphead/apphead-data`);
    await mkdir(`./.apphead/apphead-plugins`);
    await mkdir(`./.apphead/apphead-media`);
  }

  if (options.webframework === "fastify") {
    await apphead_fastify(cache);
  }
}
