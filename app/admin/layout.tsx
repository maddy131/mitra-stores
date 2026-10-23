
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingCart,
  ReceiptText,
  Store,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import styles from "./admin-layout.module.css";

const navigation = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Inventory",
    href: "/admin/inventory",
    icon: Boxes,
  },
  {
    label: "Orders & Bookings",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Transactions",
    href: "/admin/transactions",
    icon: ReceiptText,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Preserve the existing login page without admin navigation.
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return <>{children}</>;
  }

  const currentPage =
    navigation.find((item) => item.href === pathname)?.label ?? "Admin Panel";

  return (
    <div className={styles.adminShell}>
      {mobileMenuOpen && (
        <button
          className={styles.mobileOverlay}
          aria-label="Close navigation menu"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`${styles.sidebar} ${
          mobileMenuOpen ? styles.sidebarOpen : ""
        }`}
      >
        <Link
          href="/admin/dashboard"
          className={styles.brand}
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className={styles.brandMark}>M</span>
          <span className={styles.brandText}>
            <strong>Mitra</strong>
            <small>STORES · ADMIN</small>
          </span>
        </Link>

        <div className={styles.sidebarDivider} />

        <div className={styles.sectionLabel}>WORKSPACE</div>

        <nav className={styles.navigation} aria-label="Admin navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              (item.href !== "/admin/dashboard" &&
                pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${
                  active ? styles.navLinkActive : ""
                }`}
                aria-current={active ? "page" : undefined}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarBottom}>
          <div className={styles.adminIdentity}>
            <span className={styles.avatar}>
              <ShieldCheck size={18} />
            </span>
            <span>
              <strong>Store Admin</strong>
              <small>Administrator</small>
            </span>
          </div>

          <Link
            href="/"
            className={styles.bottomLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Store size={17} />
            View Store
          </Link>

          <Link
            href="/admin/login"
            className={styles.bottomLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            <LogOut size={17} />
            Sign Out
          </Link>
        </div>
      </aside>

      <div className={styles.mainArea}>
        <header className={styles.topbar}>
          <button
            className={styles.menuButton}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          <div className={styles.breadcrumb}>
            <span>Admin</span>
            <span className={styles.breadcrumbDivider}>/</span>
            <strong>{currentPage}</strong>
          </div>

          <div className={styles.topbarRight}>
            <span className={styles.statusDot} />
            <span>Store Management</span>
          </div>
        </header>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
