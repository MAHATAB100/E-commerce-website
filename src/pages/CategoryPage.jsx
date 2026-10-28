
import { Link } from "react-router-dom";
import {
  Laptop,
  Shirt,
  Home,
  Dumbbell,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    name: "Electronics",
    description: "Discover everyday technology.",
    icon: Laptop,
  },
  {
    name: "Fashion",
    description: "Find your personal style.",
    icon: Shirt,
  },
  {
    name: "Home & Living",
    description: "Make your space special.",
    icon: Home,
  },
  {
    name: "Sports",
    description: "Gear up for your next adventure.",
    icon: Dumbbell,
  },
];

export default function CategoryPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-950 px-4 py-16 text-center text-white sm:py-20">
        <p className="font-semibold uppercase tracking-[0.2em] text-emerald-400">
          Explore ShopNest
        </p>

        <h1 className="mt-4 text-4xl font-black sm:text-5xl">
          Shop by <span className="text-emerald-400">Category</span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">
          Explore our collections and find products for your everyday needs.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                to="/shop"
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-500 group-hover:text-white">
                  <Icon size={28} />
                </span>

                <h2 className="mt-5 text-xl font-extrabold text-slate-900">
                  {category.name}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {category.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-600">
                  Explore Category
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}