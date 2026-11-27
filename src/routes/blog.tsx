import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageTitle, Shell } from "@/components/shell";
import { useShop } from "@/lib/shop-store";
import { editorialPosts } from "@/lib/editorial-posts";

export const Route = createFileRoute("/blog")({ component: Blog });

function Blog() {
  const savedPosts = useShop((s) => s.posts);
  const [query, setQuery] = useState("");
  const posts = useMemo(() => [...editorialPosts, ...savedPosts].filter((post, index, all) => all.findIndex((entry) => entry.slug === post.slug) === index), [savedPosts]);
  const filtered = posts.filter((post) => `${post.title} ${post.excerpt} ${post.body.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <Shell>
      <PageTitle kicker="The handmade journal" title="Notes from the bench" lede="Practical crochet care, thoughtful gifting ideas, and small details from the world of handmade." />
      <div className="container-shop pb-16">
        <label className="mb-8 flex max-w-md items-center gap-3 rounded-full border border-line bg-paper px-4 py-3 text-muted"><Search className="size-4"/><span className="sr-only">Search journal articles</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search handmade stories" className="w-full bg-transparent text-sm text-ink outline-none"/></label>
        <p className="mb-5 text-sm text-muted">{filtered.length} {filtered.length === 1 ? "story" : "stories"}</p>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => <Link key={post.slug} to="/blog/$slug" params={{ slug: post.slug }} className="group">
            <img src={post.image} alt={post.title} className="aspect-[4/3] w-full rounded-card object-cover transition duration-500 group-hover:-translate-y-1" loading="lazy" />
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-sage-deep">{post.date} · Handmade notes</p>
            <h2 className="mt-2 font-display text-3xl leading-tight text-bark group-hover:underline">{post.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{post.excerpt}</p>
          </Link>)}
          {filtered.length === 0 && <p className="text-muted">No journal stories match that search. Try another word.</p>}
        </div>
      </div>
    </Shell>
  );
}
