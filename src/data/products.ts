export type Review = {
  id: string;
  user: string;
  date: string;
  title?: string;
  body: string;
  rating: number;
  color: string;
  rx: string;
};

export type Product = {
  sku: string;
  name: string;
  subtitle: string;
  rating: number;
  reviewCount: number;
  promoText: string;
  frameColor: string;
  sizeLabel: string;
  sizeMm: string;
  images: string[];
  priceText: string;
  pills: string[];
  guarantees: string[];
  specs: { label: string; value: string }[];
  description: string;
  featureCards: { title: string; body: string }[];
  reviewsSummary: { label: string; value: number }[];
  reviews: Review[];
};

export const products: Product[] = [
  {
    sku: "ZTM863291-01",
    name: "Ringstaff",
    subtitle: "Round Rose-Gold metal Glasses",
    rating: 4.7,
    reviewCount: 111,
    promoText: "15% OFF; First Order",
    frameColor: "Rose-Gold",
    sizeLabel: "Medium",
    sizeMm: "51-49-146 mm",
    priceText: "$19.95 (frame)",
    images: [
      "https://s3.zeelool.com/admin/product/image/b0722ef315fd686f3cd6ea1e74fc7fae.jpg?im=Resize%2Cwidth%3D1920%2Ctype%3Ddownsize&q=75",
      "https://s3.zeelool.com/admin/product/image/7d5317f93fa84af91628d7ee9a9e7daa.jpg?im=Resize%2Cwidth%3D1920%2Ctype%3Ddownsize&q=75",
      "https://s3.zeelool.com/admin/product/image/c28a08198b850de2ba67105952e4715f.jpg?im=Resize%2Cwidth%3D1920%2Ctype%3Ddownsize&q=75",
      "https://s3.zeelool.com/admin/product/image/cc270cc2f107dd807be7335719eb9a15.jpg?im=Resize%2Cwidth%3D1920%2Ctype%3Ddownsize&q=75",
    ],
    pills: [
      "Prescription",
      "Progressive",
      "Reading",
      "Blue Light Blocking",
      "Color Tint",
      "Photochromic Lenses",
      "Driving Lenses",
    ],
    guarantees: [
      "FSA/HSA Eligible",
      "Free Shipping Over $79",
      "30-Day Exchanges & Returns",
      "365-Day Warranty",
      "Worry-Free Delivery Available",
    ],
    specs: [
      { label: "SKU", value: "ZTM863291-01" },
      { label: "Shape", value: "Round" },
      { label: "Size", value: "Medium" },
      { label: "Material", value: "metal" },
      { label: "Rim", value: "Full Rim" },
      { label: "Progressive", value: "Yes" },
      { label: "Spring Hinge", value: "No" },
      { label: "Adjustable Nosepads", value: "Yes" },
      { label: "Weight", value: "12.9 g" },
      { label: "Frame Width", value: "131 mm" },
      { label: "Bridge Fit", value: "Universal Fit" },
      { label: "Lens Width", value: "51 mm" },
      { label: "Lens Height", value: "49 mm" },
      { label: "Temple Length", value: "146 mm" },
      { label: "RX Range", value: "-20.00~+10.00" },
      { label: "PD Range", value: "54~78" },
    ],
    description:
      "Made with high-quality material, these metal frames are very lightweight (about 12.9 g). Designed with smooth arms to reduce friction with skin. Adjustable nose pads bring a comfortable experience.",
    featureCards: [
      { title: "Blue-Light Blocking", body: "Reduces eye strain and helps protect against harmful blue light from screens and digital devices." },
      { title: "Photochromic", body: "Automatically adjusts to light—darkening outdoors and lightening indoors for all-day comfort." },
      { title: "Polarized", body: "Blocks glare from reflective surfaces, enhancing clarity and reducing eye fatigue." },
      { title: "Driving", body: "Reduces glare and enhances contrast for clearer, safer vision on the road." },
      { title: "Color-Tinted", body: "Improves contrast and reduces glare for better comfort in various light conditions." },
    ],
    reviewsSummary: [
      { label: "Quality", value: 4.4 },
      { label: "Fit", value: 4.5 },
      { label: "Design", value: 4.8 },
    ],
    reviews: [
      { id: "r1", user: "k***k", date: "Feb 06, 2026", body: "they really cute and and fit perfectly", rating: 5, color: "Rose-Gold", rx: "Single-Vision" },
      { id: "r2", user: "b***m", date: "Jan 31, 2026", title: "Beautiful Frames", body: "Purchased these for my partner who is very particular about frames due to the thickness of his prescription. I was nervous about the thinner wire framing, but he loved them.", rating: 5, color: "Rose-Gold", rx: "Progressive" },
      { id: "r3", user: "j***5", date: "Jan 26, 2026", body: "These are so cute and fit so comfy! Very affordable for my strong prescription—always recommend Zeelool.", rating: 5, color: "Rose-Gold", rx: "Single-Vision" },
    ],
  },
  {
    sku: "ZAA100001-02",
    name: "Citrine",
    subtitle: "Cat-eye Black acetate Glasses",
    rating: 4.6,
    reviewCount: 58,
    promoText: "Best Seller",
    frameColor: "Black",
    sizeLabel: "Medium",
    sizeMm: "52-44-145 mm",
    priceText: "$16.95 (frame)",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=75",
      "https://images.unsplash.com/photo-1519710887725-047bf4b9c5a6?auto=format&fit=crop&w=1200&q=75",
    ],
    pills: ["Prescription", "Blue Light Blocking", "Photochromic Lenses"],
    guarantees: ["Free Shipping Over $79", "30-Day Exchanges & Returns"],
    specs: [{ label: "SKU", value: "ZAA100001-02" }, { label: "Shape", value: "Cat-eye" }, { label: "Material", value: "acetate" }],
    description: "A bold cat-eye silhouette with a lightweight acetate feel. Great everyday statement frame.",
    featureCards: [{ title: "Everyday Comfort", body: "Lightweight fit for long wear." }],
    reviewsSummary: [{ label: "Quality", value: 4.5 }, { label: "Fit", value: 4.4 }, { label: "Design", value: 4.7 }],
    reviews: [{ id: "c1", user: "m***a", date: "Jan 10, 2026", body: "Love the shape!", rating: 5, color: "Black", rx: "Single-Vision" }],
  },
  {
    sku: "ZBB200002-03",
    name: "Nimbus",
    subtitle: "Square Clear frame Glasses",
    rating: 4.5,
    reviewCount: 34,
    promoText: "New",
    frameColor: "Clear",
    sizeLabel: "Large",
    sizeMm: "54-46-148 mm",
    priceText: "$14.95 (frame)",
    images: [
      "https://images.unsplash.com/photo-1520975693411-b86c45fcd5d4?auto=format&fit=crop&w=1200&q=75",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=75",
    ],
    pills: ["Prescription", "Progressive"],
    guarantees: ["365-Day Warranty"],
    specs: [{ label: "SKU", value: "ZBB200002-03" }, { label: "Shape", value: "Square" }, { label: "Material", value: "TR90" }],
    description: "Minimal clear frame with a modern square profile. Easy to style.",
    featureCards: [{ title: "Modern Profile", body: "Crisp lines and clean look." }],
    reviewsSummary: [{ label: "Quality", value: 4.3 }, { label: "Fit", value: 4.4 }, { label: "Design", value: 4.6 }],
    reviews: [{ id: "n1", user: "p***z", date: "Dec 21, 2025", body: "Super clean and light.", rating: 5, color: "Clear", rx: "Progressive" }],
  },
];

export function getProductBySku(sku: string) {
  return products.find((p) => p.sku === sku) ?? products[0];
}
