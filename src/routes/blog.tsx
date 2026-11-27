import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTitle, Shell } from "@/components/shell";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/blog")({ component: Blog });

function Blog() {
  const posts = useShop((s) => s.posts);
  return (
    <Shell>
      <PageTitle kicker="Journal" title="Notes from the bench" lede="Care, custom work, and the small decisions that keep a flower looking like a flower." />
      <div className="container-shop grid gap-8 pb-16 md:grid-cols-3">
        {posts.map((p) => (
          <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group">
            <img src={p.image} alt="" className="aspect-[4/3] w-full rounded-card object-cover" />
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-sage-deep">{p.date}</p>
            <h2 className="mt-1 font-display text-3xl text-bark group-hover:underline">{p.title}</h2>
            <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </Shell>
  );
}
