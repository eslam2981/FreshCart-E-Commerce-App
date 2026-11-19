import React from "react";

interface AuthSeparatorProps {
  label: string;
  className?: string;
}

export default function AuthSeparator({
  label,
  className = "my-7 sm:my-8",
}: AuthSeparatorProps) {
  return (
    <div
      className={`relative flex items-center justify-center w-full select-none ${className}`}
      role="separator"
    >
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-slate-200" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-white px-3.5 text-[11px] font-semibold tracking-wider text-slate-400">
          {label}
        </span>
      </div>
    </div>
  );
}
