import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Shell } from "@/components/shell";

export const Route = createFileRoute("/shipping")({ component: Page });

function Page() {
  return (
    <Shell>
      <PageTitle title="Shipping & returns" />
      <div className="container-shop max-w-2xl space-y-4 pb-16 text-muted">
        <p>Orders of $75 and over ship free in this catalogue. Under that, a flat $6 is added at checkout.</p>
        <p>Ready pieces are packed within three working days. You will get a reference number on the confirmation screen — use it with the email on Track an order.</p>
        <p>Unused ready-made pieces may be returned within 14 days. Custom colours, monograms, and made-to-order sizes are final unless they arrive damaged. Write via Contact with a photograph and we repair or replace.</p>
      </div>
    </Shell>
  );
}
