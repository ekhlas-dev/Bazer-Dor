"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const CategoryNavigation = ({ categories = [] }) => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2 overflow-x-auto py-3">
      <Link
        href="/"
        className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
          pathname === "/"
            ? "bg-emerald-700 text-white"
            : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
        }`}
      >
        সব পণ্য
      </Link>

      {categories.map((category) => {
        const isActive = pathname === `/category/${category.slug}`;

        return (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-emerald-700 text-white"
                : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
            }`}
          >
            {category.icon} {category.nameBn}
          </Link>
        );
      })}
    </nav>
  );
};

export default CategoryNavigation;
