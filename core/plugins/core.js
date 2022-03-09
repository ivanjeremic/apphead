export default async function (db, opts, next) {
  await db.register(import("./core-mail.js"));

  await db.register(import("./core-admin-panel.js"));
}
