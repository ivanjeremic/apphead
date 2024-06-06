import { app, handle } from "@apphead/core";
const dev = process.env.NODE_ENV !== "production";

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
