import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Shell } from "@/components/shell";

export const Route = createFileRoute("/terms")({ component: Page });

function Page() {
  return (
    <Shell>
      <PageTitle title="Terms" />
      <div className="container-shop max-w-2xl space-y-4 pb-16 text-muted">
        <p>Pieces are handmade. Small differences in tension and colour are part of the work, not defects.</p>
        <p>A listed price is the price at the moment you place the order on this device. Custom work is quoted separately and is not covered by the ready-made return window.</p>
        <p>This website is a functioning shop demonstration. An order confirmation here is not a contract with a courier until a live payment provider is connected.</p>
      </div>
    </Shell>
  );
}
