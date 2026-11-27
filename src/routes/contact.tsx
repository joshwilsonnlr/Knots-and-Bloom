import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageTitle, Shell } from "@/components/shell";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  const add = useShop((s) => s.addInquiry);
  const [sent, setSent] = useState(false);
  return (
    <Shell>
      <PageTitle title="Contact" lede="Questions about a piece, a repair, or a wholesale handful. The original shop still answers on Instagram @knotbloom58." />
      <div className="container-shop grid gap-10 pb-16 md:grid-cols-2">
        {sent ? (
          <p>Message saved. Thank you.</p>
        ) : (
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              add("contact", String(data.get("name")), String(data.get("email")), String(data.get("message")));
              setSent(true);
            }}
          >
            <label className="text-sm">Name<input required name="name" className="mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3" /></label>
            <label className="text-sm">Email<input required type="email" name="email" className="mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3" /></label>
            <label className="text-sm">Message<textarea required name="message" className="mt-1 min-h-32 w-full rounded-xl border border-line bg-paper p-3" /></label>
            <button className="h-12 rounded-full bg-bark text-cream">Send</button>
          </form>
        )}
        <div className="rounded-card bg-beige p-6 text-sm text-bark">
          <p className="font-display text-3xl">Studio hours</p>
          <p className="mt-3 text-muted">Messages are read on weekdays. Ready pieces ship within three working days of a confirmed order.</p>
          <p className="mt-4">Instagram · @knotbloom58</p>
        </div>
      </div>
    </Shell>
  );
}
