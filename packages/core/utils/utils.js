import ObjectID from 'bson-objectid';
// import produce from 'immer';

/**
 *
 * @param {*} db
 * @param {Array} docs
 */
export default async function produceDocs(db, docs) {
  let insertedDocuments = [];

  for (const doc of docs) {
    const _id = ObjectID();

    const producedDoc = { ...{ _id }, ...doc };

    insertedDocuments.push(producedDoc);

    await db.put(String(_id), producedDoc);
  }

  return insertedDocuments;
}

/* 

const arr = await for(const doc of docs) {

  return result
}

*/
