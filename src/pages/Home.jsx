import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, Headphones } from "lucide-react";
import ProductCard from "../components/products/ProductCard";
import { products } from "../data/products";

const benefits = [
  {
    icon: Truck,
    title: "Reliable Delivery",
    description: "Convenient delivery options for your orders.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description: "A shopping experience built with security in mind.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "We're here to help with your shopping questions.",
  },
];

export default function Home() {
  return (
    <>
      <section className="overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2">
          <div>
            <span className="badge badge-primary badge-outline">
              Welcome to ShopNest
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Shopping that fits
              <span className="block text-brand-600">your lifestyle.</span>
            </h1>

            <p className="mt-5 max-w-lg leading-7 text-slate-600">
              Explore everyday essentials, discover new favorites, and enjoy
              a simple shopping experience from browsing to checkout.
            </p>

            <Link to="/shop" className="btn btn-primary mt-7">
              Explore Products
              <ArrowRight size={18} />
            </Link>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&auto=format&fit=crop&q=80"
              alt="Modern fashion and retail store"
              className="h-72 w-full rounded-3xl object-cover shadow-xl sm:h-96"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-600">
              Customer favorites
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
              Featured products
            </h2>
          </div>

          <Link to="/shop" className="btn btn-ghost btn-sm">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {benefits.map(({ icon: Icon, title, description }) => (
          <div key={title} className="rounded-2xl border border-slate-100 p-6">
            <Icon size={28} className="text-brand-600" />
            <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
          </div>
        ))}
      </section>
    </>
  );
}