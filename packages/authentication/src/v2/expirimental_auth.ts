import {
  AppleCredentials,
  GitHub,
  Google,
  Apple,
  generateState,
  Session,
} from "..";

let db: any;
let id: any;

/**
 * @TUTORIAL https://www.youtube.com/watch?v=v8NJt5REvck
 */

type BASE<T> = T & {
  createUser: (user: any) => void;
  saveSession(session: Session): Promise<void>;
  fetchSession: (user: any) => void;
  updateSessionExpiry: (
    sessionId: string,
    updateExpiresAt: Date
  ) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  redirectURI?: string;
};

type Options = {
  prepare: () => Promise<void>;
  strategies: {
    basic?: BASE<{}>;
    emailPassword?: BASE<{}>;
    github?: BASE<{
      clientId: string;
      clientSecret: string;
      enterpriseDomain?: string;
    }>;
    apple?: BASE<AppleCredentials>;
    google?: any;
  };
};

class Auth {
  private strategies: {
    basic?: BASE<{}>;
    emailPassword?: BASE<{}>;
    github?: BASE<{
      clientId: string;
      clientSecret: string;
      enterpriseDomain?: string;
    }>;
    apple?: BASE<AppleCredentials>;
    google?: any;
  };

  private prepared: boolean = false;

  // oauth instances
  private github: GitHub;
  private apple: Apple;

  constructor({ prepare, strategies }: Options) {
    prepare().then(() => {
      this.prepared = true;
      this.strategies = strategies;

      if (this.strategies.github) {
        this.github = new GitHub(
          this.strategies.github.clientId,
          this.strategies.github.clientSecret,
          {
            redirectURI: this.strategies.github.clientSecret,
            enterpriseDomain: this.strategies.github.enterpriseDomain,
          }
        );
      }

      if (this.strategies.apple) {
        this.apple = new Apple(
          {
            clientId: this.strategies.apple.clientId,
            teamId: this.strategies.apple.teamId,
            keyId: this.strategies.apple.keyId,
            certificate: this.strategies.apple.certificate,
          },
          this.strategies.apple.redirectURI
            ? this.strategies.apple.redirectURI
            : ""
        );
      }
    });
  }

  async validateSession() {
    //retunr
  }

  signIn = {
    basic: async (username: string, password: string) => {
      // do
    },
    emailPassword: async (email: string, password: string) => {
      // do
    },
    github: async () => {
      const state = generateState();
      const url = await this.github.createAuthorizationURL(state);

      // setCookie
      /* setCookie(event, "github_oauth_state", state, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax",
      }); */
      return url;
    },
  };
}

/**
 * API
 */
const auth = new Auth({
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
  strategies: {
    basic: {
      createUser(user) {
        db.prepare(
          "INSERT INTO user (id, username, password) VALUES (?, ?, ?)"
        ).run("108dx", user.username, user.password);
      },
      saveSession: async (session: Session): Promise<void> => {
        // Save the session to your database
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
      deleteSession: async (sessionId: string): Promise<void> => {
        // Delete the session from your database
      },
    },
    emailPassword: {
      createUser(user) {
        db.prepare(
          "INSERT INTO user (id, email, password) VALUES (?, ?, ?)"
        ).run("108dx", user.email, user.password);
      },
      saveSession: async (session: Session): Promise<void> => {
        // Save the session to your database
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
      deleteSession: async (sessionId: string): Promise<void> => {
        // Delete the session from your database
      },
    },
    github: {
      clientId: "sada",
      clientSecret: "sdadadad5asds4a",
      createUser(user) {
        db.prepare(
          "INSERT INTO user (id, github_id, username) VALUES (?, ?, ?)"
        ).run("108dx", user.id, user.login);
      },
      saveSession: async (session: Session): Promise<void> => {
        // Save the session to your database
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
      deleteSession: async (sessionId: string): Promise<void> => {
        // Delete the session from your database
      },
    },
    google: {
      createUser(user) {
        db.prepare(
          "INSERT INTO user (id, github_id, username) VALUES (?, ?, ?)"
        ).run("108dx", user.id, user.login);
      },
      saveSession: async (session: Session): Promise<void> => {
        // Save the session to your database
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
      deleteSession: async (sessionId: string): Promise<void> => {
        // Delete the session from your database
      },
    },
    apple: {
      clientId: "",
      teamId: "",
      certificate: "",
      keyId: "",
      createUser(user) {
        db.prepare(
          "INSERT INTO user (id, github_id, username) VALUES (?, ?, ?)"
        ).run("108dx", user.id, user.login);
      },
      saveSession: async (session: Session): Promise<void> => {
        // Save the session to your database
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
      deleteSession: async (sessionId: string): Promise<void> => {
        // Delete the session from your database
      },
    },
  },
});

await auth.signIn.emailPassword("me@gmail.com", "2sad4as554asd5");

await auth.signIn.github();
