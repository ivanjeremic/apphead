/**
 * core-plugin
 *
 * @param {*} db
 * @param {*} opts
 * @param {*} next
 */
export default async function (db, opts, next) {
  /* await db.register(import("fastify-http-proxy"), {
    upstream: "http://localhost:3002",
  }); */

  await db.register(import('./plugins/core-db.js'));

  await db.register(import('./plugins/core-mail.js'));

  await db.register(import('@domedb/graphql'));

  await db.register(import('@domedb/panel'));
}
