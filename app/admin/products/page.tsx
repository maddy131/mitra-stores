
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Package,
  X,
  Image as ImageIcon,
} from "lucide-react";
import styles from "./products.module.css";

type Product = {
  id: number;
  name: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
  image: string;
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Traditional Temple Necklace",
    category: "Temple Jewellery",
    sku: "TEM-001",
    price: 2499,
    stock: 18,
    image: "/images/categories/temple-jewellery.jpg",
  },
  {
    id: 2,
    name: "Bridal Jewellery Set",
    category: "Biye Totto",
    sku: "BIY-002",
    price: 3999,
    stock: 7,
    image: "/images/categories/biye-totto.jpg",
  },
  {
    id: 3,
    name: "Classical Dance Jewellery",
    category: "Dance Jewellery",
    sku: "DAN-003",
    price: 1899,
    stock: 3,
    image: "/images/categories/dance-jewellery.jpg",
  },
  {
    id: 4,
    name: "Gold-Tone Temple Earrings",
    category: "Temple Jewellery",
    sku: "TEM-004",
    price: 899,
    stock: 24,
    image: "/images/categories/temple-jewellery.jpg",
  },
  {
    id: 5,
    name: "Bridal Hair Accessories",
    category: "Biye Totto",
    sku: "BIY-005",
    price: 1299,
    stock: 0,
    image: "/images/categories/biye-totto.jpg",
  },
];

const categories = [
  "All Categories",
  "Temple Jewellery",
  "Biye Totto",
  "Dance Jewellery",
  "Skincare",
  "Wool & Craft",
];

