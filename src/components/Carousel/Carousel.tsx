"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import bannerImg from "@/assets/images/image.png";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface SlideContent {
  id: number;
  title: string;
  subtitle: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
}

const slidesData: SlideContent[] = [
  {
    id: 1,
    title: "Fresh Products Delivered\nto your Door",
    subtitle: "Get 20% off your first order",
    primaryBtnText: "Shop Now",
    primaryBtnLink: "/products",
    secondaryBtnText: "View Deals",
    secondaryBtnLink: "/deals",
  },
  {
    id: 2,
    title: "100% Organic Produce\nStraight from Farms",
    subtitle: "Crisp fruits & vegetables picked daily",
    primaryBtnText: "Shop Now",
    primaryBtnLink: "/products",
    secondaryBtnText: "View Deals",
    secondaryBtnLink: "/deals",
  },
  {
    id: 3,
    title: "Daily Fresh Bakery &\nFarm Dairy Essentials",
    subtitle: "Free delivery on all orders over $40",
    primaryBtnText: "Shop Now",
    primaryBtnLink: "/products",
    secondaryBtnText: "View Deals",
    secondaryBtnLink: "/deals",
  },
];

export default function Carousel() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-3 sm:py-5">
      <div className="relative w-full h-[260px] sm:h-[320px] md:h-[360px] lg:h-[400px] rounded-xl sm:rounded-2xl overflow-hidden shadow-md">
        <Image
          src={bannerImg}
          alt="Fresh Supermarket Produce"
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-emerald-600/75 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-700/85 via-emerald-600/65 to-emerald-600/40 pointer-events-none" />

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          loop={true}
          speed={600}
          autoplay={{
            delay: 1800,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: ".banner-custom-pagination",
            bulletClass:
              "inline-block w-2 h-2 rounded-full bg-white/60 transition-all duration-300 cursor-pointer hover:bg-white/90",
            bulletActiveClass: "!w-5 !h-2 !bg-white !rounded-full",
          }}
          className="w-full h-full relative z-10"
        >
          {slidesData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="w-full h-full flex flex-col justify-center px-8 sm:px-14 md:px-20 lg:px-24">
                <div className="max-w-xl text-white space-y-2.5 sm:space-y-3.5">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold leading-tight tracking-tight drop-shadow-sm whitespace-pre-line">
                    {slide.title}
                  </h2>

                  <p className="text-xs sm:text-sm md:text-base font-normal text-emerald-50/95 drop-shadow-sm">
                    {slide.subtitle}
                  </p>

                  <div className="pt-2 sm:pt-4 flex items-center gap-3">
                    <Link
                      href={slide.primaryBtnLink}
                      className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-white text-emerald-600 font-semibold text-xs sm:text-sm hover:bg-emerald-50 active:scale-95 transition-all shadow-sm"
                    >
                      {slide.primaryBtnText}
                    </Link>

                    <Link
                      href={slide.secondaryBtnLink}
                      className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg border border-white/90 text-white font-medium text-xs sm:text-sm hover:bg-white/15 active:scale-95 transition-all"
                    >
                      {slide.secondaryBtnText}
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous Slide"
          className="hidden sm:flex absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-emerald-600 shadow-md items-center justify-center hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next Slide"
          className="hidden sm:flex absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-emerald-600 shadow-md items-center justify-center hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        </button>

        <div className="banner-custom-pagination absolute bottom-3 sm:bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-1.5 pointer-events-auto" />
      </div>
    </div>
  );
}
