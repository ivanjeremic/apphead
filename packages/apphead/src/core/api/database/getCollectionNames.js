export async function getCollectionNames(req, ajc) {
  const data = [...ajc.keys()].map((name) => ({
    name,
  }));

  return data;
}
