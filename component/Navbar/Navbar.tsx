
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { Search, ShoppingBag, UserRound } from "lucide-react";

export default function Navbar() {
  const [search, setSearch] = useState("");

  return (
    <header className={styles.header}>
      <div className={styles.announcementbar}>
        Free home delivery above ₹999. Pick up in store, ready in 2 hours.
      </div>

      <nav className={styles.navbar}>
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logo}>
            <span className={styles.logoMain}>Mitra</span>
            <small className={styles.logoSub}>Stores</small>
          </div>
        </Link>

        <div className={styles.navLinks}>
          <Link href="/shop" className={styles.shopAllButton}>
            Shop All
          </Link>

          <Link href="/shop?category=Jewellery">
            Jewellery
          </Link>

          <Link href="/shop?category=Bengali%20Biye%20Totto">
            Biye Totto
          </Link>

          <Link href="/shop?category=Skincare">
            Skincare
          </Link>

          <Link href="/shop?category=Wool%20%26%20Yarn">
            Wool & Craft
          </Link>

          <Link href="/kits">Kits</Link>
        </div>

        <div className={styles.navActions}>
          <form
            className={styles.searchBox}
            action="/shop"
            method="get"
            role="search"
          >
            <input
              type="search"
              name="search"
              placeholder="Search jhumkas, churis, wool..."
              aria-label="Search products"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <button
              type="submit"
              className={styles.searchSubmit}
              aria-label="Search products"
            >
              <Search size={17} strokeWidth={1.8} />
            </button>
          </form>

          <Link href="/login" className={styles.signIn}>
            <UserRound size={17} strokeWidth={1.8} />
            <span>Sign in</span>
          </Link>

          <Link href="/cart" className={styles.bag}>
            <ShoppingBag size={16} strokeWidth={1.8} />
            <span>Bag</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
