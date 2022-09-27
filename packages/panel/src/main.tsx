import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="contact" element={<div>contact</div>} />
      <Route path="dashboard" element={<h1>dashboard</h1>} />
      <Route
        element={((children) => (
          <div style={{ color: "blue" }}>{children}</div>
        ))()}
      >
        <Route path="login" element={<h1>Login</h1>} />
        <Route path="logout" />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
