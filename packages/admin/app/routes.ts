import type { RouteConfig } from "@react-router/dev/routes";
import { index, route, layout } from "@react-router/dev/routes";

export const routes: RouteConfig = [
  index("routes/home.tsx"),
  route("about", "./routes/about.tsx"),
];
