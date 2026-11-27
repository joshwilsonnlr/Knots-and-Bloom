import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageTitle, Shell } from "@/components/shell";
import { money, useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/track")({ component: Track });

function Track() {
  const orders = useShop((s) => s.orders);
  const [email, setEmail] = useState("");
  const [ref, setRef] = useState("");
  const [looked, setLooked] = useState(false);
  const match = orders.find((o) => o.email === email.trim().toLowerCase() && (!ref || o.id === ref.trim()));
  return (
    <Shell>
      <PageTitle title="Track an order" lede="Use the email from checkout. Add the reference if you have it." />
      <form
        className="container-shop grid max-w-md gap-3 pb-6"
        onSubmit={(e) => {
          e.preventDefault();
          setLooked(true);
        }}
      >
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="h-11 rounded-xl border border-line bg-paper px-3" />
        <input value={ref} onChange={(e) => setRef(e.target.value)} placeholder="Reference (optional)" className="h-11 rounded-xl border border-line bg-paper px-3" />
        <button className="h-11 rounded-full bg-bark text-cream">Look up</button>
      </form>
      <div className="container-shop pb-16">
        {looked && !match && <p className="text-muted">No order matched on this device.</p>}
        {match && (
          <div className="max-w-md rounded-card border border-line bg-paper p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-sage-deep">{match.status}</p>
            <h2 className="font-display text-3xl text-bark">{match.id}</h2>
            <ul className="mt-3 text-sm">
              {match.lines.map((l) => (
                <li key={l.name + l.color}>{l.qty} × {l.name}</li>
              ))}
            </ul>
            <p className="mt-3">{money(match.total)}</p>
          </div>
        )}
      </div>
    </Shell>
  );
}
