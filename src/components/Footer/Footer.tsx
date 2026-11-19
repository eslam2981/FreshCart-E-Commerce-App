import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, CreditCard } from "lucide-react";
import FooterLinkColumn from "./FooterLinkColumn";
import { FOOTER_LINK_GROUPS, PAYMENT_METHODS } from "@/constants/footer.constants";

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#0B132A] text-slate-300 pt-14 sm:pt-16 pb-8 border-t border-slate-900 mt-auto">
      <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12">
          <div className="lg:col-span-4 flex flex-col">
            <Link href="/" className="w-fit mb-5" aria-label="FreshCart Homepage">
              <div className="bg-white rounded-xl px-4 py-2 inline-flex items-center shadow-xs">
                <Image
                  src="/logo.svg"
                  alt="FreshCart"
                  width={130}
                  height={28}
                  className="h-6 w-auto"
                />
              </div>
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              unbeatable prices.
            </p>

            <div className="flex flex-col gap-3 text-xs sm:text-sm text-slate-400 mb-6">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-2.5 text-slate-300 hover:text-emerald-400 transition-colors w-fit"
              >
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+1 (800) 123-4567</span>
              </a>

              <a
                href="mailto:support@freshcart.com"
                className="flex items-center gap-2.5 text-slate-300 hover:text-emerald-400 transition-colors w-fit"
              >
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>support@freshcart.com</span>
              </a>

              <div className="flex items-center gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full bg-slate-800/90 hover:bg-emerald-600 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {FOOTER_LINK_GROUPS.map((group) => (
            <FooterLinkColumn
              key={group.title}
              title={group.title}
              links={group.links}
            />
          ))}
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 FreshCart. All rights reserved.</p>

          <div className="flex items-center gap-5 text-xs text-slate-400">
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="flex items-center gap-1.5 hover:text-slate-200 transition-colors"
              >
                <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                <span>{method}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
