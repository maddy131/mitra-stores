
import Link from "next/link";
import styles from "./Navbar.module.css";
import { Search, ShoppingBag, UserRound } from "lucide-react";

export default function Navbar() {
  return (
    <header className={styles.header}>
      {/* Announcement Bar */}
      <div className={styles.announcementbar}>
        Free home delivery above ₹999. Pick up in store, ready in 2 hours.
      </div>

      {/* Main Navbar */}
      <nav className={styles.navbar}>
        {/* Logo */}
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logo}>
            <span className={styles.logoMain}>Mitra</span>
            <small className={styles.logoSub}>Stores</small>
          </div>
        </Link>

        {/* Navigation Links */}
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

          {/* Kits */}
          <Link href="/kits">
            Kits
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className={styles.navActions}>
          {/* Search Bar */}
          <div className={styles.searchBox}>
            <Search
              size={17}
              strokeWidth={1.8}
              className={styles.searchIcon}
            />

            <input
              type="text"
              placeholder="Search jhumkas, churis, wool..."
              aria-label="Search products"
            />
          </div>

          {/* Sign In */}
          <Link href="/login" className={styles.signIn}>
            <UserRound size={17} strokeWidth={1.8} />
            <span>Sign in</span>
          </Link>

          {/* Shopping Bag */}
          <Link href="/cart" className={styles.bag}>
            <ShoppingBag size={16} strokeWidth={1.8} />
            <span>Bag</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
