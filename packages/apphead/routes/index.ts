import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "./ui" });
const handle = app.getRequestHandler();

export default eventHandler((event) => {
  if (`if theme is of type nextjs`) return `serve nextjs theme from location`;
});
