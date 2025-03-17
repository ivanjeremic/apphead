import { createServer } from "vite";

export default defineNitroPlugin(async () => {
  console.log("viiiiite!!!");
  const vite = await createServer();

  await vite.listen();
  vite.printUrls();
});
