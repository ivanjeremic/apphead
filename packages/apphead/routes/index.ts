import { validateRequest } from "@apphead/authentication";
import { auth } from "~/utils/auth";
import { futureAuth } from "~/utils/future-auth";
import { html } from "~/utils/html";

export default eventHandler(async (event) => {
  // future
  // const { user, session } = await futureAuth.validateSession(event);

  const { user, session } = await validateRequest(event, auth);

  const act = getQuery(event);

  if (user && act.do === "logout") {
    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    // from here on down is logout logic!!!
    // impl in logout
    await auth.invalidateSession(session.id);

    const sessionCookie = auth.createBlankSessionCookie();

    setCookie(
      event,
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return Response.redirect("/");
  }

  if (!user) {
    return html`
    <html>
      <meta>
        <title>Login</title>
      </meta>
  
      <body>
      <h1>Sign in</h1>
        <a href="/login/github">Sign in with GitHub</a>
        <script src="/main.js"></script>
      </body>
     </html>
     `;
  }

  return html`
  <html>
    <meta>
      <title>Hello Ivan</title>
    </meta>

    <body>
      <h1>Dashboard, Hello Ivan!</h1>
      <h2>Logout</h2>
      <form action="?do=logout" method="post">
        <input type="submit" value="Submit">
      </form>
      <script src="/main.js"></script>
    </body>
   </html>
   `;
});
