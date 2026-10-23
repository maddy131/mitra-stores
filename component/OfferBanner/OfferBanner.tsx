
"use client";

import { useState } from "react";
import styles from "./OfferBanner.module.css";

export default function OfferBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={styles.banner}>
      <p className={styles.message}>
        ✨ Special Offer: Get 2% OFF on jewellery
        orders above ₹1,000!
      </p>

      <button
        className={styles.closeButton}
        onClick={() => setIsVisible(false)}
        aria-label="Close promotional banner"
      >
        ×
      </button>
    </div>
  );
}
