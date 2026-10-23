
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  ArrowRight,
 
 
  
  Mail,
  MapPin,
  Phone,
  Heart,
  ArrowUpRight,
} from "lucide-react";

const shopLinks = [
  { name: "All Products", path: "/shop" },
  { name: "Electronics", path: "/shop" },
  { name: "Fashion", path: "/shop" },
  { name: "Accessories", path: "/shop" },
];

const supportLinks = [
  { name: "Contact Us", path: "/contact" },
  { name: "My Cart", path: "/cart" },
  { name: "Shipping Information", path: "/shipping" },
  { name: "Returns & Refunds", path: "/returns" },
];



export default function Footer() {
  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
   
  };

  return (
    <footer className="mt-20 bg-slate-950 text-slate-300">
    

      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between md:py-16">
          <div className="max-w-xl">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-400">
              <Mail size={14} />
              Stay in the loop
            </span>

            <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              Get the latest deals
              <br className="hidden sm:block" /> straight to your inbox.
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Subscribe for product updates, special offers and shopping
              inspiration.
            </p>
          </div>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex w-full max-w-md gap-2 rounded-2xl border border-white/10 bg-white/5 p-2"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              aria-label="Email address"
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <button
              type="submit"
              className="flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
            >
              Subscribe
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

     
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
    
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <ShoppingBag size={22} />
            </span>
            ShopNest
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
            Discover everyday essentials, trending styles and products
            you'll love — all in one place.
          </p>

          <div className="mt-6 flex items-center gap-3">
           
          </div>
        </div>

    
        <div>
          <h3 className="text-base font-bold text-white">Explore Shop</h3>

          <ul className="mt-5 space-y-4">
            {shopLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="group inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                >
                  {item.name}
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

       
        <div>
          <h3 className="text-base font-bold text-white">Customer Care</h3>

          <ul className="mt-5 space-y-4">
            {supportLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        
        <div>
          <h3 className="text-base font-bold text-white">Get in Touch</h3>

          <p className="mt-5 text-sm leading-6 text-slate-400">
            Have a question about your shopping experience? We'd love to
            hear from you.
          </p>

          <div className="mt-5 space-y-4">
            <div className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-blue-400" />
              <a
                href="mailto:support@shopnest.example"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                mahatabhossan@shopnest.example
              </a>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-blue-400" />
              <span className="text-sm text-slate-400">
                Bangladesh
              </span>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-blue-400" />
              <span className="text-sm text-slate-400">
                Customer support
              </span>
            </div>
          </div>
        </div>
      </div>

     
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-center sm:px-6 md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-xs text-slate-500 sm:text-sm">
            © {new Date().getFullYear()} ShopNest. All rights reserved.
          </p>

          <p className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-500 sm:text-sm">
            Made with <Heart size={14} className="fill-rose-500 text-rose-500" />{" "}
            for better shopping
          </p>

          <div className="flex justify-center gap-5 text-xs sm:text-sm">
            <Link
              to="/privacy"
              className="text-slate-500 transition hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-slate-500 transition hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
