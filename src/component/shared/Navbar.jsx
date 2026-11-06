import Link from "next/link";
import { getCategories } from "@/libs/api";
import CategoryNavigation from "./CategoryNavigation";
import DateDisplay from "./DateDisplay";

const Navbar = async () => {
  let categories = [];

  try {
    const data = await getCategories();
    categories = Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error("Failed to load categories:", error);
  }

  const banglaDate = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        {/* Top Navbar */}
        <div className="flex items-center justify-between gap-4 py-4">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              🛒 বাজার দর
            </h1>
            <DateDisplay />
          </Link>

          {/* Authentication Buttons */}
          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 sm:px-4"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-800 sm:px-4"
            >
              সাইন আপ
            </Link>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="border-t border-gray-100">
          <CategoryNavigation categories={categories} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
