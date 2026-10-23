
"use client";

import Link from "next/link";
import Navbar from "@/component/Navbar/Navbar";
import Footer from "@/component/Footer/footer";
import { useCart } from "@/context/CartContext";
import styles from "./cart.module.css";

const DELIVERY_FEE = 60;
const FREE_DELIVERY_LIMIT = 999;

export default function CartPage() {
  const { items, ready, updateQuantity, removeItem } = useCart();

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee =
    subtotal === 0 || subtotal >= FREE_DELIVERY_LIMIT ? 0 : DELIVERY_FEE;

  const total = subtotal + deliveryFee;

  if (!ready) {
    return (
      <>
        <Navbar />
        <main className={styles.cartPage}>
          <p className={styles.loading}>Loading your bag...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className={styles.cartPage}>
        <header className={styles.cartHeader}>
          <p className={styles.eyebrow}>MITRA STORES / YOUR SELECTION</p>
          <h1>Your Shopping Bag</h1>
          <p>Beautiful finds, collected just for you.</p>
        </header>

        <div className={styles.cartContent}>
          {items.length === 0 ? (
            <section className={styles.emptyCart}>
              <div className={styles.emptyIcon}>♡</div>
              <h2>Your bag is waiting for something lovely.</h2>
              <p>
                You haven't added anything yet. Explore our collection and
                find something special.
              </p>
              <Link href="/shop" className={styles.primaryButton}>
                Continue Shopping
              </Link>
            </section>
          ) : (
            <div className={styles.cartLayout}>
              <section className={styles.itemsSection}>
                <div className={styles.itemsHeading}>
                  <h2>Your Items</h2>
                  <span>{items.length} product{items.length !== 1 ? "s" : ""}</span>
                </div>

                {items.map((item) => (
                  <article className={styles.cartItem} key={item.id}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.itemImage}
                    />

                    <div className={styles.itemDetails}>
                      <h3>{item.name}</h3>
                      <p className={styles.itemPrice}>
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>

                      <div className={styles.itemActions}>
                        <div className={styles.quantityControl}>
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${item.name}`}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            aria-label={`Increase quantity of ${item.name}`}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          className={styles.removeButton}
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <p className={styles.lineTotal}>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </article>
                ))}

                <Link href="/shop" className={styles.continueLink}>
                  ← Continue shopping
                </Link>
              </section>

              <aside className={styles.summary}>
                <h2>Order Summary</h2>

                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className={styles.summaryRow}>
                  <span>Delivery</span>
                  <span>
                    {deliveryFee === 0
                      ? "FREE"
                      : `₹${deliveryFee.toLocaleString("en-IN")}`}
                  </span>
                </div>

                {subtotal > 0 && subtotal < FREE_DELIVERY_LIMIT && (
                  <p className={styles.deliveryNote}>
                    Add ₹{(FREE_DELIVERY_LIMIT - subtotal).toLocaleString("en-IN")}{" "}
                    more for free delivery.
                  </p>
                )}

                <div className={styles.totalRow}>
                  <span>Total</span>
                  <strong>₹{total.toLocaleString("en-IN")}</strong>
                </div>

                <Link href="/checkout" className={styles.checkoutButton}>
                  Proceed to Checkout →
                </Link>

                <p className={styles.secureNote}>
                  Your order details will be confirmed at checkout.
                </p>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
