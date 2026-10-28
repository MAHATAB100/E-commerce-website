
import { useCallback, useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  ShoppingBag,
  Eye,
  X,
  AlertCircle,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/admin/orders";
const statusOptions = [
  "Placed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

function getToken() {
  return (
    localStorage.getItem("shopnest-token") ||
    sessionStorage.getItem("shopnest-token")
  );
}

function formatPrice(value) {
  return `৳${Number(value || 0).toLocaleString("en-BD")}`;
}

function getStatusStyle(status = "Pending") {
  const styles = {
    Pending: "bg-amber-100 text-amber-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-violet-100 text-violet-700",
    Delivered: "bg-emerald-100 text-emerald-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return styles[status] || "bg-slate-100 text-slate-700";
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState("");

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = getToken();

      if (!token) {
        throw new Error("Please log in with your admin account.");
      }

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load orders.");
      }

      const list = Array.isArray(data)
        ? data
        : data.orders || data.data || [];

      setOrders(list);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  async function updateStatus(orderId, status) {
    try {
      setUpdatingId(String(orderId));
      setError("");

      const response = await fetch(
        `${API_URL}/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not update order status.");
      }

      const updatedOrder = data.order || data;

      setOrders((current) =>
        current.map((order) =>
          String(order._id || order.id) === String(orderId)
            ? {
                ...order,
                ...updatedOrder,
                status: updatedOrder.status || status,
              }
            : order
        )
      );

      setSelectedOrder((current) =>
        current &&
        String(current._id || current.id) === String(orderId)
          ? { ...current, ...updatedOrder, status: updatedOrder.status || status }
          : current
      );
    } catch (err) {
      setError(err.message || "Status update failed.");
    } finally {
      setUpdatingId("");
    }
  }

  const filteredOrders = orders.filter((order) => {
    const customer =
      order.shippingAddress?.fullName ||
      order.user?.name ||
      order.customerName ||
      "";

    const reference =
      order.orderNumber ||
      order.orderReference ||
      order._id ||
      order.id ||
      "";

    const matchesSearch =
      `${customer} ${reference} ${order.shippingAddress?.email || ""}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || (order.status || "Pending") === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce(
      (sum, order) =>
        sum + Number(order.totalAmount ?? order.totalPrice ?? order.total ?? 0),
      0
    );

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-emerald-600">
              ShopNest Administration
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              Orders Management
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Review customer orders and manage their status.
            </p>
          </div>

          <button
            onClick={fetchOrders}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100 disabled:opacity-60"
          >
            <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Orders</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {orders.length}
                </p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <ShoppingBag size={25} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Order Value (excluding cancelled)
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {formatPrice(totalRevenue)}
            </p>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <div className="flex-1">{error}</div>
            <button onClick={() => setError("")} aria-label="Dismiss error">
              <X size={18} />
            </button>
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search order or customer..."
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
            >
              <option value="All">All statuses</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <span className="loading loading-spinner loading-lg text-emerald-600" />
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="px-4 py-16 text-center">
              <ShoppingBag
                size={38}
                className="mx-auto text-slate-300"
              />
              <h2 className="mt-4 font-semibold text-slate-800">
                No orders found
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or status filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Order</th>
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Total</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Payment</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((order) => {
                    const id = order._id || order.id;
                    const customer =
                      order.shippingAddress?.fullName ||
                      order.user?.name ||
                      order.customerName ||
                      "Customer";
                    const total =
                      order.totalAmount ?? order.totalPrice ?? order.total ?? 0;
                    const status = order.status || "Pending";

                    return (
                      <tr key={id} className="hover:bg-slate-50/70">
                        <td className="px-5 py-4 font-semibold text-slate-800">
                          #{String(id || "").slice(-8).toUpperCase()}
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-medium text-slate-800">
                            {customer}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {order.shippingAddress?.email ||
                              order.user?.email ||
                              ""}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString(
                                "en-GB"
                              )
                            : "—"}
                        </td>
                        <td className="px-5 py-4 font-semibold text-slate-800">
                          {formatPrice(total)}
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={status}
                            disabled={updatingId === String(id)}
                            onChange={(event) =>
                              updateStatus(id, event.target.value)
                            }
                            className={`rounded-full px-3 py-1.5 text-xs font-semibold outline-none ${getStatusStyle(
                              status
                            )}`}
                          >
                            {!statusOptions.includes(status) && (
                              <option value={status}>{status}</option>
                            )}
                            {statusOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {order.paymentMethod || "COD"}
                        </td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 font-medium text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                          >
                            <Eye size={16} />
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Order Details
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  ID: {selectedOrder._id || selectedOrder.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close order details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-500">Customer</p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {selectedOrder.shippingAddress?.fullName ||
                      selectedOrder.user?.name ||
                      selectedOrder.customerName ||
                      "Customer"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="mt-1 break-all font-medium text-slate-800">
                    {selectedOrder.shippingAddress?.email ||
                      selectedOrder.user?.email ||
                      "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="mt-1 font-medium text-slate-800">
                    {selectedOrder.shippingAddress?.phone || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Payment Method</p>
                  <p className="mt-1 font-medium text-slate-800">
                    {selectedOrder.paymentMethod || "COD"}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Shipping Address</p>
                <p className="mt-1 text-sm text-slate-800">
                  {[
                    selectedOrder.shippingAddress?.address,
                    selectedOrder.shippingAddress?.city,
                    selectedOrder.shippingAddress?.postalCode,
                  ]
                    .filter(Boolean)
                    .join(", ") || "No address available"}
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-slate-800">
                  Ordered Items
                </h3>
                <div className="space-y-2">
                  {(selectedOrder.items || []).map((item, index) => (
                    <div
                      key={item._id || item.id || index}
                      className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-3"
                    >
                      <div>
                        <p className="font-medium text-slate-800">
                          {item.name || item.title || item.product?.name || "Product"}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Quantity: {item.quantity || 1}
                        </p>
                      </div>
                      <p className="font-semibold text-slate-800">
                        {formatPrice(
                          (item.price || item.product?.price || 0) *
                            (item.quantity || 1)
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="font-semibold text-slate-700">
                  Order Total
                </span>
                <span className="text-xl font-bold text-emerald-700">
                  {formatPrice(
                    selectedOrder.totalAmount ??
                      selectedOrder.totalPrice ??
                      selectedOrder.total ??
                      0
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
