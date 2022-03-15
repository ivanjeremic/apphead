import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ChevronLeftIcon,
  FilterIcon,
  MailIcon,
  PhoneIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import DatabaseSelect from "./DatabaseSelect";
import { useRouter } from "next/router";
import Directory from "./Directory";
import { XIcon, MenuIcon, HomeIcon } from "@heroicons/react/outline";
import { classNames } from "../utils/classNames";
import Link from "next/link";
import { useMainNavigation } from "../hooks/useMainNavigation";
import { useSecondaryNavigation } from "../hooks/useSecondaryNavigation";
import GalleryAside from "./GalleryAside";
import FunctionsAside from "./FunctionsAside";
import { useAppContext } from "../Context";
import { useWindowSize } from "../hooks/useWindowSize";

const team = [
  {
    name: "Leslie Alexander",
    handle: "lesliealexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Michael Foster",
    handle: "michaelfoster",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Dries Vincent",
    handle: "driesvincent",
    role: "Manager, Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Lindsay Walton",
    handle: "lindsaywalton",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const user = {
  name: "Tom Cook",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

export default function Layout({ children, title, actions, aside }) {
  const { pathname, query } = useRouter();

  const { width, height, ref } = useAppContext();
  const size = useWindowSize();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isExpanded, setIsExpanded] = useState(true);

  const navigation = useMainNavigation(pathname, query.db);

  const secondaryNavigation = useSecondaryNavigation(pathname, query.db);

  return (
    <div>
      <div
        className="relative flex overflow-hidden bg-white"
        style={{ height: size.height - 32 }}
      >
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            static
            className="fixed inset-0 flex z-40 lg:hidden"
            open={sidebarOpen}
            onClose={setSidebarOpen}
          >
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
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-pink-500-mark-gray-900-text.svg"
                      alt="Workflow"
                    />
                  </div>
                  <nav aria-label="Sidebar" className="mt-5">
                    <div className="px-2 space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-green-500 hover:text-gray-900",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-gray-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "mr-4 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <hr
                      className="border-t border-gray-200 my-5"
                      aria-hidden="true"
                    />
                    <div className="px-2 space-y-1">
                      {secondaryNavigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        >
                          <item.icon
                            className="text-gray-400 group-hover:text-gray-500 mr-4 flex-shrink-0 h-6 w-6"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                  <a href="#" className="flex-shrink-0 group block">
                    <div className="flex items-center">
                      <div>
                        <img
                          className="inline-block h-10 w-10 rounded-full"
                          src={user.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                          View profile
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>
        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div
            className={classNames(
              isExpanded ? "w-64" : " w-14",
              "flex flex-col transition-all ease-in-out duration-300"
            )}
          >
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div
              className={classNames(
                "",
                "flex flex-col h-0 flex-1 border-r border-gray-200"
              )}
            >
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-hidden">
                <div className="h-[67px]">
                  {isExpanded ? (
                    <Image
                      width={300}
                      height={67}
                      layout="responsive"
                      src="/logo.png"
                      alt="DomeDB Logo"
                    />
                  ) : (
                    <div className="flex justify-center">
                      <Image
                        width={40}
                        height={40}
                        src="/logo_sm.png"
                        alt="DomeDB Logo"
                      />
                    </div>
                  )}
                </div>

                <nav className="flex-1" aria-label="Sidebar">
                  <div className="px-2 space-y-1 h-24">
                    {isExpanded ? (
                      <div className="text-gray-600 px-2 py-2 text-sm font-medium rounded-md">
                        <DatabaseSelect label="Projects" />
                      </div>
                    ) : (
                      <div>
                        <Link href="#">
                          <a className="text-gray-600 hover:bg-[#EAEAEA] hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                            <HomeIcon
                              className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                              aria-hidden="true"
                            />
                            <span
                              className={classNames(
                                !isExpanded ? "hidden" : ""
                              )}
                            >
                              DB
                            </span>
                          </a>
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.name}>
                        <a
                          className={classNames(
                            item.current
                              ? "bg-[#EAEAEA] text-gray-900"
                              : "text-gray-600 hover:bg-[#EAEAEA] hover:text-gray-900",
                            "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-gray-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "mr-3 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          <span
                            className={classNames(
                              !isExpanded ? "hidden" : "whitespace-nowrap"
                            )}
                          >
                            {item.name}
                          </span>
                        </a>
                      </Link>
                    ))}
                  </div>
                  <hr
                    className="border-t border-gray-200 my-5"
                    aria-hidden="true"
                  />

                  <div className="flex-1 px-2 space-y-1">
                    {secondaryNavigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            item.current
                              ? "bg-[#EAEAEA] text-gray-900"
                              : "text-gray-600 hover:bg-[#EAEAEA] hover:text-gray-900",
                            "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                            aria-hidden="true"
                          />
                          <span
                            className={classNames(!isExpanded ? "hidden" : "")}
                          >
                            {item.name}
                          </span>
                        </a>
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4 overflow-hidden">
                <a href="#" className="flex-shrink-0 w-full group block">
                  <div>
                    <a className="text-gray-600 hover:bg-[#EAEAEA] hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                      <HomeIcon
                        className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                        aria-hidden="true"
                      />
                      <span className={classNames(!isExpanded ? "hidden" : "")}>
                        DBs
                      </span>
                    </a>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => setIsExpanded(isExpanded ? false : true)}
          className="bg-gray-200 w-4 opacity-70 flex items-center justify-center hover:bg-gray-300 transition-all ease-in-out duration-75 cursor-pointer"
        >
          {"<"}
        </div>
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden border-l border-gray-200">
          <div className="lg:hidden">
            <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-pink-500.svg"
                  alt="Workflow"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 relative z-0 flex overflow-hidden">
            <main
              ref={ref}
              className="flex-1 relative z-0 focus:outline-none xl:order-last"
            >
              {/* Breadcrumb */}
              <nav
                className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
                aria-label="Breadcrumb"
              >
                <a
                  href="#"
                  className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
                >
                  <ChevronLeftIcon
                    className="-ml-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Directory</span>
                </a>
              </nav>

              <article>
                {/* Profile header */}
                <div>
                  <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-end sm:space-x-5">
                      <div className="sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                          <h1 className="text-2xl font-bold text-gray-900 truncate">
                            {title}
                          </h1>
                        </div>
                        <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                          {actions}
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 truncate">
                        {title}
                      </h1>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="mt-6 sm:mt-2 2xl:mt-5">
                  <div className="border-b border-gray-200">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <div>Eins</div>
                        <div>Eins</div>
                      </nav>
                    </div>
                  </div>
                </div>

                {/* Description list */}
                <div className="mt-6 mx-auto">{children}</div>
              </article>
            </main>
            {aside && (
              <aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
                {aside}
              </aside>
            )}
          </div>
        </div>
      </div>
      <div
        className="bg-black text-white flex items-center justify-end p-2"
        style={{ height: "32px" }}
      >
        <div>version: 0.2</div>
      </div>
    </div>
  );
}
