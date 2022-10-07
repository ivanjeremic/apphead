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

// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

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
        element={<Nav />}
        action={async ({ request, params }) => {
          if (request.method === "POST") {
            let formData = await request.formData();
            let collection = formData.get("collectionName");

            const res = await fetch(
              "http://localhost:3000/admin/collections/createCollection",
              {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                  "Content-Type": "application/json",
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({
                  database: "apphead",
                  collection,
                }),
              }
            );

            if (!res.ok) throw res;
            return { ok: true };
          }
        }}
      >
        <Route path="collections/create" element={<h1>pages</h1>} />
      </Route>
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
