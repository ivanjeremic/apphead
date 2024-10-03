import { e as eventHandler } from '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';

const index = eventHandler((event) => {
  return `serve nextjs theme from location`;
});

export { index as default };
//# sourceMappingURL=index2.mjs.map
