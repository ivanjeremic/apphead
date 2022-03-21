/* This example requires Tailwind CSS v2.0+ */
import { UsersIcon } from "@heroicons/react/solid";

import { useState } from "react";
import { Switch } from "@headlessui/react";
import { classNames } from "../utils/classNames";

const positions = [
  {
    id: 1,
    title: "Back End Developer",
    type: "Active",
    department: "JavaScript",
  },
  {
    id: 2,
    title: "Front End Developer",
    type: "Active",
    department: "JavaScript",
  },
  {
    id: 3,
    title: "User Interface Designer",
    type: "Active",
    department: "JavaScript",
  },
];

export default function FunctionsAside() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="bg-white shadow overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {positions.map((position) => (
          <li key={position.id}>
            <a href="#" className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-end">
                  {/* <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {position.type}
                    </p>
                  </div> */}
                </div>

                <Switch.Group
                  as="div"
                  className="flex justify-between items-center"
                >
                  <span className="flex-grow flex flex-col">
                    <Switch.Label
                      as="span"
                      className="text-sm font-medium text-gray-900"
                      passive
                    >
                      Available to hire
                    </Switch.Label>
                    <Switch.Description
                      as="span"
                      className="text-sm text-gray-500"
                    >
                      Nulla amet tempus sit
                    </Switch.Description>
                  </span>
                  <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={classNames(
                      enabled ? "bg-indigo-600" : "bg-gray-200",
                      "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        enabled ? "translate-x-5" : "translate-x-0",
                        "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                      )}
                    />
                  </Switch>
                </Switch.Group>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
