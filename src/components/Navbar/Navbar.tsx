"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import CommerceActions from "./CommerceActions";
import MobileNavDrawer from "./MobileNavDrawer";
import { Menu } from "lucide-react";
import { Category } from "@/interfaces/product";

interface NavbarProps {
  categories?: Category[];
}

export default function Navbar({ categories = [] }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white border-b border-slate-100 shadow-xs">
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <TopBar />
        </div>

        <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12 py-2.5 sm:py-3.5">
          <div className="flex items-center justify-between gap-1.5 sm:gap-4 md:gap-6">
            <Link
              href="/"
              className="shrink-0 flex items-center"
              aria-label="FreshCart Homepage"
            >
              <Image
                src="/logo.svg"
                alt="FreshCart"
                width={160}
                height={32}
                priority
                className="h-6 sm:h-8 w-auto"
              />
            </Link>

            <div className="hidden md:flex flex-1 max-w-[500px] lg:max-w-[580px] xl:max-w-[640px] mx-2 lg:mx-4">
              <SearchBar />
            </div>

            <div className="hidden xl:flex items-center shrink-0 mx-2">
              <NavLinks categories={categories} />
            </div>

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <CommerceActions />

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="xl:hidden w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white flex items-center justify-center shrink-0 transition-all duration-200 shadow-xs cursor-pointer ml-0.5 sm:ml-1"
                aria-label="Open navigation menu"
              >
                <Menu className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        <MobileNavDrawer
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          pathname={pathname}
        />
      </header>

      <div className="hidden md:block h-[94px]" aria-hidden="true" />
      <div className="md:hidden h-[58px]" aria-hidden="true" />
    </>
  );
}
