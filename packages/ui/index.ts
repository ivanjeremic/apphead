import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  dir: "../ui",
});
const handle = app.getRequestHandler();

export { app, handle };
