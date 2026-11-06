
import { getAllProducts } from "@/libs/api";
import PriceTickerClient from "./PriceTickerClient";

const PriceTicker = async () => {
  let products = [];

  try {
    const response = await getAllProducts();

    products = Array.isArray(response)
      ? response
      : response?.data || response?.products || [];

  } catch (error) {
    console.error("Price ticker error:", error);
  }

  return <PriceTickerClient products={products} />;
};

export default PriceTicker;
