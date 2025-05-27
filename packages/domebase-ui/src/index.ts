import { Hono } from "hono";

const app = new Hono();

app.get("/domebase/api", (c) => c.text("Hello Vite!"));

export default app;
