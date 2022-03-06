import FastifyNext from "fastify-nextjs";

export default async function (db, opts, next) {
  db.register(FastifyNext).after(() => {
    db.next("/admin");
    db.next("/admin/:path");
  });
}
