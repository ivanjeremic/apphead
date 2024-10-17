import {
  sqlite,
  AuthClient,
  GitHub,
  DatabaseUser,
  DatabaseUserGitHub,
  AppheadAdapter,
  BetterSqlite3Adapter,
} from "@apphead/authentication";

export const db = sqlite("main.db");

db.exec(`CREATE TABLE IF NOT EXISTS user (
  id TEXT NOT NULL PRIMARY KEY,
  github_id INTEGER UNIQUE,
  username TEXT NOT NULL
)`);

db.exec(`CREATE TABLE IF NOT EXISTS session (
  id TEXT NOT NULL PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
)`);

const adapter = new BetterSqlite3Adapter(db, {
  user: "user",
  session: "session",
});

/* const adapter = new AppheadAdapter(db, {
  user: "user",
  session: "session",
}); */

export const auth = new AuthClient(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes: DatabaseUserGitHub) => {
    return {
      githubId: attributes.github_id,
      username: attributes.username,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof auth;
    DatabaseUserAttributes: Omit<DatabaseUserGitHub, "id">;
  }
}

export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!
);
