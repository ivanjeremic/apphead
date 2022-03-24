export default async function (db, opts, next) {
  await db
    .register(import("fastify-nextjs"), {
      dev: process.env.NODE_ENV !== "production",
      dir: "./node_modules/domedb-panel",
      conf: {
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
