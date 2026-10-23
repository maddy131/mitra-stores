
"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/component/Navbar/Navbar";
import Footer from "@/component/Footer/footer";
import styles from "./account.module.css";

const sampleOrders = [
  {
    id: "MS-2026-1042",
    date: "18 Oct 2026",
    item: "Temple Gold Earrings",
    amount: 599,
    status: "Delivered",
    image: "/images/categories/temple-jewellery.jpg",
  },
  {
    id: "MS-2026-0981",
    date: "10 Oct 2026",
    item: "Soft Acrylic Wool Bundle",
    amount: 599,
    status: "Processing",
    image: "/images/categories/wool-yarn.jpg",
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("orders");
  const [signedOut, setSignedOut] = useState(false);

  if (signedOut) {
    return (
      <>
        <Navbar />
        <main className={styles.signedOutPage}>
          <div className={styles.signedOutCard}>
            <span className={styles.successIcon}>✓</span>
            <h1>You&apos;re signed out</h1>
            <p>
              This is a frontend preview. Real sign-in and sign-out
              functionality will be connected with the backend.
            </p>
            <Link href="/login" className={styles.primaryButton}>
              Go to sign in
            </Link>
            <Link href="/" className={styles.secondaryLink}>
              Back to shopping
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className={styles.accountPage}>
        <div className={styles.accountContainer}>
          <div className={styles.pageHeading}>
            <div>
              <p className={styles.eyebrow}>YOUR MITRA STORES</p>
              <h1>My Account</h1>
              <p className={styles.pageSubtitle}>
                Manage your profile, addresses and orders.
              </p>
            </div>

            <button
              type="button"
              className={styles.signOutButton}
              onClick={() => setSignedOut(true)}
            >
              Sign out
            </button>
          </div>

          <div className={styles.accountLayout}>
            <aside className={styles.sidebar}>
              <div className={styles.profileCard}>
                <div className={styles.avatar}>M</div>
                <h2>Welcome, Customer</h2>
                <p>Your Mitra Stores account</p>
              </div>

              <nav className={styles.accountNav} aria-label="Account sections">
                <button
                  type="button"
                  className={activeTab === "orders" ? styles.activeNav : ""}
                  onClick={() => setActiveTab("orders")}
                >
                  <span>▤</span> My Orders
                </button>

                <button
                  type="button"
                  className={activeTab === "profile" ? styles.activeNav : ""}
                  onClick={() => setActiveTab("profile")}
                >
                  <span>♙</span> Profile Details
                </button>

                <button
                  type="button"
                  className={activeTab === "address" ? styles.activeNav : ""}
                  onClick={() => setActiveTab("address")}
                >
                  <span>⌂</span> Saved Address
                </button>
              </nav>
            </aside>

            <section className={styles.mainPanel}>
              {activeTab === "orders" && (
                <>
                  <div className={styles.panelHeading}>
                    <div>
                      <h2>My Orders</h2>
                      <p>Keep track of your recent purchases.</p>
                    </div>
                    <span className={styles.orderCount}>
                      {sampleOrders.length} sample orders
                    </span>
                  </div>

                  <div className={styles.orderList}>
                    {sampleOrders.map((order) => (
                      <article className={styles.orderCard} key={order.id}>
                        <div className={styles.orderTop}>
                          <div>
                            <p className={styles.orderLabel}>ORDER ID</p>
                            <strong>{order.id}</strong>
                          </div>

                          <span
                            className={`${styles.status} ${
                              order.status === "Delivered"
                                ? styles.delivered
                                : styles.processing
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>

                        <div className={styles.orderProduct}>
                          <img src={order.image} alt={order.item} />

                          <div className={styles.orderProductInfo}>
                            <h3>{order.item}</h3>
                            <p>Ordered on {order.date}</p>
                            <strong>
                              ₹{order.amount.toLocaleString("en-IN")}
                            </strong>
                          </div>
                        </div>

                        <div className={styles.orderBottom}>
                          <span>
                            {order.status === "Delivered"
                              ? "Your order has been delivered."
                              : "Your order is being prepared."}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              alert(
                                "Detailed order tracking will be available after backend integration."
                              )
                            }
                          >
                            View details →
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>

                  <Link href="/shop" className={styles.shopButton}>
                    Continue shopping
                  </Link>
                </>
              )}

              {activeTab === "profile" && (
                <div className={styles.detailsPanel}>
                  <h2>Profile Details</h2>
                  <p className={styles.detailsDescription}>
                    Your account information will appear here after
                    authentication is connected.
                  </p>

                  <div className={styles.detailRow}>
                    <span>Full name</span>
                    <strong>Not added yet</strong>
                  </div>

                  <div className={styles.detailRow}>
                    <span>Email address</span>
                    <strong>Not added yet</strong>
                  </div>

                  <div className={styles.detailRow}>
                    <span>Phone number</span>
                    <strong>Not added yet</strong>
                  </div>

                  <Link href="/login" className={styles.shopButton}>
                    Sign in to your account
                  </Link>
                </div>
              )}

              {activeTab === "address" && (
                <div className={styles.detailsPanel}>
                  <h2>Saved Address</h2>
                  <p className={styles.detailsDescription}>
                    Your saved delivery addresses will appear here once
                    customer accounts are connected.
                  </p>

                  <div className={styles.emptyAddress}>
                    <span>⌂</span>
                    <h3>No saved address yet</h3>
                    <p>
                      You can enter a delivery address during checkout.
                    </p>
                    <Link href="/checkout" className={styles.shopButton}>
                      Go to checkout
                    </Link>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
