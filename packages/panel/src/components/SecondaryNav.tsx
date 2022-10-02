import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { ActionBar } from "./ActionBar";
import { ActionButton } from "./ActionButton";

function PanelNavTopBar() {
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
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Collections
        </h3>
      </div>
      <button onClick={() => swiper.slidePrev()}>Prev</button>
      <button onClick={() => swiper.slideNext()}>Next</button>
    </div>
  );
}

export function SecondaryNav({ children }: any) {
  return (
    <Swiper
      className="hidden w-96 bg-white border-r border-gray-200 overflow-y-auto lg:block"
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      allowTouchMove={false}
    >
      <SwiperSlide>
        <PanelNavTopBar />
        <ActionBar buttons={<ActionButton text="Create Collection" />} />
        {children}
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
