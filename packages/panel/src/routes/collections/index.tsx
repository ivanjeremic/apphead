import { useSwiper } from "swiper/react";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { PlusIcon, InboxStackIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../helpers/className";
import CollectionList from "../../components/CollectionList";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { ActionBar } from "../../components/ActionBar";
import { ActionButton } from "../../components/ActionButton";
import { Link, useNavigate } from "react-router-dom";
import { AddCollectionModal } from "../../components/Modal";

// Loader
export async function collectionsLoader() {
  console.log("COLLECTION____LOADER");
  const data = await fetch(
    "http://localhost:3001/admin/collections/getCollectionNames?database=apphead"
  );

  return data;
}

// Action
export async function collectionsAction({ request, params }: any) {
  if (request.method === "POST") {
    let formData = await request.formData();
    let collection = formData.get("collectionName");

    const res = await fetch(
      "http://localhost:3001/admin/collections/createCollection",
      {
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
        body: JSON.stringify({
          database: "apphead",
          collection,
        }),
      }
    );

    if (!res.ok) throw res;
    return { ok: true };
  }
}

// Outlet
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Sign out", href: "#" },
];

export function PanelNavTopBar({ title }: any) {
  const swiper = useSwiper();

  return (
    <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
      <button
        type="button"
        className="w-12 p-3 text-black border-l-4 border-r-gray-200 border-r border-x-blue-600 bg-[#f6f7f7] hover:bg-white focus:outline-none"
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeftIcon width={20} />
      </button>

      <div className="sm:flex sm:items-center sm:justify-between px-3 py-2">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      </div>
      <button onClick={() => swiper.slidePrev()}>Prev</button>
      <button onClick={() => swiper.slideNext()}>Next</button>
    </div>
  );
}

export function CollectionsNav({ data }: any) {
  const swiper = useSwiper();
  const navigate = useNavigate();

  return (
    <nav className="space-y-1" aria-label="Sidebar">
      {data &&
        data?.map((item: any) => (
          <Link
            key={item.name}
            onClick={() => {
              swiper.slideNext();
            }}
            to={item.to}
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
            {item.name && (
              <span
                className={classNames(
                  item.current ? "bg-gray-50" : "bg-gray-200 text-gray-600",
                  "ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
                )}
              >
                {item.name}
              </span>
            )}
          </Link>
        ))}
    </nav>
  );
}

export function CollectionsOutlet() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
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
          <ActionBar
            buttons={
              <ActionButton text="Create Document" Modal={AddCollectionModal} />
            }
          />
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
      </div>
    </>
  );
}
