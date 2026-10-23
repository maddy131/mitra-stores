
import styles from "./Category.module.css";

const categories = [
  {
    title: "Temple Jewellery",
    subtitle: "Antique gold & kemp motifs",
    image: "/images/categories/temple-jewellery.jpg",
    featured: true,
  },
  {
    title: "Bengali Biye Totto",
    subtitle: "Mukut, topor & totto trays",
    image: "/images/categories/biye-totto.jpg",
  },
  {
    title: "Dance Jewellery",
    subtitle: "Bharatanatyam, Kathak & Odissi",
    image: "/images/categories/dance-jewellery.jpg",
  },
  {
    title: "Oxidized Jewellery",
    subtitle: "German silver & tribal",
    image: "/images/categories/oxidized-jewellery.jpg",
  },
  {
    title: "Bangles",
    subtitle: "Shakha pola, kada & meenakari",
    image: "/images/categories/bangles.jpg",
  },
  {
    title: "Bracelets",
    subtitle: "Cuffs, charms & chains",
    image: "/images/categories/bracelets.jpg",
  },
  {
    title: "Churis",
    subtitle: "Glass, velvet & bridal sets",
    image: "/images/categories/churis.jpg",
  },
  {
    title: "Accessories",
    subtitle: "Kamarbandh, saree pins",
    image: "/images/categories/accessories.jpg",
  },
  {
    title: "Hair Accessories",
    subtitle: "Juda pins & matha patti",
    image: "/images/categories/hair-accessories.jpg",
  },
  {
    title: "Clutchers",
    subtitle: "Claw clips for every day",
    image: "/images/categories/clutchers.jpg",
  },
  {
    title: "Skincare",
    subtitle: "Ayurvedic oils & mists",
    image: "/images/categories/skincare.jpg",
  },
  {
    title: "Face Packs",
    subtitle: "Ubtan, chandan & clay",
    image: "/images/categories/face-packs.jpg",
  },
  {
    title: "Makeup Brushes",
    subtitle: "Soft vegan brush kits",
    image: "/images/categories/makeup-brushes.jpg",
  },
  {
    title: "Knitting Tools",
    subtitle: "Needles, hooks & counters",
    image: "/images/categories/knitting-tools.jpg",
  },
  {
    title: "Wool & Yarn",
    subtitle: "Acrylic & merino skeins",
    image: "/images/categories/wool-yarn.jpg",
  },
];

export default function Category() {
  return (
    <section className={styles.categorySection} id="categories">
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.eyebrow}>SHOP BY CATEGORY</p>
          <h2 className={styles.sectionTitle}>
            Everything, beautifully sorted
          </h2>
        </div>

        <a href="/shop" className={styles.viewAll}>
          View all products <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className={styles.categoryGrid}>
        {categories.map((category) => (
          <a
            key={category.title}
            href="/shop"
            className={`${styles.categoryCard} ${
              category.featured ? styles.featuredCard : ""
            }`}
            style={{ backgroundImage: `url("${category.image}")` }}
          >
            <div className={styles.cardOverlay}>
              <h3>{category.title}</h3>
              <p>{category.subtitle}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
