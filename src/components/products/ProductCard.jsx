
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const discount =
    product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-slate-200/60">
      <div className="relative overflow-hidden bg-slate-50">
        <Link
          to={`/products/${product.id}`}
          className="block overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-44 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-56"
          />
        </Link>

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-md bg-blue-600 px-2.5 py-1 text-[10px] font-extrabold tracking-wide text-white">
            {product.badge}
          </span>
        )}

        {discount > 0 && (
          <span className="absolute bottom-3 left-3 rounded-md bg-rose-100 px-2 py-1 text-xs font-bold text-rose-700">
            -{discount}%
          </span>
        )}

        <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          onClick={() => alert("Wishlist functionality will be added next.")}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm transition hover:bg-rose-50 hover:text-rose-600"
        >
          <Heart size={18} />
        </button>
      </div>

      <div className="p-3.5 sm:p-4">
        <p className="text-xs font-medium text-slate-400">
          {product.category}
        </p>

        <Link to={`/products/${product.id}`}>
          <h3 className="mt-1.5 line-clamp-2 min-h-10 text-sm font-bold leading-5 text-slate-800 transition hover:text-blue-700 sm:text-base">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-1.5">
          <Star
            size={15}
            fill="currentColor"
            className="text-amber-400"
          />
          <span className="text-xs font-bold text-slate-700">
            {product.rating}
          </span>
          {product.reviews !== undefined && (
            <span className="text-xs text-slate-400">
              ({product.reviews})
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-base font-extrabold text-slate-900 sm:text-lg">
            ৳{product.price.toLocaleString("en-BD")}
          </span>

          {product.oldPrice > product.price && (
            <span className="text-xs text-slate-400 line-through">
              ৳{product.oldPrice.toLocaleString("en-BD")}
            </span>
          )}
        </div>

        <Link
          to={`/products/${product.id}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2.5 text-sm font-bold text-white transition hover:bg-blue-600"
        >
          <ShoppingCart size={17} />
          View product
        </Link>
      </div>
    </article>
  );
}
