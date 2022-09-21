import { mkdir, access } from "fs/promises";
import Fastify from "fastify";
import chalk from "chalk";

const logInfoServerStart = (t) => console.log(chalk.bgYellowBright(t));

export async function bootstrap({
  isDev,
  registerPanel,
  pluginSystem,
  prisma,
  pluginPath,
  panelDistPath,
  pluginFolderPath
}) {
  const fastify = Fastify();

  try {
    await access(pluginFolderPath);
  } catch (error) {
    await mkdir(pluginFolderPath);
  }

  fastify.register(import("@fastify/multipart"));
  fastify.register(import(registerPanel), { panelDistPath });
  fastify.register(import(pluginSystem), { pluginPath });
  fastify.register(import(prisma));

  /**
   * Run the server!
   */
  const start = async () => {
    const port = 3000;

    try {
      await fastify.listen({ port });

      logInfoServerStart(
        `Running ${isDev ? "Development" : "Production"} mode on port ${port}.`
      );
    } catch (err) {
      fastify.log.error(err);
      console.log(err);
      process.exit(1);
    }
  };
  start();
}
