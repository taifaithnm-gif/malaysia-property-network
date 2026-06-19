import Link from "next/link";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type ButtonProps = {
  href?: string;
  locale?: Locale;
  variant?: "primary" | "secondary" | "outline" | "whatsapp";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
};

const variants = {
  primary:
    "bg-teal-700 text-white hover:bg-teal-800 focus-visible:ring-teal-600",
  secondary:
    "bg-navy-900 text-white hover:bg-navy-800 focus-visible:ring-navy-700",
  outline:
    "border-2 border-teal-700 text-teal-700 hover:bg-teal-50 focus-visible:ring-teal-600",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1da851] focus-visible:ring-[#25D366]",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  href,
  locale,
  variant = "primary",
  size = "md",
  className = "",
  children,
  type = "button",
  disabled,
  external,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    const path = locale ? `/${locale}${href.startsWith("/") ? href : `/${href}`}` : href;
    return (
      <Link href={path} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}>
      <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
