
import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
  };

  const discount =
    product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) /
            product.oldPrice) *
            100
        )
      : 0;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-slate-200/60">
      {/* Product Image */}
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
      </div>

      {/* Product Information */}
      <div className="p-3.5 sm:p-4">
        <p className="text-xs font-medium text-slate-400">
          {product.category}
        </p>

        <Link to={`/products/${product.id}`}>
          <h3 className="mt-1.5 line-clamp-2 min-h-10 text-sm font-bold leading-5 text-slate-800 transition hover:text-blue-700 sm:text-base">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
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

        {/* Price */}
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

        {/* Actions */}
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-2 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            <ShoppingCart size={17} />
            Add to Cart
          </button>

          <Link
            to={`/products/${product.id}`}
            aria-label={`View ${product.name}`}
            className="flex items-center justify-center rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
