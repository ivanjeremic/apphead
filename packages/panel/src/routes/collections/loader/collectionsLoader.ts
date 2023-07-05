export async function collectionsLoader() {
  console.log("COLLECTION____LOADER");
  const data = await fetch(
    "http://localhost:3001/admin/collections/getCollectionNames?database=apphead"
  );

  return data;
}
