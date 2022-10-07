import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ComputerDesktopIcon,
  PlusIcon,
  DocumentIcon,
  PuzzlePieceIcon,
  SquaresPlusIcon,
  PhotoIcon,
  InboxStackIcon,
  MagnifyingGlassIcon,
  ArrowDownLeftIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation } from "react-router-dom";
import { classNames } from "../helpers/className";
import CollectionList from "../components/CollectionList";
import { ActionButton } from "../components/ActionButton";
import { ArrowLeftIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { ActionBar } from "../components/ActionBar";
import { SecondaryNav } from "../components/SecondaryNav";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 700 700"
      fill="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M611.33 74.668H424.66c-10.266 0-25.387-5.04-33.602-11.199l-44.801-33.617c-8.195-6.16-23.332-11.199-33.602-11.199h-93.332c-10.266 0-18.668 8.398-18.668 18.668v37.332h-37.332c-10.266 0-18.668 8.398-18.668 18.668v37.332h-37.332c-10.266 0-18.668 8.398-18.668 18.668v354.67c0 10.266 8.398 18.668 18.668 18.668h392c10.266 0 18.668-8.398 18.668-18.668v-37.332h37.332c10.266 0 18.668-8.398 18.668-18.668v-37.332h37.332c10.266 0 18.668-8.398 18.668-18.668V93.321c.004-10.254-8.394-18.652-18.664-18.652zm-504 74.664h93.332c6.16 0 17.473 3.754 22.383 7.465l44.82 33.602c11.312 8.511 30.594 14.934 44.781 14.934h186.67v37.332h-392v-93.332zm392 354.67h-392v-242.67h392zm56-56h-37.332v-242.67c0-10.266-8.398-18.668-18.668-18.668H312.66c-10.266 0-25.387-5.04-33.602-11.199l-44.801-33.617c-8.195-6.16-23.332-11.199-33.602-11.199h-37.332V93.317h93.332c6.16 0 17.473 3.754 22.383 7.465l44.82 33.602c11.312 8.512 30.594 14.934 44.781 14.934h186.67l.004 298.68zm56-56h-37.332v-242.67c0-10.266-8.398-18.668-18.668-18.668H368.66c-10.266 0-25.387-5.04-33.602-11.199l-44.801-33.617c-8.195-6.16-23.332-11.199-33.602-11.199h-37.332V37.317h93.332c6.16 0 17.473 3.754 22.383 7.465l44.82 33.602c11.312 8.512 30.594 14.934 44.781 14.934h186.67l.004 298.68z"></path>
    </svg>
  );
}

const sidebarNavigation = [
  { name: "Apps", href: "/admin/apps", icon: ComputerDesktopIcon },
  {
    name: "Collections",
    href: "/admin/collections",
    icon: Icon,
  },
  { name: "Pages", href: "/admin/pages", icon: DocumentIcon },
  { name: "Media", href: "/admin/media", icon: PhotoIcon },
  { name: "Plugins", href: "/admin/plugins", icon: SquaresPlusIcon },
  { name: "Advanced", href: "/admin/advanced", icon: PuzzlePieceIcon },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Sign out", href: "#" },
];

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let location = useLocation();

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Narrow sidebar */}
      <div className="hidden w-28 bg-gray-800 overflow-y-auto md:block">
        <div className="w-full py-6 flex flex-col items-center">
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
              alt="Workflow"
            />
          </div>
          <div className="flex-1 mt-6 w-full space-y-1">
            {sidebarNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  location.pathname === item.href
                    ? "bg-gray-900 text-white"
                    : "text-indigo-100 hover:bg-gray-900 hover:text-white",
                  "group w-full p-3 flex flex-col items-center text-xs font-medium"
                )}
                aria-current={
                  location.pathname === item.href ? "page" : undefined
                }
              >
                <item.icon
                  className={classNames(
                    location.pathname === item.href
                      ? "text-white"
                      : "text-indigo-300 group-hover:text-white",
                    "h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                <span className="mt-2">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="md:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative max-w-xs w-full bg-indigo-700 pt-5 pb-4 flex-1 flex flex-col">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-1 right-0 -mr-14 p-1">
                    <button
                      type="button"
                      className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <InboxStackIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Close sidebar</span>
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 px-4 flex items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                    alt="Workflow"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                  <nav className="h-full flex flex-col">
                    <div className="space-y-1">
                      {sidebarNavigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href
                              ? "bg-indigo-800 text-white"
                              : "text-indigo-100 hover:bg-indigo-800 hover:text-white",
                            "group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                          )}
                          aria-current={
                            location.pathname === item.href ? "page" : undefined
                          }
                        >
                          <item.icon
                            className={classNames(
                              location.pathname === item.href
                                ? "text-white"
                                : "text-indigo-300 group-hover:text-white",
                              "mr-3 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Secondary column (hidden on smaller screens) */}
      <SecondaryNav>
        <Outlet />
      </SecondaryNav>

      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="w-full">
          <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <InboxStackIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 flex justify-between px-4 sm:px-6">
              <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search all files
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <InboxStackIcon
                        className="flex-shrink-0 h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      name="search-field"
                      id="search-field"
                      className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400"
                      placeholder="Search ddd"
                      type="search"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative flex-shrink-0">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <span className="sr-only">Open user menu</span>
                          <div className="flex -space-x-2 mr-4 overflow-hidden">
                            <img
                              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                            <img
                              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                            <img
                              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                              alt=""
                            />
                            <img
                              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </div>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>

                <button
                  type="button"
                  className="flex bg-indigo-600 p-1 rounded-full items-center justify-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PlusIcon className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">Add file</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Action Section */}
          <ActionBar buttons={<ActionButton text="Create User" />} />
          {/* Content Action Section /> */}
        </header>

        {/* Main content */}
        <div className="flex-1 flex items-stretch overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            {/* Primary column */}
            <section
              aria-labelledby="primary-heading"
              className="min-w-0 flex-1 h-full flex flex-col overflow-hidden lg:order-last"
            >
              <h1 id="primary-heading" className="sr-only">
                Photos
              </h1>
              {/* Your content */}

              <CollectionList />
            </section>
          </main>
        </div>
        {/* Main Content /> */}
      </div>
    </div>
  );
}
