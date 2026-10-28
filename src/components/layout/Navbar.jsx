
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Search,
  Heart,
  Menu,
  UserRound,
  LogOut,
  X,
  ChevronDown,
  Home,
  Store,
} from "lucide-react";
import { useSelector } from "react-redux";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Shop", path: "/shop", icon: Store },
   { name: "Categories", path: "/categories" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const getSavedUser = () => {
  const savedUser =
    localStorage.getItem("shopnest-user") ||
    sessionStorage.getItem("shopnest-user");

  try {
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
};

export default function Navbar() {
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

  const [user, setUser] = useState(getSavedUser);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const syncUser = () => setUser(getSavedUser());

    window.addEventListener("storage", syncUser);
    window.addEventListener("shopnest-auth-change", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("shopnest-auth-change", syncUser);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("shopnest-token");
    localStorage.removeItem("shopnest-user");
    sessionStorage.removeItem("shopnest-token");
    sessionStorage.removeItem("shopnest-user");

    setUser(null);
    window.dispatchEvent(new Event("shopnest-auth-change"));
    navigate("/login", { replace: true });
  };

  const iconButton =
    "relative inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-300 transition duration-200 hover:bg-white/10 hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950 text-white shadow-lg shadow-slate-950/10">
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="ShopNest home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition group-hover:scale-105">
            <ShoppingBag size={23} strokeWidth={2.2} />
          </span>

          <span className="text-xl font-extrabold tracking-tight sm:text-2xl">
            Shop<span className="text-emerald-400">Nest</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `relative rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-0.5 sm:gap-1.5">
          {/* Search */}
          <Link
            to="/shop?focusSearch=1"
            aria-label="Search products"
            title="Search products"
            className={iconButton}
          >
            <Search size={20} />
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            title="Wishlist"
            className={iconButton}
          >
            <Heart size={20} />
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            aria-label={`Shopping cart with ${cartCount} items`}
            title="Shopping cart"
            className={iconButton}
          >
            <ShoppingBag size={21} />

            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-extrabold text-white ring-2 ring-slate-950">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Account */}
          {user ? (
            <div className="dropdown dropdown-end">
              <button
                type="button"
                tabIndex={0}
                aria-label="Open account menu"
                className="ml-1 flex h-10 max-w-44 items-center gap-2 rounded-xl border border-white/10 px-2.5 text-slate-100 transition hover:border-emerald-500/40 hover:bg-white/5 sm:px-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <UserRound size={17} />
                </span>

                <span className="hidden max-w-24 truncate text-sm font-semibold lg:block">
                  {user.name || user.email || "My Account"}
                </span>

                <ChevronDown size={15} className="hidden text-slate-400 lg:block" />
              </button>

              <ul
                tabIndex={0}
                className="menu dropdown-content z-[60] mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 text-slate-800 shadow-xl"
              >
                <li className="pointer-events-none mb-1">
                  <div className="flex flex-col items-start gap-1 rounded-xl bg-slate-50 px-3 py-3">
                    <span className="font-bold text-slate-900">
                      {user.name || "Welcome"}
                    </span>

                    {user.email && (
                      <span className="break-all text-xs text-slate-500">
                        {user.email}
                      </span>
                    )}
                  </div>
                </li>

                <li>
                  <Link to="/wishlist">
                    <Heart size={16} />
                    My Wishlist
                  </Link>
                </li>

                <li>
                  <Link to="/cart">
                    <ShoppingBag size={16} />
                    Shopping Cart
                  </Link>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="ml-1 hidden items-center justify-center rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-white transition hover:border-emerald-400 hover:bg-emerald-500 hover:text-white sm:inline-flex"
            >
              Login
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((previous) => !previous)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className={`ml-1 inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 transition hover:bg-white/10 hover:text-emerald-400 md:hidden ${
              mobileMenuOpen ? "bg-white/10 text-emerald-400" : ""
            }`}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-slate-950 px-4 pb-5 pt-3 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  <Icon size={18} />
                  {item.name}
                </NavLink>
              );
            })}

            <Link
              to="/shop?focusSearch=1"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <Search size={18} />
              Search Products
            </Link>

            <Link
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <Heart size={18} />
              Wishlist
            </Link>

            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <ShoppingBag size={18} />
              Shopping Cart
              {cartCount > 0 && (
                <span className="ml-auto rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <div className="mt-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-sm font-bold text-white">
                    {user.name || "Welcome"}
                  </p>
                  {user.email && (
                    <p className="mt-1 break-all text-xs text-slate-400">
                      {user.email}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl border border-slate-600 px-4 py-3 text-center text-sm font-bold text-white transition hover:border-emerald-400"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-emerald-400"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}