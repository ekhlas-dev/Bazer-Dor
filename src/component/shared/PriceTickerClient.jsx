
"use client";

import Marquee from "react-fast-marquee";

const banglaNumber = new Intl.NumberFormat("bn-BD");

const unitNames = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
};

const PriceTickerClient = ({ products = [] }) => {
  if (!products.length) return null;

  return (
    <div className="flex items-center border-b border-gray-200 bg-gray-50">

      <div className="z-10 shrink-0 bg-emerald-800 px-4 py-3 text-sm font-semibold text-white">
        বাজারদর লাইভ
      </div>

      <Marquee
        speed={45}
        pauseOnHover
        gradient={false}
        autoFill
      >
        {products.map((product) => {
          const direction = product.change?.dir;
          const percentage = Number(product.change?.pct || 0);

          const isUp = direction === "up";
          const isDown = direction === "down";

          const unit =
            unitNames[product.unit?.toLowerCase()] ||
            product.unit ||
            "একক";

          return (
            <div
              key={product.id}
              className="flex items-center gap-2 px-5 py-3 text-sm"
            >
              <span className="text-lg">
                {product.emoji || "🛒"}
              </span>

              <span className="font-semibold text-gray-800">
                {product.nameBn || product.name}
              </span>

              <span className="text-gray-500">
                {banglaNumber.format(Number(product.today || 0))}
                {" "}টাকা/{unit}
              </span>

              <span
                className={`font-semibold ${
                  isUp
                    ? "text-green-600"
                    : isDown
                      ? "text-red-600"
                      : "text-gray-500"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}
                {" "}
                {banglaNumber.format(percentage)}%
              </span>

              <span className="ml-4 text-gray-300">|</span>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default PriceTickerClient;
