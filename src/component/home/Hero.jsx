
import Link from "next/link";

const Hero = () => {
  return (
    <section className="overflow-hidden bg-[#f5f8f5]">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:py-20 lg:grid-cols-2 lg:py-24">

        {/* Left Content */}
        <div className="max-w-xl">

          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            প্রতিদিনের বাজারদর, এক জায়গায়
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            বাজারের সঠিক দাম,
            <span className="mt-2 block text-emerald-700">
              হাতের নাগালে।
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-gray-600 sm:text-lg">
            চাল, ডাল, তেল, মাছ, মাংস ও নিত্যপ্রয়োজনীয়
            পণ্যের প্রতিদিনের বাজারদর জানুন সহজেই।
            বাজারে যাওয়ার আগেই জেনে নিন আজকের দাম।
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">

            <a
              href="#সব-পণ্য"
              className="rounded-lg bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 active:scale-95"
            >
              সব পণ্য দেখুন →
            </a>

            <Link
              href="/category/sobji"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-emerald-600 hover:text-emerald-700"
            >
              বাজারদর জানুন
            </Link>

          </div>

          {/* Small Information */}
          <div className="mt-10 flex flex-wrap gap-8 border-t border-gray-200 pt-6">

            <div>
              <p className="text-2xl font-bold text-gray-900">৩৩+</p>
              <p className="mt-1 text-sm text-gray-500">
                প্রয়োজনীয় পণ্য
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-900">৮</p>
              <p className="mt-1 text-sm text-gray-500">
                পণ্যের ক্যাটাগরি
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-900">২৪/৭</p>
              <p className="mt-1 text-sm text-gray-500">
                সহজে দাম দেখুন
              </p>
            </div>

          </div>
        </div>

        {/* Right Banner Image */}
        <div className="relative mx-auto w-full max-w-xl">

          <div className="absolute -right-5 -top-5 h-40 w-40 rounded-full bg-emerald-200/50 blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl border border-white shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=85"
              alt="Fresh vegetables in a local grocery market"
              className="h-[320px] w-full object-cover sm:h-[420px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-sm font-medium text-white/80">
                প্রতিদিনের বাজার
              </p>

              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                সঠিক দামে, সচেতন কেনাকাটা
              </h2>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-3 rounded-xl border border-gray-100 bg-white px-5 py-3 shadow-lg sm:-left-6">
            <p className="text-xs text-gray-500">
              আপনার বাজারের বিশ্বস্ত সঙ্গী
            </p>

            <p className="mt-1 font-bold text-emerald-700">
              🛒 বাজার দর
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
