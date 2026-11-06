
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

const AllProducts = async () => {
  let products = [];
  let hasError = false;

  try {
    const response = await getAllProducts();
    products = getProductArray(response);

  } catch (error) {
    console.error("All products error:", error);
    hasError = true;
  }

  if (hasError) {
    return (
      <section id="সব-পণ্য" className="px-4 py-20 text-center">
        <p className="text-red-600">
          পণ্যের তথ্য লোড করা সম্ভব হয়নি।
        </p>
      </section>
    );
  }

  return (
    <section
      id="সব-পণ্য"
      className="scroll-mt-36 bg-[#f8faf8] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4">

        {/* Section Heading */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold text-emerald-700">
            আপনার প্রতিদিনের বাজার
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            সব পণ্য
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
            নিত্যপ্রয়োজনীয় সব পণ্যের আজকের বাজারদর
            এক জায়গায় দেখুন এবং জেনে নিন।
          </p>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-emerald-700" />
        </div>

        {/* Product Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600">
            সকল পণ্য
          </p>

          <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            মোট {new Intl.NumberFormat("bn-BD").format(products.length)} টি পণ্য
          </span>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.slice(0,12).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center">
            <p className="text-4xl">🛒</p>

            <h3 className="mt-4 text-xl font-bold text-gray-800">
              কোনো পণ্য পাওয়া যায়নি
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              পরে আবার চেষ্টা করুন।
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default AllProducts;
