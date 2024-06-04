import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";

import tailwindConfig from "./tailwind.config.js";

//https://nitro.unjs.io/config
export default defineNitroConfig({
  rollupConfig: {
    plugins: [
      postcss({
        extensions: [".css"],
        plugins: [tailwindcss(tailwindConfig)],
      }),
    ],
  },
});
