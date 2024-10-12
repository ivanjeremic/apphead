import {
  AppleCredentials,
  GitHub,
  Google,
  Apple,
  generateState,
  Session,
  AuthClient,
  DatabaseUserGitHub,
  BetterSqlite3Adapter,
} from "..";

/**
 * @TUTORIAL https://www.youtube.com/watch?v=v8NJt5REvck
 */

type BASE<T> = T & {
  handleSignUp: (user: any) => void;
  handleSignIn(session: Session): Promise<void>;
  handleSignOut: (sessionId: string) => Promise<void>;
  fetchSession: (user: any) => void;
  updateSessionExpiry: (
    sessionId: string,
    updateExpiresAt: Date
  ) => Promise<void>;
  sessionConfig?: any;
  cookieConfig?: any;
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
    google?: BASE<{}>;
  };
};

const adapter = new BetterSqlite3Adapter(db, {
  user: "user",
  session: "session",
});

export class FutureAuth {
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

  private authClient: AuthClient<
    Record<never, never>,
    { githubId: number; username: string }
  >;
  private validate: ((a: any, b: any) => Promise<any>) | (() => void);

  // oauth instances
  private github: GitHub;
  private apple: Apple;

  constructor({ prepare, strategies }: Options) {
    this.authClient = new AuthClient(adapter, {
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

    prepare()
      .then(() => {
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
      })
      .catch((error) => {
        throw new Error(
          `Something went wrong in 'async prepare() {...}' - ${error}`
        );
      });
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

  /*
    const { user, session } = await validateRequest({
    getSessionCookie: (cookieName) => getCookie(event, cookieName),
    setSessionCookie: (cookie) =>
      setCookie(event, cookie.name, cookie.value, cookie.attributes),
  });
  */

  async validateSession({ getSessionCookie, setSessionCookie }: any) {
    const sessionId =
      getSessionCookie(this.authClient.sessionCookieName) ?? null;

    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await this.authClient.validateSession(sessionId);

    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = this.authClient.createSessionCookie(
          result.session.id
        );

        setSessionCookie(sessionCookie);
      }
      if (!result.session) {
        const sessionCookie = this.authClient.createBlankSessionCookie();
        setSessionCookie(sessionCookie);
      }
    } catch {}

    return result;
  }
}
