import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageTitle, Shell } from "@/components/shell";
import { money, useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/account")({ component: AccountPage });

function AccountPage() {
  const user = useShop((s) => s.user);
  const orders = useShop((s) => s.orders.filter((o) => user && o.email === user.email));
  const login = useShop((s) => s.login);
  const register = useShop((s) => s.register);
  const logout = useShop((s) => s.logout);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");

  return (
    <Shell>
      <PageTitle title={user ? `Hello, ${user.name}` : "Account"} lede="Accounts stay in this browser. They are for saving a name beside your orders, not a password vault." />
      <div className="container-shop max-w-lg pb-16">
        {user ? (
          <>
            <p className="text-sm text-muted">{user.email}</p>
            <button onClick={logout} className="mt-3 text-sm underline">Sign out</button>
            <h2 className="mt-8 font-display text-3xl text-bark">Your orders</h2>
            <ul className="mt-4 divide-y divide-line">
              {orders.map((o) => (
                <li key={o.id} className="py-3 text-sm">
                  <span className="text-bark">{o.id}</span> · {o.status} · {money(o.total)}
                </li>
              ))}
              {!orders.length && <li className="py-3 text-muted">No orders for this email yet.</li>}
            </ul>
          </>
        ) : (
          <form
            className="grid gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const email = String(data.get("email"));
              const password = String(data.get("password"));
              const err = mode === "login" ? login(email, password) : register(String(data.get("name")), email, password);
              setError(err ?? "");
            }}
          >
            <div className="flex gap-2">
              <button type="button" onClick={() => setMode("login")} className={`h-10 rounded-full px-4 text-sm ${mode === "login" ? "bg-bark text-cream" : "border border-line"}`}>Sign in</button>
              <button type="button" onClick={() => setMode("register")} className={`h-10 rounded-full px-4 text-sm ${mode === "register" ? "bg-bark text-cream" : "border border-line"}`}>Register</button>
            </div>
            {mode === "register" && <input name="name" required placeholder="Name" className="h-11 rounded-xl border border-line bg-paper px-3" />}
            <input name="email" type="email" required placeholder="Email" className="h-11 rounded-xl border border-line bg-paper px-3" />
            <input name="password" type="password" required minLength={4} placeholder="Password" className="h-11 rounded-xl border border-line bg-paper px-3" />
            {error && <p className="text-sm">{error}</p>}
            <button className="h-12 rounded-full bg-bark text-cream">{mode === "login" ? "Sign in" : "Create account"}</button>
          </form>
        )}
      </div>
    </Shell>
  );
}
