"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeftIcon, MagnifyingGlassIcon, TvIcon } from "@heroicons/react/24/outline";
import { useSwiper } from "swiper/react";
import { cn } from "./utils";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

function CollectionsNav() {
    const swiper = useSwiper();
    const pathname = usePathname();

    useEffect(() => {
        console.log(pathname);
    }, [pathname]);

    return (
        <nav className="space-y-0.5 mt-1 overflow-y-auto" aria-label="Sidebar">
            <Link
                onClick={() => {
                    swiper.slideNext();
                }}
                href="/collections"
                className="flex items-center p-3 text-sm font-medium bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                aria-current="location"
            >
                <TvIcon
                    className="flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                    aria-hidden="true"
                />
                <span className="truncate">Collections</span>
            </Link>
        </nav>
    );
}

function CollectionsSearchForm() {
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
                        {/*                         <Input className="rounded-none border-none focus-visible:ring-offset-0 focus-visible:right-1 px-10" />
 */}                    </div>
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

function ActionBar({ children }: any) {
    return (
        <div className="relative flex-shrink-0 bg-white border-b border-gray-200 shadow-sm flex">
            {children}
        </div>
    );
}

function PanelNavTopBar({
    title,
    showBackButton,
}: {
    title: string;
    showBackButton: boolean;
}) {
    const swiper = useSwiper();
    const router = useRouter();

    return (
        <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
            {showBackButton && (
                <button
                    className="w-12 p-3 text-black border-l-4  border-l-orange-600 bg-[#f6f7f7] hover:bg-white focus:outline-none"
                    onClick={() => {
                        swiper.slidePrev();
                        router.back();
                    }}
                >
                    <ChevronLeftIcon width={20} />
                </button>
            )}

            <div className="sm:flex sm:items-center sm:justify-between px-3 py-2">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
            </div>
        </div>
    );
}

export function Navigator({ children }: any) {
    const pathname = usePathname();

    return (
        <Swiper
            className="w-full h-screen bg-white border-r border-gray-200 overflow-y-auto lg:block"
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            allowTouchMove={false}
            initialSlide={pathname.includes("collections") ? 1 : 0}
        >
            <SwiperSlide className="flex flex-col">
                <PanelNavTopBar title="Dashboard" showBackButton={false} />

                <CollectionsNav

                />

            </SwiperSlide>

            <SwiperSlide>
                <PanelNavTopBar title="Collections" showBackButton={true} />
                <ActionBar>
                    <CollectionsSearchForm />
                </ActionBar>
                {children}
            </SwiperSlide>
        </Swiper>
    );
}