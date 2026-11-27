import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/blog/$slug")({ component: Article });

function Article() {
  const { slug } = Route.useParams();
  const post = useShop((s) => s.posts.find((p) => p.slug === slug));
  if (!post) {
    return (
      <Shell>
        <div className="container-shop py-16">
          <h1 className="font-display text-4xl">Article not found</h1>
          <Link to="/blog" className="underline">Journal</Link>
        </div>
      </Shell>
    );
  }
  return (
    <Shell>
      <article className="container-shop max-w-2xl py-12">
        <p className="text-xs uppercase tracking-[0.16em] text-sage-deep">{post.date}</p>
        <h1 className="mt-2 font-display text-5xl text-bark">{post.title}</h1>
        <img src={post.image} alt="" className="mt-6 aspect-[16/9] w-full rounded-card object-cover" />
        <div className="mt-6 space-y-4 text-muted">
          {post.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </article>
    </Shell>
  );
}
