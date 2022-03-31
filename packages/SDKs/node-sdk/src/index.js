const { open } = require('lmdb');
const { fetch } = require('undici');

/**
 * @param {string} collection
 * @returns {Promise<void>}
 * @description Write to DomeDB
 */
async function write(collection) {
  const isNotServerLess = true;
  const isOffline = true;

  /* *********************************************************************************** */
  /* write to local.mdb for data sync or if this is the main database write always here. */
  /* *********************************************************************************** */
  if (isNotServerLess && isOffline) {
    const db = open({
      path: 'local',
      // any options go here, we can turn on compression like this:
      compression: true,
    });

    await myDB.put(collection, { someText: 'Hello, World!' });
  }

  /* ************* */
  /* write cluster */
  /* ************* */
  await fetch(process.env.DOMEDB, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      account: 'shenfq',
      password: '123456',
    }),
  });

  if (rsp.status !== 200) {
    console.log(rsp.status);
    return;
  }

  const json = await rsp.json();

  console.log(rsp.status, json);
}

module.exports = { write };
