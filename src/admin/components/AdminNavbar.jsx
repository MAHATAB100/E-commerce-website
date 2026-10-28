
import { Menu, Search, Bell, ShieldCheck } from "lucide-react";

export default function AdminNavbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={21} />
          </button>

          <div>
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              Admin Dashboard
            </h2>
            <p className="hidden text-xs text-slate-500 sm:block">
              Manage your ShopNest store
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
            <Search size={18} className="text-slate-400" />
            <input
              type="search"
              placeholder="Search..."
              className="w-32 bg-transparent text-sm outline-none lg:w-44"
            />
          </div>

          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"
          >
            <Bell size={21} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500" />
          </button>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-3 sm:pl-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <ShieldCheck size={22} />
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-bold text-slate-800">Administrator</p>
              <p className="text-xs text-slate-500">ShopNest Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}