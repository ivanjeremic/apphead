import {
  CalendarIcon,
  HomeIcon,
  MapIcon,
  SearchCircleIcon,
  SpeakerphoneIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";

export const useMainNavigation = (pathname) => {
  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: HomeIcon,
      current: pathname === "/admin",
    },
    {
      name: "Clusters",
      href: "/admin/clusters",
      icon: CalendarIcon,
      current: pathname === "/admin/clusters",
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: UserGroupIcon,
      current: pathname === "/admin/users",
    },
    {
      name: "Media",
      href: "/admin/media",
      icon: SearchCircleIcon,
      current: pathname === "/admin/media",
    },
    {
      name: "Triggers",
      href: "/admin/triggers",
      icon: SpeakerphoneIcon,
      current: pathname === "/admin/triggers",
    },
    {
      name: "Functions",
      href: "/admin/functions",
      icon: MapIcon,
      current: pathname === "/admin/functions",
    },
    {
      name: "Web Hosting",
      href: "/admin/web-hosting",
      icon: MapIcon,
      current: pathname === "/admin/web-hosting",
    },
  ];

  return navigation;
};
