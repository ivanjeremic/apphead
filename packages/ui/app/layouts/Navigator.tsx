"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useSwiper } from "swiper/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

let currentIndex = 0;

const NavItem = ({ title, href }: { title: string; href: string }) => {
  const swiper = useSwiper();

  const slideHandler = () => {
    if (title === "Dashboard") {
      swiper.slideTo(0);
      currentIndex = 0;
    }

    if (title === "Collections") {
      swiper.slideTo(1);
      currentIndex = 1;
    }
  };

  return (
    <Link
      onClick={slideHandler}
      href={href}
      className="flex items-center p-3 text-sm font-medium bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900"
    >
      <span className="truncate">{title}</span>
    </Link>
  );
};

const BackButton = () => {
  const swiper = useSwiper();
  const router = useRouter();

  return (
    <button
      className="w-12 p-3 text-black border-l-4  border-l-orange-600 bg-[#f6f7f7] hover:bg-white focus:outline-none"
      onClick={() => {
        swiper.slideTo(currentIndex - 1);
        router.back();
      }}
    >
      <ChevronLeftIcon width={20} />
    </button>
  );
};

export const Navigator = () => {
  const pathname = usePathname();
  const [menus] = useState([
    {
      title: "Dashboard",
      NavItems: [
        {
          title: "Collections",
          href: "/admin/collections",
        },
        {
          title: "Settings",
          href: "/admin/settings",
        },
      ].map((item) => (
        <NavItem key={item.title} title={item.title} href={item.href} />
      )),
    },
    {
      title: "Collections",
      NavItems: [
        {
          title: "Users",
          href: "/admin/users",
        },
        {
          title: "Posts",
          href: "/admin/posts",
        },
      ].map((item) => (
        <NavItem key={item.title} title={item.title} href={item.href} />
      )),
    },
  ]);

  return (
    <Swiper
      className="w-full h-screen bg-white border-r border-gray-200 overflow-y-auto lg:block"
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      allowTouchMove={true}
      initialSlide={pathname.includes("collections") ? 1 : 0}
    >
      {menus.map(({ title, NavItems }) => (
        <SwiperSlide className="flex flex-col">
          <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
            {title !== "Dashboard" && <BackButton />}

            <div className="sm:flex sm:items-center sm:justify-between px-3 py-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {title}
              </h3>
            </div>
          </div>
          <div className="relative flex-shrink-0 bg-white border-b border-gray-200 shadow-sm flex">
            Search
          </div>

          <nav
            className="space-y-0.5 mt-1 overflow-y-auto"
            aria-label="Sidebar"
          >
            {NavItems}
          </nav>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
