import Hero from "@/component/home/Hero";
import TrendingProducts from "@/component/home/TrendingProducts";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrendingProducts/>
    </main>
  );
}
