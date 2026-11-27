import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { money, unitPrice, useShop } from "@/lib/shop-store";

export function ProductCard({ product }: { product: Product }) {
  const toggle = useShop((s) => s.toggleWish);
  const wished = useShop((s) => s.wishlist.includes(product.id));
  const add = useShop((s) => s.addToCart);
  const [quick, setQuick] = useState(false);
  const price = unitPrice(product);

  return (
    <>
      <article className="group">
        <div className="relative overflow-hidden rounded-card bg-beige">
          <Link to="/product/$slug" params={{ slug: product.slug }}>
            <img src={product.image} alt={product.name} className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
          </Link>
          <button
            aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
            onClick={() => toggle(product.id)}
            className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-paper/90 text-bark"
          >
            <Heart className={`size-4 ${wished ? "fill-bark" : ""}`} />
          </button>
          {product.salePrice && <span className="absolute left-3 top-3 rounded-full bg-blush px-2 py-1 text-xs text-bark">Sale</span>}
          {product.stock < 1 && <span className="absolute left-3 bottom-3 rounded-full bg-bark px-2 py-1 text-xs text-cream">Sold out</span>}
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <Link to="/product/$slug" params={{ slug: product.slug }} className="font-medium text-bark">
              {product.name}
            </Link>
            <p className="text-sm text-muted mt-0.5">
              {product.salePrice ? (
                <>
                  <span className="text-bark">{money(product.salePrice)}</span>{" "}
                  <span className="line-through">{money(product.price)}</span>
                </>
              ) : (
                money(price)
              )}
              <span className="mx-1">·</span>
              {product.stock > 0 ? `${product.stock} ready` : "Waitlist via custom"}
            </p>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            disabled={product.stock < 1}
            onClick={() => add(product.id, product.colors[0])}
            className="h-11 flex-1 rounded-full bg-bark text-sm text-cream disabled:opacity-40"
          >
            Add to cart
          </button>
          <button onClick={() => setQuick(true)} className="h-11 rounded-full border border-line px-4 text-sm text-bark">
            Quick view
          </button>
        </div>
      </article>
      {quick && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-bark/40 p-4" onClick={() => setQuick(false)}>
          <div className="grid w-full max-w-2xl gap-4 rounded-card bg-paper p-4 md:grid-cols-2" onClick={(e) => e.stopPropagation()}>
            <img src={product.image} alt="" className="aspect-square w-full rounded-xl object-cover" />
            <div className="flex flex-col">
              <h3 className="font-display text-3xl text-bark">{product.name}</h3>
              <p className="mt-2 text-bark">{money(price)}</p>
              <p className="mt-3 text-sm text-muted">{product.description}</p>
              <div className="mt-auto flex gap-2 pt-6">
                <button
                  disabled={product.stock < 1}
                  className="h-11 flex-1 rounded-full bg-bark text-sm text-cream disabled:opacity-40"
                  onClick={() => {
                    add(product.id, product.colors[0]);
                    setQuick(false);
                  }}
                >
                  Add to cart
                </button>
                <Link to="/product/$slug" params={{ slug: product.slug }} className="grid h-11 place-items-center rounded-full border border-line px-4 text-sm">
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  if (!items.length) return <p className="text-muted">Nothing in this view yet. The studio can add pieces.</p>;
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
