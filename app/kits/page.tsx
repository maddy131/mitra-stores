
import Link from "next/link";
import Navbar from "@/component/Navbar/Navbar";
import Footer from "@/component/Footer/footer";
import styles from "./kits.module.css";

const kits = [
  {
    id: "female-winter-care",
    name: "Female Winter Care Kit",
    description:
      "A thoughtful collection of skincare and winter-care essentials for your everyday routine.",
    price: 499,
    image: "/images/kits/female-winter-care.jpg",
    tag: "SELF-CARE",
  },
  {
    id: "jewellery-gift",
    name: "Jewellery Gift Kit",
    description:
      "Create a beautiful combination of traditional jewellery and accessories for someone special.",
    price: 399,
    image: "/images/kits/jewellery-gift.jpg",
    tag: "GIFTING",
  },
  {
    id: "wool-craft",
    name: "Wool & Craft Kit",
    description:
      "Bring your creative ideas to life with wool, yarn and knitting tools from Mitra Stores.",
    price: 299,
    image: "/images/kits/wool-craft.jpg",
    tag: "GET CREATIVE",
  },
  {
    id: "beauty-essentials",
    name: "Beauty Essentials Kit",
    description:
      "Put together a handy collection of face packs, makeup brushes and skincare essentials.",
    price: 349,
    image: "/images/kits/beauty-essentials.jpg",
    tag: "EVERYDAY CARE",
  },
];

export default function KitsPage() {
  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>A LITTLE BOX OF HAPPINESS</p>

          <h1>Thoughtfully Curated Kits</h1>

          <p className={styles.heroText}>
            Discover special collections from Mitra Stores or create a kit
            that is uniquely yours. Add your favourite products and a
            personalized letter to make it extra special.
          </p>

          <Link href="/customize-kit" className={styles.customButton}>
            Create Your Own Kit
          </Link>
        </section>

        <section className={styles.kitsSection}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>MADE FOR YOU</p>
              <h2>Explore Our Kits</h2>
            </div>

            <p className={styles.sectionDescription}>
              Find your favourite combination or make your own.
            </p>
          </div>

          <div className={styles.kitGrid}>
            {kits.map((kit) => (
              <article className={styles.kitCard} key={kit.id}>
                <Link
                  href={`/kits/${kit.id}`}
                  className={styles.imageLink}
                  aria-label={`View ${kit.name}`}
                >
                  <div className={styles.imageWrapper}>
                    {/* Replace these sample paths with your final kit images. */}
                    <img src={kit.image} alt={kit.name} />
                    <span className={styles.tag}>{kit.tag}</span>
                  </div>
                </Link>

                <div className={styles.kitInfo}>
                  <h3>{kit.name}</h3>
                  <p className={styles.description}>{kit.description}</p>

                  <div className={styles.cardBottom}>
                    <div>
                      <span className={styles.priceLabel}>Starting at</span>
                      <p className={styles.price}>₹{kit.price}</p>
                    </div>

                    <Link
                      href={`/kits/${kit.id}`}
                      className={styles.viewButton}
                    >
                      View Kit
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.customSection}>
          <div>
            <p className={styles.eyebrow}>YOUR IDEAS, YOUR KIT</p>
            <h2>Make It Personal</h2>
            <p>
              Choose products available in our store, give your kit a name
              and include a personal letter for someone special.
            </p>
          </div>

          <Link href="/customize-kit" className={styles.customButton}>
            Customize Your Kit
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
