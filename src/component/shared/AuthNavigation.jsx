
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthNavigation = () => {
  const pathname = usePathname();

  const isSignIn = pathname === "/signin";
  const isSignUp = pathname === "/signup";

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/signin"
        className={`rounded-lg border px-3 py-2 text-sm font-medium transition sm:px-4 ${
          isSignIn
            ? "border-emerald-700 bg-emerald-700 text-white"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        সাইন ইন
      </Link>

      <Link
        href="/signup"
        className={`rounded-lg border px-3 py-2 text-sm font-medium transition sm:px-4 ${
          isSignUp
            ? "border-emerald-700 bg-emerald-700 text-white"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        সাইন আপ
      </Link>
    </div>
  );
};

export default AuthNavigation;
