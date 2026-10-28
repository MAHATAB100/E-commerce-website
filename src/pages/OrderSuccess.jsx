
import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, Package, ShoppingBag } from "lucide-react";

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 size={44} />
        </div>

        <h1 className="mt-6 text-3xl font-extrabold text-slate-900">
          Order Placed Successfully!
        </h1>

        <p className="mt-3 leading-7 text-slate-500">
          Thank you for shopping with ShopNest. Your order has been submitted.
        </p>

        {order && (
          <div className="mt-6 rounded-xl bg-slate-50 p-4 text-left">
            <p className="text-sm text-slate-500">Order Reference</p>
            <p className="mt-1 break-all font-bold text-slate-900">
              {order.orderNumber || order._id || order.id || "Order received"}
            </p>

            {order.totalAmount != null && (
              <p className="mt-2 font-semibold text-emerald-600">
                Total: ৳{Number(order.totalAmount).toLocaleString("en-BD")}
              </p>
            )}
          </div>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/shop"
            className="btn border-none bg-blue-600 text-white hover:bg-blue-700"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="btn btn-outline border-slate-300"
          >
            <Package size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
