import { AppHeadClient } from "./client";

const db = new AppHeadClient();

await db.addCollection("posts");

await db.insert({ collection: "posts", data: [{ title: "dee" }] });
