
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
  Truck,
  ShoppingBag,
} from "lucide-react";
import styles from "./orders.module.css";

type OrderStatus =
  | "Pending"
  | "Processing"
  | "Ready for Pickup"
  | "Out for Delivery"
  | "Delivered / Collected"
  | "Cancelled";

type Order = {
  id: string;
  date: string;
  customer: string;
  phone: string;
  type: "Delivery" | "Pickup";
  pickupDate?: string;
  total: number;
  payment: "Paid" | "Pending" | "Refunded";
  status: OrderStatus;
};

const initialOrders: Order[] = [
  {
    id: "MS2609309156",
    date: "30 Sept, 03:22 am",
    customer: "Priya Sen",
    phone: "9830012345",
    type: "Delivery",
    total: 709,
    payment: "Paid",
    status: "Delivered / Collected",
  },
  {
    id: "MS2609307996",
    date: "30 Sept, 03:21 am",
    customer: "Priya",
    phone: "9830012345",
    type: "Pickup",
    pickupDate: "2026-10-23",
    total: 649,
    payment: "Pending",
    status: "Pending",
  },
];

type Filter = "All" | "Open" | "Deliveries" | "Pickup bookings";

const filters: Filter[] = [
  "All",
  "Open",
  "Deliveries",
  "Pickup bookings",
];

const navigation = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Inventory", href: "/admin/inventory", icon: Boxes },
  { label: "Orders & Bookings", href: "/admin/orders", icon: ClipboardList },
  { label: "Transactions", href: "/admin/transactions", icon: ReceiptText },
];

const statusOptions: OrderStatus[] = [
  "Pending",
  "Processing",
  "Ready for Pickup",
  "Out for Delivery",
  "Delivered / Collected",
  "Cancelled",
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState<Filter>("All");

  const filteredOrders = orders.filter((order) => {
    if (filter === "Open") {
      return !["Delivered / Collected", "Cancelled"].includes(order.status);
    }

    if (filter === "Deliveries") {
      return order.type === "Delivery";
    }

    if (filter === "Pickup bookings") {
      return order.type === "Pickup";
    }

    return true;
  });

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const updatePayment = (
    id: string,
    payment: Order["payment"]
  ) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === id ? { ...order, payment } : order
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
            const active = item.label === "Orders & Bookings";

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
          <p className={styles.eyebrow}>MITRA STORES / MANAGEMENT</p>
          <h1>Orders &amp; Bookings</h1>
          <p className={styles.subtitle}>
            Manage home deliveries and in-store pickup bookings.
          </p>
        </header>

        <div className={styles.filterBar}>
          {filters.map((item) => {
            const count =
              item === "All"
                ? orders.length
                : item === "Open"
                  ? orders.filter(
                      (order) =>
                        !["Delivered / Collected", "Cancelled"].includes(
                          order.status
                        )
                    ).length
                  : item === "Deliveries"
                    ? orders.filter((order) => order.type === "Delivery")
                        .length
                    : orders.filter((order) => order.type === "Pickup")
                        .length;

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

        <section className={styles.tablePanel}>
          <div className={styles.tableScroll}>
            <table className={styles.ordersTable}>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Type</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong className={styles.orderId}>
                        {order.id}
                      </strong>
                      <span className={styles.secondaryText}>
                        {order.date}
                      </span>
                    </td>

                    <td>
                      <strong className={styles.customerName}>
                        {order.customer}
                      </strong>
                      <span className={styles.secondaryText}>
                        {order.phone}
                      </span>
                    </td>

                    <td>
                      <span className={styles.typeLabel}>
                        {order.type === "Delivery" ? (
                          <Truck size={15} />
                        ) : (
                          <ShoppingBag size={15} />
                        )}
                        {order.type}
                      </span>
                      {order.pickupDate && (
                        <span className={styles.secondaryText}>
                          {order.pickupDate}
                        </span>
                      )}
                    </td>

                    <td className={styles.total}>
                      ₹{order.total.toLocaleString("en-IN")}
                    </td>

                    <td>
                      <select
                        aria-label={`Payment for ${order.id}`}
                        className={`${styles.paymentBadge} ${
                          styles[order.payment.toLowerCase()]
                        }`}
                        value={order.payment}
                        onChange={(event) =>
                          updatePayment(
                            order.id,
                            event.target.value as Order["payment"]
                          )
                        }
                      >
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    </td>

                    <td>
                      <select
                        aria-label={`Status for ${order.id}`}
                        className={`${styles.statusSelect} ${
                          order.status === "Delivered / Collected"
                            ? styles.completed
                            : order.status === "Cancelled"
                              ? styles.cancelled
                              : styles.pending
                        }`}
                        value={order.status}
                        onChange={(event) =>
                          updateStatus(
                            order.id,
                            event.target.value as OrderStatus
                          )
                        }
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}

                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className={styles.emptyState}>
                      No orders found in this category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className={styles.tableFooter}>
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
        </section>
      </main>
    </div>
  );
}
