
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/component/Navbar/Navbar";
import Footer from "@/component/Footer/footer";
import styles from "./shop.module.css";
import { useCart } from "@/context/CartContext";
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  inStock: boolean;
};

const categories = [
  "All Products",
  "Temple Jewellery",
  "Biye Totto",
  "Dance Jewellery",
  "Oxidized Jewellery",
  "Bangles",
  "Bracelets",
  "Churis",
  "Accessories",
  "Hair Accessories",
  "Clutchers",
  "Skincare",
  "Face Packs",
  "Makeup Brushes",
  "Knitting Tools",
  "Wool & Yarn",
];

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

export default function ShopPage() {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        activeCategory === "All Products" ||
        product.category === activeCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesStock = !inStockOnly || product.inStock;

      return matchesCategory && matchesSearch && matchesStock;
    });

    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeCategory, search, sort, inStockOnly]);

  return (
    <>
      <Navbar />

      <main className={styles.shopPage}>
        <section className={styles.shopIntro}>
          <p className={styles.eyebrow}>MITRA STORES / OUR COLLECTION</p>
          <h1>Shop All</h1>
          <p className={styles.introText}>
            Discover traditional treasures, everyday essentials and
            creative finds, thoughtfully collected for you.
          </p>
          <div className={styles.goldLine} />
        </section>

        <section className={styles.shopContent}>
          <div className={styles.categorySection}>
            <p className={styles.sectionLabel}>EXPLORE OUR COLLECTION</p>

            <div className={styles.categoryList}>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`${styles.categoryButton} ${
                    activeCategory === category ? styles.activeCategory : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.toolbar}>
            <div className={styles.resultCount}>
              <span className={styles.countNumber}>
                {filteredProducts.length}
              </span>{" "}
              products
            </div>

            <div className={styles.toolbarControls}>
              <label className={styles.searchBox}>
                <span className={styles.searchIcon}>⌕</span>
                <input
                  type="search"
                  placeholder="Search products..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  aria-label="Search products"
                />
              </label>

              <label className={styles.stockFilter}>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(event) => setInStockOnly(event.target.checked)}
                />
                In stock
              </label>

              <label className={styles.sortControl}>
                <span>Sort:</span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  aria-label="Sort products"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A–Z</option>
                </select>
              </label>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className={styles.productGrid}>
              {filteredProducts.map((product) => {
                const discount = product.oldPrice
                  ? Math.round(
                      ((product.oldPrice - product.price) / product.oldPrice) *
                        100
                    )
                  : 0;

                return (
                  <article className={styles.productCard} key={product.id}>
                    <Link
                      href={`/product/${product.id}`}
                      className={styles.productImageLink}
                      aria-label={`View ${product.name}`}
                    >
                      <div className={styles.productImageWrap}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className={styles.productImage}
                        />

                        {discount > 0 && (
                          <span className={styles.discountBadge}>
                            {discount}% OFF
                          </span>
                        )}

                        {!product.inStock && (
                          <span className={styles.soldOutBadge}>
                            Out of stock
                          </span>
                        )}
                      </div>
                    </Link>

                    <div className={styles.productInfo}>
                      <p className={styles.productCategory}>
                        {product.category}
                      </p>

                      <Link
                        href={`/product/${product.id}`}
                        className={styles.productName}
                      >
                        {product.name}
                      </Link>

                      <div className={styles.priceRow}>
                        <span className={styles.currentPrice}>
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {product.oldPrice && (
                          <span className={styles.oldPrice}>
                            ₹{product.oldPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      <div className={styles.productActions}>
                        <Link
                            href={`/product/${product.id}`}
                            className={styles.viewProduct}
                          >
                              View product <span aria-hidden="true">↗</span>
                        </Link>

                        <button
                          type="button"
                          className={styles.addToBagButton}
                          disabled={!product.inStock}
                          onClick={() => {
                            addItem({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                            });
                          }}
                        >
                          {product.inStock ? "Add to Bag" : "Sold Out"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>⌕</span>
              <h2>No products found</h2>
              <p>Try another search or choose a different category.</p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All Products");
                  setInStockOnly(false);
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
