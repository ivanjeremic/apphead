import { H3Event, EventHandlerRequest } from "h3";
import { subjects } from "../auth/subjects";
import { client, setTokens } from "./auth";

export async function verifyAuth(event: H3Event<EventHandlerRequest>) {
  const accessToken = getCookie(event, "access_token");
  const refreshToken = getCookie(event, "refresh_token");

  if (!accessToken) {
    return false;
  }

  const verified = await client.verify(subjects, accessToken, {
    refresh: refreshToken,
  });

  if (verified.err) {
    return false;
  }

  if ('tokens' in verified) {
    await setTokens(event, verified.tokens.access, verified.tokens.refresh);
  }

  return 'subject' in verified ? verified.subject : null;
}

export async function login(event: H3Event<EventHandlerRequest>) {
  const accessToken = getCookie(event, "access_token");
  const refreshToken = getCookie(event, "refresh_token");

  if (accessToken) {
    const verified = await client.verify(subjects, accessToken, {
      refresh: refreshToken,
    });

    if (!verified.err && 'tokens' in verified) {
      await setTokens(event, verified.tokens.access, verified.tokens.refresh);

      sendRedirect(event, "/");
    }
  }

  const host = getRequestHeader(event, "host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const { url } = await client.authorize(
    `${protocol}://${host}/api/callback`,
    "code"
  );

  return sendRedirect(event, url);
}

export async function logout(event: H3Event<EventHandlerRequest>) {
  deleteCookie(event, "access_token");
  deleteCookie(event, "refresh_token");

  return sendRedirect(event, "/");
}
