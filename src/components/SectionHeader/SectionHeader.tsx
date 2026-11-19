import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  highlight?: string;
  actionText?: string;
  actionHref?: string;
}

export default function SectionHeader({
  title,
  highlight,
  actionText,
  actionHref,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 sm:mb-8">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <span className="w-1.5 sm:w-2 h-7 sm:h-8 bg-emerald-600 rounded-full inline-block shrink-0" />
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {title} {highlight && <span className="text-emerald-600">{highlight}</span>}
        </h2>
      </div>

      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 transition-colors group cursor-pointer"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
