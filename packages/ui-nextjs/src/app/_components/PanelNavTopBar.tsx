"use client";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useSwiper } from "swiper/react";

export function PanelNavTopBar({
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
