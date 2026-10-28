import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  MessageSquare,
  Settings,
  Store,
  X,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: MessageSquare,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar({ open, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (!confirmed) return;

    localStorage.removeItem("shopnest-token");
    localStorage.removeItem("shopnest-user");
    sessionStorage.removeItem("shopnest-token");
    sessionStorage.removeItem("shopnest-user");

    if (onClose) {
      onClose();
    }

    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex h-screen h-dvh w-64 flex-col
          overflow-hidden border-r border-slate-200
          bg-white shadow-sm
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-100 px-5">
          <Link
            to="/admin"
            onClick={onClose}
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white">
              <Store size={23} />
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-extrabold text-slate-900">
                ShopNest
              </h1>
              <p className="text-xs font-medium text-slate-500">
                Admin Panel
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation: only this area scrolls */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-6">
          <p className="mb-4 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">
            Main Menu
          </p>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`
                  }
                >
                  <Icon size={20} className="shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer: always stays at the bottom */}
        <div className="mt-auto shrink-0 border-t border-slate-200 bg-white p-3 pb-[max(12px,env(safe-area-inset-bottom))]">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <Store size={20} className="shrink-0" />
            <span>Back to Shop</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={20} className="shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}