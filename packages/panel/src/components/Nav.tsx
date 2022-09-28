import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import React from "react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav({ navigation }: any) {
  return (
    <nav className="space-y-1" aria-label="Sidebar">
      {navigation.map((item: any) => (
        <a
          key={item.name}
          href={item.href}
          className={classNames(
            item.current
              ? "bg-gray-200 text-gray-900"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            "flex items-center px-3 py-2 text-sm font-medium"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          <item.icon
            className={classNames(
              item.current ? "text-gray-500" : "text-gray-400",
              "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
            )}
            aria-hidden="true"
          />
          <span className="truncate">{item.name}</span>
          {item.count ? (
            <span
              className={classNames(
                item.current ? "bg-gray-50" : "bg-gray-200 text-gray-600",
                "ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
              )}
            >
              {item.count}
            </span>
          ) : null}
        </a>
      ))}
    </nav>
  );
}