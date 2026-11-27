import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/shell";
import { money, unitPrice, useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/product/$slug")({
  component: ProductPage,
  head: ({ params }) => ({ meta: [{ title: `${params.slug.replace(/-/g, " ")} — Knots & Bloom` }] }),
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = useShop((s) => s.products.find((p) => p.slug === slug));
  const add = useShop((s) => s.addToCart);
  const toggle = useShop((s) => s.toggleWish);
  const wished = useShop((s) => (product ? s.wishlist.includes(product.id) : false));
  const [color, setColor] = useState(product?.colors[0] ?? "");
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <Shell>
        <div className="container-shop py-20">
          <h1 className="font-display text-4xl text-bark">This piece is not in the shop</h1>
          <Link to="/shop" className="mt-4 inline-block underline">Browse the shop</Link>
        </div>
      </Shell>
    );
  }

  const active = color || product.colors[0];
  return (
    <Shell>
      <article className="container-shop grid gap-10 py-12 md:grid-cols-2">
        <div className="grid gap-3">
          <img src={product.image} alt={product.name} className="aspect-square w-full rounded-card object-cover" />
          <div className="grid grid-cols-3 gap-3">
            {product.gallery.map((src) => (
              <img key={src} src={src} alt="" className="aspect-square rounded-xl object-cover" />
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] uppercase text-sage-deep">{product.category}</p>
          <h1 className="mt-2 font-display text-5xl text-bark">{product.name}</h1>
          <p className="mt-3 text-lg text-bark">
            {product.salePrice ? (
              <>
                {money(product.salePrice)} <span className="text-muted line-through text-base">{money(product.price)}</span>
              </>
            ) : (
              money(unitPrice(product))
            )}
          </p>
          <p className="mt-4 text-muted">{product.description}</p>
          <p className="mt-3 text-sm">{product.stock > 0 ? `${product.stock} in the studio` : "Sold out — ask for a remake"}</p>
          <p className="mt-6 text-sm text-bark">Colour</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button key={c} onClick={() => setColor(c)} className={`h-10 rounded-full px-4 text-sm ${active === c ? "bg-bark text-cream" : "border border-line"}`}>
                {c}
              </button>
            ))}
          </div>
          <label className="mt-5 block text-sm text-bark">
            Gift note
            <input value={note} onChange={(e) => setNote(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3" placeholder="Optional — we read it at checkout too" />
          </label>
          <div className="mt-5 flex gap-3">
            <input type="number" min={1} max={product.stock || 1} value={qty} onChange={(e) => setQty(Number(e.target.value))} className="h-12 w-20 rounded-full border border-line bg-paper text-center" />
            <button
              disabled={product.stock < 1}
              className="h-12 flex-1 rounded-full bg-bark text-cream disabled:opacity-40"
              onClick={() => {
                add(product.id, active, qty);
                setAdded(true);
              }}
            >
              {added ? "Added" : "Add to cart"}
            </button>
          </div>
          <button onClick={() => toggle(product.id)} className="mt-3 text-sm underline underline-offset-4">
            {wished ? "Saved to wishlist" : "Save to wishlist"}
          </button>
          <p className="mt-8 text-sm leading-relaxed text-muted">{product.story}</p>
          {note && <p className="mt-2 text-xs text-muted">Note saved locally with this visit: {note}</p>}
        </div>
      </article>
    </Shell>
  );
}
