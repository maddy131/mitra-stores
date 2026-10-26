
export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Traditional Temple Jewellery Set",
    category: "Temple Jewellery",
    price: 1299,
    oldPrice: 1599,
    image: "/images/categories/temple-jewellery.jpg",
    inStock: true,
  },
  {
    id: 2,
    name: "Bengali Biye Totto Collection",
    category: "Biye Totto",
    price: 899,
    image: "/images/categories/biye-totto.jpg",
    inStock: true,
  },
  {
    id: 3,
    name: "Classic Dance Jewellery",
    category: "Dance Jewellery",
    price: 749,
    oldPrice: 999,
    image: "/images/categories/dance-jewellery.jpg",
    inStock: true,
  },
  {
    id: 4,
    name: "Oxidized Jewellery Set",
    category: "Oxidized Jewellery",
    price: 599,
    image: "/images/categories/oxidized-jewellery.jpg",
    inStock: true,
  },
  {
    id: 5,
    name: "Traditional Gold-Tone Bangles",
    category: "Bangles",
    price: 399,
    oldPrice: 499,
    image: "/images/categories/bangles.jpg",
    inStock: true,
  },
  {
    id: 6,
    name: "Everyday Fashion Bracelets",
    category: "Bracelets",
    price: 249,
    image: "/images/categories/bracelets.jpg",
    inStock: true,
  },
  {
    id: 7,
    name: "Colourful Traditional Churis",
    category: "Churis",
    price: 199,
    image: "/images/categories/churis.jpg",
    inStock: false,
  },
  {
    id: 8,
    name: "Women's Fashion Accessories",
    category: "Accessories",
    price: 299,
    image: "/images/categories/accessories.jpg",
    inStock: true,
  },
  {
    id: 9,
    name: "Decorative Hair Accessories",
    category: "Hair Accessories",
    price: 179,
    image: "/images/categories/hair-accessories.jpg",
    inStock: true,
  },
  {
    id: 10,
    name: "Elegant Hair Clutcher Set",
    category: "Clutchers",
    price: 149,
    image: "/images/categories/clutchers.jpg",
    inStock: true,
  },
  {
    id: 11,
    name: "Daily Skincare Essentials",
    category: "Skincare",
    price: 499,
    image: "/images/categories/skincare.jpg",
    inStock: true,
  },
  {
    id: 12,
    name: "Natural Face Pack Collection",
    category: "Face Packs",
    price: 249,
    image: "/images/categories/face-packs.jpg",
    inStock: true,
  },
  {
    id: 13,
    name: "Professional Makeup Brushes",
    category: "Makeup Brushes",
    price: 349,
    image: "/images/categories/makeup-brushes.jpg",
    inStock: true,
  },
  {
    id: 14,
    name: "Knitting Tools Starter Kit",
    category: "Knitting Tools",
    price: 299,
    image: "/images/categories/knitting-tools.jpg",
    inStock: true,
  },
  {
    id: 15,
    name: "Soft Wool Yarn Skein",
    category: "Wool & Yarn",
    price: 199,
    oldPrice: 249,
    image: "/images/categories/wool-yarn.jpg",
    inStock: true,
  },
  {
    id: 16,
    name: "Premium Craft Wool Bundle",
    category: "Wool & Yarn",
    price: 399,
    image: "/images/categories/wool-yarn.jpg",
    inStock: false,
  },
];
