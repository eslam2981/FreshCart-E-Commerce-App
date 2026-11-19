import Link from "next/link";
import { ShieldCheck } from "lucide-react";

interface AuthFooterProps {
  promptText: string;
  linkText: string;
  linkHref: string;
}

export default function AuthFooter({
  promptText,
  linkText,
  linkHref,
}: AuthFooterProps) {
  return (
    <div className="w-full mt-7 sm:mt-8 pt-5 border-t border-slate-100">
      <div className="text-center">
        <p className="text-xs sm:text-sm text-slate-600">
          {promptText}{" "}
          <Link
            href={linkHref}
            className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
          >
            {linkText}
          </Link>
        </p>
      </div>

      <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>256-bit encrypted secure checkout & session</span>
      </div>
    </div>
  );
}
