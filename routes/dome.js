import fs from "fs/promises";
import { open } from "lmdb";

export default async function (db, opts, next) {
  db.get("/dome", (request, reply) => {
    reply.send({ dome: "dome" });
  });
}
