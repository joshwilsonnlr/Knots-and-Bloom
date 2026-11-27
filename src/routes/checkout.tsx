import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageTitle, Shell } from "@/components/shell";
import { money, useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

function CheckoutPage() {
  const cart = useShop((s) => s.cart);
  const products = useShop((s) => s.products);
  const user = useShop((s) => s.user);
  const place = useShop((s) => s.placeOrder);
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const sub = cart.reduce((n, l) => {
    const p = products.find((x) => x.id === l.productId);
    return n + (p ? (p.salePrice ?? p.price) * l.qty : 0);
  }, 0);
  const ship = sub >= 75 || sub === 0 ? 0 : 6;

  return (
    <Shell>
      <PageTitle title="Checkout" lede="This is a working demo checkout. Payment is recorded on this device — no card is charged." />
      <form
        className="container-shop grid max-w-xl gap-4 pb-16"
        onSubmit={(e) => {
          e.preventDefault();
          if (!cart.length) return setError("Your bag is empty.");
          if (!name || !email || !address) return setError("Name, email, and address are required.");
          const order = place({ name, email, address, note });
          if (!order) return setError("Could not place the order.");
          navigate({ to: "/order/$id", params: { id: order.id } });
        }}
      >
        <Field label="Name" value={name} onChange={setName} />
        <Field label="Email" value={email} onChange={setEmail} type="email" />
        <label className="text-sm text-bark">
          Address
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 min-h-24 w-full rounded-xl border border-line bg-paper p-3" />
        </label>
        <label className="text-sm text-bark">
          Note for the maker
          <textarea value={note} onChange={(e) => setNote(e.target.value)} className="mt-1 min-h-20 w-full rounded-xl border border-line bg-paper p-3" />
        </label>
        <p className="text-sm text-muted">Shipping {ship === 0 ? "free" : money(ship)} · Total {money(sub + ship)}</p>
        {error && <p className="text-sm text-bark">{error}</p>}
        <button className="h-12 rounded-full bg-bark text-cream">Place order</button>
      </form>
    </Shell>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="text-sm text-bark">
      {label}
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3" />
    </label>
  );
}