const emptyForm = {
  name: "",
  category: "Temple Jewellery",
  sku: "",
  price: "",
  stock: "",
  image: "",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [stockFilter, setStockFilter] = useState("All Stock");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All Categories" ||
        product.category === categoryFilter;

      const matchesStock =
        stockFilter === "All Stock" ||
        (stockFilter === "In Stock" && product.stock > 5) ||
        (stockFilter === "Low Stock" &&
          product.stock > 0 &&
          product.stock <= 5) ||
        (stockFilter === "Out of Stock" && product.stock === 0);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, search, categoryFilter, stockFilter]);

  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0
  );

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      sku: product.sku,
      price: String(product.price),
      stock: String(product.stock),
      image: product.image,
    });
    setShowForm(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (
      !form.name.trim() ||
      !form.sku.trim() ||
      !Number.isFinite(price) ||
      !Number.isFinite(stock) ||
      price < 0 ||
      stock < 0
    ) {
      alert("Please enter valid product details.");
      return;
    }

    if (
      products.some(
        (product) =>
          product.sku.toLowerCase() === form.sku.trim().toLowerCase() &&
          product.id !== editingId
      )
    ) {
      alert("This SKU already exists. Please use a unique SKU.");
      return;
    }

    const productData: Product = {
      id: editingId ?? Date.now(),
      name: form.name.trim(),
      category: form.category,
      sku: form.sku.trim(),
      price,
      stock: Math.floor(stock),
      image:
        form.image.trim() ||
        "/images/categories/temple-jewellery.jpg",
    };

    if (editingId !== null) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingId ? productData : product
        )
      );
    } else {
      setProducts((current) => [productData, ...current]);
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const deleteProduct = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this product?"
    );

    if (confirmed) {
      setProducts((current) =>
        current.filter((product) => product.id !== id)
      );
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const getStockLabel = (stock: number) => {
    if (stock === 0) return "Out of stock";
    if (stock <= 5) return "Low stock";
    return "In stock";
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>STORE MANAGEMENT</p>
          <h1>Products</h1>
          <p className={styles.subtitle}>
            Manage your catalogue, prices and stock availability.
          </p>
        </div>

        <button className={styles.addButton} onClick={openAddForm}>
          <Plus size={18} />
          Add Product
        </button>
      </header>

      <section className={styles.stats}>
        <article className={styles.statCard}>
          <div className={styles.statIcon}>
            <Package size={20} />
          </div>
          <div>
            <p>Total Products</p>
            <h2>{products.length}</h2>
          </div>
        </article>

        <article className={styles.statCard}>
          <div className={styles.statIcon}>
            <Package size={20} />
          </div>
          <div>
            <p>Units in Stock</p>
            <h2>{totalStock}</h2>
          </div>
        </article>

        <article className={styles.statCard}>
          <div className={styles.statIcon}>
            <Package size={20} />
          </div>
          <div>
            <p>Low Stock Items</p>
            <h2>
              {
                products.filter(
                  (product) => product.stock > 0 && product.stock <= 5
                ).length
              }
            </h2>
          </div>
        </article>

        <article className={styles.statCard}>
          <div className={styles.statIcon}>
            <Package size={20} />
          </div>
          <div>
            <p>Out of Stock</p>
            <h2>{products.filter((product) => product.stock === 0).length}</h2>
          </div>
        </article>
      </section>

      <section className={styles.catalogue}>
        <div className={styles.catalogueHeader}>
          <div>
            <h2>Product Catalogue</h2>
            <p>{filteredProducts.length} products displayed</p>
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input
              type="search"
              placeholder="Search product name or SKU..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            aria-label="Filter by category"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={stockFilter}
            onChange={(event) => setStockFilter(event.target.value)}
            aria-label="Filter by stock"
          >
            <option>All Stock</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className={styles.productCell}>
                      <div className={styles.productImage}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.image}
                          alt={product.name}
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                        <ImageIcon size={20} />
                      </div>
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td className={styles.sku}>{product.sku}</td>
                  <td>{product.category}</td>
                  <td className={styles.price}>{formatPrice(product.price)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span
                      className={`${styles.stockBadge} ${
                        product.stock === 0
                          ? styles.outOfStock
                          : product.stock <= 5
                            ? styles.lowStock
                            : styles.inStock
                      }`}
                    >
                      {getStockLabel(product.stock)}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.editButton}
                        onClick={() => openEditForm(product)}
                        aria-label={`Edit ${product.name}`}
                        title="Edit product"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => deleteProduct(product.id)}
                        aria-label={`Delete ${product.name}`}
                        title="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className={styles.emptyState}>
                    No products match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {showForm && (
        <div
          className={styles.modalOverlay}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
            }
          }}
        >
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-form-title"
          >
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.eyebrow}>CATALOGUE MANAGEMENT</p>
                <h2 id="product-form-title">
                  {editingId !== null ? "Edit Product" : "Add New Product"}
                </h2>
              </div>
              <button
                className={styles.closeButton}
                onClick={() => setShowForm(false)}
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.productForm}>
              <label>
                Product Name *
                <input
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  placeholder="e.g. Traditional Temple Necklace"
                />
              </label>

              <label>
                Category *
                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm({ ...form, category: event.target.value })
                  }
                >
                  {categories
                    .filter((category) => category !== "All Categories")
                    .map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </label>

              <div className={styles.formRow}>
                <label>
                  SKU *
                  <input
                    required
                    value={form.sku}
                    onChange={(event) =>
                      setForm({ ...form, sku: event.target.value })
                    }
                    placeholder="e.g. TEM-006"
                  />
                </label>

                <label>
                  Price (₹) *
                  <input
                    required
                    type="number"
                    min="0"
                    step="1"
                    value={form.price}
                    onChange={(event) =>
                      setForm({ ...form, price: event.target.value })
                    }
                    placeholder="2499"
                  />
                </label>
              </div>

              <div className={styles.formRow}>
                <label>
                  Stock Quantity *
                  <input
                    required
                    type="number"
                    min="0"
                    step="1"
                    value={form.stock}
                    onChange={(event) =>
                      setForm({ ...form, stock: event.target.value })
                    }
                    placeholder="10"
                  />
                </label>

                <label>
                  Image Path
                  <input
                    value={form.image}
                    onChange={(event) =>
                      setForm({ ...form, image: event.target.value })
                    }
                    placeholder="/images/categories/..."
                  />
                </label>
              </div>

              <p className={styles.formHint}>
                Use an image path from your public folder. Leave it blank to
                use the default category image.
              </p>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.saveButton}>
                  {editingId !== null ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      <footer className={styles.footer}>
        <Link href="/admin/dashboard">Back to Dashboard</Link>
        <span>Changes are temporary until database integration.</span>
      </footer>
    </main>
  );
}
