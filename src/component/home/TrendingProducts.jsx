
import { getAllProducts } from "@/libs/api";
import ProductCard from "@/component/products/ProductCard";

const getProductArray = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.products)) return response.products;
  if (Array.isArray(response?.data?.products)) {
    return response.data.products;
  }

  return [];
};

const TrendingProducts = async () => {
  let risers = [];
  let fallers = [];
  let hasError = false;

  try {
    const response = await getAllProducts();
    const products = getProductArray(response);

    // Top 6 products whose prices increased
    risers = products
      .filter((product) => product.change?.dir === "up")
      .sort(
        (a, b) =>
          Math.abs(Number(b.change.pct)) -
          Math.abs(Number(a.change.pct))
      )
      .slice(0, 6);

    // Top 6 products whose prices decreased
    fallers = products
      .filter((product) => product.change?.dir === "down")
      .sort(
        (a, b) =>
          Math.abs(Number(b.change.pct)) -
          Math.abs(Number(a.change.pct))
      )
      .slice(0, 6);

  } catch (error) {
    console.error("Trending products error:", error);
    hasError = true;
  }

  if (hasError) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-center text-red-600">
          পণ্যের তথ্য লোড করা যায়নি। পরে আবার চেষ্টা করুন।
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl space-y-14 px-4 py-16">

      {/* Price Increased */}
      <div>
        <div className="mb-7">
          <p className="text-sm font-semibold text-green-700">
            বাজারের পরিবর্তন
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            আজ দাম বেড়েছে
            <span className="ml-2 text-green-600">▲</span>
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            আজ যেসব নিত্যপ্রয়োজনীয় পণ্যের দাম সবচেয়ে বেশি বেড়েছে।
          </p>
        </div>

        {risers.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {risers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-gray-50 p-6 text-center text-gray-500">
            বর্তমানে দাম বাড়ার কোনো তথ্য পাওয়া যায়নি।
          </p>
        )}
      </div>

      {/* Price Decreased */}
      <div>
        <div className="mb-7">
          <p className="text-sm font-semibold text-red-600">
            বাজারের পরিবর্তন
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            আজ দাম কমেছে
            <span className="ml-2 text-red-600">▼</span>
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            আজ যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে।
          </p>
        </div>

        {fallers.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {fallers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-gray-50 p-6 text-center text-gray-500">
            বর্তমানে দাম কমার কোনো তথ্য পাওয়া যায়নি।
          </p>
        )}
      </div>

    </section>
  );
};

export default TrendingProducts;
