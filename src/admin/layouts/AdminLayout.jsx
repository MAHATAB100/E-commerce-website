
import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { Menu } from "lucide-react";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Admin Sidebar */}
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden lg:ml-72">
        {/* Mobile Header */}
        <header className="flex h-14 shrink-0 items-center border-b border-slate-200 bg-white px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 hover:bg-slate-100"
            aria-label="Open sidebar"
          >
            <Menu size={22} />
          </button>

          <span className="ml-3 font-bold text-slate-900">
            ShopNest Admin
          </span>
        </header>

        {/* Page Content */}
        <main className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
