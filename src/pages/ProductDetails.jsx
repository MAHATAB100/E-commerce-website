import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return <div className="p-12 text-center">Product not found.</div>;
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-8 px-5 py-12 md:grid-cols-2">
      <img src={product.image} alt={product.name} className="w-full rounded-2xl object-cover" />
      <div>
        <p className="text-sm text-brand-600">{product.category}</p>
        <h1 className="mt-3 text-3xl font-bold">{product.name}</h1>
        <p className="mt-4 text-xl font-extrabold">৳{product.price.toLocaleString("en-BD")}</p>
        <p className="mt-4 text-slate-600">Customer rating: {product.rating}/5</p>
        <Link to="/cart" className="btn btn-primary mt-6">Go to Cart</Link>
      </div>
    </section>
  );
}