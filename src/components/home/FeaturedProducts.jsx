
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShoppingBag,
} from "lucide-react";
import ProductCard from "../products/ProductCard";
import { products } from "../../data/products";

export default function FeaturedProducts() {
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="overflow-hidden bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-2 text-sm font-bold text-emerald-700">
              <Sparkles size={16} />
              Handpicked for you
            </div>

            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Featured <span className="text-emerald-600">Products</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              Explore our customer favorites and discover products you'll
              love, all carefully selected for your everyday needs.
            </p>
          </div>

          <Link
            to="/shop"
            className="group inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 sm:self-auto"
          >
            View All Products
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Product count / label */}
        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <TrendingUp size={18} className="text-emerald-600" />
            Popular picks
          </div>

          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
            {featuredProducts.length} featured items
          </span>
        </div>

        {/* Product Grid */}
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group min-w-0 transition duration-300 hover:-translate-y-1"
              >
                <div className="h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 group-hover:border-emerald-200 group-hover:shadow-xl group-hover:shadow-slate-900/5">
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <ShoppingBag
              size={38}
              className="mx-auto text-slate-400"
            />

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Products coming soon
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              We're preparing our collection. Please check back soon.
            </p>

            <Link
              to="/shop"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
            >
              Visit Shop
              <ArrowRight size={17} />
            </Link>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-10 overflow-hidden rounded-2xl bg-slate-950 px-5 py-7 sm:px-8 sm:py-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                <ShoppingBag size={24} />
              </span>

              <div>
                <h3 className="text-lg font-extrabold text-white sm:text-xl">
                  Find something you'll love
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Browse the complete ShopNest collection.
                </p>
              </div>
            </div>

            <Link
              to="/shop"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-bold text-white transition hover:bg-emerald-400 sm:w-auto"
            >
              Explore Shop
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 sm:hidden">
          <Link
            to="/shop"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 font-bold text-slate-800 transition hover:border-emerald-500 hover:text-emerald-700"
          >
            View All Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
