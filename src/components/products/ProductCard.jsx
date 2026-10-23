import { Link } from "react-router-dom";
import { Heart, Star, ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden bg-slate-50">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        <span className="badge badge-primary absolute left-3 top-3">
          {product.badge}
        </span>

        <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          className="btn btn-circle btn-sm absolute right-3 top-3 bg-white"
        >
          <Heart size={17} />
        </button>
      </div>

      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {product.category}
        </p>

        <Link to={`/products/${product.id}`}>
          <h3 className="mt-2 line-clamp-1 font-bold text-slate-800 hover:text-brand-600">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-1 text-sm">
          <Star size={15} className="fill-amber-400 text-amber-400" />
          <span className="font-semibold">{product.rating}</span>
          <span className="text-slate-400">/ 5</span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div>
            <p className="font-extrabold text-slate-900">
              ৳{product.price.toLocaleString("en-BD")}
            </p>
            <p className="text-xs text-slate-400 line-through">
              ৳{product.oldPrice.toLocaleString("en-BD")}
            </p>
          </div>

          <Link
            to="/cart"
            aria-label={`View cart after selecting ${product.name}`}
            className="btn btn-primary btn-sm btn-circle"
          >
            <ShoppingCart size={17} />
          </Link>
        </div>
      </div>
    </article>
  );
}