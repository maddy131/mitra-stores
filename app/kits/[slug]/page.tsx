
"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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
import styles from "./kit-detail.module.css";

type KitSize = "Small" | "Medium" | "Large";

type Kit = {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  contents: string[];
  prices: Record<KitSize, number>;
};

const kits: Kit[] = [
  {
    id: "female-winter-care",
    name: "Female Winter Care Kit",
    category: "SELF-CARE",
    image: "/images/kits/female-winter-care.jpg",
    description:
      "A thoughtful collection of skincare and personal-care essentials for the colder months. Choose your kit size and add a personal letter for someone special.",
    contents: [
      "Skincare essentials",
      "Face care products",
      "Selected beauty essentials",
    ],
    prices: { Small: 499, Medium: 799, Large: 1099 },
  },
  {
    id: "jewellery-gift",
    name: "Jewellery Gift Kit",
    category: "GIFTING",
    image: "/images/kits/jewellery-gift.jpg",
    description:
      "A beautiful gift collection featuring traditional jewellery and accessories available at Mitra Stores.",
    contents: [
      "Traditional jewellery",
      "Jewellery and accessories",
      "A thoughtful gift presentation",
    ],
    prices: { Small: 399, Medium: 699, Large: 999 },
  },
  {
    id: "wool-craft",
    name: "Wool & Craft Kit",
    category: "GET CREATIVE",
    image: "/images/kits/wool-craft.jpg",
    description:
      "A creative collection for craft lovers, featuring wool, yarn and knitting tools available at Mitra Stores.",
    contents: [
      "Wool and yarn",
      "Knitting tools",
      "Craft essentials",
    ],
    prices: { Small: 299, Medium: 599, Large: 899 },
  },
  {
    id: "beauty-essentials",
    name: "Beauty Essentials Kit",
    category: "EVERYDAY CARE",
    image: "/images/kits/beauty-essentials.jpg",
    description:
      "Bring together beauty and personal-care essentials in one convenient kit, with an optional personalized letter.",
    contents: [
      "Face packs",
      "Makeup brushes",
      "Skincare essentials",
    ],
    prices: { Small: 349, Medium: 649, Large: 949 },
  },
];

