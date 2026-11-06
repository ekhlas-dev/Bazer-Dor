
"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { parseBanglaNumber } from "@/libs/utils";

const ProductSorting = ({ products = [] }) => {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortOrder === "low-to-high") {
      result.sort(
        (a, b) =>
          parseBanglaNumber(a.today) - parseBanglaNumber(b.today)
      );
    }

    if (sortOrder === "high-to-low") {
      result.sort(
        (a, b) =>
          parseBanglaNumber(b.today) - parseBanglaNumber(a.today)
      );
    }

    return result;
  }, [products, sortOrder]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-gray-600">
          মোট {sortedProducts.length} টি পণ্য
        </p>

        <div className="flex items-center gap-3">
          <label
            htmlFor="product-sort"
            className="shrink-0 text-sm font-medium text-gray-700"
          >
            দাম অনুযায়ী:
          </label>

          <select
            id="product-sort"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 sm:w-52"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">কম দাম থেকে বেশি</option>
            <option value="high-to-low">বেশি দাম থেকে কম</option>
          </select>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 py-16 text-center">
          <p className="text-lg font-semibold text-gray-800">
            কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductSorting;
