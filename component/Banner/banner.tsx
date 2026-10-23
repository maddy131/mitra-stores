
import styles from "./banner.module.css";

export default function Banner() {
  return (
    <section className={styles.bannerSection}>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <p className={styles.eyebrow}>CLICK &amp; COLLECT</p>

          <h2 className={styles.heading}>
            Order online, pick up at our store
          </h2>

          <p className={styles.description}>
            Choose "Pick up in store" at checkout, pick your date,
            and pay when you collect. No delivery charges.
          </p>
        </div>

        <a href="/shop" className={styles.button}>
          Start shopping
        </a>
      </div>
    </section>
  );
}
