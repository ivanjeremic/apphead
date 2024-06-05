import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  dir: "./ui",
  conf: {
    distDir: "../.nitro",
  },
});
const handle = app.getRequestHandler();

export default eventHandler((event) => {
  if (event.path)
    return app
      .prepare()
      .then(() => {
        return handle(event.node.req, event.node.res);
      })
      .catch((error) => {
        throw error;
      });
});
