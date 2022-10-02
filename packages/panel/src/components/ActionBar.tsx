import {
  InboxStackIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export function ActionBar({ buttons }: any) {
  return (
    <div className="relative flex-shrink-0 bg-white border-b border-gray-200 shadow-sm flex">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <InboxStackIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 flex justify-between pl-4 sm:pl-6">
        <div className="flex-1 flex">
          <form className="w-full flex md:ml-0" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search all files
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                <MagnifyingGlassIcon
                  className="flex-shrink-0 h-5 w-5"
                  aria-hidden="true"
                />
              </div>
              <input
                name="search-field"
                id="search-field"
                className="h-full w-full border-transparent py-0 pl-8 pr-1 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400"
                placeholder="Search Collections"
                type="search"
              />
            </div>
          </form>
        </div>
        <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
          {buttons}
        </div>
      </div>
    </div>
  );
}
