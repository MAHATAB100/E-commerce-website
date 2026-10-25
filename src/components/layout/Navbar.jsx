import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Search,
  Heart,
  Menu,
  UserRound,
  LogOut,
} from "lucide-react";
import { useSelector } from "react-redux";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
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

  // Refresh user information when storage changes or login state updates.
  useEffect(() => {
    const syncUser = () => {
      setUser(getSavedUser());
    };

    window.addEventListener("storage", syncUser);
    window.addEventListener("shopnest-auth-change", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("shopnest-auth-change", syncUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("shopnest-token");
    localStorage.removeItem("shopnest-user");

    sessionStorage.removeItem("shopnest-token");
    sessionStorage.removeItem("shopnest-user");

    setUser(null);

    // Notify other components that the user has logged out.
    window.dispatchEvent(new Event("shopnest-auth-change"));

    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white">
      <div className="navbar mx-auto max-w-7xl px-4 sm:px-6">
        {/* Brand */}
        <div className="flex-1">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-extrabold text-brand-600"
          >
            <ShoppingBag size={25} />
            ShopNest
          </Link>
        </div>

        {/* Desktop navigation */}
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

        {/* Actions */}
        <div className="flex-none gap-1 sm:gap-2">
          {/* Search */}
          <Link
            to="/shop?focusSearch=1"
            aria-label="Search products"
            title="Search products"
            className="btn btn-ghost btn-circle"
          >
            <Search size={20} />
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            title="Wishlist"
            className="relative inline-flex items-center justify-center rounded-full p-2 text-slate-700 transition hover:bg-rose-50 hover:text-rose-600"
          >
            <Heart size={21} />
          </Link>

          {/* User account */}
          {user ? (
            <div className="dropdown dropdown-end">
              <button
                type="button"
                tabIndex={0}
                aria-label="Open account menu"
                className="btn btn-ghost gap-2 rounded-full"
              >
                <UserRound size={20} />

                <span className="hidden max-w-32 truncate sm:inline">
                  {user.name || user.email || "My Account"}
                </span>
              </button>

              <ul
                tabIndex={0}
                className="menu dropdown-content z-[60] mt-3 w-60 rounded-box border border-slate-100 bg-base-100 p-2 shadow-lg"
              >
                <li className="pointer-events-none">
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-semibold text-slate-800">
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
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              aria-label="Account"
              title="Login"
              className="btn btn-ghost btn-circle"
            >
              <UserRound size={20} />
            </Link>
          )}

          {/* Cart */}
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

          {/* Mobile navigation */}
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
              className="menu dropdown-content z-[60] mt-3 w-56 rounded-box border border-slate-100 bg-base-100 p-2 shadow-lg"
            >
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}

              {user ? (
                <>
                  <li className="pointer-events-none">
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-semibold">
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
                    <button type="button" onClick={handleLogout}>
                      <LogOut size={17} />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>

                  <li>
                    <Link to="/register">Create account</Link>
                  </li>
                </>
              )}

              <li>
                <Link to="/wishlist">Wishlist</Link>
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