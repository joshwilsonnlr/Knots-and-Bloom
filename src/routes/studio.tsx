import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { categories } from "@/lib/catalog";
import { PageTitle, Shell } from "@/components/shell";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/studio")({ component: Studio });

function Studio() {
  const [ok, setOk] = useState(false);
  const [pin, setPin] = useState("");
  const products = useShop((s) => s.products);
  const orders = useShop((s) => s.orders);
  const inquiries = useShop((s) => s.inquiries);
  const announcement = useShop((s) => s.announcement);
  const setAnnouncement = useShop((s) => s.setAnnouncement);
  const adjustStock = useShop((s) => s.adjustStock);
  const upsert = useShop((s) => s.upsertProduct);
  const addPost = useShop((s) => s.addPost);
  const [bar, setBar] = useState(announcement);

  if (!ok) {
    return (
      <Shell>
        <PageTitle title="Studio" lede="The maker’s desk. Demo key: bloom" />
        <form
          className="container-shop flex max-w-sm gap-2 pb-16"
          onSubmit={(e) => {
            e.preventDefault();
            if (pin.trim().toLowerCase() === "bloom") setOk(true);
          }}
        >
          <input value={pin} onChange={(e) => setPin(e.target.value)} className="h-11 flex-1 rounded-xl border border-line bg-paper px-3" placeholder="Key" />
          <button className="h-11 rounded-full bg-bark px-5 text-cream">Open</button>
        </form>
      </Shell>
    );
  }

  return (
    <Shell>
      <PageTitle title="Studio" lede="Edit the bar, stock, and catalogue. Changes stay in this browser." />
      <div className="container-shop grid gap-10 pb-20">
        <section>
          <h2 className="font-display text-3xl text-bark">Announcement</h2>
          <div className="mt-3 flex gap-2">
            <input value={bar} onChange={(e) => setBar(e.target.value)} className="h-11 flex-1 rounded-xl border border-line bg-paper px-3" />
            <button onClick={() => setAnnouncement(bar)} className="h-11 rounded-full bg-bark px-5 text-cream">Update</button>
          </div>
        </section>
        <section>
          <h2 className="font-display text-3xl text-bark">Inventory</h2>
          <ul className="mt-3 divide-y divide-line">
            {products.map((p) => (
              <li key={p.id} className="flex items-center gap-3 py-3 text-sm">
                <img src={p.image} alt="" className="size-12 rounded-lg object-cover" />
                <span className="flex-1">{p.name}</span>
                <input type="number" min={0} value={p.stock} onChange={(e) => adjustStock(p.id, Number(e.target.value))} className="h-10 w-20 rounded-lg border border-line text-center" />
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-3xl text-bark">Add a piece</h2>
          <ProductForm
            onSave={(p) => upsert(p)}
          />
        </section>
        <section>
          <h2 className="font-display text-3xl text-bark">Orders</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {orders.map((o) => (
              <li key={o.id} className="rounded-xl border border-line p-3">{o.id} · {o.name} · {o.status} · {o.lines.map((l) => l.name).join(", ")}</li>
            ))}
            {!orders.length && <li className="text-muted">No orders yet.</li>}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-3xl text-bark">Messages</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {inquiries.map((i) => (
              <li key={i.id} className="rounded-xl border border-line p-3"><strong>{i.kind}</strong> · {i.name} · {i.message}</li>
            ))}
            {!inquiries.length && <li className="text-muted">No messages yet.</li>}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-3xl text-bark">Journal note</h2>
          <form
            className="mt-3 grid gap-2 max-w-lg"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const title = String(data.get("title"));
              addPost({
                slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
                title,
                excerpt: String(data.get("excerpt")),
                date: "Today",
                image: "/products/workshop.jpg",
                body: [String(data.get("body"))],
              });
              e.currentTarget.reset();
            }}
          >
            <input name="title" required placeholder="Title" className="h-11 rounded-xl border border-line px-3" />
            <input name="excerpt" required placeholder="Excerpt" className="h-11 rounded-xl border border-line px-3" />
            <textarea name="body" required placeholder="Paragraph" className="min-h-24 rounded-xl border border-line p-3" />
            <button className="h-11 rounded-full bg-bark text-cream">Publish</button>
          </form>
        </section>
      </div>
    </Shell>
  );
}

function ProductForm({ onSave }: { onSave: (p: Product) => void }) {
  return (
    <form
      className="mt-3 grid gap-2 max-w-lg"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = String(data.get("name"));
        const id = "c" + Date.now();
        onSave({
          id,
          slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + id.slice(-4),
          name,
          price: Number(data.get("price")),
          category: String(data.get("category")),
          image: String(data.get("image") || "/products/flowers.jpg"),
          gallery: [String(data.get("image") || "/products/flowers.jpg")],
          description: String(data.get("description")),
          story: "Added from the studio.",
          stock: Number(data.get("stock")),
          bestseller: false,
          createdAt: new Date().toISOString().slice(0, 10),
          colors: [String(data.get("color") || "Cream")],
        });
        e.currentTarget.reset();
      }}
    >
      <input name="name" required placeholder="Name" className="h-11 rounded-xl border border-line px-3" />
      <div className="grid grid-cols-2 gap-2">
        <input name="price" type="number" min={1} required placeholder="Price" className="h-11 rounded-xl border border-line px-3" />
        <input name="stock" type="number" min={0} required placeholder="Stock" className="h-11 rounded-xl border border-line px-3" />
      </div>
      <select name="category" className="h-11 rounded-xl border border-line bg-paper px-3">
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>{c.name}</option>
        ))}
      </select>
      <input name="color" placeholder="Colour" className="h-11 rounded-xl border border-line px-3" />
      <input name="image" placeholder="Image path, e.g. /products/rose.jpg" className="h-11 rounded-xl border border-line px-3" />
      <textarea name="description" required placeholder="Description" className="min-h-20 rounded-xl border border-line p-3" />
      <button className="h-11 rounded-full bg-sage-deep text-cream">Add to shop</button>
    </form>
  );
}
