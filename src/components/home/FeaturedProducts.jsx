


import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import ProductCard from "../products/ProductCard";
import { products } from "../../data/products";

export default function FeaturedProducts() {
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="bg-base-100 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
              <Sparkles size={16} />
              Handpicked for you
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
              Featured Products
            </h2>

            <p className="mt-2 max-w-xl text-base-content/60">
              Discover popular products selected just for you.
            </p>
          </div>

          <Link
            to="/shop"
            className="btn btn-outline btn-primary gap-2 self-start sm:self-auto"
          >
            View All Products
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center sm:hidden">
          <Link to="/shop" className="btn btn-primary w-full">
            Explore All Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
