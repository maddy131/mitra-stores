
"use client";
import styles from "./Bestsellers.module.css";

const products = [
  {
    id: 1,
    name: "Temple Gold Earrings",
    category: "TEMPLE JEWELLERY",
    price: 599,
    originalPrice: 799,
    discount: "25% OFF",
    image: "/images/categories/temple-jewellery.jpg",
  },
  {
    id: 2,
    name: "Bengali Bridal Set",
    category: "BIYE TOTTO",
    price: 1299,
    originalPrice: 1599,
    discount: "19% OFF",
    image: "/images/categories/biye-totto.jpg",
  },
  {
    id: 3,
    name: "Classic Dance Jewellery",
    category: "DANCE JEWELLERY",
    price: 899,
    originalPrice: 1199,
    discount: "25% OFF",
    image: "/images/categories/dance-jewellery.jpg",
  },
  {
    id: 4,
    name: "Oxidized Jhumka Earrings",
    category: "OXIDIZED JEWELLERY",
    price: 349,
    originalPrice: 449,
    discount: "22% OFF",
    image: "/images/categories/oxidized-jewellery.jpg",
  },
  {
    id: 5,
    name: "Everyday Bangle Set",
    category: "BANGLES",
    price: 299,
    originalPrice: 399,
    discount: "25% OFF",
    image: "/images/categories/bangles.jpg",
  },
  {
    id: 6,
    name: "Elegant Bracelet",
    category: "BRACELETS",
    price: 399,
    originalPrice: 499,
    discount: "20% OFF",
    image: "/images/categories/bracelets.jpg",
  },
  {
    id: 7,
    name: "Professional Makeup Brushes",
    category: "MAKEUP BRUSHES",
    price: 499,
    originalPrice: 649,
    discount: "23% OFF",
    image: "/images/categories/makeup-brushes.jpg",
  },
  {
    id: 8,
    name: "Soft Acrylic Wool Bundle",
    category: "WOOL & YARN",
    price: 599,
    originalPrice: 749,
    discount: "20% OFF",
    image: "/images/categories/wool-yarn.jpg",
  },
];

export default function Bestsellers() {
  return (
    <section className={styles.bestsellers} id="bestsellers">
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.eyebrow}>CUSTOMER FAVOURITES</p>
          <h2 className={styles.title}>Bestsellers This Season</h2>
          <p className={styles.subtitle}>
            The pieces everyone is loving right now.
          </p>
        </div>

        <a href="/shop" className={styles.viewAll}>
          View all products <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <article className={styles.productCard} key={product.id}>
            <a
              href="/shop"
              className={styles.imageLink}
              aria-label={`View ${product.name}`}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImage}
                />

                <span className={styles.discount}>
                  {product.discount}
                </span>
              </div>
            </a>

            <div className={styles.productInfo}>
              <p className={styles.productCategory}>
                {product.category}
              </p>

              <h3 className={styles.productName}>
                {product.name}
              </h3>

              <div className={styles.priceRow}>
                <span className={styles.price}>
                  ₹{product.price.toLocaleString("en-IN")}
                </span>

                <span className={styles.originalPrice}>
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.addToBag}
                  onClick={() =>
                    alert(`${product.name} will be added to your bag when the cart is connected.`)
                  }
                >
                  Add to Bag
                </button>

                <button
                  type="button"
                  className={styles.buyNow}
                  onClick={() =>
                    alert(`Checkout for ${product.name} will be connected later.`)
                  }
                >
                  Buy Now
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
