import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Shell } from "@/components/shell";
import { useShop } from "@/lib/shop-store";
import { editorialPosts } from "@/lib/editorial-posts";

export const Route = createFileRoute("/blog/$slug")({ component: Article });

function Article() {
  const { slug } = Route.useParams();
  const saved = useShop((s) => s.posts.find((p) => p.slug === slug));
  const post = saved ?? editorialPosts.find((p) => p.slug === slug);
  if (!post) return <Shell><div className="container-shop py-16"><h1 className="font-display text-4xl">Article not found</h1><Link to="/blog" className="mt-4 inline-flex items-center gap-2 underline"><ArrowLeft className="size-4"/> Journal</Link></div></Shell>;
  const paragraphs = post.body;
  return (
    <Shell>
      <article className="container-shop max-w-3xl py-12 md:py-16">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted"><ArrowLeft className="size-4"/> All journal stories</Link>
        <header className="mt-8"><p className="text-xs uppercase tracking-[0.16em] text-sage-deep">{post.date} · Handmade notes</p><h1 className="mt-3 font-display text-5xl leading-[1.02] text-bark md:text-6xl">{post.title}</h1><p className="mt-4 max-w-2xl text-lg leading-7 text-muted">{post.excerpt}</p></header>
        <img src={post.image} alt={post.title} className="mt-8 aspect-[16/9] w-full rounded-card object-cover" fetchPriority="high" />
        <div className="article-copy mt-8 space-y-5 text-base leading-8 text-muted">{paragraphs.map((paragraph, index) => <p key={`${index}-${paragraph.slice(0,24)}`}>{paragraph}</p>)}</div>
        <aside className="mt-12 rounded-card bg-beige/60 p-6"><p className="font-display text-2xl text-bark">Have a handmade idea in mind?</p><p className="mt-2 text-sm text-muted">Tell us the occasion and colors you are dreaming of.</p><Link to="/custom" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-bark underline underline-offset-4">Ask about a custom order <ArrowRight className="size-4"/></Link></aside>
      </article>
    </Shell>
  );
}
