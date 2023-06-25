import { mkdir, access } from "fs/promises";
import { apphead_fastify } from "../../web-frameworks/fastify/fastify.js";
import { AJC } from "../database/AJC.js";

export async function setup() {
  const cache = new AJC()

  try {
    await access(".apphead");
  } catch (error) {
    await mkdir(".apphead");
    await mkdir(`./.apphead/apphead-data`);
    await mkdir(`./.apphead/apphead-plugins`);
    await mkdir(`./.apphead/apphead-media`);
  }

  await apphead_fastify(cache);
}