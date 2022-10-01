import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useLoaderData } from "react-router-dom";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

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

export default function Nav({ navigation, content }: any) {
  const data: any = useLoaderData();

  return (
    <nav className="space-y-1" aria-label="Sidebar">
      {data.map((item: any) => (
        <a
          key={item.name}
          href="#"
          className={classNames(
            item.name
              ? "bg-gray-50 text-gray-900"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            "flex items-center px-3 py-2 text-sm font-medium"
          )}
          aria-current={item.name ? "page" : undefined}
        >
          {/* <item.icon
            className={classNames(
              item.name ? "text-gray-500" : "text-gray-400",
              "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
            )}
            aria-hidden="true"
          /> */}
          <span className="truncate">{item.name}</span>
          {item.name ? (
            <span
              className={classNames(
                item.current ? "bg-gray-50" : "bg-gray-200 text-gray-600",
                "ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
              )}
            >
              {item.name}
            </span>
          ) : null}
        </a>
      ))}
    </nav>
  );
}
