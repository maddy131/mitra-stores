
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Gift,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";

import Navbar from "@/component/Navbar/Navbar";
import Footer from "@/component/Footer/footer";
import { useCart } from "@/context/CartContext";

import styles from "./customize-kit.module.css";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
};

const products: Product[] = [
  {
    id: 201,
    name: "Traditional Jewellery",
    category: "Jewellery",
    price: 299,
    image: "/images/categories/temple-jewellery.jpg",
  },
  {
    id: 202,
    name: "Biye Totto Collection",
    category: "Gifting",
    price: 399,
    image: "/images/categories/biye-totto.jpg",
  },
  {
    id: 203,
    name: "Dance Jewellery",
    category: "Jewellery",
    price: 249,
    image: "/images/categories/dance-jewellery.jpg",
  },
  {
    id: 204,
    name: "Wool & Yarn",
    category: "Wool & Craft",
    price: 199,
    image: "/images/kits/wool-craft.jpg",
  },
  {
    id: 205,
    name: "Skincare Essentials",
    category: "Beauty",
    price: 249,
    image: "/images/kits/beauty-essentials.jpg",
  },
  {
    id: 206,
    name: "Winter Care Essentials",
    category: "Self-care",
    price: 349,
    image: "/images/kits/female-winter-care.jpg",
  },
];

