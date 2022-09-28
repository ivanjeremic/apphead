import React from "react";
import ReactDOM from "react-dom/client";
import {
  Router,
  ReactLocation,
  createBrowserHistory,
} from "@tanstack/react-location";
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

const history = createBrowserHistory();
const location = new ReactLocation({ history });

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true, count: "5" },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  {
    name: "Projects",
    href: "#",
    icon: FolderIcon,
    current: false,
    count: "19",
  },
  {
    name: "Calendar",
    href: "#",
    icon: CalendarIcon,
    current: false,
    count: "20+",
  },
  { name: "Documents", href: "#", icon: InboxIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
];

const routes = [
  {
    path: "admin",
    element: <MainLayout />,
    children: [
      {
        path: "/",
      },
      {
        path: "collections",
        element: <Nav navigation={navigation} />,
      },
    ],
  },
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router location={location} routes={routes} />
  </React.StrictMode>
);
