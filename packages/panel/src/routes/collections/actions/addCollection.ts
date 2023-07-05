export async function addCollection({ request, params }: any) {
  if (request.method === "POST") {
    let formData = await request.formData();
    let collection = formData.get("collectionName");

    const res = await fetch(
      "http://localhost:3001/admin/collections/createCollection",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
          database: "apphead",
          collection,
        }),
      }
    );

    if (!res.ok) throw res;
    return { ok: true };
  }
}
