import { client, setTokens } from "~/utils/auth/auth";

export default defineEventHandler(async (event) => {
  const url = new URL(getRequestURL(event));
  const code = url.searchParams.get("code");

  const exchanged = await client.exchange(code!, `${url.origin}/api/callback`);

  if (exchanged.err) {
    // Set the Content-Type header to application/json
    setHeader(event, "Content-Type", "application/json");

    // status code
    setResponseStatus(event, 400);

    return send(event, exchanged.err);
  }

  if ('tokens' in exchanged) {
    await setTokens(event, exchanged.tokens.access, exchanged.tokens.refresh);
  }

  return sendRedirect(event, `${url.origin}/`);
});
