
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Package,
  AlertTriangle,
  CircleCheck,
  CircleX,
  Plus,
  Minus,
  RotateCcw,
} from "lucide-react";
import styles from "./inventory.module.css";

type InventoryItem = {
  id: number;
  name: string;
  sku: string;
  category: string;
  stock: number;
  reorderLevel: number;
};

const initialInventory: InventoryItem[] = [
  {
    id: 1,
    name: "Traditional Temple Necklace",
    sku: "TEM-001",
    category: "Temple Jewellery",
    stock: 18,
    reorderLevel: 5,
  },
  {
    id: 2,
    name: "Bridal Jewellery Set",
    sku: "BIY-002",
    category: "Biye Totto",
    stock: 7,
    reorderLevel: 5,
  },
  {
    id: 3,
    name: "Classical Dance Jewellery",
    sku: "DAN-003",
    category: "Dance Jewellery",
    stock: 3,
    reorderLevel: 5,
  },
  {
    id: 4,
    name: "Gold-Tone Temple Earrings",
    sku: "TEM-004",
    category: "Temple Jewellery",
    stock: 24,
    reorderLevel: 5,
  },
  {
    id: 5,
    name: "Bridal Hair Accessories",
    sku: "BIY-005",
    category: "Biye Totto",
    stock: 0,
    reorderLevel: 5,
  },
  {
    id: 6,
    name: "Decorative Wool Craft",
    sku: "WOL-006",
    category: "Wool & Craft",
    stock: 12,
    reorderLevel: 4,
  },
  {
    id: 7,
    name: "Herbal Skincare Kit",
    sku: "SKN-007",
    category: "Skincare",
    stock: 4,
    reorderLevel: 6,
  },
];

