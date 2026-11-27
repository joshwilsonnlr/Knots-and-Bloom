import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/lib/catalog";
import { ProductGrid } from "@/components/product-card";
import { PageTitle, Shell } from "@/components/shell";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/collections/$slug")({ component: CollectionPage });

function CollectionPage() {
  const { slug } = Route.useParams();
  const cat = categories.find((c) => c.slug === slug);
  const products = useShop((s) => s.products.filter((p) => p.category === slug));
  if (!cat) {
    return (
      <Shell>
        <PageTitle title="Collection not found" lede="That category is not in the catalogue." />
        <div className="container-shop pb-10"><Link to="/shop" className="underline">Back to the shop</Link></div>
      </Shell>
    );
  }
  return (
    <Shell>
      <PageTitle kicker="Collection" title={cat.name} lede={cat.blurb} />
      <div className="container-shop pb-10">
        <img src={cat.image} alt="" className="mb-10 aspect-[16/7] w-full rounded-card object-cover" />
        <ProductGrid items={products} />
      </div>
    </Shell>
  );
}
