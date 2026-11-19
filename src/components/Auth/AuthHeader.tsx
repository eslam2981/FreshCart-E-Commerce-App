import Link from "next/link";
import Image from "next/image";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
  showLogo?: boolean;
}

export default function AuthHeader({
  title,
  subtitle,
  className = "mb-7 sm:mb-8",
  showLogo = true,
}: AuthHeaderProps) {
  return (
    <div className={`w-full ${className}`}>
      {showLogo && (
        <Link
          href="/"
          className="hidden lg:inline-flex items-center mb-4 hover:opacity-95 transition-opacity"
          aria-label="FreshCart Homepage"
        >
          <Image
            src="/logo.svg"
            alt="FreshCart"
            width={160}
            height={34}
            priority
            className="h-8 w-auto"
          />
        </Link>
      )}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        {title}
      </h1>
      <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">{subtitle}</p>
    </div>
  );
}
