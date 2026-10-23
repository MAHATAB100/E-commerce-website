
import { ArrowRight, Check, Clock3, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import PromoBanner from "../components/home/PromoBanner";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import DealBanner from "../components/home/DealBanner";
import BenefitsSection from "../components/home/BenefitsSection";

export default function Home() {
  return (
    <>
      <PromoBanner />

      {/* Hero section */}
      <section className="overflow-hidden bg-[#f3f6ff]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              <ShoppingBag size={16} />
              Discover the ShopNest collection
            </span>

            <h1 className="mt-6 max-w-xl text-4xl font-black leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Find your next
              <span className="block text-blue-600">favorite thing.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Discover everyday essentials, modern accessories and
              products you'll love—all in one convenient place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Explore products <ArrowRight size={19} />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50"
              >
                Join ShopNest
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <Check size={17} className="text-emerald-600" />
                Easy browsing
              </span>
              <span className="flex items-center gap-2">
                <Check size={17} className="text-emerald-600" />
                Convenient checkout
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full bg-blue-200/60 blur-2xl" />
            <div className="absolute -bottom-5 -left-5 h-32 w-32 rounded-full bg-indigo-200/70 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-2xl shadow-blue-900/10">
              <img
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1100"
                alt="A selection of shopping products and gifts"
                fetchPriority="high"
                className="h-[320px] w-full rounded-[1.5rem] object-cover sm:h-[420px]"
              />

              <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    Your next discovery
                  </p>
                  <p className="mt-1 font-bold text-slate-900">
                    Something special awaits
                  </p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                  <ShoppingBag size={21} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick shopping highlights */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 py-6 sm:grid-cols-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-700">
              <ShoppingBag size={21} />
            </span>
            <div>
              <p className="font-bold text-slate-900">Explore with ease</p>
              <p className="text-sm text-slate-500">Browse our collection</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <Check size={21} />
            </span>
            <div>
              <p className="font-bold text-slate-900">Simple checkout</p>
              <p className="text-sm text-slate-500">A clear ordering process</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-amber-700">
              <Clock3 size={21} />
            </span>
            <div>
              <p className="font-bold text-slate-900">Shop on your time</p>
              <p className="text-sm text-slate-500">Browse whenever you like</p>
            </div>
          </div>
        </div>
      </section>

      <CategorySection />
      <FeaturedProducts />
      <DealBanner />
      <BenefitsSection />
    </>
  );
}
