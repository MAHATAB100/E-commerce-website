import { Link } from "react-router-dom";

export default function Checkout() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="mt-3 text-slate-500">
        Shipping details and payment methods will be implemented in the checkout phase.
      </p>
      <Link to="/cart" className="btn btn-outline mt-6">Back to Cart</Link>
    </section>
  );
}