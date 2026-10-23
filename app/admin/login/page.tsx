
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./login.module.css";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Authentication will be connected in a later step.
    alert("Login authentication is not configured yet.");
  }

  return (
    <main className={styles.page}>
      <section className={styles.loginCard}>
        <Link href="/" className={styles.brand}>
          MITRA <span>STORES</span>
        </Link>

        <div className={styles.heading}>
          <p className={styles.eyebrow}>ADMINISTRATION</p>
          <h1>Welcome back</h1>
          <p className={styles.subtitle}>
            Sign in to manage your store.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>

            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className={styles.showPassword}
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            Sign in to dashboard
          </button>
        </form>

        <Link href="/" className={styles.backLink}>
          ← Back to Mitra Stores
        </Link>

        <p className={styles.securityNote}>
          Authorized store administrators only.
        </p>
      </section>
    </main>
  );
}
