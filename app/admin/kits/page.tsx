
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Gift,
  X,
  Image as ImageIcon,
  Package,
} from "lucide-react";
import styles from "./kits.module.css";

type Kit = {
  id: number;
  name: string;
  sku: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  sizes: string[];
  includedProducts: string;
  published: boolean;
};

const initialKits: Kit[] = [
  {
    id: 1,
    name: "Female Winter Care Kit",
    sku: "KIT-001",
    description: "A thoughtful winter care collection.",
    category: "Care Kits",
    price: 999,
    stock: 12,
    image: "/images/kits/female-winter-care.jpg",
    sizes: ["Small", "Medium", "Large"],
    includedProducts: "Winter care essentials",
    published: true,
  },
  {
    id: 2,
    name: "Jewellery Gift Kit",
    sku: "KIT-002",
    description: "A beautiful jewellery gift collection.",
    category: "Gift Kits",
    price: 1499,
    stock: 8,
    image: "/images/kits/jewellery-gift.jpg",
    sizes: ["Small", "Medium", "Large"],
    includedProducts: "Jewellery and gift accessories",
    published: true,
  },
  {
    id: 3,
    name: "Wool Craft Kit",
    sku: "KIT-003",
    description: "A kit for knitting and craft lovers.",
    category: "Craft Kits",
    price: 799,
    stock: 15,
    image: "/images/kits/wool-craft.jpg",
    sizes: ["Small", "Medium", "Large"],
    includedProducts: "Wool and knitting supplies",
    published: true,
  },
  {
    id: 4,
    name: "Beauty Essentials Kit",
    sku: "KIT-004",
    description: "A collection of everyday beauty essentials.",
    category: "Beauty Kits",
    price: 699,
    stock: 0,
    image: "/images/kits/beauty-essentials.jpg",
    sizes: ["Small", "Medium", "Large"],
    includedProducts: "Beauty and skincare essentials",
    published: false,
  },
];

const categories = [
  "Care Kits",
  "Gift Kits",
  "Craft Kits",
  "Beauty Kits",
  "Custom Kits",
  "Other Kits",
];

const availableSizes = ["Small", "Medium", "Large"];

const emptyForm = {
  name: "",
  sku: "",
  description: "",
  category: "Care Kits",
  price: "",
  stock: "",
  image: "",
  sizes: ["Small", "Medium", "Large"],
  includedProducts: "",
  published: true,
};

