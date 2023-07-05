import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { CollectionsOutlet } from "./routes/collections/outlet/CollectionsOutlet";
import { addCollection } from "./routes/collections/actions/addCollection";
import { collectionsLoader } from "./routes/collections/loader/collectionsLoader";
import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/admin" element={<MainLayout />}>
      <Route path="dashboard" element={<CollectionsOutlet />} />
      <Route path="apps" element={<CollectionsOutlet />} />
      <Route
        path="collections"
        loader={collectionsLoader}
        element={<CollectionsOutlet />}
        action={addCollection}
        errorElement={<div>Err</div>}
        id="/admin/collections"
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
