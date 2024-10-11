import {
  DatabaseUser,
  generateId,
  OAuth2RequestError,
} from "@apphead/authentication";
import { auth, github } from "~/utils/auth";
import { db } from "~/utils/db";

export default defineEventHandler(async (event) => {
  const q = getQuery(event);
  const storedState = getCookie(event, "github_oauth_state") ?? null;
  if (!q.code || !q.state || !storedState || String(q.state) !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(String(q.code));
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();
    const existingUser = db
      .prepare("SELECT * FROM user WHERE github_id = ?")
      .get(githubUser.id) as DatabaseUser | undefined;

    if (existingUser) {
      const session = await auth.createSession(existingUser.id, {});
      const sessionCookie = auth.createSessionCookie(session.id);
      setCookie(
        event,
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const userId = generateId(15);

    db.prepare(
      "INSERT INTO user (id, github_id, username) VALUES (?, ?, ?)"
    ).run(userId, githubUser.id, githubUser.login);
    const session = await auth.createSession(userId, {});
    const sessionCookie = auth.createSessionCookie(session.id);
    setCookie(
      event,
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    if (
      e instanceof OAuth2RequestError &&
      e.message === "bad_verification_code"
    ) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
});

interface GitHubUser {
  id: string;
  login: string;
}
