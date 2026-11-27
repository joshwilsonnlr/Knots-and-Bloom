import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Flower2, Gift, HeartHandshake, Instagram, Sparkles, SwatchBook } from "lucide-react";
import { categories } from "@/lib/catalog";
import { ProductGrid } from "@/components/product-card";
import { Shell } from "@/components/shell";
import { useShop } from "@/lib/shop-store";
import { editorialPosts } from "@/lib/editorial-posts";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const products = useShop((s) => s.products);
  const best = products.filter((p) => p.bestseller);
  const newest = [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 3);
  const journal = [...editorialPosts].slice(0, 3);

  return (
    <Shell>
      <section className="hero container-shop grid items-center gap-8 py-10 md:grid-cols-[0.92fr_1.08fr] md:gap-14 md:py-16">
        <div className="hero-copy rise relative z-10">
          <p className="eyebrow flex items-center gap-2"><Flower2 className="size-4" /> A little slower. A little more lovely.</p>
          <h1 className="mt-5 max-w-xl font-display text-6xl leading-[0.91] text-bark sm:text-7xl lg:text-[5.5rem]">Handmade with love. <em className="text-sage-deep">Designed to bloom.</em></h1>
          <p className="mt-6 max-w-md text-base leading-7 text-muted">Discover crochet flowers, keepsakes, and small everyday joys — thoughtfully made one stitch at a time.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop" className="button-primary">Shop the collection <ArrowRight className="size-4" /></Link>
            <Link to="/custom" className="button-secondary">Make it yours</Link>
          </div>
          <div className="mt-9 flex items-center gap-3 text-sm text-muted"><span className="flex -space-x-2"><img src="/products/daisy.jpg" alt="" className="size-9 rounded-full border-2 border-cream object-cover" /><img src="/products/rose.jpg" alt="" className="size-9 rounded-full border-2 border-cream object-cover" /><img src="/products/sunflower.jpg" alt="" className="size-9 rounded-full border-2 border-cream object-cover" /></span><span>Little things, made to be kept.</span></div>
        </div>
        <div className="hero-scene stage relative mx-auto w-full max-w-[610px]">
          <div className="hero-orbit orbit-one" aria-hidden="true" /><div className="hero-orbit orbit-two" aria-hidden="true" />
          <div className="hero-image-wrap card-3d"><img src="/products/bouquet.jpg" alt="Handmade crochet flower bouquet in soft, warm colors" className="hero-image" /></div>
          <div className="hero-float floaty"><img src="/products/daisy.jpg" alt="Cream crochet daisies" /><span>Made with care</span></div>
          <div className="hero-stamp spin-slow" aria-hidden="true"><Flower2 className="size-5" /><span>made by hand · made to keep · </span></div>
          <span className="hero-sparkle sparkle-a" aria-hidden="true">✳</span><span className="hero-sparkle sparkle-b" aria-hidden="true">✳</span>
        </div>
        <a href="#collections" className="hero-scroll hidden items-center gap-2 text-xs uppercase tracking-[.18em] text-muted md:flex"><ArrowDown className="size-4" /> Take a little look</a>
      </section>

      <section id="collections" className="container-shop section-space">
        <div className="section-heading"><div><p className="eyebrow">A small world of handmade</p><h2 className="section-title">Find your kind of bloom</h2></div><Link to="/shop" className="text-link">Explore everything <ArrowRight className="size-4" /></Link></div>
        <div className="collection-grid mt-7">
          {categories.map((c, i) => <Link key={c.slug} to="/collections/$slug" params={{ slug: c.slug }} className={`collection-card card-3d collection-${i}`}><img src={c.image} alt={`${c.name} handmade crochet collection`} loading="lazy" /><span className="collection-shade" /><div className="collection-caption"><span>{c.name}</span><span className="collection-arrow"><ArrowRight className="size-4" /></span><small>{c.blurb}</small></div></Link>)}
        </div>
      </section>

      <section className="featured-section section-space">
        <div className="container-shop"><div className="section-heading"><div><p className="eyebrow">Picked with love</p><h2 className="section-title">A few favourites</h2></div><Link to="/shop" className="text-link">Shop all pieces <ArrowRight className="size-4" /></Link></div><div className="mt-7"><ProductGrid items={best} /></div></div>
      </section>

      <section className="story-section section-space"><div className="container-shop story-grid"><div className="story-photo stage"><img className="story-main card-3d" src="/products/workshop.jpg" alt="Yarn and crochet tools on a calm handmade work table" loading="lazy" /><img className="story-detail floaty" src="/products/yarn.jpg" alt="Soft yarn chosen for crochet details" loading="lazy" /></div><div className="story-copy"><p className="eyebrow">From the maker's table</p><h2 className="section-title">Made slowly, <em>on purpose.</em></h2><p>Every loop is a little decision: the curve of a petal, a colour that feels just right, a finish made to last. Knots & Bloom celebrates the charm of handmade objects and the joy of giving something with a story.</p><p>Find a ready-to-love piece or tell us what you have in mind. Custom ideas begin with a conversation, and every detail is agreed before making starts.</p><Link to="/about" className="button-secondary mt-3">Meet Knots & Bloom <ArrowRight className="size-4" /></Link></div></div></section>

      <section className="container-shop section-space"><div className="section-heading"><div><p className="eyebrow">Fresh from the studio</p><h2 className="section-title">New little joys</h2></div><Link to="/shop" className="text-link">See what's new <ArrowRight className="size-4" /></Link></div><div className="mt-7"><ProductGrid items={newest} /></div></section>

      <section className="container-shop section-space"><div className="values-panel"><div className="values-intro"><p className="eyebrow">The details matter</p><h2 className="section-title">A little more heart in every stitch.</h2><p>Thoughtful keepsakes for gifting, decorating, and making an ordinary day feel special.</p></div><div className="values-grid">{[[HeartHandshake,"Handmade with care","Finished by hand, with attention in every detail."],[Sparkles,"One-of-a-kind feeling","Small-batch pieces with their own handmade character."],[Flower2,"Made to be kept","Crochet flowers bring a lasting touch of color."],[Gift,"A thoughtful gift","Add a personal note or ask about custom colors."],[SwatchBook,"Considered materials","Soft yarns and textures chosen for each design."]].map(([Icon,title,copy])=>{const Symbol=Icon as typeof Flower2;return <article className="value-card" key={title as string}><Symbol className="icon-pop size-6"/><h3>{title as string}</h3><p>{copy as string}</p></article>})}</div></div></section>

      <section className="container-shop section-space"><div className="custom-banner"><img src="/products/tulips.jpg" alt="Colorful handmade crochet flowers for a custom gift" loading="lazy"/><div className="custom-banner-copy"><p className="eyebrow">A gift with your name on it</p><h2 className="section-title">Dream it in your colors.</h2><p>Share the occasion, the palette, and your idea. We’ll talk through the details before a hook is picked up.</p><div className="flex flex-wrap gap-3"><Link to="/custom" className="button-primary">Start a custom order <ArrowRight className="size-4"/></Link><a className="button-light" href="https://www.instagram.com/knotbloom58/" target="_blank" rel="noreferrer"><Instagram className="size-4"/> Message on Instagram</a></div></div></div></section>

      <section className="journal-section section-space"><div className="container-shop"><div className="section-heading"><div><p className="eyebrow">Notes from the bench</p><h2 className="section-title">The handmade journal</h2></div><Link to="/blog" className="text-link">Read all stories <ArrowRight className="size-4" /></Link></div><div className="journal-grid mt-7">{journal.map((post,i)=><Link to="/blog/$slug" params={{slug:post.slug}} key={post.slug} className={`journal-card journal-card-${i}`}><img src={post.image} alt={post.title} loading="lazy"/><div className="journal-meta"><span>{post.date}</span><span>Handmade notes</span></div><h3>{post.title}</h3><p>{post.excerpt}</p><span className="text-link">Read the story <ArrowRight className="size-4"/></span></Link>)}</div></div></section>

      <section className="container-shop instagram-note"><div><Instagram className="size-6"/><p className="eyebrow">A little more color</p><h2>Follow along on Instagram</h2><p>See the latest from the Knots & Bloom studio and get in touch about a custom idea.</p></div><a href="https://www.instagram.com/knotbloom58/" target="_blank" rel="noreferrer" className="button-secondary">@knotbloom58 <ArrowRight className="size-4"/></a></section>
    </Shell>
  );
}
