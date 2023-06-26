#!/usr/bin/env node
import { setup } from "../src/core/api/setup/setup.js";
import { cac } from 'cac'

const cli = cac('apphead')

cli
  .command('dev', 'Start dev server')
  .option('--clear-screen', 'Clear screen')
  .action((options) => {
    console.log(options.clearScreen)
  })

const parsed = cli.parse()

console.log(JSON.stringify(parsed, null, 2))

await setup({ webframework: "fastify", cacheMaxAge: 3600 });
