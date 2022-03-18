import FastifyNext from "fastify-nextjs";

export default async function (db, opts, next) {
  db.register(FastifyNext).after(() => {
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
