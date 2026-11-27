import { createFileRoute } from "@tanstack/react-router";
import { faqs } from "@/lib/catalog";
import { PageTitle, Shell } from "@/components/shell";

export const Route = createFileRoute("/faq")({ component: Faq });

function Faq() {
  return (
    <Shell>
      <PageTitle title="Questions" lede="Straight answers before you order." />
      <div className="container-shop max-w-2xl divide-y divide-line pb-16">
        {faqs.map((f) => (
          <details key={f.q} className="py-4">
            <summary className="cursor-pointer text-bark">{f.q}</summary>
            <p className="mt-2 text-sm text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </Shell>
  );
}
