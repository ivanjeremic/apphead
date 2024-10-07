import {
  AppheadAdapter,
  GitHub,
  Lucia,
  DatabaseUser,
} from "@apphead/authentication";
import { db, dbsql } from "./db";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";

const adapter = new BetterSqlite3Adapter(dbsql, {
  user: "user",
  session: "session",
});

/* const adapter = new AppheadAdapter(db, {
  user: "user",
  session: "session",
}); */

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      githubId: attributes.github_id,
      username: attributes.username,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DatabaseUser, "id">;
  }
}

export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!
);
