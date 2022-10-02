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
import Nav from "./components/Nav";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
            "http://localhost:3000/admin/collections/getCollectionNames?database=apphead"
          );
          console.log(data);
          return data;
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
