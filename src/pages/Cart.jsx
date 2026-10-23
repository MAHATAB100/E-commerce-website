
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ShoppingCart,
} from "lucide-react";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Shipping is not calculated until checkout rules are implemented.
  const formatPrice = (price) =>
    `৳${price.toLocaleString("en-BD")}`;

  if (items.length === 0) {
    return (
      <section className="min-h-[65vh] bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-xl rounded-3xl bg-white px-6 py-14 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <ShoppingBag size={35} />
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-slate-900">
            Your cart is empty
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
            Looks like you haven't added anything yet. Explore our collection
            and find something you love.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            <ShoppingCart size={18} />
            Start shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-700"
        >
          <ArrowLeft size={17} />
          Continue shopping
        </Link>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Your shopping bag
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Shopping Cart
            </h1>
            <p className="mt-2 text-slate-500">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="text-sm font-semibold text-rose-600 hover:text-rose-700"
          >
            Clear cart
          </button>
        </div>

        <div className="mt-8 grid items-start gap-7 lg:grid-cols-[1fr_350px]">
          {/* Cart items */}
          <div className="space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5"
              >
                <Link
                  to={`/products/${item.id}`}
                  className="shrink-0 self-start"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-28 w-28 rounded-xl bg-slate-100 object-cover sm:h-32 sm:w-32"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-400">
                    {item.category}
                  </p>

                  <Link to={`/products/${item.id}`}>
                    <h2 className="mt-1 font-bold text-slate-900 hover:text-blue-700">
                      {item.name}
                    </h2>
                  </Link>

                  <p className="mt-2 text-lg font-extrabold text-slate-900">
                    {formatPrice(item.price)}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center rounded-lg border border-slate-200">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.name}`}
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          dispatch(decreaseQuantity(item.id))
                        }
                        className="p-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="min-w-9 text-center text-sm font-bold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.name}`}
                        onClick={() =>
                          dispatch(increaseQuantity(item.id))
                        }
                        className="p-2 text-slate-600 hover:bg-slate-50"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:text-rose-700"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-right sm:min-w-28 sm:self-start">
                  <p className="text-xs text-slate-400">Item total</p>
                  <p className="mt-1 font-extrabold text-slate-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Order summary */}
          <aside className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-xl font-extrabold text-slate-900">
              Order summary
            </h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between gap-4 text-slate-500">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-semibold text-slate-800">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-slate-500">
                <span>Shipping</span>
                <span className="text-right">Calculated at checkout</span>
              </div>

              <div className="border-t border-dashed border-slate-200 pt-4">
                <div className="flex justify-between gap-4">
                  <span className="font-bold text-slate-900">
                    Subtotal
                  </span>
                  <span className="text-xl font-extrabold text-slate-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white transition hover:bg-blue-700"
            >
              Proceed to Checkout
            </Link>

            <p className="mt-4 text-center text-xs leading-5 text-slate-400">
              Shipping and final order total will be confirmed at checkout.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
