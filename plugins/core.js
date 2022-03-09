import Core from "../core/plugins/core.js";

export default async function (db, opts, next) {
  db.register(Core);
}
