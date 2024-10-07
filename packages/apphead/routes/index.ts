import { validateRequest } from "@apphead/authentication";
import { lucia } from "~/utils/auth";
import { html } from "~/utils/html";

export default eventHandler(async (event) => {
  const { user, session } = await validateRequest(event, lucia);
  const act = getQuery(event);

  console.log("Index");

  if (user && act.do === "logout") {
    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

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
