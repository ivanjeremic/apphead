// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightVersions from "starlight-versions";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Apphead",
      social: {
        github: "https://github.com/withastro/starlight",
      },
      sidebar: [
        {
          label: "Guides",
          autogenerate: {directory: "guides"}
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
      plugins: [
        starlightVersions({
          versions: [
            { slug: "1.0" },
            { slug: "2.0" },
            { slug: "auth" },
            { slug: "lucia" },
            { slug: "contributing" },
          ],
        }),
      ],
    }),
  ],
});
