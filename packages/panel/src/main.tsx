import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  collectionsLoader,
  collectionsAction,
  CollectionsOutlet,
} from "./routes/collections";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/admin" element={<MainLayout />}>
      <Route path="apps" element={<h1>apps today</h1>} />
      <Route
        path="collections"
        loader={collectionsLoader}
        element={<CollectionsOutlet />}
        action={collectionsAction}
        errorElement={<div>Err</div>}
      >
        <Route path="create" element={<h1>pages</h1>} />
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
