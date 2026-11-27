import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { money, useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/order/$id")({ component: OrderPage });

function OrderPage() {
  const { id } = Route.useParams();
  const order = useShop((s) => s.orders.find((o) => o.id === id));
  return (
    <Shell>
      <div className="container-shop max-w-xl py-16">
        {!order ? (
          <>
            <h1 className="font-display text-4xl text-bark">Order not on this device</h1>
            <p className="mt-3 text-muted">Orders live in this browser. Try tracking with the email used at checkout.</p>
          </>
        ) : (
          <>
            <p className="text-xs tracking-[0.2em] uppercase text-sage-deep">Order confirmed</p>
            <h1 className="mt-2 font-display text-5xl text-bark">Thank you, {order.name.split(" ")[0]}</h1>
            <p className="mt-3 text-muted">Reference {order.id}. We would start the piece from here. Status: {order.status}.</p>
            <ul className="mt-6 divide-y divide-line">
              {order.lines.map((l) => (
                <li key={l.productId + l.color} className="flex justify-between py-3 text-sm">
                  <span>{l.qty} × {l.name} · {l.color}</span>
                  <span>{money(l.price * l.qty)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-medium">Total {money(order.total)}</p>
            <p className="mt-2 text-sm text-muted">{order.address}</p>
            <Link to="/shop" className="mt-8 inline-grid h-11 place-items-center rounded-full bg-bark px-5 text-cream">Continue browsing</Link>
          </>
        )}
      </div>
    </Shell>
  );
}