export default function KitDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { addItem } = useCart();

  const slug = params?.slug;
  const foundKit = kits.find((item) => item.id === slug);

  const [size, setSize] = useState<KitSize>("Medium");
  const [quantity, setQuantity] = useState(1);
  const [includeLetter, setIncludeLetter] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [letter, setLetter] = useState("");
  const [added, setAdded] = useState(false);

  if (!foundKit) {
    return (
      <>
        <Navbar />
        <main className={styles.notFound}>
          <h1>Kit not found</h1>
          <p>We couldn't find this kit.</p>
          <Link href="/kits">Explore all kits</Link>
        </main>
        <Footer />
      </>
    );
  }

  // From here onward, TypeScript knows kit is a valid Kit.
  const kit: Kit = foundKit;
  const price = kit.prices[size];

  function handleAddToBag() {
    if (includeLetter && !letter.trim()) {
      window.alert("Please write your letter or uncheck the letter option.");
      return;
    }

    const details = [
      `${kit.name} - ${size}`,
      includeLetter ? `Letter for ${recipient.trim() || "recipient"}` : "",
      includeLetter && sender.trim() ? `From ${sender.trim()}` : "",
      includeLetter ? `Message: ${letter.trim()}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    // Each distinct kit configuration receives its own cart ID.
    const configuration = [
      kit.id,
      size,
      includeLetter,
      recipient.trim(),
      sender.trim(),
      letter.trim(),
    ].join("|");

    const cartId =
      configuration.split("").reduce(
        (hash, character) =>
          (hash * 31 + character.charCodeAt(0)) >>> 0,
        7
      ) || 1;

    // The existing cart adds one unit per call.
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: cartId,
        name: details,
        price,
        image: kit.image,
      });
    }

    setAdded(true);
  }

  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <div className={styles.breadcrumb}>
          <Link href="/kits">
            <ArrowLeft size={15} />
            Back to Kits
          </Link>
          <span>/</span>
          <span>{kit.name}</span>
        </div>

        <section className={styles.productLayout}>
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <img src={kit.image} alt={kit.name} />
              <span className={styles.imageTag}>{kit.category}</span>
            </div>

            <p className={styles.imageCaption}>
              <Gift size={16} />
              Made more special with your personal touch
            </p>
          </div>

          <div className={styles.details}>
            <p className={styles.eyebrow}>
              MITRA STORES · CURATED COLLECTION
            </p>

            <h1>{kit.name}</h1>

            <div className={styles.price}>
              ₹{price.toLocaleString("en-IN")}
            </div>

            <p className={styles.description}>{kit.description}</p>

            <div className={styles.divider} />

            <h2>What's inside</h2>

            <ul className={styles.contents}>
              {kit.contents.map((item) => (
                <li key={item}>
                  <Check size={16} />
                  {item}
                </li>
              ))}
            </ul>

            <p className={styles.note}>
              Kit contents and prices are examples for development. Confirm
              them against your actual store inventory before launch.
            </p>

            <div className={styles.divider} />

            <h2>Choose your kit size</h2>

            <div className={styles.sizeOptions}>
              {(["Small", "Medium", "Large"] as KitSize[]).map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => {
                    setSize(item);
                    setAdded(false);
                  }}
                  className={`${styles.sizeButton} ${
                    size === item ? styles.selectedSize : ""
                  }`}
                  aria-pressed={size === item}
                >
                  <span>{item}</span>
                  <strong>
                    ₹{kit.prices[item].toLocaleString("en-IN")}
                  </strong>
                </button>
              ))}
            </div>

            <div className={styles.divider} />

            <h2>Personalized letter</h2>

            <p className={styles.letterIntro}>
              Add a personal message for someone special. The letter is
              optional and free in this design.
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
              Include a personalized letter
            </label>

            {includeLetter && (
              <div className={styles.letterFields}>
                <label>
                  Recipient's name
                  <input
                    value={recipient}
                    onChange={(event) => {
                      setRecipient(event.target.value);
                      setAdded(false);
                    }}
                    placeholder="e.g. Maa, Sister, Best Friend"
                    maxLength={60}
                  />
                </label>

                <label>
                  Your name
                  <input
                    value={sender}
                    onChange={(event) => {
                      setSender(event.target.value);
                      setAdded(false);
                    }}
                    placeholder="Who is this gift from?"
                    maxLength={60}
                  />
                </label>

                <label>
                  Your message *
                  <textarea
                    value={letter}
                    onChange={(event) => {
                      setLetter(event.target.value);
                      setAdded(false);
                    }}
                    placeholder="Write your heartfelt message here..."
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

            <div className={styles.divider} />

            <div className={styles.quantityRow}>
              <span>Quantity</span>

              <div className={styles.quantityControl}>
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                >
                  <Minus size={15} />
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() =>
                    setQuantity((current) => current + 1)
                  }
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            <div className={styles.totalRow}>
              <span>Total</span>
              <strong>
                ₹{(price * quantity).toLocaleString("en-IN")}
              </strong>
            </div>

            <button
              type="button"
              className={styles.addButton}
              onClick={handleAddToBag}
            >
              <ShoppingBag size={18} />
              Add to Bag
            </button>

            {added && (
              <div className={styles.successMessage} role="status">
                <Check size={17} />
                Kit added to your bag!
                <button
                  type="button"
                  onClick={() => router.push("/cart")}
                >
                  View Bag
                </button>
              </div>
            )}

            <Link
              href="/customize-kit"
              className={styles.customizeButton}
            >
              Create Your Own Kit
            </Link>

            <p className={styles.deliveryNote}>
              Your kit, your choices, your personal message.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
