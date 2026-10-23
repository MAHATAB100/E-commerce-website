
import {
  Truck,
  ShieldCheck,
  Headphones,
  RefreshCw,
} from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Convenient Delivery",
    description: "Clear delivery options at checkout.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description: "Your account and data deserve care.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "We're here to help with your questions.",
  },
  {
    icon: RefreshCw,
    title: "Easy Order Support",
    description: "Get help if an order needs attention.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-10 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
          The ShopNest difference
        </p>
        <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Shopping made more enjoyable
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
          A simple, convenient shopping experience, from browsing products
          to getting help with your order.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-100 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-900/5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Icon size={24} />
            </div>
            <h3 className="mt-5 font-bold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
