import fs from "fs/promises";
import { open } from "lmdb";
import FastifyNext from "fastify-nextjs";

export default async function (db, opts, next) {
  db.get("/fox", (request, reply) => {
    reply.send({ fox: "fox" });
  });

  db.register(FastifyNext).after(() => {
    db.next("/");
    db.next("/domedb");
    db.next("/domedb/:db");
    db.next("/domedb/:db/clusters");
  });
}
