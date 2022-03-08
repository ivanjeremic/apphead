import { CogIcon, ViewGridAddIcon } from "@heroicons/react/outline";

export const useSecondaryNavigation = (pathname) => {
  const secondaryNavigation = [
    {
      name: "Plugins",
      href: "#",
      icon: ViewGridAddIcon,
      current: pathname === "/admin/plugins",
    },
    {
      name: "Settings",
      href: "#",
      icon: CogIcon,
      current: pathname === "/admin/settings",
    },
    {
      name: "Documention",
      href: "#",
      icon: CogIcon,
      current: pathname === "/admin/documentation",
    },
  ];

  return secondaryNavigation;
};
