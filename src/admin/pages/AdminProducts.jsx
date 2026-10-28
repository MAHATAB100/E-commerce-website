import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Package,
  RefreshCw,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/products";

const initialForm = {
  productId: "",
  name: "",
  category: "",
  price: "",
  oldPrice: "",
  image: "",
  badge: "",
  stock: "100",
  rating: "0",
  reviews: "0",
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  const token =
    localStorage.getItem("shopnest-token") ||
    sessionStorage.getItem("shopnest-token");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to load products.");
      }

      setProducts(data.products || []);
    } catch (err) {
      setError(err.message || "Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  const filteredProducts = products.filter((product) => {
    const term = search.trim().toLowerCase();

    const matchesSearch =
      product.name?.toLowerCase().includes(term) ||
      product.productId?.toLowerCase().includes(term) ||
      product.category?.toLowerCase().includes(term);

    const matchesCategory =
      categoryFilter === "All" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setForm({
      productId: product.productId || "",
      name: product.name || "",
      category: product.category || "",
      price: String(product.price ?? ""),
      oldPrice: String(product.oldPrice ?? 0),
      image: product.image || "",
      badge: product.badge || "",
      stock: String(product.stock ?? 100),
      rating: String(product.rating ?? 0),
      reviews: String(product.reviews ?? 0),
    });
    setModalOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!token) {
      setError("Please log in as an admin before managing products.");
      return;
    }

    const payload = {
      ...form,
      price: Number(form.price),
      oldPrice: Number(form.oldPrice || 0),
      stock: Number(form.stock),
      rating: Number(form.rating || 0),
      reviews: Number(form.reviews || 0),
    };

    setSaving(true);

    try {
      const url = editingProduct
        ? `${API_URL}/${editingProduct._id}`
        : API_URL;

      const response = await fetch(url, {
        method: editingProduct ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            (editingProduct
              ? "Failed to update product."
              : "Failed to create product.")
        );
      }

      setModalOpen(false);
      setEditingProduct(null);
      setForm(initialForm);
      await fetchProducts();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) return;

    if (!token) {
      setError("Please log in as an admin before deleting products.");
      return;
    }

    setError("");

    try {
      const response = await fetch(`${API_URL}/${product._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to delete product.");
      }

      await fetchProducts();
    } catch (err) {
      setError(err.message || "Could not delete product.");
    }
  };

  const inputClass =
    "mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Store Management
          </p>
          <h1 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Products
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Add, update, search, and manage your store products.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <Package size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Products</p>
              <p className="text-2xl font-extrabold text-slate-900">
                {loading ? "..." : products.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">In Stock</p>
          <p className="mt-2 text-2xl font-extrabold text-emerald-600">
            {loading
              ? "..."
              : products.filter((product) => Number(product.stock) > 0).length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Out of Stock</p>
          <p className="mt-2 text-2xl font-extrabold text-red-600">
            {loading
              ? "..."
              : products.filter((product) => Number(product.stock) === 0).length}
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <p>{error}</p>
          <button
            type="button"
            onClick={() => setError("")}
            aria-label="Dismiss error"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Search and filter */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by product name, ID, or category..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "All" ? "All Categories" : category}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={fetchProducts}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </section>

      {/* Product table */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
          <h2 className="font-bold text-slate-900">All Products</h2>
          <p className="mt-1 text-sm text-slate-500">
            {loading
              ? "Loading products..."
              : `${filteredProducts.length} product(s) found`}
          </p>
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-slate-500">
            Loading products from MongoDB...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-10 text-center">
            <Package className="mx-auto text-slate-300" size={36} />
            <p className="mt-3 font-semibold text-slate-700">
              No products found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try another search or add a new product.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Product</th>
                  <th className="px-5 py-4 font-semibold">Category</th>
                  <th className="px-5 py-4 font-semibold">Price</th>
                  <th className="px-5 py-4 font-semibold">Stock</th>
                  <th className="px-5 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-12 w-12 rounded-xl border border-slate-100 object-cover"
                        />
                        <div>
                          <p className="max-w-[240px] truncate font-semibold text-slate-800">
                            {product.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            ID: {product.productId}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {product.category}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-800">
                      ৳{Number(product.price).toLocaleString("en-BD")}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          Number(product.stock) === 0
                            ? "bg-red-50 text-red-700"
                            : Number(product.stock) <= 10
                              ? "bg-amber-50 text-amber-700"
                              : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(product)}
                          title="Edit product"
                          aria-label={`Edit ${product.name}`}
                          className="rounded-lg border border-blue-200 p-2 text-blue-600 transition hover:bg-blue-50"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(product)}
                          title="Delete product"
                          aria-label={`Delete ${product.name}`}
                          className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Add / Edit modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/50 p-4 sm:items-center"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !saving) {
              setModalOpen(false);
            }
          }}
        >
          <div className="my-4 w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:px-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Product details will be saved to MongoDB.
                </p>
              </div>

              <button
                type="button"
                disabled={saving}
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold text-slate-700">
                  Product ID *
                  <input
                    name="productId"
                    value={form.productId}
                    onChange={handleChange}
                    required
                    maxLength={60}
                    placeholder="e.g. SN-021"
                    className={inputClass}
                  />
                </label>

                <label className="text-sm font-semibold text-slate-700">
                  Product Name *
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    maxLength={150}
                    placeholder="Product name"
                    className={inputClass}
                  />
                </label>

                <label className="text-sm font-semibold text-slate-700">
                  Category *
                  <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    placeholder="e.g. Electronics"
                    className={inputClass}
                  />
                </label>

                <label className="text-sm font-semibold text-slate-700">
                  Image URL *
                  <input
                    type="url"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    required
                    placeholder="https://example.com/image.jpg"
                    className={inputClass}
                  />
                </label>

                <label className="text-sm font-semibold text-slate-700">
                  Price (৳) *
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className={inputClass}
                  />
                </label>

                <label className="text-sm font-semibold text-slate-700">
                  Old Price (৳)
                  <input
                    type="number"
                    name="oldPrice"
                    value={form.oldPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={inputClass}
                  />
                </label>

                <label className="text-sm font-semibold text-slate-700">
                  Stock *
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    step="1"
                    className={inputClass}
                  />
                </label>

                <label className="text-sm font-semibold text-slate-700">
                  Badge
                  <input
                    name="badge"
                    value={form.badge}
                    onChange={handleChange}
                    maxLength={50}
                    placeholder="e.g. Best Seller"
                    className={inputClass}
                  />
                </label>

                <label className="text-sm font-semibold text-slate-700">
                  Rating
                  <input
                    type="number"
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className={inputClass}
                  />
                </label>

                <label className="text-sm font-semibold text-slate-700">
                  Reviews
                  <input
                    type="number"
                    name="reviews"
                    value={form.reviews}
                    onChange={handleChange}
                    min="0"
                    step="1"
                    className={inputClass}
                  />
                </label>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingProduct
                      ? "Update Product"
                      : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}