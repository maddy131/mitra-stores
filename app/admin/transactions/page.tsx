
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Boxes,
  ClipboardList,
  ReceiptText,
  Store,
  LogOut,
  IndianRupee,
  Clock3,
  RotateCcw,
  CreditCard,
  Wallet,
  Smartphone,
} from "lucide-react";
import styles from "./transactions.module.css";

type PaymentStatus = "Paid" | "Pending" | "Refunded";
type Filter = "All" | PaymentStatus;

type Transaction = {
  id: string;
  customer: string;
  date: string;
  method: "UPI" | "Card" | "Cash";
  amount: number;
  status: PaymentStatus;
};

const initialTransactions: Transaction[] = [
  {
    id: "MS2609309156",
    customer: "Priya Sen",
    date: "30 Sept 2026, 03:22 am",
    method: "UPI",
    amount: 709,
    status: "Paid",
  },
  {
    id: "MS2609307996",
    customer: "Priya",
    date: "30 Sept 2026, 03:21 am",
    method: "Cash",
    amount: 649,
    status: "Pending",
  },
  {
    id: "MS2609296124",
    customer: "Ananya Das",
    date: "29 Sept 2026, 11:15 am",
    method: "Card",
    amount: 1250,
    status: "Paid",
  },
  {
    id: "MS2609284128",
    customer: "Riya Sharma",
    date: "28 Sept 2026, 04:10 pm",
    method: "UPI",
    amount: 499,
    status: "Refunded",
  },
];

const navigation = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Inventory", href: "/admin/inventory", icon: Boxes },
  { label: "Orders & Bookings", href: "/admin/orders", icon: ClipboardList },
  { label: "Transactions", href: "/admin/transactions", icon: ReceiptText },
];

const filters: Filter[] = ["All", "Paid", "Pending", "Refunded"];

export default function TransactionsPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter =
      filter === "All" || transaction.status === filter;

    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      transaction.id.toLowerCase().includes(query) ||
      transaction.customer.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  const collected = transactions
    .filter((transaction) => transaction.status === "Paid")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const pending = transactions
    .filter((transaction) => transaction.status === "Pending")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const refunded = transactions
    .filter((transaction) => transaction.status === "Refunded")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const updateStatus = (id: string, status: PaymentStatus) => {
    setTransactions((current) =>
      current.map((transaction) =>
        transaction.id === id ? { ...transaction, status } : transaction
      )
    );
  };

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <Link href="/admin/dashboard" className={styles.brand}>
          <span>MITRA</span>
          <small>ADMIN</small>
        </Link>

        <nav className={styles.navigation}>
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = item.label === "Transactions";

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`${styles.navLink} ${
                  active ? styles.active : ""
                }`}
              >
                <Icon size={17} strokeWidth={1.7} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarBottom}>
          <Link href="/" className={styles.navLink}>
            <Store size={17} />
            <span>View Store</span>
          </Link>
          <Link href="/admin/login" className={styles.navLink}>
            <LogOut size={17} />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.pageHeader}>
          <p className={styles.eyebrow}>MITRA STORES / FINANCE</p>
          <h1>Transactions</h1>
          <p className={styles.subtitle}>
            Track payments, pending amounts and refunds.
          </p>
        </header>

        <section className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.summaryTop}>
              <span>Collected revenue</span>
              <IndianRupee size={19} />
            </div>
            <h2>₹{collected.toLocaleString("en-IN")}</h2>
            <p>Payments marked as paid</p>
          </article>

          <article className={styles.summaryCard}>
            <div className={styles.summaryTop}>
              <span>Pending payments</span>
              <Clock3 size={19} />
            </div>
            <h2>₹{pending.toLocaleString("en-IN")}</h2>
            <p>Awaiting payment confirmation</p>
          </article>

          <article className={styles.summaryCard}>
            <div className={styles.summaryTop}>
              <span>Refunded amount</span>
              <RotateCcw size={19} />
            </div>
            <h2>₹{refunded.toLocaleString("en-IN")}</h2>
            <p>Transactions marked refunded</p>
          </article>
        </section>

        <section className={styles.tablePanel}>
          <div className={styles.tableHeading}>
            <div>
              <h2>Payment history</h2>
              <p>Review individual transaction records.</p>
            </div>

            <input
              className={styles.searchInput}
              type="search"
              placeholder="Search order or customer..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search transactions"
            />
          </div>

          <div className={styles.filterBar}>
            {filters.map((item) => {
              const count =
                item === "All"
                  ? transactions.length
                  : transactions.filter(
                      (transaction) => transaction.status === item
                    ).length;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`${styles.filterButton} ${
                    filter === item ? styles.selectedFilter : ""
                  }`}
                >
                  {item} ({count})
                </button>
              );
            })}
          </div>

          <div className={styles.tableScroll}>
            <table className={styles.transactionsTable}>
              <thead>
                <tr>
                  <th>Transaction / Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Payment method</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      <strong className={styles.orderId}>
                        {transaction.id}
                      </strong>
                    </td>

                    <td>{transaction.customer}</td>

                    <td className={styles.dateCell}>
                      {transaction.date}
                    </td>

                    <td>
                      <span className={styles.method}>
                        {transaction.method === "UPI" ? (
                          <Smartphone size={15} />
                        ) : transaction.method === "Card" ? (
                          <CreditCard size={15} />
                        ) : (
                          <Wallet size={15} />
                        )}
                        {transaction.method}
                      </span>
                    </td>

                    <td className={styles.amount}>
                      ₹{transaction.amount.toLocaleString("en-IN")}
                    </td>

                    <td>
                      <select
                        aria-label={`Payment status for ${transaction.id}`}
                        className={`${styles.statusSelect} ${
                          styles[transaction.status.toLowerCase()]
                        }`}
                        value={transaction.status}
                        onChange={(event) =>
                          updateStatus(
                            transaction.id,
                            event.target.value as PaymentStatus
                          )
                        }
                      >
                        {filters
                          .filter((item) => item !== "All")
                          .map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                      </select>
                    </td>
                  </tr>
                ))}

                {filteredTransactions.length === 0 && (
                  <tr>
                    <td colSpan={6} className={styles.emptyState}>
                      No matching transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className={styles.tableFooter}>
            Showing {filteredTransactions.length} of{" "}
            {transactions.length} transactions
          </div>
        </section>
      </main>
    </div>
  );
}
