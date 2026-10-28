
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "mahatabhossan78@gmail.com",
    description: "Send us your questions anytime.",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+880 1518314530",
    description: "Contact our support team.",
  },
  {
    icon: Clock,
    title: "Support Hours",
    value: "Saturday – Thursday",
    description: "10:00 AM – 6:00 PM",
  },
];

const initialFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clear the previous message when the user edits the form.
    if (status) {
      setStatus("");
      setStatusType("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    if (
      !payload.name ||
      !payload.email ||
      !payload.subject ||
      !payload.message
    ) {
      setStatus("Please fill in all fields.");
      setStatusType("error");
      return;
    }

    if (payload.message.length < 10) {
      setStatus("Your message must contain at least 10 characters.");
      setStatusType("error");
      return;
    }

    setLoading(true);
    setStatus("");
    setStatusType("");

    try {
      const apiBaseUrl = (
        import.meta.env.VITE_API_URL || "http://localhost:5000"
      ).replace(/\/+$/, "");

      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message ||
            `Unable to submit your message (HTTP ${response.status}).`
        );
      }

      if (!result?.success) {
        throw new Error(
          result?.message || "The server could not submit your message."
        );
      }

      setStatus(
        result.message || "Your message has been sent successfully!"
      );
      setStatusType("success");
      setFormData({ ...initialFormData });
    } catch (error) {
      console.error("Contact form submission error:", error);

      setStatus(
        error.message === "Failed to fetch"
          ? "Cannot connect to the server. Please check that your backend is running."
          : error.message || "Something went wrong. Please try again."
      );
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-slate-950 px-4 py-16 text-center text-white sm:py-20">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500">
          <MessageCircle size={28} />
        </div>

        <p className="mt-5 font-semibold uppercase tracking-[0.2em] text-emerald-400">
          We're Here to Help
        </p>

        <h1 className="mt-3 text-4xl font-black sm:text-5xl">
          Contact <span className="text-emerald-400">Us</span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">
          Have a question about an order or product? Send us a message
          and let us know how we can help.
        </p>
      </section>

      {/* Contact Content */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-5 lg:px-8 lg:py-20">
        {/* Contact Information */}
        <div className="lg:col-span-2">
          <p className="font-bold uppercase tracking-widest text-emerald-600">
            Get in Touch
          </p>

          <h2 className="mt-3 text-3xl font-black text-slate-900">
            We'd Love to Hear From You
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Need assistance with shopping, orders, or your account?
            Contact our team using the information below or fill out
            the message form.
          </p>

          <div className="mt-8 space-y-5">
            {contactInfo.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon size={23} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900">
                      {item.title}
                    </h3>

                    {item.title === "Email Us" ? (
                      <a
                        href={`mailto:${item.value}`}
                        className="mt-1 block break-words font-medium text-emerald-700 hover:text-emerald-800"
                      >
                        {item.value}
                      </a>
                    ) : item.title === "Call Us" ? (
                      <a
                        href={`tel:${item.value.replace(/\s/g, "")}`}
                        className="mt-1 block break-words font-medium text-emerald-700 hover:text-emerald-800"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 font-medium text-emerald-700">
                        {item.value}
                      </p>
                    )}

                    <p className="mt-1 text-sm text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-emerald-50 p-5 text-slate-700">
            <MapPin
              className="mt-1 shrink-0 text-emerald-600"
              size={22}
            />

            <div>
              <h3 className="font-bold text-slate-900">
                ShopNest Online Store
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Shop conveniently from wherever you are.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
            <h2 className="text-2xl font-black text-slate-900">
              Send Us a Message
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Fill in the form below. All fields are required.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    autoComplete="name"
                    maxLength={100}
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 disabled:opacity-60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    maxLength={254}
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Subject
                </label>

                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What do you need help with?"
                  maxLength={200}
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Your Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={5}
                  minLength={10}
                  maxLength={5000}
                  required
                  disabled={loading}
                  className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 disabled:opacity-60"
                />
              </div>

              {status && (
                <div
                  role={statusType === "error" ? "alert" : "status"}
                  className={`rounded-xl p-4 text-sm leading-6 ${
                    statusType === "success"
                      ? "bg-emerald-50 text-emerald-800"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {status}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-bold text-white transition hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && <Send size={18} />}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
