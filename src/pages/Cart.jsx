import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-16 text-center">
      <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
      <p className="mt-3 text-slate-500">Your cart is empty for now.</p>
      <Link to="/shop" className="btn btn-primary mt-6">Continue Shopping</Link>
    </section>
  );
}