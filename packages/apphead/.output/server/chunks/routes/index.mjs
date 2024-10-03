import { e as eventHandler } from '../runtime.mjs';
import { c as createApp } from '../_/index.mjs';
import { parse } from 'url';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'next';

const dev = false;
const app = createApp({ dev });
const handle = app.getRequestHandler();
const index = eventHandler((event) => {
  if (event.path) {
    const parsedUrl = parse(event.node.req.url, true);
    return app.prepare().then(() => {
      return handle(event.node.req, event.node.res, parsedUrl);
    }).catch((error) => {
      throw error;
    });
  }
});

export { index as default };
//# sourceMappingURL=index.mjs.map
