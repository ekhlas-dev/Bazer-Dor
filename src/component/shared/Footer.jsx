
import Link from "next/link";
import { ShoppingBasket } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <ShoppingBasket className="h-6 w-6 text-emerald-700" />
              <span className="text-xl font-bold text-gray-900">
                বাজার দর
              </span>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-7 text-gray-500">
              বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          <div className="max-w-md">
            <h3 className="text-sm font-semibold text-gray-900">
              মূল্য সংক্রান্ত ঘোষণা
            </h3>

            <p className="mt-2 text-sm leading-7 text-gray-500">
              এখানে প্রদর্শিত পণ্যের দাম তথ্যের উদ্দেশ্যে দেওয়া হয়েছে।
              বাজার ও স্থানভেদে প্রকৃত দাম পরিবর্তিত হতে পারে।
              কেনাকাটার আগে স্থানীয় বাজারে দাম যাচাই করে নিন।
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-5 text-center">
          <p className="text-xs text-gray-400">
            © ২০২৬ বাজার দর। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
