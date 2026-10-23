
import { ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";

export default function PromoBanner() {
  return (
    <div className="bg-blue-700 px-4 py-2.5 text-center text-sm text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2">
        <Tag size={15} />
        <p>
          Welcome to ShopNest! Discover our latest collection and special offers.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-1 font-bold underline underline-offset-4 hover:text-blue-200"
        >
          Shop now <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
