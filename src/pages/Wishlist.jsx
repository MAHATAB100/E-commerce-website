
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { products } from "../data/products";
import { addToCart } from "../features/cart/cartSlice";

export default function Wishlist() {
  const dispatch = useDispatch();
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shopnest-wishlist") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("shopnest-wishlist", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const wishlistProducts = products.filter((product) =>
    wishlistIds.some((id) => String(id) === String(product.id))
  );

  const removeFromWishlist = (productId) => {
    setWishlistIds((current) =>
      current.filter((id) => String(id) !== String(productId))
    );
    toast.success("Removed from wishlist");
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <main className="min-h-[70vh] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/shop"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Continue Shopping
        </Link>

        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-rose-100 p-3 text-rose-600">
            <Heart size={25} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              My Wishlist
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {wishlistProducts.length}{" "}
              {wishlistProducts.length === 1 ? "product" : "products"} saved
            </p>
          </div>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
            <Heart size={48} className="mx-auto mb-4 text-slate-300" />
            <h2 className="text-xl font-bold text-slate-800">
              Your wishlist is empty
            </h2>
            <p className="mt-2 text-slate-500">
              Save your favourite products here to find them easily later.
            </p>
            <Link
              to="/shop"
              className="btn btn-primary mt-6 rounded-xl"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-56 w-full object-cover"
                  />
                </Link>

                <div className="p-4">
                  <p className="text-xs font-medium text-slate-500">
                    {product.category}
                  </p>

                  <Link to={`/products/${product.id}`}>
                    <h2 className="mt-2 line-clamp-2 font-bold text-slate-900 hover:text-blue-600">
                      {product.name}
                    </h2>
                  </Link>

                  <p className="mt-3 text-xl font-extrabold text-slate-900">
                    ৳{Number(product.price).toLocaleString("en-BD")}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn btn-primary min-w-0 flex-1 rounded-xl"
                    >
                      <ShoppingCart size={17} />
                      Add to Cart
                    </button>

                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="btn btn-square rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
                      aria-label={`Remove ${product.name} from wishlist`}
                      title="Remove from wishlist"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
