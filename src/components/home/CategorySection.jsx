
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Electronics",
    subtitle: "Smart tech for everyday life",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600",
  },
  {
    name: "Fashion",
    subtitle: "Refresh your everyday style",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600",
  },
  {
    name: "Accessories",
    subtitle: "Small details, big impact",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600",
  },
  {
    name: "Home & Living",
    subtitle: "Make your space feel special",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600",
  },
];

export default function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            Explore collections
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Shop by category
          </h2>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Find something special for every part of your life.
          </p>
        </div>

        <Link
          to="/shop"
          className="hidden items-center gap-1 text-sm font-bold text-blue-700 hover:gap-2 sm:inline-flex"
        >
          View all <ArrowUpRight size={17} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            to="/shop"
            key={category.name}
            className="group relative min-h-52 overflow-hidden rounded-2xl bg-slate-100 sm:min-h-72"
          >
            <img
              src={category.image}
              alt={category.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
              <div className="flex items-end justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold sm:text-xl">
                    {category.name}
                  </h3>
                  <p className="mt-1 hidden text-xs text-slate-200 sm:block sm:text-sm">
                    {category.subtitle}
                  </p>
                </div>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-slate-900 transition group-hover:bg-blue-600 group-hover:text-white">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
