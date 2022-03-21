import {
  CalendarIcon,
  HomeIcon,
  MapIcon,
  SearchCircleIcon,
  SpeakerphoneIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";

export const useMainNavigation = (pathname, db) => {
  const navigation = [
    {
      name: "Dashboard",
      href: "/domedb",
      icon: HomeIcon,
      current: pathname === "domedb",
    },
    {
      name: "Clusters",
      href: `/domedb/${db}/clusters`,
      icon: CalendarIcon,
      current: pathname.includes("clusters"),
    },
    {
      name: "Users",
      href: `/domedb/${db}/users`,
      icon: UserGroupIcon,
      current: pathname.includes("users"),
    },
    {
      name: "Media",
      href: `/domedb/${db}/media`,
      icon: SearchCircleIcon,
      current: pathname.includes("media"),
    },
    {
      name: "Triggers",
      href: `/domedb/${db}/triggers`,
      icon: SpeakerphoneIcon,
      current: pathname.includes("triggers"),
    },
    {
      name: "Functions",
      href: `/domedb/${db}/functions`,
      icon: MapIcon,
      current: pathname.includes("functions"),
    },
    {
      name: "Web Hosting",
      href: `/domedb/${db}/web-hosting`,
      icon: MapIcon,
      current: pathname.includes("web-hosting"),
    },
  ];

  return navigation;
};
