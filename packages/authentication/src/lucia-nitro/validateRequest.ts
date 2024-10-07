import { Session, User } from "lucia";
import { H3Event, EventHandlerRequest, getCookie, setCookie } from "h3";

export type VALIDATE_REQ = Promise<
  { user: User; session: Session } | { user: null; session: null }
>;

export async function validateRequest(
  event: H3Event<EventHandlerRequest>,
  lucia: {
    sessionCookieName: string;
    validateSession: (arg0: string) => any;
    createSessionCookie: (arg0: any) => any;
    createBlankSessionCookie: () => any;
  }
) {
  const sessionId = getCookie(event, lucia.sessionCookieName) ?? null;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  // next.js throws when you attempt to set cookie when rendering page
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      setCookie(
        event,
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      setCookie(
        event,
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}
  return result;
}
