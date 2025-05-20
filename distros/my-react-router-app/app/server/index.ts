import { Hono } from "hono";
import { createHonoServer } from "react-router-hono-server/node";
import { API_BASENAME, app } from "./api";
import { getLoadContext } from "./context";

// Create a root Hono app
const server = new Hono();

// Mount the API app at /api
server.route(API_BASENAME, app);

export default await createHonoServer({
	// Pass the root Hono app to the server.
	// It will be used to mount the React Router app on the `basename` defined in react-router.config.ts
	app: server,
	getLoadContext,
});
