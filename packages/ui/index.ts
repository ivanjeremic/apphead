import next from "next";

const createApp = ({ dev }: { dev: boolean }) =>
  next({
    dev,
    dir: dev ? "../ui" : undefined,
  });

export { createApp };
