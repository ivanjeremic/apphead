import Core from "../core/plugins/domedb-core.js";

export default async function (db, opts, next) {
  db.register(Core);
}
