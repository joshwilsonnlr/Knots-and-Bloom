import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageTitle, Shell } from "@/components/shell";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/custom")({ component: Custom });

function Custom() {
  const add = useShop((s) => s.addInquiry);
  const [sent, setSent] = useState(false);
  return (
    <Shell>
      <PageTitle kicker="Made for you" title="Custom orders" lede="Describe the piece. We reply with a palette photo and a date before any yarn starts. Requests stay on this device until a live inbox is connected." />
      {sent ? (
        <p className="container-shop pb-16 text-bark">Received. Open the studio to see the request alongside orders.</p>
      ) : (
        <form
          className="container-shop grid max-w-xl gap-4 pb-16"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            add("custom", String(data.get("name")), String(data.get("email")), `${data.get("piece")} — colours: ${data.get("colours")} — needed: ${data.get("when")}. ${data.get("message")}`);
            setSent(true);
          }}
        >
          <Input name="name" label="Name" />
          <Input name="email" label="Email" type="email" />
          <Input name="piece" label="What should we make?" />
          <Input name="colours" label="Colours" />
          <Input name="when" label="Needed by" />
          <label className="text-sm">
            Anything else
            <textarea name="message" className="mt-1 min-h-28 w-full rounded-xl border border-line bg-paper p-3" />
          </label>
          <button className="h-12 rounded-full bg-bark text-cream">Send the brief</button>
        </form>
      )}
    </Shell>
  );
}

function Input({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return (
    <label className="text-sm text-bark">
      {label}
      <input required name={name} type={type} className="mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3" />
    </label>
  );
}
