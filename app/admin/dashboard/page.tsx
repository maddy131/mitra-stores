"use client";

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
  ShoppingBag,
  CalendarCheck,
  AlertTriangle,
  Users,
  ArrowUpRight,
  Eye,
  RotateCcw,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import styles from "./dashboard.module.css";

const salesData = [
  { day: "09-17", sales: 0 },
  { day: "09-18", sales: 0 },
  { day: "09-19", sales: 0 },
  { day: "09-20", sales: 0 },
  { day: "09-21", sales: 0 },
  { day: "09-22", sales: 0 },
  { day: "09-23", sales: 0 },
  { day: "09-24", sales: 0 },
  { day: "09-25", sales: 0 },
  { day: "09-26", sales: 0 },
  { day: "09-27", sales: 0 },
  { day: "09-28", sales: 0 },
  { day: "09-29", sales: 100 },
  { day: "09-30", sales: 1250 },
];

const categoryData = [
  { category: "Bangles", units: 12 },
  { category: "Jewellery", units: 9 },
  { category: "Skincare", units: 6 },
  { category: "Wool & Craft", units: 4 },
];

const orders = [
  {
    id: "MS2609309156",
    customer: "Priya Sen",
    date: "30 Sept, 03:22 am",
    type: "Home delivery",
    total: 709,
    status: "Pending",
  },
  {
    id: "MS2609307996",
    customer: "Priya",
    date: "30 Sept, 03:21 am",
    type: "Store pickup",
    total: 649,
    status: "Pending",
  },
];

const lowStock = [
  { name: "Matha Patti Kundan", stock: 2, image: "/images/categories/temple-jewellery.jpg" },
  { name: "Tribal Oxidized Choker", stock: 3, image: "/images/categories/dance-jewellery.jpg" },
  { name: "Temple Gold Earrings", stock: 4, image: "/images/categories/temple-jewellery.jpg" },
];

const summary = [
  {
    label: "Collected revenue",
    value: "₹709",
    note: "₹1,358 pending",
    icon: IndianRupee,
    color: "wine",
  },
  {
    label: "Orders",
    value: "2",
    note: "2 open",
    icon: ShoppingBag,
    color: "gold",
  },
  {
    label: "Pickup bookings",
    value: "1",
    note: "Awaiting collection",
    icon: CalendarCheck,
    color: "gold",
  },
  {
    label: "Low stock",
    value: "5",
    note: "Of 30 products",
    icon: AlertTriangle,
    color: "warning",
  },
  {
    label: "Customers",
    value: "1",
    note: "Registered",
    icon: Users,
    color: "gold",
  },
];

const navigation = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Inventory", href: "/admin/inventory", icon: Boxes },
  { label: "Orders & Bookings", href: "/admin/orders", icon: ClipboardList },
  { label: "Transactions", href: "/admin/transactions", icon: ReceiptText },
];

export default function AdminDashboard() {
  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <Link href="/admin/dashboard" className={styles.brand}>
          <span>MITRA</span>
          <small>ADMIN</small>
        </Link>

        <nav className={styles.navigation}>
          {navigation.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`${styles.navLink} ${
                  index === 0 ? styles.active : ""
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
            <Store size={17} strokeWidth={1.7} />
            <span>View Store</span>
          </Link>

          <Link href="/admin/login" className={styles.navLink}>
            <LogOut size={17} strokeWidth={1.7} />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.pageHeader}>
          <div>
            <p className={styles.eyebrow}>MITRA STORES / OVERVIEW</p>
            <h1>Dashboard</h1>
            <p className={styles.subtitle}>
              A snapshot of sales, bookings and stock at MITRA STORES.
            </p>
          </div>

          <div className={styles.headerActions}>
            <span className={styles.today}>Store overview</span>
            <button
              className={styles.refreshButton}
              onClick={() => window.location.reload()}
              aria-label="Refresh dashboard"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </header>

        <section className={styles.summaryGrid}>
          {summary.map((item) => {
            const Icon = item.icon;

            return (
              <article className={styles.summaryCard} key={item.label}>
                <div className={styles.cardTop}>
                  <p>{item.label}</p>
                  <Icon
                    size={18}
                    strokeWidth={1.6}
                    className={styles[item.color]}
                  />
                </div>
                <h2>{item.value}</h2>
                <span>{item.note}</span>
              </article>
            );
          })}
        </section>

        <section className={styles.analyticsGrid}>
          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <h2>Sales — last 14 days</h2>
                <p>Sales activity over time</p>
              </div>
              <span className={styles.chartLegend}>
                <span /> Revenue
              </span>
            </div>

            <div className={styles.salesChart}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={salesData}
                  margin={{ top: 15, right: 12, left: 0, bottom: 4 }}
                >
                  <CartesianGrid
                    stroke="#eae5dd"
                    strokeDasharray="4 5"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#898178", fontSize: 11 }}
                    axisLine={{ stroke: "#cfc7bb" }}
                    tickLine={false}
                    interval={1}
                  />
                  <YAxis
                    tick={{ fill: "#898178", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={42}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip
                    formatter={(value) => [`₹${value}`, "Sales"]}
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #e6ded2",
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#702638"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5, fill: "#b8862f" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <h2>Top categories</h2>
                <p>Units sold by category</p>
              </div>
              <ArrowUpRight size={18} className={styles.mutedIcon} />
            </div>

            <div className={styles.categoryChart}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  layout="vertical"
                  margin={{ top: 5, right: 8, left: 4, bottom: 5 }}
                >
                  <CartesianGrid
                    stroke="#eee8df"
                    strokeDasharray="4 5"
                    horizontal={false}
                  />
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="category"
                    width={86}
                    tick={{ fill: "#6b6259", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value) => [value, "Units"]}
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #e6ded2",
                      fontSize: 12,
                    }}
                  />
                  <Bar
                    dataKey="units"
                    fill="#b58a39"
                    radius={[0, 4, 4, 0]}
                    barSize={22}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>

        <section className={styles.bottomGrid}>
          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <h2>Recent orders</h2>
                <p>Your latest customer orders</p>
              </div>
              <Link href="/admin/orders" className={styles.textLink}>
                View all <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className={styles.ordersList}>
              {orders.map((order) => (
                <div className={styles.orderRow} key={order.id}>
                  <div className={styles.orderInfo}>
                    <strong>{order.id}</strong>
                    <span>{order.customer}</span>
                    <small>{order.date}</small>
                  </div>
                  <span className={styles.orderType}>{order.type}</span>
                  <span className={styles.statusPending}>{order.status}</span>
                  <strong className={styles.orderAmount}>
                    ₹{order.total}
                  </strong>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <h2>Low stock alerts</h2>
                <p>Products that need attention</p>
              </div>
              <Link href="/admin/inventory" className={styles.textLink}>
                Restock
              </Link>
            </div>

            <div className={styles.stockList}>
              {lowStock.map((product) => (
                <div className={styles.stockItem} key={product.name}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                  />
                  <span className={styles.productName}>{product.name}</span>
                  <span className={styles.stockBadge}>
                    {product.stock} left
                  </span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <footer className={styles.footer}>
          <span>MITRA STORES · ADMIN PANEL</span>
          <span>Manage thoughtfully. Serve beautifully.</span>
        </footer>
      </main>
    </div>
  );
}