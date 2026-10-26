
"use client";

import { use } from "react";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/component/Navbar/Navbar";
import Footer from "@/component/Footer/footer";
import { useCart } from "@/context/CartContext";
import styles from "./product.module.css";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  inStock: boolean;
};

const products: Product[] = [
  {
    id: 1,
    name: "Traditional Temple Jewellery Set",
    category: "Temple Jewellery",
    price: 1299,
    oldPrice: 1599,
    image: "/images/categories/temple-jewellery.jpg",
    inStock: true,
  },
  {
    id: 2,
    name: "Bengali Biye Totto Collection",
    category: "Biye Totto",
    price: 899,
    image: "/images/categories/biye-totto.jpg",
    inStock: true,
  },
  {
    id: 3,
    name: "Classic Dance Jewellery",
    category: "Dance Jewellery",
    price: 749,
    oldPrice: 999,
    image: "/images/categories/dance-jewellery.jpg",
    inStock: true,
  },
  {
    id: 4,
    name: "Oxidized Jewellery Set",
    category: "Oxidized Jewellery",
    price: 599,
    image: "/images/categories/oxidized-jewellery.jpg",
    inStock: true,
  },
  {
    id: 5,
    name: "Traditional Gold-Tone Bangles",
    category: "Bangles",
    price: 399,
    oldPrice: 499,
    image: "/images/categories/bangles.jpg",
    inStock: true,
  },
  {
    id: 6,
    name: "Everyday Fashion Bracelets",
    category: "Bracelets",
    price: 249,
    image: "/images/categories/bracelets.jpg",
    inStock: true,
  },
  {
    id: 7,
    name: "Colourful Traditional Churis",
    category: "Churis",
    price: 199,
    image: "/images/categories/churis.jpg",
    inStock: false,
  },
  {
    id: 8,
    name: "Women's Fashion Accessories",
    category: "Accessories",
    price: 299,
    image: "/images/categories/accessories.jpg",
    inStock: true,
  },
  {
    id: 9,
    name: "Decorative Hair Accessories",
    category: "Hair Accessories",
    price: 179,
    image: "/images/categories/hair-accessories.jpg",
    inStock: true,
  },
  {
    id: 10,
    name: "Elegant Hair Clutcher Set",
    category: "Clutchers",
    price: 149,
    image: "/images/categories/clutchers.jpg",
    inStock: true,
  },
  {
    id: 11,
    name: "Daily Skincare Essentials",
    category: "Skincare",
    price: 499,
    image: "/images/categories/skincare.jpg",
    inStock: true,
  },
  {
    id: 12,
    name: "Natural Face Pack Collection",
    category: "Face Packs",
    price: 249,
    image: "/images/categories/face-packs.jpg",
    inStock: true,
  },
  {
    id: 13,
    name: "Professional Makeup Brushes",
    category: "Makeup Brushes",
    price: 349,
    image: "/images/categories/makeup-brushes.jpg",
    inStock: true,
  },
  {
    id: 14,
    name: "Knitting Tools Starter Kit",
    category: "Knitting Tools",
    price: 299,
    image: "/images/categories/knitting-tools.jpg",
    inStock: true,
  },
  {
    id: 15,
    name: "Soft Wool Yarn Skein",
    category: "Wool & Yarn",
    price: 199,
    oldPrice: 249,
    image: "/images/categories/wool-yarn.jpg",
    inStock: true,
  },
  {
    id: 16,
    name: "Premium Craft Wool Bundle",
    category: "Wool & Yarn",
    price: 399,
    image: "/images/categories/wool-yarn.jpg",
    inStock: false,
  },
];

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <>
        <Navbar />
        <main className={styles.notFound}>
          <h1>Product not found</h1>
          <p>Sorry, we couldn't find this product.</p>
          <Link href="/shop">Return to Shop</Link>
        </main>
        <Footer />
      </>
    );
  }

  const discount = product.oldPrice
    ? Math.round(
        ((product.oldPrice - product.price) /
          product.oldPrice) *
          100
      )
    : 0;

  const handleAddToBag = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  return (
    <>
      <Navbar />

      <main className={styles.productPage}>
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/shop">Shop</Link>
          <span>/</span>
          <span>{product.category}</span>
        </nav>

        <section className={styles.productLayout}>
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <img
                src={product.image}
                alt={product.name}
              />

              {discount > 0 && (
                <span className={styles.discount}>
                  {discount}% OFF
                </span>
              )}

              {!product.inStock && (
                <span className={styles.soldOut}>
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          <div className={styles.details}>
            <p className={styles.category}>
              {product.category}
            </p>

            <h1>{product.name}</h1>

            <p className={styles.rating}>
              ★★★★★ <span>Discover your new favourite</span>
            </p>

            <div className={styles.priceRow}>
              <span className={styles.price}>
                ₹{product.price.toLocaleString("en-IN")}
              </span>

              {product.oldPrice && (
                <span className={styles.oldPrice}>
                  ₹{product.oldPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <p className={styles.taxNote}>
              Inclusive of all applicable taxes
            </p>

            <div className={styles.divider} />

            <h3>Product Details</h3>
            <p className={styles.description}>
              Explore our {product.category.toLowerCase()}
              {" "}collection at Mitra Stores. A thoughtful
              addition to your collection, selected for
              style, versatility and everyday enjoyment.
            </p>

            <p className={styles.stock}>
              {product.inStock
                ? "✓ Available to order"
                : "Currently unavailable"}
            </p>

            {product.inStock && (
              <>
                <div className={styles.quantityRow}>
                  <span>Quantity</span>

                  <div className={styles.quantityControl}>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((q) => Math.max(1, q - 1))
                      }
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span>{quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((q) => Math.min(10, q + 1))
                      }
                      disabled={quantity >= 10}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.addButton}
                  onClick={handleAddToBag}
                >
                  Add to Bag — ₹
                  {(product.price * quantity).toLocaleString("en-IN")}
                </button>

                <button
                  type="button"
                  className={styles.buyButton}
                  onClick={handleAddToBag}
                >
                  Buy Now
                </button>
              </>
            )}

            <div className={styles.benefits}>
              <p>✦ Carefully selected collections</p>
              <p>✦ Explore more from Mitra Stores</p>
              <p>✦ Questions? Contact our store team</p>
            </div>
          </div>
        </section>

        <section className={styles.backToShop}>
          <Link href="/shop">← Continue Shopping</Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
