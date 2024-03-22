"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, FreeMode, Mousewheel } from "swiper/modules";
import { usePathname } from "next/navigation";
import { CollectionsNav } from "./CollectionsNav";
import { PanelNavTopBar } from "./PanelNavTopBar";
import { ActionBar } from "./ActionBar";
import CollectionsSearchForm from "../collections/_components/CollectionsSearchForm";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Navigator({ children }: any) {
  const pathname = usePathname();

  return (
    <>
      <PanelNavTopBar title="Collections" showBackButton={true} />
      <ActionBar>
        <CollectionsSearchForm />
      </ActionBar>
      <Swiper
        className="border-r border-gray-200"
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        allowTouchMove={false}
        initialSlide={pathname.includes("collections") ? 1 : 0}
      >
        <SwiperSlide tag="nav">
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
              { name: "Settings", to: "settings" },
              { name: "Settings", to: "settings" },
              { name: "Settings", to: "settings" },
              { name: "Settings", to: "settings" },
              { name: "Settings", to: "settings" },
              { name: "Settings", to: "settings" },
              { name: "Settings", to: "settings" },
              { name: "Settings", to: "settings" },
              { name: "Settings", to: "settings" },
              { name: "Settings", to: "settings" },
              { name: "Settings", to: "settings" },
              { name: "Settings", to: "settings" },
              { name: "Settings", to: "settings" },
              { name: "Settings", to: "settings" },
            ]}
          />
        </SwiperSlide>

        <SwiperSlide>{children}</SwiperSlide>
      </Swiper>
    </>
  );
}
