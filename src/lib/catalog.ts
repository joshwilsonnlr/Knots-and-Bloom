export type Category = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  category: string;
  image: string;
  gallery: string[];
  description: string;
  story: string;
  stock: number;
  bestseller: boolean;
  createdAt: string;
  colors: string[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  body: string[];
};

export const categories: Category[] = [
  {
    slug: "flowers",
    name: "Crochet Flowers",
    blurb: "Bouquets that never wilt — roses, daisies, and quiet stems.",
    image: "/products/bouquet.jpg",
  },
  {
    slug: "charms",
    name: "Charms & Keychains",
    blurb: "Pocket-sized blooms to clip onto bags, keys, and gifts.",
    image: "/products/sunflower.jpg",
  },
  {
    slug: "accessories",
    name: "Accessories",
    blurb: "Small useful things, finished by hand.",
    image: "/products/bag.jpg",
  },
  {
    slug: "gifts",
    name: "Handmade Gifts",
    blurb: "Ready to wrap, or made to a note you send us.",
    image: "/products/flowers.jpg",
  },
];

export const seedProducts: Product[] = [
  {
    id: "p1",
    slug: "blush-rose-bouquet",
    name: "Blush Rose Bouquet",
    price: 68,
    category: "flowers",
    image: "/products/bouquet.jpg",
    gallery: ["/products/bouquet.jpg", "/products/rose.jpg"],
    description: "A gathered bouquet of crocheted roses in blush and cream, stems wrapped and tied with a sage ribbon.",
    story: "Each petal is worked in rounds and shaped while the yarn is still warm from the hook. It keeps its form on a shelf, a desk, or a gift table.",
    stock: 6,
    bestseller: true,
    createdAt: "2026-10-02",
    colors: ["Blush", "Cream"],
  },
  {
    id: "p2",
    slug: "cream-daisy-bunch",
    name: "Cream Daisy Bunch",
    price: 42,
    salePrice: 36,
    category: "flowers",
    image: "/products/daisy.jpg",
    gallery: ["/products/daisy.jpg", "/products/flowers.jpg"],
    description: "Five open daisies with sage stems, tied in a thin brown ribbon.",
    story: "A lighter piece for windowsills and bedside tables. The centres are a slightly deeper yarn so the face reads clearly from across a room.",
    stock: 8,
    bestseller: true,
    createdAt: "2026-11-01",
    colors: ["Cream", "Butter"],
  },
  {
    id: "p3",
    slug: "peony-cluster",
    name: "Peony Cluster",
    price: 54,
    category: "flowers",
    image: "/products/peony.jpg",
    gallery: ["/products/peony.jpg", "/products/blush.jpg"],
    description: "A low, full cluster of layered peonies meant to sit in a shallow bowl.",
    story: "Worked denser than the roses so the bloom feels weighty in the hand. Best as a centrepiece rather than a wrapped gift.",
    stock: 4,
    bestseller: false,
    createdAt: "2026-11-12",
    colors: ["Blush", "Rose"],
  },
  {
    id: "p4",
    slug: "sunflower-charm",
    name: "Sunflower Charm",
    price: 16,
    category: "charms",
    image: "/products/sunflower.jpg",
    gallery: ["/products/sunflower.jpg"],
    description: "A small sunflower on a brass-tone ring — bag charm or keychain.",
    story: "The petals are short rounds, stuffed lightly so the face stays round after months in a pocket.",
    stock: 14,
    bestseller: true,
    createdAt: "2026-09-18",
    colors: ["Gold", "Sage"],
  },
  {
    id: "p5",
    slug: "cherry-pair-charm",
    name: "Cherry Pair Charm",
    price: 18,
    category: "charms",
    image: "/products/blush.jpg",
    gallery: ["/products/blush.jpg", "/products/rose.jpg"],
    description: "Two cherries and a leaf, clipped together. A tiny gift that still feels considered.",
    story: "Stitched as a pair so they sit slightly uneven — closer to fruit than to a logo.",
    stock: 11,
    bestseller: false,
    createdAt: "2026-11-18",
    colors: ["Cherry", "Sage"],
  },
  {
    id: "p6",
    slug: "rose-coaster-set",
    name: "Rose Coaster Set",
    price: 32,
    category: "accessories",
    image: "/products/rose.jpg",
    gallery: ["/products/rose.jpg"],
    description: "A set of four open-rose coasters in blush and cream cotton yarn.",
    story: "Flat enough for a glass, textured enough that you notice them. Cotton holds up to a damp base better than acrylic.",
    stock: 7,
    bestseller: true,
    createdAt: "2026-08-20",
    colors: ["Blush", "Cream"],
  },
  {
    id: "p7",
    slug: "sage-pouch",
    name: "Sage Lipstick Pouch",
    price: 24,
    category: "accessories",
    image: "/products/bag.jpg",
    gallery: ["/products/bag.jpg", "/products/yarn.jpg"],
    description: "A slim drawstring sleeve with a single blush flower stitched on the front.",
    story: "Sized for a lipstick, a roller, or a folded note. The flower is sewn on after the pouch is closed so the stitches stay neat.",
    stock: 9,
    bestseller: false,
    createdAt: "2026-10-28",
    colors: ["Sage", "Blush"],
  },
  {
    id: "p8",
    slug: "keepsake-posy",
    name: "Keepsake Posy",
    price: 38,
    category: "gifts",
    image: "/products/flowers.jpg",
    gallery: ["/products/flowers.jpg", "/products/workshop.jpg"],
    description: "A mixed mini bouquet wrapped for giving — roses, a daisy, and filler leaves.",
    story: "Our most-requested gift. Leave a short note at checkout and we tuck it under the ribbon.",
    stock: 5,
    bestseller: true,
    createdAt: "2026-11-20",
    colors: ["Mixed"],
  },
];

