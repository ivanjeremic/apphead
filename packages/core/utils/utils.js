import ObjectID from 'bson-objectid';

/**
 *
 * @param {*} db
 * @param {Array} docs
 */
export default async function produceDocs(db, docs) {
  let insertedDocuments = [];

  for (const doc of docs) {
    const _id = ObjectID();

    const final = { ...{ _id }, ...doc };

    insertedDocuments.push(final);

    await db.put(String(_id), final);
  }

  return insertedDocuments;
}
