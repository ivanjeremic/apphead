import { serve } from "@hono/node-server";

export function domebaseServeNode(port?: number, app: any = {}) {
	/* import ui from "@domebase/ui" with { type: "url" }; */

	serve({ port: port || 8787, fetch: app.fetch });
}
