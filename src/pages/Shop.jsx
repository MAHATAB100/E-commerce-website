import ProductCard from "../components/products/ProductCard";
import { products } from "../data/products";

export default function Shop() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="text-3xl font-extrabold">Shop All Products</h1>
      <p className="mt-2 text-slate-500">Explore our current collection.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}