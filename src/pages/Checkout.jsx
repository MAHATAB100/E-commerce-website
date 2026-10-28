import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  User,
  Truck,
  ShieldCheck,
  ShoppingBag,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

const getSavedUser = () => {
  try {
    const user =
      localStorage.getItem("shopnest-user") ||
      sessionStorage.getItem("shopnest-user");

    return user ? JSON.parse(user) : {};
  } catch {
    return {};
  }
};

const getSavedCart = () => {
  // Read cart data from localStorage/sessionStorage.
  // Adjust the key here if your existing Cart uses a different key.
  try {
    const saved =
      localStorage.getItem("shopnest-cart") ||
      sessionStorage.getItem("shopnest-cart");

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const formatPrice = (amount) =>
  `৳${Number(amount || 0).toLocaleString("en-BD")}`;

export default function Checkout() {
  const navigate = useNavigate();
const dispatch = useDispatch();

const savedUser = getSavedUser();

const cartItems = useSelector((state) => state.cart.items);

  const [formData, setFormData] = useState({
    fullName: savedUser.name || "",
    email: savedUser.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price || 0);
      const quantity = Number(item.quantity || 1);

      return total + price * quantity;
    }, 0);
  }, [cartItems]);

  const shipping = subtotal === 0 ? 0 : subtotal >= 3000 ? 0 : 100;
  const total = subtotal + shipping;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setNotice("");
  };

 
  const [isSubmitting, setIsSubmitting] = useState(false);
