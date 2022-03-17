import FastifyNext from "fastify-nextjs";

export default async function (db, opts, next) {
  db.register(FastifyNext).after(() => {
    db.next("/:db");
    db.next("/:db/clusters");
    db.next("/:db/users");
    db.next("/:db/media");
    db.next("/:db/triggers");
    db.next("/:db/functions");
    db.next("/:db/web-hosting");
    db.next("/:db/plugins");
    db.next("/:db/settings");
  });
}
