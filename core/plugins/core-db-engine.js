import fs from "fs/promises";
import { open } from "lmdb";

export default async function (db, opts, next) {
  db.get("/fox", (request, reply) => {
    reply.send({ fox: "fox" });
  });
}
