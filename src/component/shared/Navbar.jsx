import Link from "next/link";
import { getCategories } from "@/libs/api";
import CategoryNavigation from "./CategoryNavigation";
import DateDisplay from "./DateDisplay";
import AuthNavigation from "./AuthNavigation";

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
          <AuthNavigation/>
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
