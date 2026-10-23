
import styles from "./footer.module.css";

const jewelleryLinks = [
  "Temple Jewellery",
  "Bengali Biye Totto",
  "Dance Jewellery",
  "Oxidized Jewellery",
  "Bangles",
  "Bracelets",
  "Churis",
];

const beautyCraftLinks = [
  "Accessories",
  "Hair Accessories",
  "Clutchers",
  "Skincare",
  "Face Packs",
  "Makeup Brushes",
  "Knitting Tools",
  "Wool & Yarn",
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brandSection}>
          <h2 className={styles.brandTitle}>MITRA STORES</h2>

          <p className={styles.description}>
            Temple and dance jewellery, Bengali wedding essentials,
            everyday cosmetics and hand-knitting supplies — under
            one roof.
          </p>

          <p className={styles.storeHours}>
            Store pickup: Mon–Sat, 10am–8pm
          </p>
        </div>

        <div className={styles.linkSection}>
          <h3 className={styles.sectionTitle}>JEWELLERY</h3>

          <ul className={styles.linkList}>
            {jewelleryLinks.map((link) => (
              <li key={link}>
                <a href="/shop">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.linkSection}>
          <h3 className={styles.sectionTitle}>BEAUTY & CRAFT</h3>

          <ul className={styles.linkList}>
            {beautyCraftLinks.map((link) => (
              <li key={link}>
                <a href="/shop">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} MITRA STORES</p>
        <a href="/admin/login" className={styles.adminLoginButton}>
          Admin login
        </a>
      </div>
    </footer>
  );
}
