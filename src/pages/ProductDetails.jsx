import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

import { products } from "../data/products";
import { addToCart } from "../features/cart/cartSlice";
import ProductCard from "../components/products/ProductCard";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("shopnest-wishlist") || "[]"
      );
    } catch {
      return [];
    }
  });

  // Product পরিবর্তন হলে প্রথম image select হবে
  const galleryImages = product
    ? product.images?.length
      ? product.images
      : [product.image]
    : [];

  useEffect(() => {
    setSelectedImage(galleryImages[0] || "");
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <section className="mx-auto max-w-5xl px-5 py-20 text-center">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <p className="mt-3 text-base-content/60">
          The product you are looking for could not be found.
        </p>
        <Link to="/shop" className="btn btn-primary mt-6">
          Back to Shop
        </Link>
      </section>
    );
  }

  const isWishlisted = wishlist.some(
    (itemId) => String(itemId) === String(product.id)
  );

  const handleWishlist = () => {
    const nextWishlist = isWishlisted
      ? wishlist.filter(
          (itemId) => String(itemId) !== String(product.id)
        )
      : [...wishlist, product.id];

    setWishlist(nextWishlist);

    try {
      localStorage.setItem(
        "shopnest-wishlist",
        JSON.stringify(nextWishlist)
      );
    } catch {
      toast.error("Could not save wishlist in this browser.");
      return;
    }

    toast.success(
      isWishlisted
        ? "Removed from wishlist"
        : "Added to wishlist"
    );
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i += 1) {
      dispatch(addToCart(product));
    }

    toast.success(`${product.name} added to cart!`);
  };

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        String(item.id) !== String(product.id)
    )
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-base-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/shop"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-base-content/70 hover:text-primary"
        >
          <ArrowLeft size={18} />
          Back to Shop
        </Link>

        {/* Product Details */}
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Image Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-2xl bg-base-200">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="h-[340px] w-full object-cover sm:h-[480px]"
              />

              {product.badge && (
                <span className="badge badge-primary absolute left-4 top-4">
                  {product.badge}
                </span>
              )}

              <button
                type="button"
                onClick={handleWishlist}
                aria-label={
                  isWishlisted
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                className={`btn btn-circle absolute right-4 top-4 ${
                  isWishlisted ? "btn-primary" : "bg-base-100"
                }`}
              >
                <Heart
                  size={21}
                  className={isWishlisted ? "fill-current" : ""}
                />
              </button>
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {galleryImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    aria-label={`View product image ${index + 1}`}
                    className={`overflow-hidden rounded-xl border-2 ${
                      selectedImage === image
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="h-20 w-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {galleryImages.length === 1 && (
              <p className="mt-3 text-sm text-base-content/50">
                More product images can be added to the product data.
              </p>
            )}
          </div>

          {/* Product Information */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              {product.category}
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-2">
              <Star
                size={19}
                className="fill-amber-400 text-amber-400"
              />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-sm text-base-content/60">
                ({product.reviews ?? 0} reviews)
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-extrabold text-primary">
                ৳{Number(product.price).toLocaleString("en-BD")}
              </span>

              {product.oldPrice && (
                <span className="text-lg text-base-content/50 line-through">
                  ৳{Number(product.oldPrice).toLocaleString("en-BD")}
                </span>
              )}
            </div>

            <p className="mt-6 leading-7 text-base-content/70">
              Discover the {product.name} from our{" "}
              {product.category} collection. Find your everyday
              essentials with ShopNest.
            </p>

            {/* Quantity Selector */}
            <div className="mt-7">
              <p className="mb-3 text-sm font-semibold">Quantity</p>

              <div className="join">
                <button
                  type="button"
                  className="btn join-item btn-outline"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  onClick={() =>
                    setQuantity((current) =>
                      Math.max(1, current - 1)
                    )
                  }
                >
                  <Minus size={16} />
                </button>

                <span className="btn join-item min-w-14">
                  {quantity}
                </span>

                <button
                  type="button"
                  className="btn join-item btn-outline"
                  disabled={quantity >= 10}
                  aria-label="Increase quantity"
                  onClick={() =>
                    setQuantity((current) =>
                      Math.min(10, current + 1)
                    )
                  }
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAddToCart}
                className="btn btn-primary flex-1 gap-2"
              >
                <ShoppingCart size={19} />
                Add to Cart
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                className={`btn flex-1 gap-2 ${
                  isWishlisted ? "btn-secondary" : "btn-outline"
                }`}
              >
                {isWishlisted ? (
                  <Check size={19} />
                ) : (
                  <Heart size={19} />
                )}
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </button>
            </div>

            <Link
              to="/cart"
              className="btn btn-ghost mt-2 w-full"
            >
              Go to Cart
            </Link>

            {/* Benefits */}
            <div className="mt-8 grid gap-4 border-t border-base-300 pt-6 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <Truck size={22} className="shrink-0 text-primary" />
                <span className="text-sm">Delivery information</span>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck
                  size={22}
                  className="shrink-0 text-primary"
                />
                <span className="text-sm">Secure shopping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 border-t border-base-300 pt-12">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  You may also like
                </p>
                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Related Products
                </h2>
                <p className="mt-2 text-base-content/60">
                  More products from {product.category}.
                </p>
              </div>

              <Link
                to="/shop"
                className="btn btn-outline btn-primary btn-sm"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}