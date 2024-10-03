import next from 'next';

const createApp = ({ dev }) => next({
  dev,
  dir: dev ? "../ui" : void 0
});

export { createApp as c };
//# sourceMappingURL=index.mjs.map
