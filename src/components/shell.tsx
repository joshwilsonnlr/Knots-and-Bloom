import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { categories } from "@/lib/catalog";
import { useShop } from "@/lib/shop-store";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/collections/$slug", label: "Collections", params: { slug: "flowers" } },
  { to: "/custom", label: "Custom Orders" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  const announcement = useShop((s) => s.announcement);
  const cart = useShop((s) => s.cart);
  const wishlist = useShop((s) => s.wishlist);
  const hydrated = useShop((s) => s.hydrated);
  const products = useShop((s) => s.products);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [path]);

  const count = hydrated ? cart.reduce((n, l) => n + l.qty, 0) : 0;
  const wish = hydrated ? wishlist.length : 0;
  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (query.length < 1) return [];
    return products.filter((p) => (p.name + p.description + p.category).toLowerCase().includes(query)).slice(0, 6);
  }, [q, products]);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="bg-bark text-cream text-center text-sm tracking-wide px-4 py-2">{announcement}</div>
      <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur-md">
        <div className="container-shop flex h-16 items-center gap-4">
          <button className="lg:hidden p-2 -ml-2" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Menu className="size-5" />
          </button>
          <Link to="/" className="mr-auto lg:mr-0 flex items-center gap-2">
            <img src="/brand/logo.jpg" alt="Knot & Bloom crochet art" className="size-12 rounded-full object-cover" />
          </Link>
          <nav className="hidden lg:flex items-center gap-6 mx-auto text-sm">
            {links.map((l) => (
              <Link key={l.label} to={l.to} params={"params" in l ? l.params : undefined} className="text-bark/80 hover:text-bark transition-colors" activeOptions={{ exact: l.to === "/" }} activeProps={{ className: "text-bark font-medium" }}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1 ml-auto lg:ml-0">
            <IconBtn label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="size-5" />
            </IconBtn>
            <Link to="/account" aria-label="Account" className="p-2 text-bark">
              <User className="size-5" />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="relative p-2 text-bark">
              <Heart className="size-5" />
              {wish > 0 && <Badge n={wish} />}
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative p-2 text-bark">
              <ShoppingBag className="size-5" />
              {count > 0 && <Badge n={count} />}
            </Link>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-bark/40" aria-label="Close menu" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-[min(100%,20rem)] bg-paper p-6 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <span className="font-display text-2xl text-bark">Menu</span>
              <button aria-label="Close" onClick={() => setOpen(false)} className="p-2">
                <X className="size-5" />
              </button>
            </div>
            <div className="flex flex-col gap-4 text-lg">
              {links.map((l) => (
                <Link key={l.label} to={l.to} params={"params" in l ? l.params : undefined} className="text-bark">
                  {l.label}
                </Link>
              ))}
              <Link to="/faq" className="text-bark">FAQ</Link>
              <Link to="/track" className="text-bark">Track an order</Link>
            </div>
          </aside>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-bark/40 p-4" onClick={() => setSearchOpen(false)}>
          <div className="container-shop mt-16 bg-paper rounded-card p-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Search className="size-4 text-muted" />
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search flowers, charms, gifts" className="w-full bg-transparent outline-none text-ink" />
              <button aria-label="Close search" onClick={() => setSearchOpen(false)}>
                <X className="size-4" />
              </button>
            </div>
            <ul className="mt-3 divide-y divide-line">
              {results.map((p) => (
                <li key={p.id}>
                  <button
                    className="flex w-full items-center gap-3 py-3 text-left"
                    onClick={() => {
                      setSearchOpen(false);
                      navigate({ to: "/product/$slug", params: { slug: p.slug } });
                    }}
                  >
                    <img src={p.image} alt="" className="size-12 rounded-lg object-cover" />
                    <span>{p.name}</span>
                  </button>
                </li>
              ))}
              {q && results.length === 0 && <li className="py-6 text-muted text-sm">Nothing matches that yet.</li>}
            </ul>
          </div>
        </div>
      )}

      <main>{children}</main>
      <footer className="mt-20 bg-bark text-cream">
        <div className="container-shop grid gap-10 py-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <img src="/brand/logo.jpg" alt="" className="mb-3 size-16 rounded-full object-cover" />
            <p className="font-display text-3xl">Knots & Bloom</p>
            <p className="mt-3 max-w-sm text-cream/80">Handmade crochet, worked slowly and finished to be kept. Flowers, charms, and gifts from a small bench.</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-beige">Visit</p>
            <ul className="mt-3 space-y-2 text-sm text-cream/85">
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/custom">Custom orders</Link></li>
              <li><Link to="/blog">Journal</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/track">Order tracking</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-beige">Care</p>
            <ul className="mt-3 space-y-2 text-sm text-cream/85">
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping & returns</Link></li>
              <li><Link to="/privacy">Privacy</Link></li>
              <li><Link to="/terms">Terms</Link></li>
              <li><Link to="/studio">Studio</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/10">
          <div className="container-shop flex flex-wrap gap-3 justify-between py-4 text-xs text-cream/60">
            <span>© {new Date().getFullYear()} Knots & Bloom</span>
            <span className="flex gap-3">
              {categories.map((c) => (
                <Link key={c.slug} to="/collections/$slug" params={{ slug: c.slug }}>{c.name}</Link>
              ))}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function IconBtn({ children, label, onClick }: { children: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button aria-label={label} onClick={onClick} className="p-2 text-bark">
      {children}
    </button>
  );
}

function Badge({ n }: { n: number }) {
  return <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-sage-deep text-[10px] text-cream">{n}</span>;
}

export function PageTitle({ kicker, title, lede }: { kicker?: string; title: string; lede?: string }) {
  return (
    <header className="container-shop pt-12 pb-8">
      {kicker && <p className="text-xs tracking-[0.2em] uppercase text-sage-deep">{kicker}</p>}
      <h1 className="mt-2 font-display text-5xl text-bark md:text-6xl">{title}</h1>
      {lede && <p className="mt-4 max-w-xl text-muted">{lede}</p>}
    </header>
  );
}