const handleSubmit = async (event) => {
  event.preventDefault();

  const requiredFields = [
    "fullName",
    "email",
    "phone",
    "address",
    "city",
    "postalCode",
  ];

  const missingField = requiredFields.find(
    (field) => !String(formData[field] || "").trim()
  );

  if (missingField) {
    setNotice({
      type: "error",
      message: "Please fill in all required fields.",
    });
    return;
  }

  if (!cartItems.length) {
    setNotice({
      type: "error",
      message: "Your cart is empty.",
    });
    return;
  }

  const token =
    localStorage.getItem("shopnest-token") ||
    sessionStorage.getItem("shopnest-token");

  if (!token) {
    setNotice({
      type: "error",
      message: "Please log in before placing your order.",
    });
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: cartItems.map((item) => ({
          id: String(item.id ?? item.productId ?? ""),
          quantity: Number(item.quantity),
        })),
        shippingAddress: {
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          postalCode: formData.postalCode.trim(),
        },
        paymentMethod: "COD",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to place order.");
    }

    dispatch(clearCart());

    navigate("/order-success", {
      state: { order: data.order || data },
    });
  } catch (error) {
    setNotice({
      type: "error",
      message: error.message || "Something went wrong.",
    });
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <section className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to Cart
        </Link>

        <div className="mb-8 mt-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            Almost yours
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-slate-500">
            Enter your delivery information to continue.
          </p>
        </div>
{notice && (
  <div
    className={`alert ${
      notice.type === "error" ? "alert-error" : "alert-info"
    }`}
    role="alert"
  >
    {typeof notice === "string" ? notice : notice.message}
  </div>
)}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_380px]">
            {/* Customer Information */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <User size={22} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Contact Information
                    </h2>
                    <p className="text-sm text-slate-500">
                      Who should we contact about your order?
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Full Name *
                    </label>

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`input input-bordered w-full bg-white ${
                        errors.fullName ? "input-error" : ""
                      }`}
                    />

                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="input input-bordered w-full bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
                    >
                      <Phone size={15} />
                      Phone Number *
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="01XXXXXXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input input-bordered w-full bg-white ${
                        errors.phone ? "input-error" : ""
                      }`}
                    />

                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <MapPin size={22} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Shipping Address
                    </h2>
                    <p className="text-sm text-slate-500">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Street Address *
                    </label>

                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      autoComplete="street-address"
                      placeholder="House number, road, area, landmark..."
                      value={formData.address}
                      onChange={handleChange}
                      className={`textarea textarea-bordered w-full resize-none bg-white ${
                        errors.address ? "textarea-error" : ""
                      }`}
                    />

                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="city"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        City / District *
                      </label>

                      <input
                        id="city"
                        name="city"
                        type="text"
                        autoComplete="address-level2"
                        placeholder="e.g. Dhaka"
                        value={formData.city}
                        onChange={handleChange}
                        className={`input input-bordered w-full bg-white ${
                          errors.city ? "input-error" : ""
                        }`}
                      />

                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="postalCode"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Postal Code
                      </label>

                      <input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        autoComplete="postal-code"
                        placeholder="e.g. 1207"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="input input-bordered w-full bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <CreditCard size={22} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Payment Method
                    </h2>
                    <p className="text-sm text-slate-500">
                      Choose how you want to pay.
                    </p>
                  </div>
                </div>

                <label className="flex cursor-pointer items-start gap-4 rounded-xl border-2 border-blue-600 bg-blue-50/50 p-4">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="radio radio-primary mt-1"
                  />

                  <div className="flex-1">
                    <p className="font-bold text-slate-900">
                      Cash on Delivery
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Pay in cash when your order arrives.
                    </p>
                  </div>

                  <Truck className="text-blue-600" size={24} />
                </label>

                <div className="mt-4 flex items-start gap-3 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                  <ShieldCheck
                    size={20}
                    className="shrink-0 text-emerald-600"
                  />

                  <p>
                    Online payment will be added in the next phase. For now,
                    Cash on Delivery is selected.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-6">
              <h2 className="text-xl font-bold text-slate-900">
                Order Summary
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {cartItems.reduce(
                  (count, item) => count + Number(item.quantity || 1),
                  0
                )}{" "}
                items in your cart
              </p>

              <div className="mt-6 max-h-72 space-y-4 overflow-y-auto">
                {cartItems.map((item, index) => (
                  <div
                    key={item._id || item.id || item.productId || index}
                    className="flex items-start gap-3"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name || item.title || "Product"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ShoppingBag className="text-slate-400" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-semibold text-slate-800">
                        {item.name || item.title || "Product"}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Qty: {item.quantity || 1}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-bold text-slate-900">
                      {formatPrice(
                        Number(item.price || 0) * Number(item.quantity || 1)
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <div className="my-6 border-t border-dashed border-slate-200" />

              <div className="space-y-4 text-sm">
                <div className="flex justify-between gap-4 text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-slate-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {shipping === 0 && subtotal > 0
                      ? "Free"
                      : formatPrice(shipping)}
                  </span>
                </div>

                <p className="text-xs text-slate-500">
                  Free shipping on orders of ৳3,000 or more. Delivery charges
                  can be configured for your store.
                </p>
              </div>

              <div className="my-5 border-t border-slate-200" />

              <div className="flex items-center justify-between gap-4">
                <span className="font-bold text-slate-900">Total</span>
                <span className="text-2xl font-extrabold text-slate-900">
                  {formatPrice(total)}
                </span>
              </div>

             
{notice && (
  <div
    role="status"
    className={`mt-5 rounded-xl border p-4 text-sm ${
      typeof notice === "object" && notice.type === "error"
        ? "border-red-200 bg-red-50 text-red-700"
        : "border-blue-200 bg-blue-50 text-blue-800"
    }`}
  >
    {typeof notice === "string" ? notice : notice.message}
  </div>
)}


             <button
  type="submit"
  disabled={isSubmitting}
  className="btn mt-6 min-h-14 w-full border-none bg-blue-600 text-base font-bold text-white hover:bg-blue-700"
>
  <CheckCircle2 size={19} />
  {isSubmitting ? "Placing Order..." : "Place Order"}
</button>

              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                By continuing, you confirm that your delivery information is
                correct.
              </p>
            </aside>
          </div>
        </form>
      </div>
    </section>
  );
}
