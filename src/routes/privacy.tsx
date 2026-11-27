import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, Shell } from "@/components/shell";

export const Route = createFileRoute("/privacy")({ component: Page });

function Page() {
  return (
    <Shell>
      <PageTitle title="Privacy" />
      <div className="container-shop max-w-2xl space-y-4 pb-16 text-muted">
        <p>This preview store keeps your bag, wishlist, account, and orders in this browser only. Nothing is sent to a payment company because checkout does not charge a card.</p>
        <p>If you write through Contact or Custom Orders, the message is stored on the same device so the studio view can read it. Clear the site data in your browser to remove it.</p>
        <p>We do not sell addresses. A future live version should say, in plain language, which courier and which payment provider receives your details, and for how long.</p>
      </div>
    </Shell>
  );
}