type StockFilter = "All Stock" | "In Stock" | "Low Stock" | "Out of Stock";

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(initialInventory);
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState<StockFilter>("All Stock");
  const [adjustmentItem, setAdjustmentItem] =
    useState<InventoryItem | null>(null);
  const [adjustmentAmount, setAdjustmentAmount] = useState("1");
  const [adjustmentType, setAdjustmentType] = useState<"add" | "remove">("add");
  const [adjustmentNote, setAdjustmentNote] = useState("");
  const [message, setMessage] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      const matchesStock =
        stockFilter === "All Stock" ||
        (stockFilter === "In Stock" && item.stock > item.reorderLevel) ||
        (stockFilter === "Low Stock" &&
          item.stock > 0 &&
          item.stock <= item.reorderLevel) ||
        (stockFilter === "Out of Stock" && item.stock === 0);

      return matchesSearch && matchesStock;
    });
  }, [items, search, stockFilter]);

  const totalUnits = items.reduce((sum, item) => sum + item.stock, 0);
  const lowStockCount = items.filter(
    (item) => item.stock > 0 && item.stock <= item.reorderLevel
  ).length;
  const outOfStockCount = items.filter((item) => item.stock === 0).length;
  const healthyStockCount = items.filter(
    (item) => item.stock > item.reorderLevel
  ).length;

  const getStatus = (item: InventoryItem) => {
    if (item.stock === 0) return "Out of Stock";
    if (item.stock <= item.reorderLevel) return "Low Stock";
    return "In Stock";
  };

  const openAdjustment = (
    item: InventoryItem,
    type: "add" | "remove"
  ) => {
    setAdjustmentItem(item);
    setAdjustmentType(type);
    setAdjustmentAmount("1");
    setAdjustmentNote("");
    setMessage("");
  };

  const closeAdjustment = () => {
    setAdjustmentItem(null);
    setAdjustmentNote("");
  };

  const saveAdjustment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!adjustmentItem) return;

    const amount = Number(adjustmentAmount);

    if (!Number.isInteger(amount) || amount <= 0) {
      setMessage("Enter a whole number greater than zero.");
      return;
    }

    const newStock =
      adjustmentType === "add"
        ? adjustmentItem.stock + amount
        : adjustmentItem.stock - amount;

    if (newStock < 0) {
      setMessage("Stock cannot be reduced below zero.");
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.id === adjustmentItem.id ? { ...item, stock: newStock } : item
      )
    );

    closeAdjustment();
  };

  const resetSampleData = () => {
    const confirmed = window.confirm(
      "Reset inventory to the original sample quantities?"
    );

    if (confirmed) {
      setItems(initialInventory);
      setSearch("");
      setStockFilter("All Stock");
      setMessage("");
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>STORE MANAGEMENT</p>
          <h1>Inventory</h1>
          <p className={styles.subtitle}>
            Track stock levels and keep your product catalogue up to date.
          </p>
        </div>

        <button className={styles.resetButton} onClick={resetSampleData}>
          <RotateCcw size={16} />
          Reset Sample Data
        </button>
      </header>

      <section className={styles.stats}>
        <article className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.purpleIcon}`}>
            <Package size={21} />
          </div>
          <div>
            <p>Total Units</p>
            <h2>{totalUnits}</h2>
            <span>Across all listed items</span>
          </div>
        </article>

        <article className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.greenIcon}`}>
            <CircleCheck size={21} />
          </div>
          <div>
            <p>Healthy Stock</p>
            <h2>{healthyStockCount}</h2>
            <span>Above reorder level</span>
          </div>
        </article>

        <article className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.orangeIcon}`}>
            <AlertTriangle size={21} />
          </div>
          <div>
            <p>Low Stock</p>
            <h2>{lowStockCount}</h2>
            <span>Needs attention</span>
          </div>
        </article>

        <article className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.redIcon}`}>
            <CircleX size={21} />
          </div>
          <div>
            <p>Out of Stock</p>
            <h2>{outOfStockCount}</h2>
            <span>Currently unavailable</span>
          </div>
        </article>
      </section>

      {lowStockCount + outOfStockCount > 0 && (
        <section className={styles.alertBanner}>
          <AlertTriangle size={20} />
          <div>
            <strong>Inventory needs attention</strong>
            <p>
              {lowStockCount + outOfStockCount} item(s) are at or below their
              reorder level. Review them and replenish stock when needed.
            </p>
          </div>
        </section>
      )}

      <section className={styles.inventoryPanel}>
        <div className={styles.panelHeader}>
          <div>
            <h2>Stock Overview</h2>
            <p>{filteredItems.length} items displayed</p>
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search product, SKU or category..."
            />
          </div>

          <select
            value={stockFilter}
            onChange={(event) =>
              setStockFilter(event.target.value as StockFilter)
            }
            aria-label="Filter inventory by stock status"
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
                <th>Available</th>
                <th>Reorder Level</th>
                <th>Status</th>
                <th>Adjust Stock</th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.map((item) => {
                const status = getStatus(item);

                return (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.productName}>
                        <span className={styles.productIcon}>
                          <Package size={18} />
                        </span>
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className={styles.sku}>{item.sku}</td>
                    <td>{item.category}</td>
                    <td>
                      <strong
                        className={
                          item.stock === 0
                            ? styles.zeroQuantity
                            : item.stock <= item.reorderLevel
                              ? styles.lowQuantity
                              : styles.quantity
                        }
                      >
                        {item.stock}
                      </strong>
                    </td>
                    <td>{item.reorderLevel} units</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${
                          item.stock === 0
                            ? styles.outStatus
                            : item.stock <= item.reorderLevel
                              ? styles.lowStatus
                              : styles.goodStatus
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.adjustButtons}>
                        <button
                          className={styles.addStockButton}
                          onClick={() => openAdjustment(item, "add")}
                          title={`Add stock for ${item.name}`}
                          aria-label={`Add stock for ${item.name}`}
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          className={styles.removeStockButton}
                          onClick={() => openAdjustment(item, "remove")}
                          disabled={item.stock === 0}
                          title={`Remove stock for ${item.name}`}
                          aria-label={`Remove stock for ${item.name}`}
                        >
                          <Minus size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={7} className={styles.emptyState}>
                    No inventory items match your search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {adjustmentItem && (
        <div
          className={styles.modalOverlay}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeAdjustment();
          }}
        >
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="adjustment-title"
          >
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.eyebrow}>INVENTORY CONTROL</p>
                <h2 id="adjustment-title">
                  {adjustmentType === "add" ? "Add Stock" : "Remove Stock"}
                </h2>
                <p className={styles.modalSubtitle}>
                  {adjustmentItem.name}
                </p>
              </div>
              <button
                className={styles.closeButton}
                onClick={closeAdjustment}
                aria-label="Close stock adjustment"
              >
                ×
              </button>
            </div>

            <div className={styles.currentStock}>
              <span>Current quantity</span>
              <strong>{adjustmentItem.stock} units</strong>
            </div>

            <form onSubmit={saveAdjustment} className={styles.adjustmentForm}>
              <label>
                Quantity to {adjustmentType === "add" ? "add" : "remove"}
                <input
                  type="number"
                  min="1"
                  step="1"
                  required
                  value={adjustmentAmount}
                  onChange={(event) =>
                    setAdjustmentAmount(event.target.value)
                  }
                />
              </label>

              <label>
                Note (optional)
                <textarea
                  rows={3}
                  value={adjustmentNote}
                  onChange={(event) => setAdjustmentNote(event.target.value)}
                  placeholder="e.g. New stock received"
                />
              </label>

              {message && <p className={styles.errorMessage}>{message}</p>}

              <p className={styles.preview}>
                New quantity:{" "}
                <strong>
                  {adjustmentType === "add"
                    ? adjustmentItem.stock +
                      (Number(adjustmentAmount) || 0)
                    : Math.max(
                        0,
                        adjustmentItem.stock -
                          (Number(adjustmentAmount) || 0)
                      )}{" "}
                  units
                </strong>
              </p>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={closeAdjustment}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.confirmButton}
                >
                  Confirm Adjustment
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      <footer className={styles.footer}>
        <Link href="/admin/dashboard">Back to Dashboard</Link>
        <span>Sample inventory data · Database integration comes later</span>
      </footer>
    </main>
  );
}
