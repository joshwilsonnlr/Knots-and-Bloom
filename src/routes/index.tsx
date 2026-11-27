import { createFileRoute, Link } from "@tanstack/react-router";
import { Flower2, Gift, HeartHandshake, Sparkles, SwatchBook } from "lucide-react";
import { categories } from "@/lib/catalog";
import { ProductGrid } from "@/components/product-card";
import { Shell } from "@/components/shell";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const products = useShop((s) => s.products);
  const best = products.filter((p) => p.bestseller);
  const newest = [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 3);
  return (
    <Shell>
      <section className="container-shop grid items-center gap-10 py-12 md:grid-cols-2 md:py-16">
        <div className="rise">
          <p className="text-xs tracking-[0.22em] uppercase text-sage-deep">Handmade crochet</p>
          <h1 className="mt-3 font-display text-5xl leading-[1.05] text-bark md:text-7xl">Handmade with love. Designed to bloom.</h1>
          <p className="mt-5 max-w-md text-muted">Discover crochet creations worked one knot at a time — warmth you can keep on a shelf, a bag, or a gift table.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop" className="inline-grid h-12 place-items-center rounded-full bg-bark px-6 text-cream">Shop now</Link>
            <Link to="/collections/$slug" params={{ slug: "flowers" }} className="inline-grid h-12 place-items-center rounded-full border border-bark/20 px-6 text-bark">Explore collections</Link>
          </div>
        </div>
        <div className="stage relative">
          <img src="/products/bouquet.jpg" alt="Blush bouquet styled for Knots and Bloom" className="card-3d aspect-[4/5] w-full rounded-card object-cover shadow-xl" />
          <img src="/brand/logo.jpg" alt="" className="absolute -left-2 top-6 hidden size-24 rounded-full border-4 border-cream object-cover shadow-lg md:block" />
          <img src="/products/daisy.jpg" alt="" className="floaty card-3d absolute right-4 bottom-8 hidden w-32 rounded-2xl border-4 border-cream object-cover shadow-lg md:block" />
        </div>
      </section>

      <section className="container-shop pb-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl text-bark">Collections</h2>
          <Link to="/shop" className="text-sm text-bark underline underline-offset-4">All pieces</Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} to="/collections/$slug" params={{ slug: c.slug }} className="group overflow-hidden rounded-card bg-beige">
              <img src={c.image} alt="" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
              <div className="p-4">
                <h3 className="font-display text-2xl text-bark">{c.name}</h3>
                <p className="mt-1 text-sm text-muted">{c.blurb}</p>
                <span className="mt-3 inline-block text-sm text-bark">Shop now</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-shop py-14">
        <h2 className="font-display text-4xl text-bark">Best sellers</h2>
        <p className="mt-2 text-muted">Pulled from the live catalogue — edit them in the studio.</p>
        <div className="mt-8">
          <ProductGrid items={best} />
        </div>
      </section>

      <section className="bg-beige/60">
        <div className="container-shop grid items-center gap-8 py-14 md:grid-cols-2">
          <img src="/products/workshop.jpg" alt="Yarn and a quiet work table" className="aspect-[4/3] w-full rounded-card object-cover" />
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-sage-deep">The bench</p>
            <h2 className="mt-2 font-display text-4xl text-bark">Made slowly, on purpose</h2>
            <p className="mt-4 text-muted">Knots & Bloom started as messages and photographs: a flower someone wanted to keep, a charm for a bag, a colour matched to a room. The shop is the same work, with a cart instead of a direct message.</p>
            <Link to="/about" className="mt-6 inline-grid h-11 place-items-center rounded-full border border-bark/20 px-5 text-sm text-bark">Read the story</Link>
          </div>
        </div>
      </section>

      <section className="container-shop py-14">
        <h2 className="font-display text-4xl text-bark">Why Knots & Bloom</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            [HeartHandshake, "Handmade with care", "Finished by one pair of hands, not a production line."],
            [Sparkles, "Unique designs", "Shapes that read as flowers, not as plastic copies."],
            [Flower2, "Thoughtfully crafted", "Yarn chosen for how a petal holds its curve."],
            [Gift, "Personal gifts", "A note under the ribbon, or a colour made for someone."],
            [SwatchBook, "Quality materials", "Cotton and soft blends that keep their face."],
          ].map(([Icon, title, copy]) => (
            <div key={title as string} className="group rounded-card border border-line bg-paper p-4 card-3d">
              <Icon className="icon-pop size-5 text-sage-deep" />
              <h3 className="mt-3 font-display text-2xl text-bark">{title as string}</h3>
              <p className="mt-1 text-sm text-muted">{copy as string}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shop pb-4">
        <h2 className="font-display text-4xl text-bark">New arrivals</h2>
        <div className="mt-8">
          <ProductGrid items={newest} />
        </div>
      </section>

      <section className="container-shop py-14">
        <div className="overflow-hidden rounded-card bg-bark text-cream md:grid md:grid-cols-2">
          <img src="/products/yarn.jpg" alt="" className="h-64 w-full object-cover md:h-full" />
          <div className="p-8 md:p-12">
            <h2 className="font-display text-4xl">Something that does not exist yet</h2>
            <p className="mt-3 text-cream/80">Tell us the colours, the occasion, and the size. Custom orders are quoted before any yarn is started.</p>
            <Link to="/custom" className="mt-6 inline-grid h-11 place-items-center rounded-full bg-cream px-5 text-sm text-bark">Start a custom order</Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
