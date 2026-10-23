import { Truck, Store, Sparkles } from "lucide-react";
import styles from "./hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <p className={styles.tag}>
          JEWELLERY · COSMETICS · CRAFT
        </p>

        <h1 className={styles.title}>
          Adorn every <em>ritual,</em>
          <br />
          from biye to
          <br />
          everyday.
        </h1>

        <p className={styles.description}>
          Temple and dance jewellery, Bengali wedding totto,
          churis, skincare and knitting wool — curated at
          MITRA STORES.
        </p>

        <div className={styles.buttons}>
          <button className={styles.primaryButton}>
            Explore the collection →
          </button>

          <button className={styles.secondaryButton}>
            Biye Totto essentials
          </button>
        </div>
      </div>

      <div className={styles.features}>

        <div className={styles.featureCard}>
          <Truck className={styles.featureIcon} />

          <div>
            <h3>Home delivery</h3>
            <p>Free above ₹999</p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <Store className={styles.featureIcon} />

          <div>
            <h3>Store pickup</h3>
            <p>Ready in 2 hrs</p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <Sparkles className={styles.featureIcon} />

          <div>
            <h3>15 categories</h3>
            <p>300+ designs</p>
          </div>
        </div>

      </div>
    </section>
  );
}