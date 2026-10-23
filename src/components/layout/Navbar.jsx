
import { Link, NavLink } from "react-router-dom";
import {
  ShoppingBag,
  Search,
  Menu,
  UserRound,
} from "lucide-react";
import { useSelector } from "react-redux";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
];
export default function Navbar() {
 
  const cartItems = useSelector((state) => state.cart.items);

 
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white">
      <div className="navbar mx-auto max-w-7xl px-4 sm:px-6">
        
        <div className="flex-1">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-extrabold text-brand-600"
          >
            <ShoppingBag size={25} />
            ShopNest
          </Link>
        </div>

     
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `font-medium transition ${
                  isActive
                    ? "text-brand-600"
                    : "text-slate-600 hover:text-brand-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

      
        <div className="flex-none gap-1 sm:gap-2">
          <Link
            to="/shop"
            aria-label="Search products"
            className="btn btn-ghost btn-circle"
          >
            <Search size={20} />
          </Link>

          <Link
            to="/login"
            aria-label="Account"
            className="btn btn-ghost btn-circle"
          >
            <UserRound size={20} />
          </Link>

         
          <Link
            to="/cart"
            aria-label={`Shopping cart with ${cartCount} items`}
            className="btn btn-ghost btn-circle relative"
          >
            <ShoppingBag size={20} />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

        
          <div className="dropdown dropdown-end md:hidden">
            <button
              type="button"
              tabIndex={0}
              className="btn btn-ghost btn-circle"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>

            <ul
              tabIndex={0}
              className="menu dropdown-content z-[60] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}

              <li>
                <Link to="/login">Login</Link>
              </li>

              <li>
                <Link to="/register">Create account</Link>
              </li>

              <li>
                <Link to="/cart">
                  Shopping cart
                  {cartCount > 0 && ` (${cartCount})`}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}