import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { categories } from "@/lib/catalog";
import { ProductGrid } from "@/components/product-card";
import { PageTitle, Shell } from "@/components/shell";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/shop")({
  component: ShopPage,
});

function ShopPage() {
  const products = useShop((s) => s.products);
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState("featured");
  const items = useMemo(() => {
    let list = products.filter((p) => (cat === "all" ? true : p.category === cat));
    if (sort === "new") list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (sort === "price") list = [...list].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    return list;
  }, [products, cat, sort]);

  return (
    <Shell>
      <PageTitle kicker="The shop" title="All pieces" lede="Ready to ship from the bench. Stock updates as orders are placed on this device." />
      <div className="container-shop flex flex-wrap gap-2 pb-8">
        <Filter on={cat === "all"} onClick={() => setCat("all")}>All</Filter>
        {categories.map((c) => (
          <Filter key={c.slug} on={cat === c.slug} onClick={() => setCat(c.slug)}>{c.name}</Filter>
        ))}
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="ml-auto h-11 rounded-full border border-line bg-paper px-4 text-sm">
          <option value="featured">Featured</option>
          <option value="new">Newest</option>
          <option value="price">Price</option>
        </select>
      </div>
      <div className="container-shop pb-10">
        <ProductGrid items={items} />
      </div>
    </Shell>
  );
}

function Filter({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`h-11 rounded-full px-4 text-sm ${on ? "bg-bark text-cream" : "bg-paper border border-line text-bark"}`}>
      {children}
    </button>
  );
}
