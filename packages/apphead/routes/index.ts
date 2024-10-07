import { validateRequest } from "@apphead/authentication";
import { lucia } from "~/utils/auth";
import { html } from "~/utils/html";

export default eventHandler(async (event) => {
  const { user } = await validateRequest(event, lucia);
  const act = getQuery(event);

  console.log("RR", act.do);

  if (!user) {
    return html`
    <html>
      <meta>
        <title>Login</title>
      </meta>
  
      <body>
      <h1>Please Login</h1>
        <button type="button" onclick="displayDate()">Click me to display Date and Time.</button>
        <form action="?do=logout" method="post">
          <label label for="fname">First name:</label>
          <input type="text" id="fname" name="fname"><br><br>
          <label for="lname">Last name:</label>
          <input type="text" id="lname" name="lname"><br><br>
          <input type="submit" value="Submit">
        </form>
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
      <h1>Dashboard</h1>
      <h2>Logout</h2>
      <form action="?do=logout" method="post">
          <label label for="fname">First name:</label>
          <input type="text" id="fname" name="fname"><br><br>
          <label for="lname">Last name:</label>
          <input type="text" id="lname" name="lname"><br><br>
          <input type="submit" value="Submit">
      </form>
      <script src="/main.js"></script>
    </body>
   </html>
   `;
});
