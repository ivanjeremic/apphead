export default async function (db, opts, next) {
  /**
   * @TODO Implement proxying.
   * */
  /* await db.register(import("fastify-http-proxy"), {
    upstream: "http://localhost:3002",
  }); */

  await db.register(import("./core-db-engine.js"));

  await db.register(import("./core-mail.js"));

  await db.register(import("./core-admin-panel.js"));
}
