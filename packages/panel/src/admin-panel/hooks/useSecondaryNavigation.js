import { CogIcon, ViewGridAddIcon } from "@heroicons/react/outline";

export const useSecondaryNavigation = (pathname, db) => {
  const secondaryNavigation = [
    {
      name: "Plugins",
      href: `/domedb/${db}/plugins`,
      icon: ViewGridAddIcon,
      current: pathname.includes("plugins"),
    },
    {
      name: "Settings",
      href: `/domedb/${db}/settings`,
      icon: CogIcon,
      current: pathname.includes("settings"),
    },
    {
      name: "Documention",
      href: `#`,
      icon: CogIcon,
      current: pathname.includes("#"),
    },
  ];

  return secondaryNavigation;
};
