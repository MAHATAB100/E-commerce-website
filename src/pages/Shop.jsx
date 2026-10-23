
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  PackageSearch,
} from "lucide-react";

import ProductCard from "../components/products/ProductCard";
import { products } from "../data/products";

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Accessories",
  "Home & Living",
];

export default function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(10000);
  const searchInputRef = useRef(null);
const [searchParams, setSearchParams] = useSearchParams();

useEffect(() => {
  if (searchParams.get("focusSearch") === "1") {
    searchInputRef.current?.focus();

    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        nextParams.delete("focusSearch");
        return nextParams;
      },
      { replace: true }
    );
  }
}, [searchParams, setSearchParams]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = `${product.name} ${product.category}`
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      const matchesPrice = Number(product.price) <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, category, sortBy, maxPrice]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("featured");
    setMaxPrice(10000);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            The ShopNest Collection
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Find something <span className="text-blue-600">you love.</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Explore our collection of everyday essentials, modern
            accessories and trending favorites.
          </p>

          <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
              Quality picks
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
              Everyday style
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
              Simple shopping
            </span>
          </div>
        </div>
      </section>

   
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
       
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
  ref={searchInputRef}
  type="search"
  value={search}
  onChange={(event) => setSearch(event.target.value)}
  placeholder="Search products or categories..."
  aria-label="Search products"
  className="input input-bordered w-full"
/>
          </div>

          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <ArrowUpDown size={18} className="text-slate-500" />

            <span className="whitespace-nowrap text-sm text-slate-500">
              Sort by
            </span>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-800 outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </label>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* Filter sidebar */}
          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-bold text-slate-900">
                <SlidersHorizontal size={18} />
                Filters
              </h2>

              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                Reset all
              </button>
            </div>

            <div className="mt-7">
              <h3 className="text-sm font-bold text-slate-800">
                Categories
              </h3>

              <div className="mt-3 space-y-1">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                      category === item
                        ? "bg-blue-50 font-bold text-blue-700"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item}

                    {category === item && (
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 border-t border-slate-100 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">
                  Maximum price
                </h3>
                <span className="text-sm font-bold text-blue-600">
                  ৳{maxPrice.toLocaleString("en-BD")}
                </span>
              </div>

              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(event) =>
                  setMaxPrice(Number(event.target.value))
                }
                aria-label="Maximum product price"
                className="range range-primary mt-4"
              />

              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>৳500</span>
                <span>৳10,000</span>
              </div>
            </div>
          </aside>

          {/* Product results */}
          <div className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {category === "All" ? "All Products" : category}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>

              {(search || category !== "All" || maxPrice !== 10000) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-blue-600"
                >
                  <X size={16} />
                  Clear filters
                </button>
              )}
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-5 text-center">
                <PackageSearch size={44} className="text-slate-300" />

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  No products found
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Try another search term or change your filters to
                  discover more products.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  Clear all filters
                </button>

                <Link
                  to="/"
                  className="mt-4 text-sm font-semibold text-blue-600 hover:underline"
                >
                  Back to Home
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
