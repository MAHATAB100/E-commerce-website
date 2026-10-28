
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Truck,
} from "lucide-react";

import StatCard from "../components/StatCard";

const stats = [
  {
    title: "Total Products",
    value: "120",
    description: "Products in your store",
    icon: Package,
    color: "emerald",
  },
  {
    title: "Total Orders",
    value: "248",
    description: "Orders received",
    icon: ShoppingCart,
    color: "blue",
  },
  {
    title: "Total Customers",
    value: "186",
    description: "Registered customers",
    icon: Users,
    color: "violet",
  },
  {
    title: "Total Revenue",
    value: "৳1,24,500",
    description: "Demo revenue — not live data",
    icon: DollarSign,
    color: "amber",
  },
];

const recentOrders = [
  {
    id: "#SN-1001",
    customer: "Rahim Ahmed",
    product: "Wireless Headphones",
    amount: 2500,
    status: "Delivered",
  },
  {
    id: "#SN-1002",
    customer: "Nusrat Jahan",
    product: "Smart Watch",
    amount: 4200,
    status: "Processing",
  },
  {
    id: "#SN-1003",
    customer: "Karim Hasan",
    product: "Running Shoes",
    amount: 3200,
    status: "Pending",
  },
  {
    id: "#SN-1004",
    customer: "Sadia Islam",
    product: "Travel Backpack",
    amount: 1800,
    status: "Shipped",
  },
];

const statusStyles = {
  Delivered: "bg-emerald-50 text-emerald-700",
  Processing: "bg-blue-50 text-blue-700",
  Pending: "bg-amber-50 text-amber-700",
  Shipped: "bg-violet-50 text-violet-700",
};

function getStatusIcon(status) {
  if (status === "Delivered") return CheckCircle2;
  if (status === "Shipped") return Truck;
  return Clock;
}

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Welcome */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-emerald-600">
            OVERVIEW
          </p>

          <h1 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Welcome to ShopNest 👋
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Here is what is happening with your store today.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
          <span className="font-semibold text-slate-800">Store status:</span>{" "}
          <span className="text-emerald-600">● Online</span>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-slate-900">
          Quick Overview
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Clock size={22} />
              </div>
              <ArrowUpRight size={19} className="text-slate-400" />
            </div>
            <p className="mt-4 text-sm text-slate-500">Pending Orders</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-900">12</h3>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Truck size={22} />
              </div>
              <ArrowUpRight size={19} className="text-slate-400" />
            </div>
            <p className="mt-4 text-sm text-slate-500">Orders in Transit</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-900">8</h3>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <CheckCircle2 size={22} />
              </div>
              <ArrowUpRight size={19} className="text-slate-400" />
            </div>
            <p className="mt-4 text-sm text-slate-500">Completed Orders</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-900">156</h3>
          </div>
        </div>
      </section>

      {/* Recent Orders */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recent Orders
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Latest customer orders
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/admin/orders";
            }}
            className="inline-flex items-center gap-2 self-start rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            View All Orders
            <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((order) => {
                const StatusIcon = getStatusIcon(order.status);

                return (
                  <tr key={order.id} className="transition hover:bg-slate-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-emerald-700">
                      {order.id}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-800">
                      {order.customer}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                      {order.product}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-800">
                      ৳{order.amount.toLocaleString("en-BD")}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                          statusStyles[order.status]
                        }`}
                      >
                        <StatusIcon size={14} />
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-500">
          Demo data only. Real order information will be connected to MongoDB.
        </div>
      </section>
    </div>
  );
}
