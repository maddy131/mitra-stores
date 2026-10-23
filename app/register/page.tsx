
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./register.module.css";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setMessage(
      "Your form looks good! Account creation will be enabled after backend integration."
    );
  }

  return (
    <main className={styles.registerPage}>
      <section className={styles.visualPanel}>
        <div className={styles.visualOverlay} />

        <div className={styles.brandContent}>
          <Link href="/" className={styles.brand}>
            MITRA STORES
          </Link>

          <p>
            Temple jewellery, biye totto, churis, skincare and craft
            supplies — delivered or ready for pickup.
          </p>
        </div>
      </section>

      <section className={styles.formPanel}>
        <div className={styles.registerContainer}>
          <Link href="/" className={styles.mobileBrand}>
            MITRA STORES
          </Link>

          <p className={styles.eyebrow}>JOIN OUR COMMUNITY</p>
          <h1>Create account</h1>
          <p className={styles.subtitle}>
            Save your details and keep track of your orders.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.twoColumn}>
              <div className={styles.field}>
                <label htmlFor="fullName">Full name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Your full name"
                  autoComplete="name"
                  minLength={2}
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Your phone number"
                  autoComplete="tel"
                  pattern="[0-9+\s()-]{10,16}"
                  title="Enter a valid phone number."
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Password (min 6 characters)</label>

              <div className={styles.passwordWrapper}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                />

                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="address">Address (optional)</label>
              <textarea
                id="address"
                name="address"
                placeholder="House, street, city, PIN code"
                autoComplete="street-address"
                rows={3}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Create account
            </button>

            {message && (
              <p className={styles.message} role="status">
                {message}
              </p>
            )}
          </form>

          <p className={styles.signInPrompt}>
            Already have an account?{" "}
            <Link href="/login">Sign in</Link>
          </p>

          <Link href="/" className={styles.backLink}>
            ← Back to shopping
          </Link>
        </div>
      </section>
    </main>
  );
}
