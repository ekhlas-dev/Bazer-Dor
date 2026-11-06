
import Link from "next/link";

const numberFormat = new Intl.NumberFormat("bn-BD");

const unitNames = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
};

const ProductCard = ({ product }) => {
  const direction = product.change?.dir;
  const percentage = Number(product.change?.pct || 0);

  const isUp = direction === "up";
  const isDown = direction === "down";

  const unit =
    unitNames[product.unit?.toLowerCase()] ||
    `প্রতি ${product.unit || "একক"}`;

  const badgeColor = isUp
    ? "bg-green-50 text-green-700"
    : isDown
      ? "bg-red-50 text-red-700"
      : "bg-gray-100 text-gray-600";

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">

        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#f5f8f5] text-4xl">
          {product.icon || "🛒"}
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}
          {" "}
          {numberFormat.format(percentage)}%
        </span>

      </div>

      <h3 className="mt-5 text-lg font-bold text-gray-900 transition group-hover:text-emerald-700">
        {product.nameBn || product.name}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {unit}
      </p>

      <div className="mt-5 flex items-end justify-between border-t border-gray-100 pt-4">

        <div>
          <p className="text-xs text-gray-500">
            আজকের দাম
          </p>

          <p className="mt-1 text-xl font-bold text-gray-900">
            {numberFormat.format(Number(product.today || 0))}
            <span className="ml-1 text-sm font-medium">
              টাকা
            </span>
          </p>
        </div>

        <span className="text-sm font-medium text-emerald-700">
          বিস্তারিত →
        </span>

      </div>
    </Link>
  );
};

export default ProductCard;
