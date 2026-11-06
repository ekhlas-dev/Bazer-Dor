import { Suspense } from "react";
import Link from "next/link";
import { getProductById } from "@/libs/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const numberFormat = new Intl.NumberFormat("bn-BD");

const unitNames = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
};

const getProduct = (response) => {
  if (response?.data && !Array.isArray(response.data)) {
    return response.data;
  }

  return response;
};

const ProductContent = async ({ slug }) => {
  let product;

  try {
    const response = await getProductById(slug);
    product = getProduct(response);
  } catch (error) {
    console.error("Product details error:", error);

    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          পণ্যের তথ্য পাওয়া যায়নি
        </h1>
        <Link href="/" className="mt-5 inline-block text-emerald-700">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  if (!product?.id) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">পণ্য পাওয়া যায়নি</h1>
        <Link href="/" className="mt-5 inline-block text-emerald-700">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const markets = Array.isArray(product.markets) ? product.markets : [];

  const minimumPrice = markets.length
    ? Math.min(...markets.map((market) => Number(market.min)))
    : 0;

  const maximumPrice = markets.length
    ? Math.max(...markets.map((market) => Number(market.max)))
    : 0;

  const averagePrice = markets.length
    ? markets.reduce(
        (total, market) =>
          total + (Number(market.min) + Number(market.max)) / 2,
        0,
      ) / markets.length
    : 0;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const unit = unitNames[product.unit?.toLowerCase()] || product.unit || "একক";

  return (
    <>
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link href="/" className="text-sm text-emerald-700 hover:underline">
          হোম
        </Link>

        <span className="mx-2 text-gray-400">/</span>

        <Link
          href={`/category/${product.category}`}
          className="text-sm text-emerald-700 hover:underline"
        >
          {product.categoryNameBn}
        </Link>

        <span className="mx-2 text-gray-400">/</span>

        <span className="text-sm text-gray-500">{product.nameBn}</span>
      </div>

      {/* Product Overview */}
      <section className="grid gap-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 md:grid-cols-2">
        <div className="flex min-h-64 items-center justify-center rounded-2xl bg-[#f5f8f5]">
          <span className="text-8xl">{product.image || "🛒"}</span>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-emerald-700">
            {product.categoryIcon} {product.categoryNameBn}
          </p>

          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            {product.nameBn}
          </h1>

          <p className="mt-3 text-sm text-gray-500">প্রতি {unit}</p>

          <div className="mt-7 border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-500">আজকের বাজারদর</p>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {numberFormat.format(Number(product.today))}
              </span>

              <span className="text-base text-gray-500">টাকা</span>

              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  isUp
                    ? "bg-green-50 text-green-700"
                    : isDown
                      ? "bg-red-50 text-red-700"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                {numberFormat.format(Number(product.change?.pct || 0))}%
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
            <div>
              <p className="text-sm text-gray-500">গতকালের দাম</p>
              <p className="mt-1 font-semibold text-gray-900">
                {numberFormat.format(Number(product.yesterday || 0))} টাকা
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">গত সপ্তাহের দাম</p>
              <p className="mt-1 font-semibold text-gray-900">
                {numberFormat.format(Number(product.lastWeek || 0))} টাকা
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Price Summary */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          বাজারদরের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
            <p className="mt-3 text-2xl font-bold text-green-700">
              {numberFormat.format(minimumPrice)} টাকা
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>
            <p className="mt-3 text-2xl font-bold text-red-600">
              {numberFormat.format(maximumPrice)} টাকা
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">গড় দাম</p>
            <p className="mt-3 text-2xl font-bold text-gray-900">
              {numberFormat.format(Math.round(averagePrice))} টাকা
            </p>
          </div>
        </div>
      </section>

      {/* Market Prices */}
      <section className="mt-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">বাজারভিত্তিক দাম</h2>

          <p className="mt-2 text-sm text-gray-500">
            বিভিন্ন বাজারে এই পণ্যের সর্বনিম্ন ও সর্বোচ্চ দাম।
          </p>
        </div>

        {markets.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full min-w-[500px] text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                    বাজারের নাম
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                    বিভাগ
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-green-700">
                    সর্বনিম্ন
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-red-600">
                    সর্বোচ্চ
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className="border-t border-gray-100"
                  >
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">
                      {market.market}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-500">
                      {market.division}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-green-700">
                      {numberFormat.format(Number(market.min))} টাকা
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-red-600">
                      {numberFormat.format(Number(market.max))} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="rounded-xl bg-gray-50 p-6 text-center text-gray-500">
            বাজারের তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>
    </>
  );
};

// Product Page
const ProductPage = ({ params }) => {
  return (
    <main className="mx-auto min-h-screen w-[75%] px-4 py-12">
      <Suspense
        fallback={
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 rounded bg-gray-200" />
            <div className="h-64 rounded-2xl bg-gray-100" />
            <div className="h-40 rounded-2xl bg-gray-100" />
          </div>
        }
      >
        <ProductPageContent params={params} />
      </Suspense>
    </main>
  );
};

const ProductPageContent = async ({ params }) => {
  const { slug } = await params;

  return <ProductContent slug={slug} />;
};

export default ProductPage;
