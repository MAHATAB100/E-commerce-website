
// import { ArrowRight, Sparkles } from "lucide-react";
// import { Link } from "react-router-dom";
// import ProductCard from "../products/ProductCard";
// import { products } from "../../data/products";

// export default function FeaturedProducts() {
//   return (
//     <section className="bg-slate-50 py-16 lg:py-20">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="mb-9 flex items-end justify-between gap-4">
//           <div>
//             <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
//               <Sparkles size={16} /> Handpicked for you
//             </p>
//             <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
//               Featured products
//             </h2>
//             <p className="mt-2 text-sm text-slate-500 sm:text-base">
//               Great picks, great prices, just for you.
//             </p>
//           </div>

//           <Link
//             to="/shop"
//             className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-blue-700 hover:gap-2"
//           >
//             View all <ArrowRight size={17} />
//           </Link>
//         </div>

//         <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
//           {products.slice(0, 4).map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import ProductCard from "../products/ProductCard";
import products from "../../data/products";

export default function FeaturedProducts() {
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="bg-base-100 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
              <Sparkles size={16} />
              Handpicked for you
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
              Featured Products
            </h2>

            <p className="mt-2 max-w-xl text-base-content/60">
              Discover popular products selected just for you.
            </p>
          </div>

          <Link
            to="/shop"
            className="btn btn-outline btn-primary gap-2 self-start sm:self-auto"
          >
            View All Products
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center sm:hidden">
          <Link to="/shop" className="btn btn-primary w-full">
            Explore All Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
