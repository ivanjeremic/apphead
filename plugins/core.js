import Core from "../core/egde/core.js";

export default async function (db, opts, next) {
  db.register(Core);
}
