import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Sparkles, Tag } from "lucide-react";

import groceryBanner from "@/assets/images/grocery-banner.png";
import bakeryBanner from "@/assets/images/bakery-banner.png";

interface PromoBannerItem {
  image: StaticImageData;
  alt: string;
  badge: {
    icon: React.ElementType;
    iconColor: string;
    text: string;
    bgClass: string;
  };
  title: string;
  subtitle: string;
  discount: string;
  couponCode: string;
  buttonText: string;
  href: string;
  overlayClass: string;
  buttonClass: string;
}

const promoBanners: PromoBannerItem[] = [
  {
    image: groceryBanner,
    alt: "Fresh organic grocery produce and fruits in tote bag",
    badge: {
      icon: Sparkles,
      iconColor: "text-emerald-300",
      text: "100% Farm Fresh",
      bgClass: "bg-emerald-950/80 border border-emerald-400/30 text-emerald-100",
    },
    title: "Crisp Organic Fruits & Fresh Harvest",
    subtitle: "Hand-picked vegetables & seasonal fruits packed with natural flavor and vitamins, delivered daily.",
    discount: "35% OFF",
    couponCode: "ORGANIC35",
    buttonText: "Shop Fresh Produce",
    href: "/products",
    overlayClass: "bg-gradient-to-r from-emerald-950/95 via-emerald-950/75 sm:via-emerald-950/55 to-transparent",
    buttonClass: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40",
  },
  {
    image: bakeryBanner,
    alt: "Artisan baked bread loaves and baguettes in woven basket",
    badge: {
      icon: Flame,
      iconColor: "text-amber-300",
      text: "Oven Fresh Daily",
      bgClass: "bg-amber-950/80 border border-amber-400/30 text-amber-100",
    },
    title: "Artisan Bakery & Warm Bread",
    subtitle: "Traditional sourdough loaves, crusty French baguettes, and fresh oven-baked morning treats.",
    discount: "25% OFF",
    couponCode: "BAKERY25",
    buttonText: "Explore Bakery",
    href: "/products",
    overlayClass: "bg-gradient-to-r from-amber-950/95 via-amber-950/75 sm:via-amber-950/55 to-transparent",
    buttonClass: "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950/40",
  },
];

export default function PromoBanners() {
  return (
    <section
      aria-label="Promotional Banners"
      className="w-full max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
        {promoBanners.map((banner) => {
          const BadgeIcon = banner.badge.icon;
          return (
            <div
              key={banner.title}
              className="relative min-h-[300px] sm:min-h-[320px] md:min-h-[340px] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between p-6 sm:p-8 md:p-10"
            >
              <Image
                src={banner.image}
                alt={banner.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-right group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
              />

              <div
                className={`absolute inset-0 z-0 pointer-events-none ${banner.overlayClass}`}
              />

              <div className="relative z-10 max-w-[320px] sm:max-w-[380px] md:max-w-[420px]">
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3.5 w-fit select-none backdrop-blur-xs shadow-2xs ${banner.badge.bgClass}`}
                >
                  <BadgeIcon
                    className={`w-3.5 h-3.5 shrink-0 stroke-[2.2] ${banner.badge.iconColor}`}
                  />
                  <span>{banner.badge.text}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug drop-shadow-xs mb-2">
                  {banner.title}
                </h3>

                <p className="text-xs sm:text-sm font-normal text-slate-100/90 leading-relaxed mb-4 drop-shadow-xs line-clamp-2 sm:line-clamp-none">
                  {banner.subtitle}
                </p>

                <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-xs">
                    {banner.discount}
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-xs border border-white/20 text-white text-xs font-medium">
                    <Tag className="w-3 h-3 text-white/80" />
                    <span>Use code:</span>
                    <strong className="font-bold tracking-wider text-amber-300">
                      {banner.couponCode}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-6">
                <Link
                  href={banner.href}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 group-hover:translate-x-0.5 w-fit cursor-pointer ${banner.buttonClass}`}
                >
                  <span>{banner.buttonText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
