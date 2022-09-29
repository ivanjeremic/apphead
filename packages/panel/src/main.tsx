import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  defer,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import "./index.css";
import Nav from "./components/Nav";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Users", href: "#", icon: HomeIcon, current: true, count: "System" },
  {
    name: "Pages",
    href: "#",
    icon: UsersIcon,
    current: false,
    count: "System",
  },
];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/admin" element={<MainLayout />}>
      <Route path="apps" element={<h1>apps</h1>} />
      <Route
        path="collections"
        loader={async () => {
          const data = await fetch(
            "https://jsonplaceholder.typicode.com/todos/1"
          ).then((response) => response.json());

          return defer({
            data,
          });
        }}
        element={<Nav navigation={navigation} />}
      />
      <Route path="pages" element={<h1>pages</h1>} />
      <Route path="media" element={<h1>media</h1>} />
      <Route path="plugins" element={<h1>plugins</h1>} />
      <Route path="advanced" element={<h1>advanced</h1>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
