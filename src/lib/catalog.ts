export type Category = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
};

export type Product = { id: string; slug: string; name: string; price: number; salePrice?: number; category: string; image: string; gallery: string[]; description: string; story: string; stock: number; bestseller: boolean; createdAt: string; colors: string[] };
export type Post = { slug: string; title: string; excerpt: string; date: string; image: string; body: string[] };

export const categories: Category[] = [
  { slug: "flowers", name: "Crochet Flowers", blurb: "Bouquets that never wilt — roses, daisies, and quiet stems.", image: "/New folder/images (1).jpg" },
  { slug: "charms", name: "Charms & Keychains", blurb: "Pocket-sized blooms to clip onto bags, keys, and gifts.", image: "/New folder/images (2).jpg" },
  { slug: "accessories", name: "Accessories", blurb: "Small useful things, finished by hand.", image: "/New folder/images (4).jpg" },
  { slug: "gifts", name: "Handmade Gifts", blurb: "Ready to wrap, or made to a note you send us.", image: "/New folder/images (5).jpg" },
];

export const seedProducts: Product[] = [
  { id:"p1", slug:"blush-rose-bouquet", name:"Blush Rose Bouquet", price:68, category:"flowers", image:"/New folder/images (1).jpg", gallery:["/New folder/images (1).jpg","/New folder/images (2).jpg"], description:"A gathered bouquet of crocheted roses in blush and cream, stems wrapped and tied with a sage ribbon.", story:"Each petal is worked in rounds and shaped while the yarn is still warm from the hook.", stock:6, bestseller:true, createdAt:"2026-10-02", colors:["Blush","Cream"] },
  { id:"p2", slug:"cream-daisy-bunch", name:"Cream Daisy Bunch", price:42, salePrice:36, category:"flowers", image:"/New folder/images (2).jpg", gallery:["/New folder/images (2).jpg","/New folder/images (3).jpg"], description:"Five open daisies with sage stems, tied in a thin brown ribbon.", story:"A lighter piece for windowsills and bedside tables.", stock:8, bestseller:true, createdAt:"2026-11-01", colors:["Cream","Butter"] },
  { id:"p3", slug:"peony-cluster", name:"Peony Cluster", price:54, category:"flowers", image:"/New folder/images (3).jpg", gallery:["/New folder/images (3).jpg","/New folder/images (4).jpg"], description:"A low, full cluster of layered peonies meant to sit in a shallow bowl.", story:"Worked denser than the roses so the bloom feels weighty in the hand.", stock:4, bestseller:false, createdAt:"2026-11-12", colors:["Blush","Rose"] },
  { id:"p4", slug:"sunflower-charm", name:"Sunflower Charm", price:16, category:"charms", image:"/New folder/images (4).jpg", gallery:["/New folder/images (4).jpg"], description:"A small sunflower on a brass-tone ring — bag charm or keychain.", story:"The petals are short rounds, stuffed lightly so the face stays round.", stock:14, bestseller:true, createdAt:"2026-09-18", colors:["Gold","Sage"] },
  { id:"p5", slug:"cherry-pair-charm", name:"Cherry Pair Charm", price:18, category:"charms", image:"/New folder/images (5).jpg", gallery:["/New folder/images (5).jpg","/New folder/images (6).jpg"], description:"Two cherries and a leaf, clipped together.", story:"Stitched as a pair so they sit slightly uneven.", stock:11, bestseller:false, createdAt:"2026-11-18", colors:["Cherry","Sage"] },
  { id:"p6", slug:"rose-coaster-set", name:"Rose Coaster Set", price:32, category:"accessories", image:"/New folder/images (6).jpg", gallery:["/New folder/images (6).jpg"], description:"A set of four open-rose coasters in blush and cream cotton yarn.", story:"Flat enough for a glass, textured enough that you notice them.", stock:7, bestseller:true, createdAt:"2026-08-20", colors:["Blush","Cream"] },
  { id:"p7", slug:"sage-pouch", name:"Sage Lipstick Pouch", price:24, category:"accessories", image:"/New folder/images (7).jpg", gallery:["/New folder/images (7).jpg","/New folder/images.jpg"], description:"A slim drawstring sleeve with a single blush flower stitched on the front.", story:"Sized for a lipstick, a roller, or a folded note.", stock:9, bestseller:false, createdAt:"2026-10-28", colors:["Sage","Blush"] },
  { id:"p8", slug:"keepsake-posy", name:"Keepsake Posy", price:38, category:"gifts", image:"/New folder/images.jpg", gallery:["/New folder/images.jpg","/New folder/images (1).jpg"], description:"A mixed mini bouquet wrapped for giving.", story:"Our most-requested gift.", stock:5, bestseller:true, createdAt:"2026-11-20", colors:["Mixed"] },
];

export const seedPosts: Post[] = [
  { slug:"why-crochet-flowers-last", title:"Why a crochet flower outlasts the week", excerpt:"Yarn does not ask for water. It asks for a little dusting and a place it can be seen.", date:"November 4, 2026", image:"/New folder/images (1).jpg", body:["A fresh bouquet is a beautiful, short conversation. A crocheted one is slower."] },
  { slug:"how-a-custom-order-is-made", title:"How a custom order is actually made", excerpt:"Colour first, then size, then the small note that makes it theirs.", date:"October 16, 2026", image:"/New folder/images (2).jpg", body:["Custom work starts with a message, not a catalogue."] },
  { slug:"caring-for-handmade-yarn", title:"Caring for pieces that were made by hand", excerpt:"No machine wash. A soft brush, shade, and the occasional reshape.", date:"September 2, 2026", image:"/New folder/images (3).jpg", body:["Keep crochet flowers out of prolonged direct sun."] },
  { slug:"gifting-crochet-without-wilt", title:"What to write when you gift a crochet flower", excerpt:"A short card line matters more than a long explanation.", date:"November 21, 2026", image:"/New folder/images (4).jpg", body:["People sometimes hesitate because the bouquet is not fresh."] },
  { slug:"choosing-a-palette", title:"How we choose a palette", excerpt:"Blush next to bark reads warm.", date:"October 2, 2026", image:"/New folder/images (5).jpg", body:["Send a photo of the shelf, the dress, or the wrapping paper."] },
  { slug:"small-batch-shipping", title:"How a small-batch crochet order ships", excerpt:"Ready pieces leave in a few days.", date:"August 14, 2026", image:"/New folder/images (6).jpg", body:["A listed piece is already made."] },
];

export const faqs = [{ q:"Are these real flowers?", a:"No. Every bloom is crocheted from yarn." },{q:"How long does shipping take?",a:"Ready pieces leave within three working days."},{q:"Can I choose colours?",a:"Yes. Use Custom Orders and name the palette."},{q:"What if I need it for a date?",a:"Tell us the date in the order note."},{q:"Do you take returns?",a:"Ready-made pieces can be returned unused within 14 days."}];
