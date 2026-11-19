"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@/interfaces/product";

export interface NavLinkItem {
  name: string;
  path: string;
  hasDropdown?: boolean;
}

export const navLinks: NavLinkItem[] = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/products" },
  { name: "Categories", path: "/categories", hasDropdown: true },
  { name: "Brands", path: "/brands" },
];

interface NavLinksProps {
  categories?: Category[];
}

export default function NavLinks({ categories = [] }: NavLinksProps) {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-7 lg:gap-8 xl:gap-9 2xl:gap-10 text-[15px]" aria-label="Main Navigation">
      {navLinks.map((link) => {
        const isActive =
          link.path === "/"
            ? pathname === "/"
            : pathname.startsWith(link.path);

        if (link.hasDropdown) {
          return (
            <DropdownMenu key={link.path}>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    className={`relative flex items-center gap-1 transition-colors cursor-pointer py-1.5 focus:outline-none rounded-sm group ${
                      isActive
                        ? "text-emerald-600 font-semibold"
                        : "text-slate-700 hover:text-emerald-600 font-medium"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 stroke-[2.5] group-data-popup-open:rotate-180 ${
                        isActive
                          ? "text-emerald-600"
                          : "text-slate-500 group-hover:text-emerald-600"
                      }`}
                    />
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                    )}
                  </button>
                }
              />

              <DropdownMenuContent
                align="start"
                sideOffset={8}
                className="w-56 sm:w-60 bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 z-50 max-h-72 overflow-y-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Browse Categories
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100 my-1" />
                  {categories.map((cat) => (
                    <DropdownMenuItem
                      key={cat._id}
                      className="cursor-pointer rounded-lg px-2.5 py-1.5 text-slate-700 hover:bg-emerald-50/70 hover:text-emerald-700 focus:bg-emerald-50/70 focus:text-emerald-700 transition-colors"
                    >
                      <Link href={`/products?category=${cat._id}`} className="flex items-center justify-between w-full text-xs font-medium">
                        <span className="truncate">{cat.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-slate-100 my-1" />
                <DropdownMenuItem className="cursor-pointer rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-emerald-600 hover:bg-emerald-50/70 hover:text-emerald-700 focus:bg-emerald-50/70 focus:text-emerald-700 transition-colors">
                  <Link href="/categories" className="w-full">
                    View All Categories →
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }

        return (
          <Link
            key={link.path}
            href={link.path}
            className={`relative py-1.5 transition-colors cursor-pointer ${
              isActive
                ? "text-emerald-600 font-semibold"
                : "text-slate-700 hover:text-emerald-600 font-medium"
            }`}
          >
            <span>{link.name}</span>
            {isActive && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