export default function CustomizeKitPage() {
  const router = useRouter();
  const { addItem } = useCart();

  const [kitName, setKitName] = useState("");
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [includeLetter, setIncludeLetter] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [letter, setLetter] = useState("");
  const [added, setAdded] = useState(false);

  const selectedProducts = products.filter(
    (product) => (selected[product.id] || 0) > 0
  );

  const productTotal = selectedProducts.reduce(
    (total, product) =>
      total + product.price * selected[product.id],
    0
  );

  const totalItems = selectedProducts.reduce(
    (total, product) => total + selected[product.id],
    0
  );

  function changeQuantity(productId: number, change: number) {
    setSelected((current) => {
      const nextQuantity = Math.max(
        0,
        (current[productId] || 0) + change
      );

      return {
        ...current,
        [productId]: nextQuantity,
      };
    });

    setAdded(false);
  }

  function handleAddToBag() {
    if (!kitName.trim()) {
      window.alert("Please give your kit a name.");
      return;
    }

    if (selectedProducts.length === 0) {
      window.alert("Please select at least one product.");
      return;
    }

    if (includeLetter && !letter.trim()) {
      window.alert("Please write your letter or uncheck the letter option.");
      return;
    }

    const kitDetails = selectedProducts
      .map(
        (product) =>
          `${product.name} x ${selected[product.id]}`
      )
      .join(", ");

    const letterDetails = includeLetter
      ? ` | Letter for ${recipient.trim() || "recipient"} | From ${
          sender.trim() || "sender"
        } | Message: ${letter.trim()}`
      : "";

    const cartName = `${kitName.trim()} — Custom Kit: ${kitDetails}${letterDetails}`;

    const identity = JSON.stringify({
      name: kitName.trim(),
      products: selectedProducts.map((product) => [
        product.id,
        selected[product.id],
      ]),
      includeLetter,
      recipient: recipient.trim(),
      sender: sender.trim(),
      letter: letter.trim(),
    });

    const cartId =
      identity.split("").reduce(
        (hash, character) =>
          (hash * 31 + character.charCodeAt(0)) >>> 0,
        11
      ) || 11;

    addItem({
      id: cartId,
      name: cartName,
      price: productTotal,
      image: selectedProducts[0].image,
    });

    setAdded(true);
  }

  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <div className={styles.breadcrumb}>
          <Link href="/kits">
            <ArrowLeft size={16} />
            Back to Kits
          </Link>
          <span>/</span>
          <span>Create Your Own Kit</span>
        </div>

        <section className={styles.intro}>
          <p className={styles.eyebrow}>A GIFT THAT FEELS PERSONAL</p>
          <h1>Create Your Own Kit</h1>
          <p>
            Choose your favourite Mitra Stores products, give your kit a
            name, and make it extra special with a personal letter.
          </p>
        </section>

        <div className={styles.layout}>
          <section className={styles.productSection}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>STEP 1</p>
                <h2>Name your kit</h2>
              </div>
              <Gift size={25} />
            </div>

            <label className={styles.fieldLabel}>
              Your kit name
              <input
                type="text"
                value={kitName}
                onChange={(event) => {
                  setKitName(event.target.value);
                  setAdded(false);
                }}
                placeholder="e.g. Maa's Birthday Surprise"
                maxLength={80}
              />
            </label>

            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>STEP 2</p>
                <h2>Choose your products</h2>
                <p className={styles.helper}>
                  Add one or more products to your kit.
                </p>
              </div>
            </div>

            <div className={styles.productGrid}>
              {products.map((product) => {
                const quantity = selected[product.id] || 0;

                return (
                  <article
                    key={product.id}
                    className={`${styles.productCard} ${
                      quantity > 0 ? styles.productSelected : ""
                    }`}
                  >
                    <div className={styles.productImage}>
                      <img src={product.image} alt={product.name} />
                      {quantity > 0 && (
                        <span className={styles.selectedBadge}>
                          <Check size={14} />
                          Added
                        </span>
                      )}
                    </div>

                    <div className={styles.productInfo}>
                      <p className={styles.category}>
                        {product.category}
                      </p>
                      <h3>{product.name}</h3>
                      <strong>
                        ₹{product.price.toLocaleString("en-IN")}
                      </strong>

                      {quantity === 0 ? (
                        <button
                          type="button"
                          className={styles.selectButton}
                          onClick={() => changeQuantity(product.id, 1)}
                        >
                          <Plus size={16} />
                          Add product
                        </button>
                      ) : (
                        <div className={styles.quantityControl}>
                          <button
                            type="button"
                            aria-label={`Remove one ${product.name}`}
                            onClick={() =>
                              changeQuantity(product.id, -1)
                            }
                          >
                            <Minus size={15} />
                          </button>
                          <span>{quantity}</span>
                          <button
                            type="button"
                            aria-label={`Add one ${product.name}`}
                            onClick={() =>
                              changeQuantity(product.id, 1)
                            }
                          >
                            <Plus size={15} />
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            <div className={styles.letterSection}>
              <p className={styles.eyebrow}>STEP 3</p>
              <h2>Add a personal letter</h2>
              <p className={styles.helper}>
                A few heartfelt words can make your gift even more memorable.
              </p>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={includeLetter}
                  onChange={(event) => {
                    setIncludeLetter(event.target.checked);
                    setAdded(false);
                  }}
                />
                Include a personalized letter (free)
              </label>

              {includeLetter && (
                <div className={styles.letterFields}>
                  <label className={styles.fieldLabel}>
                    Recipient's name
                    <input
                      value={recipient}
                      onChange={(event) => {
                        setRecipient(event.target.value);
                        setAdded(false);
                      }}
                      placeholder="Who is receiving this gift?"
                      maxLength={60}
                    />
                  </label>

                  <label className={styles.fieldLabel}>
                    Your name
                    <input
                      value={sender}
                      onChange={(event) => {
                        setSender(event.target.value);
                        setAdded(false);
                      }}
                      placeholder="Who is the gift from?"
                      maxLength={60}
                    />
                  </label>

                  <label className={styles.fieldLabel}>
                    Your message *
                    <textarea
                      value={letter}
                      onChange={(event) => {
                        setLetter(event.target.value);
                        setAdded(false);
                      }}
                      placeholder="Write your message here..."
                      rows={5}
                      maxLength={1000}
                      required
                    />
                    <span className={styles.characterCount}>
                      {letter.length}/1000 characters
                    </span>
                  </label>
                </div>
              )}
            </div>
          </section>

          <aside className={styles.summary}>
            <p className={styles.eyebrow}>YOUR CREATION</p>
            <h2>{kitName.trim() || "Your Custom Kit"}</h2>
            <p className={styles.summaryText}>
              {totalItems} item{totalItems === 1 ? "" : "s"} selected
            </p>

            {selectedProducts.length === 0 ? (
              <p className={styles.emptyMessage}>
                Your kit is waiting for its first product.
              </p>
            ) : (
              <ul className={styles.summaryList}>
                {selectedProducts.map((product) => (
                  <li key={product.id}>
                    <span>
                      {product.name} × {selected[product.id]}
                    </span>
                    <strong>
                      ₹
                      {(
                        product.price * selected[product.id]
                      ).toLocaleString("en-IN")}
                    </strong>
                  </li>
                ))}
              </ul>
            )}

            {includeLetter && (
              <p className={styles.letterIncluded}>
                <Check size={15} />
                Personalized letter included
              </p>
            )}

            <div className={styles.totalRow}>
              <span>Total</span>
              <strong>
                ₹{productTotal.toLocaleString("en-IN")}
              </strong>
            </div>

            <button
              type="button"
              className={styles.addButton}
              onClick={handleAddToBag}
            >
              <ShoppingBag size={18} />
              Add Custom Kit to Bag
            </button>

            {added && (
              <div className={styles.successMessage} role="status">
                <Check size={17} />
                Your custom kit has been added!
                <button
                  type="button"
                  onClick={() => router.push("/cart")}
                >
                  View Bag
                </button>
              </div>
            )}

            <p className={styles.summaryFootnote}>
              Product prices shown are sample development prices. Confirm
              product availability and actual prices before launching your
              store.
            </p>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
