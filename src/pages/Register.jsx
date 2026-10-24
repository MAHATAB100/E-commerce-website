
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ShoppingBag,
  ArrowRight,
  Phone,
  CheckCircle2,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");
const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

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
  setSuccess("");

  if (formData.password.length < 8) {
    setError("Password must contain at least 8 characters.");
    return;
  }

  if (formData.password.length > 72) {
    setError("Password cannot exceed 72 characters.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  if (!formData.terms) {
    setError("Please accept the Terms and Conditions.");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed.");
    }

    // Save the token for the current browser tab session.
    sessionStorage.setItem("shopnest-token", data.token);
    sessionStorage.setItem(
      "shopnest-user",
      JSON.stringify(data.user)
    );

    setSuccess("Registration successful! Redirecting to login...");

    // Give the user time to see the success message.
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1200);
  } catch (error) {
    if (error instanceof TypeError) {
      setError(
        "Cannot connect to the server. Please check whether the backend is running."
      );
    } else {
      setError(error.message || "Something went wrong.");
    }
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-[#f5f7fc] px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto grid min-h-[700px] max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60 lg:grid-cols-2">
        {/* Left banner */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-700 to-blue-500 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[40px] border-white/10" />
          <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full border-[45px] border-white/10" />

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
              Your shopping journey starts here
            </span>

            <h1 className="mt-7 text-5xl font-extrabold leading-tight">
              Join us.
              <br />
              Find your
              <br />
              <span className="text-blue-200">happy place.</span>
            </h1>

            <p className="mt-6 leading-7 text-blue-100">
              Create your account to explore exciting products and make every
              shopping moment easier.
            </p>

            <div className="mt-9 space-y-4">
              {[
                "Discover products you'll love",
                "Enjoy a simple shopping experience",
                "Keep your orders in one place",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={21} className="text-blue-200" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-sm text-blue-100">
            © 2026 ShopNest. All rights reserved.
          </p>
        </div>

        {/* Register form */}
        <div className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-14">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="mb-7 inline-flex items-center gap-2 font-extrabold text-blue-700 lg:hidden"
            >
              <ShoppingBag size={26} />
              <span className="text-2xl">ShopNest</span>
            </Link>

            <div className="mb-7">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                Get started today
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Create an account
              </h2>
              <p className="mt-3 leading-6 text-slate-500">
                Join ShopNest and discover something you'll love.
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
            {success && (
  <div
    role="status"
    className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
  >
    {success}
  </div>
)}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="register-name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full name
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                  <UserRound size={19} className="shrink-0 text-slate-400" />
                  <input
                    id="register-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-0 bg-transparent py-3 text-sm text-slate-800 outline-none focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="register-email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                  <Mail size={19} className="shrink-0 text-slate-400" />
                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-0 bg-transparent py-3 text-sm text-slate-800 outline-none focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="register-phone"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Phone number <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                  <Phone size={19} className="shrink-0 text-slate-400" />
                  <input
                    id="register-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-0 bg-transparent py-3 text-sm text-slate-800 outline-none focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="register-password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
               <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4">
  <LockKeyhole size={19} className="shrink-0 text-slate-400" />

  <input
    id="register-password"
    name="password"
    type={showPassword ? "text" : "password"}
    autoComplete="new-password"
    placeholder="At least 8 characters"
    minLength={8}
    value={formData.password}
    onChange={handleChange}
    required
    className="w-full border-0 bg-transparent py-3 text-sm outline-none"
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

              <div>
                <label
                  htmlFor="register-confirm-password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Confirm password
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                  <LockKeyhole size={19} className="shrink-0 text-slate-400" />
                  <input
                    id="register-confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full border-0 bg-transparent py-3 text-sm text-slate-800 outline-none focus:outline-none"
                  />
                 <button
  type="button"
  aria-label={showPassword ? "Hide password" : "Show password"}
  onClick={() => setShowPassword((prev) => !prev)}
  className="text-slate-400 hover:text-slate-700"
>
  {showPassword ? (
    <EyeOff size={19} />
  ) : (
    <Eye size={19} />
  )}
</button>
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 pt-1 text-sm leading-5 text-slate-600">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="checkbox checkbox-primary checkbox-sm mt-0.5"
                />
                <span>
                  I agree to the{" "}
                  <a href="#terms" className="font-semibold text-blue-600">
                    Terms and Conditions
                  </a>{" "}
                  and Privacy Policy.
                </span>
              </label>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
              >
                Create Account
                <ArrowRight
                  size={19}
                  className="transition group-hover:translate-x-1"
                />
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-blue-600 hover:text-blue-800"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-5 text-center text-xs text-slate-400">
              Your information will be handled securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