export default function AdminKitsPage() {
  const [kits, setKits] = useState<Kit[]>(initialKits);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filteredKits = useMemo(() => {
    return kits.filter((kit) => {
      const term = search.toLowerCase();

      const matchesSearch =
        kit.name.toLowerCase().includes(term) ||
        kit.sku.toLowerCase().includes(term);

      const matchesCategory =
        categoryFilter === "All Categories" ||
        kit.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        (statusFilter === "Published" && kit.published) ||
        (statusFilter === "Draft" && !kit.published);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [kits, search, categoryFilter, statusFilter]);

  const totalStock = kits.reduce((total, kit) => total + kit.stock, 0);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const openAddForm = () => {
    setEditingId(null);
    setForm({ ...emptyForm, sizes: [...availableSizes] });
    setShowForm(true);
  };

  const openEditForm = (kit: Kit) => {
    setEditingId(kit.id);
    setForm({
      name: kit.name,
      sku: kit.sku,
      description: kit.description,
      category: kit.category,
      price: String(kit.price),
      stock: String(kit.stock),
      image: kit.image,
      sizes: [...kit.sizes],
      includedProducts: kit.includedProducts,
      published: kit.published,
    });
    setShowForm(true);
  };

  const toggleSize = (size: string) => {
    setForm((current) => ({
      ...current,
      sizes: current.sizes.includes(size)
        ? current.sizes.filter((item) => item !== size)
        : [...current.sizes, size],
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (
      !form.name.trim() ||
      !form.sku.trim() ||
      !form.description.trim() ||
      !form.includedProducts.trim() ||
      form.price.trim() === "" ||
      form.stock.trim() === "" ||
      !Number.isFinite(price) ||
      !Number.isFinite(stock) ||
      price < 0 ||
      stock < 0 ||
      !Number.isInteger(stock) ||
      form.sizes.length === 0
    ) {
      alert(
        "Please complete all required fields, enter valid prices and stock, and select at least one size."
      );
      return;
    }

    const duplicateSku = kits.some(
      (kit) =>
        kit.sku.toLowerCase() === form.sku.trim().toLowerCase() &&
        kit.id !== editingId
    );

    if (duplicateSku) {
      alert("This kit SKU already exists. Please use a unique SKU.");
      return;
    }

    const kitData: Kit = {
      id: editingId ?? Date.now(),
      name: form.name.trim(),
      sku: form.sku.trim(),
      description: form.description.trim(),
      category: form.category,
      price,
      stock,
      image: form.image.trim() || "/images/kits/female-winter-care.jpg",
      sizes: [...form.sizes],
      includedProducts: form.includedProducts.trim(),
      published: form.published,
    };

    if (editingId !== null) {
      setKits((current) =>
        current.map((kit) => (kit.id === editingId ? kitData : kit))
      );
    } else {
      setKits((current) => [kitData, ...current]);
    }

    setShowForm(false);
    setEditingId(null);
    setForm({ ...emptyForm, sizes: [...availableSizes] });
  };

  const deleteKit = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this kit?"
    );

    if (confirmed) {
      setKits((current) => current.filter((kit) => kit.id !== id));
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>STORE MANAGEMENT</p>
          <h1>Kit Management</h1>
          <p className={styles.subtitle}>
            Create gift sets, care kits and craft kits for your customers.
          </p>
        </div>

        <button className={styles.addButton} onClick={openAddForm}>
          <Plus size={18} />
          Add Kit
        </button>
      </header>

      <section className={styles.stats}>
        <article className={styles.statCard}>
          <div className={styles.statIcon}>
            <Gift size={20} />
          </div>
          <div>
            <p>Total Kits</p>
            <h2>{kits.length}</h2>
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
            <Gift size={20} />
          </div>
          <div>
            <p>Published Kits</p>
            <h2>{kits.filter((kit) => kit.published).length}</h2>
          </div>
        </article>

        <article className={styles.statCard}>
          <div className={styles.statIcon}>
            <Package size={20} />
          </div>
          <div>
            <p>Out of Stock</p>
            <h2>{kits.filter((kit) => kit.stock === 0).length}</h2>
          </div>
        </article>
      </section>

      <section className={styles.catalogue}>
        <div className={styles.catalogueHeader}>
          <div>
            <h2>Your Kits</h2>
            <p>{filteredKits.length} kits displayed</p>
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input
              type="search"
              placeholder="Search kit name or SKU..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            aria-label="Filter kits by category"
          >
            <option>All Categories</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter kits by publication status"
          >
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Kit</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Sizes</th>
                <th>Visibility</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredKits.map((kit) => (
                <tr key={kit.id}>
                  <td>
                    <div className={styles.kitCell}>
                      <div className={styles.kitImage}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={kit.image}
                          alt={kit.name}
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                        <ImageIcon size={20} />
                      </div>
                      <div>
                        <strong>{kit.name}</strong>
                        <p>{kit.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.sku}>{kit.sku}</td>
                  <td>{kit.category}</td>
                  <td className={styles.price}>{formatPrice(kit.price)}</td>
                  <td>{kit.stock}</td>
                  <td>{kit.sizes.join(", ")}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        kit.published ? styles.published : styles.draft
                      }`}
                    >
                      {kit.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.editButton}
                        onClick={() => openEditForm(kit)}
                        aria-label={`Edit ${kit.name}`}
                        title="Edit kit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => deleteKit(kit.id)}
                        aria-label={`Delete ${kit.name}`}
                        title="Delete kit"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredKits.length === 0 && (
                <tr>
                  <td colSpan={8} className={styles.emptyState}>
                    No kits match your filters.
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
            aria-labelledby="kit-form-title"
          >
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.eyebrow}>KIT MANAGEMENT</p>
                <h2 id="kit-form-title">
                  {editingId !== null ? "Edit Kit" : "Add New Kit"}
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

            <form onSubmit={handleSubmit} className={styles.kitForm}>
              <label>
                Kit Name *
                <input
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  placeholder="e.g. Winter Care Kit"
                />
              </label>

              <label>
                Description *
                <textarea
                  required
                  value={form.description}
                  onChange={(event) =>
                    setForm({ ...form, description: event.target.value })
                  }
                  placeholder="Describe what makes this kit special"
                  rows={3}
                />
              </label>

              <div className={styles.formRow}>
                <label>
                  Kit SKU *
                  <input
                    required
                    value={form.sku}
                    onChange={(event) =>
                      setForm({ ...form, sku: event.target.value })
                    }
                    placeholder="e.g. KIT-005"
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
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className={styles.formRow}>
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
                    placeholder="999"
                  />
                </label>

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
              </div>

              <label>
                Included Products *
                <textarea
                  required
                  value={form.includedProducts}
                  onChange={(event) =>
                    setForm({ ...form, includedProducts: event.target.value })
                  }
                  placeholder="List the products included in this kit"
                  rows={3}
                />
              </label>

              <label>
                Kit Image Path
                <input
                  value={form.image}
                  onChange={(event) =>
                    setForm({ ...form, image: event.target.value })
                  }
                  placeholder="/images/kits/your-image.jpg"
                />
              </label>

              <p className={styles.formHint}>
                Use an image path from your public folder, for example
                /images/kits/wool-craft.jpg.
              </p>

              <fieldset className={styles.sizeFieldset}>
                <legend>Available Sizes *</legend>
                <div className={styles.sizeOptions}>
                  {availableSizes.map((size) => (
                    <label key={size} className={styles.sizeOption}>
                      <input
                        type="checkbox"
                        checked={form.sizes.includes(size)}
                        onChange={() => toggleSize(size)}
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className={styles.publishOption}>
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(event) =>
                    setForm({ ...form, published: event.target.checked })
                  }
                />
                Publish this kit
              </label>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.saveButton}>
                  {editingId !== null ? "Save Changes" : "Add Kit"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      <footer className={styles.footer}>
        <Link href="/admin/dashboard">Back to Dashboard</Link>
        <span>Kit changes are temporary until database integration.</span>
      </footer>
    </main>
  );
}
