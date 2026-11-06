
import { Suspense } from "react";
import Link from "next/link";

import {
  getCategories,
  getProductsByCategory,
} from "@/libs/api";

import ProductSorting from "@/component/products/ProductSorting";
import ProductSkeleton from "@/component/products/ProductSkeleton";

// Get array from API response
const getArray = (response) => {
  if (Array.isArray(response)) return response;

  if (Array.isArray(response?.data)) return response.data;

  if (Array.isArray(response?.products)) return response.products;

  if (Array.isArray(response?.data?.products)) {
    return response.data.products;
  }

  return [];
};

// Category content
const CategoryContent = async ({ slug }) => {
  let categories = [];
  let products = [];

  try {
    const [categoryResponse, productResponse] = await Promise.all([
      getCategories(),
      getProductsByCategory(slug),
    ]);

    categories = getArray(categoryResponse);
    products = getArray(productResponse);
  } catch (error) {
    console.error("Category page error:", error);

    return (
      <div className="py-16 text-center">
        <p className="text-red-600">
          পণ্যের তথ্য লোড করা যায়নি। পরে আবার চেষ্টা করুন।
        </p>
      </div>
    );
  }

  // Find current category
  const category = categories.find((item) => item.slug === slug);

  // Invalid category
  if (!category) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          ক্যাটাগরি পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-gray-500">
          আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি পাওয়া যায়নি।
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Category Header */}
      <div className="mb-10">
        <Link
          href="/"
          className="text-sm text-emerald-700 hover:underline"
        >
          হোম
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <span className="text-4xl">
            {category.image || "🛒"}
          </span>

          <h1 className="text-3xl font-bold text-gray-900">
            {category.nameBn || category.name}
          </h1>
        </div>

        <p className="mt-3 text-sm text-gray-500">
          এই ক্যাটাগরির সব পণ্যের আজকের বাজারদর।
        </p>
      </div>

      {/* Product List Heading */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          পণ্যের তালিকা
        </h2>
      </div>

      {/* Product Sorting */}
      <ProductSorting products={products} />
    </>
  );
};

// Category Page
const CategoryPage = ({ params }) => {
  return (
    <main className="mx-auto min-h-screen w-[75%] px-4 py-12">
      <Suspense
        fallback={
          <div>
            <div className="mb-10">
              <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />

              <div className="mt-4 h-4 w-64 animate-pulse rounded bg-gray-100" />
            </div>

            <ProductSkeleton count={8} />
          </div>
        }
      >
        <CategoryPageContent params={params} />
      </Suspense>
    </main>
  );
};

// Resolve dynamic params inside Suspense
const CategoryPageContent = async ({ params }) => {
  const { slug } = await params;

  return <CategoryContent slug={slug} />;
};

export default CategoryPage;
