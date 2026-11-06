
import { Suspense } from "react";

import Hero from "@/component/home/Hero";
import TrendingProducts from "@/component/home/TrendingProducts";
import AllProducts from "@/component/home/AllProducts";
import ProductSkeleton from "@/component/products/ProductSkeleton";

const HomePage = () => {
  return (
    <main>
      <Hero />

      <Suspense
        fallback={
          <section className="mx-auto max-w-6xl px-4 py-16">
            <div className="mb-8 text-center">
              <div className="mx-auto h-8 w-40 animate-pulse rounded bg-gray-200" />
              <div className="mx-auto mt-3 h-4 w-64 animate-pulse rounded bg-gray-100" />
            </div>

            <ProductSkeleton count={6} />
          </section>
        }
      >
        <TrendingProducts />
      </Suspense>

      <Suspense
        fallback={
          <section
            id="সব-পণ্য"
            className="mx-auto max-w-6xl px-4 py-16"
          >
            <div className="mb-8 text-center">
              <div className="mx-auto h-8 w-40 animate-pulse rounded bg-gray-200" />
              <div className="mx-auto mt-3 h-4 w-64 animate-pulse rounded bg-gray-100" />
            </div>

            <ProductSkeleton count={8} />
          </section>
        }
      >
        <AllProducts />
      </Suspense>
    </main>
  );
};

export default HomePage;
