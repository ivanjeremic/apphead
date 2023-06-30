import { Swiper, SwiperSlide } from "swiper/react";
import { ActionBar } from "./ActionBar";
import { ActionButton } from "./ActionButton";
import { AddCollectionModal } from "./Modal";
import { CollectionsNav, PanelNavTopBar } from "../routes/collections";

export function SwipeMenu() {
  return (
    <Swiper
      className="hidden w-96 bg-white border-r border-gray-200 overflow-y-auto lg:block"
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      allowTouchMove={false}
    >
      <SwiperSlide>
        <PanelNavTopBar />
        <ActionBar
          buttons={
            <ActionButton text="Create Collection" Modal={AddCollectionModal} />
          }
        />
        <CollectionsNav />
      </SwiperSlide>
      <SwiperSlide>
        <PanelNavTopBar />
      </SwiperSlide>
      <SwiperSlide>
        <PanelNavTopBar />
      </SwiperSlide>
      <SwiperSlide>
        <PanelNavTopBar />
      </SwiperSlide>
    </Swiper>
  );
}
