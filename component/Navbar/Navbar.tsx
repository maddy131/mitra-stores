import Link from "next/link";
import styles from './Navbar.module.css';
import { Search, ShoppingBag , UserRound} from "lucide-react";
export default function Navbar(){
    return(
        <header className = {styles.header}>
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
                {/*Navigation */}
                <div className={styles.navLinks}>
                    <a href="/shop" className={styles.shopAllButton}>Shop All</a>
                    <a href="/">Temple</a>
                    <a href="/">Biye Totto</a>
                    <a href="/">Skincare</a>
                    <a href="/">Wool & Craft</a>
                </div>

                {/* Right Side */}
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
            />
          </div>

                    {/*Sign In */}
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
