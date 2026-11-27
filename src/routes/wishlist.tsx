import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/product-card";
import { PageTitle, Shell } from "@/components/shell";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/wishlist")({ component: Wish });

function Wish() {
  const ids = useShop((s) => s.wishlist);
  const products = useShop((s) => s.products.filter((p) => ids.includes(p.id)));
  return (
    <Shell>
      <PageTitle title="Wishlist" lede="Saved on this device." />
      <div className="container-shop pb-16">
        <ProductGrid items={products} />
      </div>
    </Shell>
  );
}
