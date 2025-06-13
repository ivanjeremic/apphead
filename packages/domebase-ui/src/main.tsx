import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { CollectionsPage } from "./pages/CollectionsPage";
import { HomePage } from "./pages/HomePage";
import { FunctionsPage } from "./pages/FunctionsPage";
import { ThemeEditorPage } from "./pages/ThemeEditorPage";
import { UsersPage } from "./pages/UsersPage";
import { LoginPage } from "./pages/LoginPage";
import { PluginMarketplace } from "./pages/plugin-marketplace";
import { HomeLayout } from "./components/home-layout";
import { LoginLayout } from "./components/login-layout";
import { SettingsPage } from "./pages/SettingsPage";
import { AddCollectionPage } from "./pages/AddCollectionPage";
import { domebase } from "./lib/domebase";

import "./index.css";
// Import Swiper styles
import 'swiper/css';

const router = createBrowserRouter(
  [
    {
      path: "/login",
      Component: LoginLayout,
      children: [
        {
          index: true,
          Component: LoginPage,
        },
      ],
    },
    {
      Component: HomeLayout,
      loader: async () => {
        const data = await domebase.query({ collection: "__collections" });

        return data;
      },
      children: [
        {
          index: true,
          Component: HomePage,
        },
        {
          path: "collections",
          children: [
            {
              index: true,
              Component: CollectionsPage,
            },
            {
              path: "add",
              Component: AddCollectionPage,
              action: async ({ request }) => {
                let formData = await request.formData();
                let username = formData.get("username");
                await domebase.insert({
                  collectionName: "__collections",
                  data: { collectionName: username, schema: {} },
                });
                return true;
              },
            },
          ],
        },
        {
          path: "users",
          Component: UsersPage,
        },
        {
          path: "functions",
          loader: async () => {
            // Placeholder for future page loader
          },
          Component: FunctionsPage,
        },
        {
          path: "website",
          loader: async () => {
            // Placeholder for future page loader
          },
          Component: ThemeEditorPage,
        },
        {
          path: "plugin-marketplace",
          loader: async () => {
            // Placeholder for future page loader
          },
          Component: PluginMarketplace,
        },
        {
          path: "settings",
          loader: async () => {
            // Placeholder for future page loader
          },
          Component: SettingsPage,
        },
      ],
    },
  ],
  {
    basename: "/domebase",
  },
);

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
