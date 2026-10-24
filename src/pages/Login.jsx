import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: true,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  const email = formData.email.trim().toLowerCase();
  const password = formData.password;

  if (!email || !password) {
    setError("Please enter your email and password.");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Login failed. Please try again.");
    }

    if (!data.token || !data.user) {
      throw new Error("Invalid login response from server.");
    }

    // Remove previous saved session
    localStorage.removeItem("shopnest-token");
    localStorage.removeItem("shopnest-user");
    sessionStorage.removeItem("shopnest-token");
    sessionStorage.removeItem("shopnest-user");

    // Remember me controls where login data is stored
    const storage = formData.remember
      ? localStorage
      : sessionStorage;

    storage.setItem("shopnest-token", data.token);
    storage.setItem("shopnest-user", JSON.stringify(data.user));

    // Redirect after successful login
    navigate("/", { replace: true });
  } catch (err) {
    setError(
      err.message === "Failed to fetch"
        ? "Cannot connect to server. Please check your backend."
        : err.message || "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#f5f7fc] px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto grid min-h-[650px] max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60 lg:grid-cols-2">
        {/* Left banner */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[45px] border-white/10" />
          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full border-[45px] border-white/10" />

          <Link to="/" className="relative z-10 flex items-center gap-3">
            <span className="rounded-xl bg-white p-2.5 text-blue-700">
              <ShoppingBag size={25} />
            </span>
            <span className="text-2xl font-extrabold tracking-tight">
              ShopNest
            </span>
          </Link>

          <div className="relative z-10 max-w-md">
            <span className="inline-block rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm">
              Your everyday shopping destination
            </span>

            <h1 className="mt-7 text-5xl font-extrabold leading-tight">
              Great finds.
              <br />
              Great prices.
              <br />
              <span className="text-blue-200">Just for you.</span>
            </h1>

            <p className="mt-6 max-w-sm leading-7 text-blue-100">
              Discover products you love and enjoy a simple, comfortable
              shopping experience with ShopNest.
            </p>

            <div className="mt-9 flex items-center gap-3">
              <div className="flex -space-x-3">
                {["A", "S", "M"].map((letter, index) => (
                  <div
                    key={letter}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600 font-bold text-blue-800 ${
                      index === 0
                        ? "bg-amber-200"
                        : index === 1
                          ? "bg-emerald-200"
                          : "bg-pink-200"
                    }`}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <p className="font-semibold">Made for smart shoppers</p>
                <p className="text-sm text-blue-100">
                  Find your next favorite thing
                </p>
              </div>
            </div>
          </div>

          <p className="relative z-10 text-sm text-blue-100">
            © 2026 ShopNest. All rights reserved.
          </p>
        </div>

        {/* Login form */}
        <div className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-14">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="mb-9 inline-flex items-center gap-2 font-extrabold text-blue-700 lg:hidden"
            >
              <ShoppingBag size={26} />
              <span className="text-2xl">ShopNest</span>
            </Link>

            <div className="mb-8">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                Welcome back
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Sign in to your account
              </h2>
              <p className="mt-3 leading-6 text-slate-500">
                Enter your details to continue your shopping journey.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                  <Mail size={19} className="shrink-0 text-slate-400" />
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-0 bg-transparent py-3.5 text-sm text-slate-800 outline-none focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="login-password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setError("Password reset will be available after backend setup.")
                    }
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                  <LockKeyhole
                    size={19}
                    className="shrink-0 text-slate-400"
                  />
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full border-0 bg-transparent py-3.5 text-sm text-slate-800 outline-none focus:outline-none"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                Remember me
              </label>

            <button
  type="submit"
  disabled={loading}
  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading ? "Signing In..." : "Sign In"}

  {!loading && (
    <ArrowRight
      size={19}
      className="transition group-hover:translate-x-1"
    />
  )}
</button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-medium text-slate-400">
                SHOP WITH CONFIDENCE
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <ShieldCheck size={19} className="text-emerald-600" />
              Your shopping experience matters to us.
            </div>

            <p className="mt-8 text-center text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-blue-600 hover:text-blue-800"
              >
                Create an account
              </Link>
            </p>

            <p className="mt-5 text-center text-xs text-slate-400">
              By signing in, you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
