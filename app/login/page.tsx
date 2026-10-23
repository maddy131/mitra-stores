
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./login.module.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    setMessage(
      "Frontend preview only. Login will be connected when we build the backend."
    );
  }

  return (
    <main className={styles.loginPage}>
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
        <div className={styles.loginFormContainer}>
          <Link href="/" className={styles.mobileBrand}>
            MITRA STORES
          </Link>

          <p className={styles.eyebrow}>WELCOME BACK</p>
          <h1>Sign in</h1>
          <p className={styles.subtitle}>
            Sign in to place orders and track your purchases.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
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

            <div className={styles.formOptions}>
              <label className={styles.rememberLabel}>
                <input type="checkbox" />
                Remember me
              </label>
              <button
                type="button"
                className={styles.textButton}
                onClick={() =>
                  setMessage(
                    "Password recovery will be available after backend integration."
                  )
                }
              >
                Forgot password?
              </button>
            </div>

            <button type="submit" className={styles.submitButton}>
              Sign in
            </button>

            {message && (
              <p className={styles.message} role="status">
                {message}
              </p>
            )}
          </form>

          <p className={styles.registerPrompt}>
            New to MITRA STORES?{" "}
            <Link href="/register">Create an account</Link>
          </p>

          <Link href="/" className={styles.backLink}>
            ← Back to shopping
          </Link>
        </div>
      </section>
    </main>
  );
}