export const seedPosts: Post[] = [
  {
    slug: "why-crochet-flowers-last",
    title: "Why a crochet flower outlasts the week",
    excerpt: "Yarn does not ask for water. It asks for a little dusting and a place it can be seen.",
    date: "November 4, 2026",
    image: "/products/bouquet.jpg",
    body: [
      "A fresh bouquet is a beautiful, short conversation. A crocheted one is slower. It sits through seasons, moves house with you, and still looks like the afternoon it was finished.",
      "We work in cotton and soft acrylic blends chosen for how they hold a petal curve. Colour is matched in natural light, not under a shop bulb, so blush stays blush when it reaches a windowsill.",
      "If a piece ever loosens — a journey in a suitcase will do that — a gentle steam from a kettle, never a hot iron on the yarn, brings the shape back.",
    ],
  },
  {
    slug: "how-a-custom-order-is-made",
    title: "How a custom order is actually made",
    excerpt: "Colour first, then size, then the small note that makes it theirs.",
    date: "October 16, 2026",
    image: "/products/workshop.jpg",
    body: [
      "Custom work starts with a message, not a catalogue. Tell us the occasion, the colours already in the room, and whether it should read delicate or full.",
      "We reply with a yarn photo in daylight and a time. Most bouquets take one to two weeks. Charms are faster. Wedding sets need a longer queue — say so early.",
      "You approve the palette before a single petal is started. Changes after that are possible, just slower, because a flower already closed cannot be re-dyed.",
    ],
  },
  {
    slug: "caring-for-handmade-yarn",
    title: "Caring for pieces that were made by hand",
    excerpt: "No machine wash. A soft brush, shade, and the occasional reshape.",
    date: "September 2, 2026",
    image: "/products/yarn.jpg",
    body: [
      "Keep crochet flowers out of prolonged direct sun if the colour is pale. Blush fades more honestly than it stains, but slowly.",
      "Dust with a clean makeup brush. Spot-clean with a barely damp cloth. Do not soak a stuffed piece — the filling takes days to dry and can smell if it stays closed.",
      "Charms on bags are the hardiest. If a ring loosens, write to us. We would rather restitch a finding than have you lose it.",
    ],
  },
  {
    slug: "gifting-crochet-without-wilt",
    title: "What to write when you gift a crochet flower",
    excerpt: "A short card line matters more than a long explanation of the yarn.",
    date: "November 21, 2026",
    image: "/products/flowers.jpg",
    body: [
      "People sometimes hesitate because the bouquet is not fresh. Say what it is in one line: it is crocheted, it stays, and it was made for them.",
      "A useful card is specific. Name the colour, the occasion, or the windowsill you pictured. Skip the fibre lecture unless they ask.",
      "If the piece is a charm, mention where you imagined it living — a bag, a key, a pram. The object feels finished when it has a place.",
    ],
  },
  {
    slug: "choosing-a-palette",
    title: "How we choose a palette before the first petal",
    excerpt: "Blush next to bark reads warm. Blush next to bright white reads cooler. The room decides.",
    date: "October 2, 2026",
    image: "/products/peony.jpg",
    body: [
      "Send a photo of the shelf, the dress, or the wrapping paper. We match yarn in daylight, not under a phone flash.",
      "Two colours plus a leaf green is usually enough. A third bright hue fights the flower unless the piece is a charm meant to be loud.",
      "If you are unsure, cream and blush is the house pairing. It sits with wood, linen, and most gift wrap without shouting.",
    ],
  },
  {
    slug: "small-batch-shipping",
    title: "How a small-batch crochet order actually ships",
    excerpt: "Ready pieces leave in a few days. Custom work waits for a yes on colour.",
    date: "August 14, 2026",
    image: "/products/workshop.jpg",
    body: [
      "A listed piece is already made. After checkout we pack it, not start it. That is why stock numbers drop when an order is placed.",
      "Custom work is the opposite. Nothing is hooked until you approve the palette and the date. A rush date that we cannot meet is refused before payment, not after.",
      "This preview shop keeps the order on your device and does not charge a card. A live shop would hand the same reference to a courier.",
    ],
  },
];

export const faqs = [
  {
    q: "Are these real flowers?",
    a: "No. Every bloom is crocheted from yarn. They do not need water and they do not wilt.",
  },
  {
    q: "How long does shipping take?",
    a: "Ready pieces leave within three working days. Custom work is quoted with a finish date before you pay. This demo checkout confirms the order on your device; a live shop would connect a courier after payment.",
  },
  {
    q: "Can I choose colours?",
    a: "Yes. Use Custom Orders and name the palette. If a listed piece has colour options, pick one on the product page.",
  },
  {
    q: "What if I need it for a date?",
    a: "Tell us the date in the order note. If we cannot make it in time we will say so before you check out.",
  },
  {
    q: "Do you take returns?",
    a: "Ready-made pieces can be returned unused within 14 days. Custom colours and made-to-order pieces are final unless they arrive damaged.",
  },
];
