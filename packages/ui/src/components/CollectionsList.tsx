"use server";
import Link from "next/link";
import { TvIcon } from "@heroicons/react/24/outline";
import { client } from "../../apphead/AppHeadClient";

export default async function CollectionsList() {
  const data = await client.find({ collection: "collections" });

  return (
    <>
      {data &&
        data.map((item: any) => (
          <Link
            key={item.id}
            href={`/collections/${item.data.name}`}
            className="flex items-center p-3 text-sm font-medium bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            aria-current={item.name ? "page" : undefined}
          >
            <TvIcon
              className="flex-shrink-0 -ml-1 mr-3 h-6 w-6"
              aria-hidden="true"
            />
            <span className="truncate">{item.data.name}</span>
            <span className="bg-gray-200 text-gray-600 ml-auto inline-block py-0.5 px-3 text-xs rounded-full">
              {item.data.name}
            </span>
          </Link>
        ))}
    </>
  );
}
