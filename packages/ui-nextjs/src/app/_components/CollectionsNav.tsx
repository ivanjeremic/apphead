"use client";
import { classNames } from "@/utils/classNames";
import { TvIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSwiper } from "swiper/react";

export function CollectionsNav({ data }: any) {
  const swiper = useSwiper();

  return (
    <ul>
      {data &&
        data.map((item: any) => (
          <li>
            <Link
              key={item.name}
              onClick={() => {
                swiper.slideNext();
              }}
              href={item.to}
              className="flex items-center p-3 text-sm font-medium hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              aria-current={item.name ? "page" : undefined}
            >
              <TvIcon
                className="flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                aria-hidden="true"
              />
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
          </li>
        ))}
    </ul>
  );
}
