import React from "react";
import Link from "next/link";
import { FooterLink } from "@/constants/footer.constants";

interface FooterLinkColumnProps {
  title: string;
  links: FooterLink[];
}

export default function FooterLinkColumn({ title, links }: FooterLinkColumnProps) {
  return (
    <div className="lg:col-span-2">
      <h3 className="text-white font-bold text-sm sm:text-base mb-4 tracking-tight">
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-slate-400 hover:text-white transition-colors block py-0.5"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
