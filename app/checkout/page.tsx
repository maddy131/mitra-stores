
"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/component/Navbar/Navbar";
import Footer from "@/component/Footer/footer";
import styles from "./checkout.module.css";

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");

  // Temporary sample product until the cart is connected.
  const product = {
    name: "Merino Wool Skein 100g",
    price: 399,
    quantity: 1,
    image: "/images/categories/wool-yarn.jpg",
  };

  const subtotal = product.price * product.quantity;
  const deliveryCharge =
    deliveryMethod === "delivery" && subtotal < 999 ? 60 : 0;
  const total = subtotal + deliveryCharge;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (deliveryMethod === "delivery" && !address.trim()) {
      setMessage("Please enter your delivery address.");
      return;
    }

    if (deliveryMethod === "pickup" && !pickupDate) {
      setMessage("Please choose your preferred pickup date.");
      return;
    }

    setMessage(
      "Checkout preview only. Order placement will be connected when we build the backend."
    );
  }

  return (
    <>
      <Navbar />

      <main className={styles.checkoutPage}>
        <div className={styles.checkoutContainer}>
          <p className={styles.eyebrow}>SECURE CHECKOUT</p>
          <h1>Checkout</h1>

          <form className={styles.checkoutGrid} onSubmit={handleSubmit}>
            <div className={styles.checkoutDetails}>
              <section className={styles.checkoutSection}>
                <h2>1. How would you like to receive it?</h2>

                <div className={styles.methodGrid}>
                  <button
                    type="button"
                    className={`${styles.methodCard} ${
                      deliveryMethod === "delivery" ? styles.selected : ""
                    }`}
                    onClick={() => {
                      setDeliveryMethod("delivery");
                      setMessage("");
                    }}
                    aria-pressed={deliveryMethod === "delivery"}
                  >
                    <span className={styles.methodIcon}>♧</span>
                    <strong>Home Delivery</strong>
                    <span className={styles.methodDescription}>
                      3–5 business days · Free above ₹999
                    </span>
                  </button>

                  <button
                    type="button"
                    className={`${styles.methodCard} ${
                      deliveryMethod === "pickup" ? styles.selected : ""
                    }`}
                    onClick={() => {
                      setDeliveryMethod("pickup");
                      setMessage("");
                    }}
                    aria-pressed={deliveryMethod === "pickup"}
                  >
                    <span className={styles.methodIcon}>⌂</span>
                    <strong>Pick up in Store</strong>
                    <span className={styles.methodDescription}>
                      Choose a date · No delivery charge
                    </span>
                  </button>
                </div>

                {deliveryMethod === "pickup" && (
                  <div className={styles.pickupField}>
                    <label htmlFor="pickupDate">Preferred pickup date</label>
                    <input
                      id="pickupDate"
                      type="date"
                      min={new Date().toLocaleDateString("en-CA")}
                      value={pickupDate}
                      onChange={(event) => setPickupDate(event.target.value)}
                      required
                    />
                    <p>
                      Store address and pickup time will be shown when store
                      details are configured.
                    </p>
                  </div>
                )}
              </section>

              <section className={styles.checkoutSection}>
                <h2>2. Contact details</h2>

                <div className={styles.contactGrid}>
                  <div className={styles.field}>
                    <label htmlFor="fullName">Full name</label>
                    <input
                      id="fullName"
                      autoComplete="name"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      pattern="[0-9+\s()-]{10,16}"
                      title="Enter a valid phone number."
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                </div>

                {deliveryMethod === "delivery" && (
                  <div className={styles.field}>
                    <label htmlFor="address">Delivery address</label>
                    <textarea
                      id="address"
                      autoComplete="street-address"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      placeholder="House, street, city, PIN code"
                      rows={3}
                      required
                    />
                  </div>
                )}

                <div className={styles.field}>
                  <label htmlFor="notes">Order notes (optional)</label>
                  <input
                    id="notes"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Colour preference, gift wrap..."
                  />
                </div>
              </section>

              <section className={styles.checkoutSection}>
                <h2>3. Payment</h2>

                <div className={styles.paymentCard}>
                  <span className={styles.paymentIcon}>▤</span>
                  <div>
                    <strong>Cash on Delivery</strong>
                    <p>Pay in cash or UPI when your order arrives.</p>
                  </div>
                </div>

                <p className={styles.paymentNote}>
                  Online card / UPI payments coming soon.
                </p>
              </section>
            </div>

            <aside className={styles.orderSummary}>
              <h2>Order summary</h2>

              <div className={styles.productRow}>
                <img src={product.image} alt={product.name} />
                <div className={styles.productInfo}>
                  <p>{product.name}</p>
                  <span>Qty {product.quantity}</span>
                </div>
                <strong>₹{product.price.toLocaleString("en-IN")}</strong>
              </div>

              <div className={styles.priceBreakdown}>
                <div>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div>
                  <span>Delivery</span>
                  <span>
                    {deliveryCharge === 0
                      ? "Free"
                      : `₹${deliveryCharge.toLocaleString("en-IN")}`}
                  </span>
                </div>

                <div className={styles.totalRow}>
                  <strong>Total</strong>
                  <strong>₹{total.toLocaleString("en-IN")}</strong>
                </div>
              </div>

              <button type="submit" className={styles.placeOrderButton}>
                Place Order
              </button>

              {message && (
                <p className={styles.message} role="status">
                  {message}
                </p>
              )}

              <Link href="/" className={styles.continueShopping}>
                ← Continue shopping
              </Link>
            </aside>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
