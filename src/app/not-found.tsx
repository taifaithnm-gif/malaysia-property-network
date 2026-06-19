import Link from "next/link";
import { DEFAULT_LOCALE } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-navy-900">404</h1>
      <p className="mt-4 text-lg text-gray-600">Page not found</p>
      <Link
        href={`/${DEFAULT_LOCALE}`}
        className="mt-8 rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800"
      >
        Back to Home
      </Link>
    </div>
  );
}
