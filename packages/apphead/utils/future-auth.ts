import { FutureAuth, Session } from "@apphead/authentication";

export const futureAuth = new FutureAuth({
  async prepare() {
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
  },
  cookies: (event) => ({
    get(name) {
      getCookie(event, name);
    },
    set(name, value, options) {
      setCookie(event, name, value, options);
    },
    remove(name, value, options) {
      setCookie(event, name, value, options);
    },
  }),
  strategies: {
    github: {
      clientId: "sada",
      clientSecret: "sdadadad5asds4a",
      handleSignUp(user) {
        db.prepare(
          "INSERT INTO user (id, github_id, username) VALUES (?, ?, ?)"
        ).run("108dx", user.id, user.login);
      },
      handleSignIn: async (session: Session): Promise<void> => {
        // Save the session to your database
      },
      handleSignOut: async (sessionId: string): Promise<void> => {
        // Delete the session from your database
      },
      fetchSession(user) {
        db.prepare("SELECT * FROM user WHERE github_id = ?").get(user.id);
      },
      updateSessionExpiry: async (
        sessionId: string,
        updateExpiresAt: Date
      ): Promise<void> => {
        // Update the session expiry in your database
      },
    },
  },
});
