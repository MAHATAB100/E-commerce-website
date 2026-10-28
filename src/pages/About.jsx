
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: ShoppingBag,
    title: "Quality Products",
    description:
      "Discover carefully selected products for your everyday needs.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description:
      "Enjoy a reliable shopping experience with a focus on your security.",
  },
  {
    icon: Truck,
    title: "Convenient Delivery",
    description:
      "Get your favorite products delivered right to your doorstep.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "We aim to make every step of your shopping journey simple and enjoyable.",
  },
];

export default function About() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-slate-950 px-4 py-20 text-center text-white sm:py-24">
        <p className="font-semibold uppercase tracking-[0.25em] text-emerald-400">
          Get to Know Us
        </p>

        <h1 className="mt-4 text-4xl font-black sm:text-6xl">
          About <span className="text-emerald-400">ShopNest</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          Your everyday shopping destination. We make discovering and
          shopping for your favorite products simple and convenient.
        </p>

        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-bold text-white transition hover:bg-emerald-600"
        >
          Explore Products
          <ArrowRight size={18} />
        </Link>
      </section>

      {/* Our Story */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <p className="font-bold uppercase tracking-widest text-emerald-600">
            Our Story
          </p>

          <h2 className="mt-3 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
            Making Online Shopping Feel Effortless
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            ShopNest is an e-commerce platform designed to bring products
            and customers together in one convenient place.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            From exploring products to adding items to your cart and
            placing an order, our goal is to provide a smooth and
            user-friendly shopping experience.
          </p>
        </div>

        <div className="flex min-h-72 items-center justify-center rounded-3xl bg-emerald-50 p-10">
          <div className="text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-500 text-white shadow-xl shadow-emerald-200">
              <ShoppingBag size={48} />
            </div>

            <h3 className="mt-6 text-3xl font-black text-slate-900">
              ShopNest
            </h3>

            <p className="mt-2 text-slate-600">
              Your shopping, made simpler.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="font-bold uppercase tracking-widest text-emerald-600">
              Why ShopNest?
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
              Shopping Made Better
            </h2>

            <p className="mt-4 leading-7 text-slate-500">
              We focus on the essentials of a convenient online shopping
              experience.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                    <Icon size={28} />
                  </div>

                  <h3 className="mt-5 text-lg font-extrabold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl bg-emerald-500 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <h2 className="text-3xl font-black sm:text-4xl">
            Ready to Start Shopping?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-emerald-50">
            Explore our collection and find something you love.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-slate-900 transition hover:bg-slate-100"
          >
            Start Shopping
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
