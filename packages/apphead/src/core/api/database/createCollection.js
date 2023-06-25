export async function createCollection(req, ajc) {
  const { database, collection } = req;

  ajc.set(collection, collection);
}
