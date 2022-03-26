const { join } = require("path");

const isDev = process.env.NODE_ENV !== "production";

async function main(db, _opts, _next) {
  await db
    .register(import("fastify-nextjs"), {
      dev: isDev,
      dir: isDev ? join(__dirname) : "./node_modules/@domedb/panel",
      conf: {
        distDir: '.domedb',
        poweredByHeader: false,
      },
    })
    .after(() => {
      db.next("/domedb/:db");
      db.next("/domedb/:db/clusters");
      db.next("/domedb/:db/users");
      db.next("/domedb/:db/media");
      db.next("/domedb/:db/triggers");
      db.next("/domedb/:db/functions");
      db.next("/domedb/:db/web-hosting");
      db.next("/domedb/:db/plugins");
      db.next("/domedb/:db/settings");
    });
}

module.exports = main;
