import { createClient } from "@openauthjs/openauth/client";
import { H3Event, EventHandlerRequest } from "h3";

export const client = createClient({
  clientID: "nextjs",
  issuer: "http://localhost:3001",
});

export async function setTokens(
  event: H3Event<EventHandlerRequest>,
  access: string,
  refresh: string
) {
  setCookie(event, "access_token", access, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 34560000,
  });

  setCookie(event, "refresh_token", refresh, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 34560000,
  });
}
