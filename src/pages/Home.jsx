
import {
  ArrowRight,
  Check,
  Truck,
  ShieldCheck,
  Headphones,
  RotateCcw,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import PromoBanner from "../components/home/PromoBanner";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import DealBanner from "../components/home/DealBanner";
import BenefitsSection from "../components/home/BenefitsSection";

const shoppingBenefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On eligible orders",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description: "Shop with confidence",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "We're here to help",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Hassle-free shopping",
  },
];

export default function Home() {
  return (
    <>
      <PromoBanner />

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
          {/* Hero content */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-400 sm:text-sm">
              <Sparkles size={16} />
              Discover something special
            </span>

            <h1 className="mt-6 max-w-2xl text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Upgrade Your
              <br />
              Style with
              <span className="block text-emerald-400">ShopNest.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Discover everyday essentials, stylish accessories and products
              you'll love. Shop your favorites with a simple and convenient
              shopping experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-400"
              >
                Shop Now
                <ArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-bold text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Explore Collection
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <Check size={17} className="text-emerald-400" />
                Easy shopping
              </span>

              <span className="flex items-center gap-2">
                <Check size={17} className="text-emerald-400" />
                Secure checkout
              </span>

              <span className="flex items-center gap-2">
                <Check size={17} className="text-emerald-400" />
                Quality products
              </span>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="absolute -bottom-5 -left-5 h-36 w-36 rounded-full bg-teal-400/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/30">
              <img
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&auto=format&fit=crop&q=85"
                alt="A collection of shopping products and gifts"
                fetchPriority="high"
                className="h-[300px] w-full rounded-[1.35rem] object-cover sm:h-[390px] lg:h-[440px]"
              />

              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 rounded-2xl border border-white/60 bg-white/95 p-4 text-slate-900 shadow-xl backdrop-blur-md sm:inset-x-7 sm:bottom-7 sm:p-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Welcome to ShopNest
                  </p>

                  <p className="mt-1 text-base font-extrabold sm:text-lg">
                    Your next favorite is here.
                  </p>

                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Explore our latest collection.
                  </p>
                </div>

                <Link
                  to="/shop"
                  aria-label="Explore ShopNest products"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white transition hover:bg-emerald-600 sm:h-12 sm:w-12"
                >
                  <ShoppingBag size={22} />
                </Link>
              </div>
            </div>

            {/* Floating label */}
            <div className="absolute -left-2 top-6 hidden items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/95 px-4 py-3 shadow-xl sm:flex lg:-left-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                <ShoppingBag size={20} />
              </span>

              <div>
                <p className="text-sm font-bold text-white">
                  Shop your favorites
                </p>
                <p className="text-xs text-slate-400">
                  All in one place
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Benefits */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-100 px-4 py-5 sm:grid-cols-2 sm:divide-y-0 sm:px-6 lg:grid-cols-4 lg:px-8">
          {shoppingBenefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="flex items-center gap-4 px-3 py-4 sm:px-5 lg:justify-center lg:border-r lg:border-slate-100 lg:last:border-r-0"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <Icon size={23} strokeWidth={1.8} />
                </span>

                <div>
                  <h3 className="font-bold text-slate-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Existing sections */}
      <div className="bg-white">
        <CategorySection />
        <FeaturedProducts />
        <DealBanner />
        <BenefitsSection />
      </div>
    </>
  );
}
