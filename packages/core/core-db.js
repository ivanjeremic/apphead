import fs from "fs/promises";
import { open } from "lmdb";

export default async function (db, opts, next) {
  // get list of all databases in current cluster????
  db.get("/admindb/databases", async (request, reply) => {
    const dbs = await fs.readdir("databases");

    reply.send({ data: request.query.databases });
  });

  // some other endpoint
  db.get("/admindb", async (request, reply) => {
    let currentDB = open({
      path: `databases/admindb`,
      // any options go here, we can turn on compression like this:
      compression: true,
    });

    await currentDB.put("admindb", {
      clusters: [{ name: "c1", uri: "https://foo/api", databases: [] }],
    });

    const res = currentDB.get("admindb");

    reply.send({ data: res });
  });

  // test database
  db.get("/www", async (request, reply) => {
    let currentDB = open({
      path: `databases/my-db`,
      // any options go here, we can turn on compression like this:
      compression: true,
    });

    await currentDB.put("greeting", { someText: "Hello, World!" });

    reply.send({ data: "" });
  });
}
