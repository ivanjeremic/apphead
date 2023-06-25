export async function getCollectionNames(req, res) {
  const { database } = req.query;

  console.log("foooooo")
    try {
      res.send([{name:"users"},{name:"cars"}]);
    } catch (error) {
      console.dir(error);
    }
}