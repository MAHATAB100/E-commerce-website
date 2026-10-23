
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import { products } from "../../data/products";

export default function FeaturedProducts() {
  return (
    <section className="bg-slate-50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 flex items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              <Sparkles size={16} /> Handpicked for you
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Featured products
            </h2>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Great picks, great prices, just for you.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-blue-700 hover:gap-2"
          >
            View all <ArrowRight size={17} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
