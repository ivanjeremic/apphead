import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function CollectionsSearchForm() {
  return (
    <div className="flex-1 flex justify-between">
      <div className="flex-1 flex">
        <form className="w-full flex md:ml-0" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search all files
          </label>
          <div className="relative w-full text-gray-400 focus-within:text-gray-600">
            <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
              <MagnifyingGlassIcon
                className="flex-shrink-0 h-5 w-5"
                aria-hidden="true"
              />
            </div>
            <Input className="rounded-none border-none focus-visible:ring-offset-0 focus-visible:right-1 px-10" />
          </div>
        </form>
      </div>
      <div className="flex items-center">
        <button className="bg-gray-100 border-l h-full w-10 hover:bg-gray-50">
          X
        </button>
      </div>
    </div>
  );
}
