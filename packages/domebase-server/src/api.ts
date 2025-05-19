import { Hono } from "hono";

const app = new Hono();

export function domebaseServer(db: any) {
	app.get("/api/books", async (c) => {
		const colls = await db.query({ collection: "__collections" });

		return c.json(colls);
	});

	return app;
}
