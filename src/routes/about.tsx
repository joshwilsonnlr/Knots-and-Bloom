import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Shell } from "@/components/shell";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <Shell>
      <PageTitle kicker="About" title="A small bench, a lot of knots" lede="Knots & Bloom is a handmade crochet practice. The public Instagram is the mood board; this shop is where a piece can be chosen and ordered." />
      <div className="container-shop grid gap-8 pb-16 md:grid-cols-2">
        <img src="/products/yarn.jpg" alt="Skeins of yarn" className="aspect-[4/5] rounded-card object-cover" />
        <div className="space-y-4 text-muted">
          <p>The profile @knotbloom58 describes the work plainly: handmade crochet, made with care, suited to gifts, with custom orders welcome. The grid itself sits behind a login, so the photographs on this site are stand-ins in the same palette — cream, blush, sage, bark — and every image path can be swapped in the studio when the real product photos are ready.</p>
          <p>Pieces are made to be kept. A bouquet does not ask for water. A charm is stuffed just enough to survive a bag. Colour is decided in daylight.</p>
          <p>If you have ordered through messages before, the cart is the same conversation with a total at the end.</p>
        </div>
      </div>
    </Shell>
  );
}
