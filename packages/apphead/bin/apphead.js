#!/usr/bin/env node
import { apphead_fastify } from "../src/core/web-frameworks/fastify/fastify.js";
import { setup } from "../src/core/api/setup/setup.js";


export const db = new Map([["foo", "baar"]])

await setup()

apphead_fastify();