import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ComputerDesktopIcon,
  DocumentIcon,
  PuzzlePieceIcon,
  SquaresPlusIcon,
  PhotoIcon,
  InboxStackIcon,
} from "@heroicons/react/24/outline";
import {
  Link,
  Outlet,
  useLocation,
  useRouteLoaderData,
} from "react-router-dom";
import { classNames } from "../helpers/className";
import { CollectionsNav, PanelNavTopBar } from "../routes/collections";
import { Swiper, SwiperSlide } from "swiper/react";
import { ActionBar } from "../components/ActionBar";
import { ActionButton } from "../components/ActionButton";
import { AddCollectionModal } from "../components/Modal";

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

export default function MainLayout() {
  const location = useLocation();
  const data = useRouteLoaderData(location.pathname);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="h-screen bg-gray-50 flex overflow-hidden">
        {/* Narrow sidebar */}
        {/* <div className="hidden w-28 bg-gray-800 overflow-y-auto md:block">
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
      </div> */}

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
                              location.pathname === item.href
                                ? "page"
                                : undefined
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
        <Swiper
          className="hidden w-96 bg-white border-r border-gray-200 overflow-y-auto lg:block"
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          allowTouchMove={false}
        >
          <SwiperSlide>
            <PanelNavTopBar title="Dashboard" />
            <CollectionsNav
              data={[
                { name: "Dashboard", to: "dashboard" },
                { name: "Apps", to: "apps" },
                { name: "Collections", to: "collections" },
                { name: "Plugins", to: "plugins" },
                { name: "Marketplace", to: "marketplace" },
                { name: "Media", to: "media" },
                { name: "Pages", to: "pages" },
                { name: "Settings", to: "settings" },
              ]}
            />
          </SwiperSlide>

          <SwiperSlide>
            <PanelNavTopBar title="Collections" />
            <ActionBar
              buttons={
                <ActionButton
                  text="Create Collection"
                  Modal={AddCollectionModal}
                />
              }
            />
            <CollectionsNav data={data} />
          </SwiperSlide>
        </Swiper>
        <Outlet />
      </div>
    </>
  );
}
