import type { Config } from "@react-router/dev/config";
import path from "path";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  basename: "/admin",
  buildDirectory: path.resolve("..", "domebase", "build"),
  ssr: true,
} satisfies Config;
