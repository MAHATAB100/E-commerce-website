
// import { Link } from "react-router-dom";
// import { ShoppingBag } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="border-t border-slate-200 bg-white px-4 py-4">
//       <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2">
//           <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
//             <ShoppingBag size={18} />
//           </div>

//           <span className="text-lg font-bold text-slate-900">
//             Shop<span className="text-emerald-600">Nest</span>
//           </span>
//         </Link>

//         {/* Copyright */}
//         <p className="text-center text-sm text-slate-500">
//           © {new Date().getFullYear()} ShopNest. All rights reserved.
//         </p>

//         {/* Links */}
//         <div className="flex gap-4 text-sm text-slate-500">
//           <Link to="/" className="transition hover:text-emerald-600">
//             Home
//           </Link>

//           <Link to="/shop" className="transition hover:text-emerald-600">
//             Shop
//           </Link>
//         </div>
//       </div>
//     </footer>
//   );
// 
import { Link } from "react-router-dom";
import {
  ShoppingBag,
 
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-10 bg-slate-950 text-slate-300">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link to="/" className="mb-4 inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
                <ShoppingBag size={22} />
              </div>

              <span className="text-2xl font-extrabold text-white">
                Shop<span className="text-emerald-400">Nest</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-6 text-slate-400">
              Discover quality products, enjoy great prices, and experience
              shopping made simple with ShopNest.
            </p>

            <div className="mt-5 flex gap-3">
             

            

             
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-base font-bold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="transition hover:text-emerald-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="transition hover:text-emerald-400">
                  Shop Products
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="transition hover:text-emerald-400"
                >
                  My Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="transition hover:text-emerald-400"
                >
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="mb-4 text-base font-bold text-white">
              Customer Support
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/contact"
                  className="transition hover:text-emerald-400"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="transition hover:text-emerald-400"
                >
                  About ShopNest
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="transition hover:text-emerald-400"
                >
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="transition hover:text-emerald-400"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-base font-bold text-white">
              Get in Touch
            </h3>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                <span className="break-all">mahatabhossan78@gmail.com</span>
              </li>

              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                <span>+880 1518314530</span>
              </li>

              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                <span>Chattogram, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Small Promo Banner */}
        <div className="mt-9 flex flex-col justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900 px-5 py-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-semibold text-white">
              Your next favorite product is waiting!
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Explore our collection and find something you love.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 sm:self-auto"
          >
            Explore Shop
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-4 text-center text-xs text-slate-400 sm:flex-row sm:px-8 sm:text-left">
          <p>
            © {new Date().getFullYear()} ShopNest. All rights reserved.
          </p>

          <p>
            Made with <span className="text-emerald-400">♥</span> for better
            shopping.
          </p>
        </div>
      </div>
    </footer>
  );
}
