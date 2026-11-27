import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTitle, Shell } from "@/components/shell";
import { money, useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const cart = useShop((s) => s.cart);
  const products = useShop((s) => s.products);
  const setQty = useShop((s) => s.setQty);
  const remove = useShop((s) => s.removeLine);
  const lines = cart.map((l) => ({ ...l, product: products.find((p) => p.id === l.productId) })).filter((l) => l.product);
  const sub = lines.reduce((n, l) => n + (l.product!.salePrice ?? l.product!.price) * l.qty, 0);
  const ship = sub === 0 || sub >= 75 ? 0 : 6;

  return (
    <Shell>
      <PageTitle title="Your bag" lede={lines.length ? "Review the pieces before checkout." : "Your bag is empty."} />
      <div className="container-shop grid gap-8 pb-16 md:grid-cols-[1fr_18rem]">
        <ul className="divide-y divide-line">
          {lines.map((l) => (
            <li key={l.productId + l.color} className="flex gap-4 py-5">
              <img src={l.product!.image} alt="" className="size-24 rounded-xl object-cover" />
              <div className="flex-1">
                <Link to="/product/$slug" params={{ slug: l.product!.slug }} className="text-bark">{l.product!.name}</Link>
                <p className="text-sm text-muted">{l.color}</p>
                <div className="mt-2 flex items-center gap-3">
                  <input type="number" min={1} max={l.product!.stock} value={l.qty} onChange={(e) => setQty(l.productId, l.color, Number(e.target.value))} className="h-10 w-16 rounded-lg border border-line text-center" />
                  <button className="text-sm text-muted underline" onClick={() => remove(l.productId, l.color)}>Remove</button>
                </div>
              </div>
              <p>{money((l.product!.salePrice ?? l.product!.price) * l.qty)}</p>
            </li>
          ))}
        </ul>
        <aside className="h-fit rounded-card border border-line bg-paper p-5">
          <p className="flex justify-between text-sm"><span>Subtotal</span><span>{money(sub)}</span></p>
          <p className="mt-2 flex justify-between text-sm"><span>Shipping</span><span>{ship === 0 ? "Free" : money(ship)}</span></p>
          <p className="mt-4 flex justify-between font-medium"><span>Total</span><span>{money(sub + ship)}</span></p>
          <Link to="/checkout" className={`mt-5 grid h-12 place-items-center rounded-full bg-bark text-cream ${lines.length ? "" : "pointer-events-none opacity-40"}`}>Checkout</Link>
        </aside>
      </div>
    </Shell>
  );
}
