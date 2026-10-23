import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-white">
            <ShoppingBag size={24} />
            ShopNest
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
            Discover everyday essentials and shop your favorites with ease.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white">Explore</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link to="/shop" className="hover:text-white">Shop products</Link>
            <Link to="/cart" className="hover:text-white">Shopping cart</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white">Your account</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link to="/login" className="hover:text-white">Login</Link>
            <Link to="/register" className="hover:text-white">Register</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white">Customer care</h3>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            Questions about an order? Contact our support team.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} ShopNest. All rights reserved.
      </div>
    </footer>
  );
}