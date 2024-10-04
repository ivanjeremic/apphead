import { createApp } from "../../../ui/index";
import { parse } from "url";

const dev = process.env.NODE_ENV !== "production";
const app = createApp({ dev });
const handle = app.getRequestHandler();

export default eventHandler((event) => {
  if (event.path) {
    const parsedUrl = parse(event.node.req.url!, true);

    return app
      .prepare()
      .then(() => {
        return handle(event.node.req, event.node.res, parsedUrl);
      })
      .catch((error) => {
        throw error;
      });
  }
});
