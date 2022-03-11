import fs from "fs/promises";
import { open } from "lmdb";

export default async function (db, opts, next) {
  db.get("/www", (request, reply) => {
    reply.send({ www: "www" });
  });
}
