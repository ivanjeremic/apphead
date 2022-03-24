export default async function (db, opts, next) {
  /**
   * @TODO implement proxying???.
   * */
  /* await db.register(import("fastify-http-proxy"), {
    upstream: "http://localhost:3002",
  }); */

  const dev = process.env.NODE_ENV !== "production";

  await db.register(import("./core-db.js"));

  await db.register(import("./core-mail.js"));

  // @TODO if admin panel true show it else nope
  await db.register(import("@domedb/panel"), {
    dev,
  });
}
