
import { ArrowRight, BadgePercent } from "lucide-react";
import { Link } from "react-router-dom";

export default function DealBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-700 to-blue-500 px-6 py-12 text-white sm:px-12 lg:px-16 lg:py-16">
        <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[35px] border-white/10" />
        <div className="absolute -bottom-28 right-1/3 h-64 w-64 rounded-full border-[30px] border-white/10" />

        <div className="relative z-10 grid items-center gap-8 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
              <BadgePercent size={18} />
              Special shopping deals
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              A little treat.
              <br />
              A lot of savings.
            </h2>

            <p className="mt-4 max-w-md leading-7 text-blue-100">
              Explore our product collection and discover great finds for
              your everyday needs.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Explore products <ArrowRight size={18} />
            </Link>
          </div>

          <div className="relative hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=900"
              alt="Shopping bags and shopping items"
              loading="lazy"
              className="h-72 w-full rounded-2xl object-cover shadow-2xl"
            />
            <div className="absolute -bottom-4 -left-4 rounded-xl bg-white px-5 py-4 text-slate-900 shadow-xl">
              <p className="text-sm text-slate-500">Your next favorite find</p>
              <p className="mt-1 font-extrabold">Starts at ShopNest</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
