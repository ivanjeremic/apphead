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
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Getting-started", slug: "guides/getting-started" },
            { label: "Installation", slug: "guides/installation" },
          ],
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
