
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { toast, Toaster } from "react-hot-toast";
import {
  ChevronDown,
  UserRound,
  LogOut,
} from "lucide-react";

const AuthNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isSignIn = pathname === "/signin";
  const isSignUp = pathname === "/signup";

  const handleSignOut = async () => {
    try {
      setLoading(true);

      const result = await signOut();

      if (result.error) {
        toast.error(result.error.message || "Sign out failed!");
        return;
      }

      setIsOpen(false);
      toast.success("Signed out successfully!");

      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      {isPending ? (
        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-100" />
      ) : session ? (
        <div className="relative">
          {/* Profile Dropdown Trigger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Open profile menu"
            className="flex items-center gap-2 rounded-full p-1.5 pr-3 transition hover:bg-gray-100"
          >
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white">
                {session.user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <span className="hidden text-sm font-semibold text-gray-800 sm:block">
              {session.user.name}
            </span>

            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-40 cursor-default"
              />

              <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                {/* User Information */}
                <div className="border-b border-gray-100 px-4 py-4">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {session.user.name}
                  </p>

                  <p className="mt-1 truncate text-xs text-gray-500">
                    {session.user.email}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <UserRound size={18} className="text-gray-500" />
                    My Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={loading}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    <LogOut size={18} />
                    {loading ? "Signing Out..." : "Sign Out"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            href="/signin"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              isSignIn
                ? "bg-emerald-700 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              isSignUp
                ? "bg-emerald-700 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </>
  );
};

export default AuthNavigation;
