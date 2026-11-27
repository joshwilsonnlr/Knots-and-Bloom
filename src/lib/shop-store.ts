import { create } from "zustand";
import { persist } from "zustand/middleware";
import { seedPosts, seedProducts, type Post, type Product } from "./catalog";

export type CartLine = { productId: string; qty: number; color: string };
export type ShopUser = { name: string; email: string };
export type Account = ShopUser & { password: string };
export type Order = {
  id: string;
  email: string;
  name: string;
  lines: { productId: string; name: string; qty: number; color: string; price: number }[];
  address: string;
  note: string;
  total: number;
  status: "Placed" | "Making" | "Shipped";
  createdAt: string;
};
export type Inquiry = { id: string; kind: string; name: string; email: string; message: string; at: string };

type ShopState = {
  products: Product[];
  posts: Post[];
  cart: CartLine[];
  wishlist: string[];
  user: ShopUser | null;
  accounts: Account[];
  orders: Order[];
  inquiries: Inquiry[];
  announcement: string;
  hydrated: boolean;
  setHydrated: () => void;
  addToCart: (productId: string, color: string, qty?: number) => void;
  setQty: (productId: string, color: string, qty: number) => void;
  removeLine: (productId: string, color: string) => void;
  clearCart: () => void;
  toggleWish: (productId: string) => void;
  register: (name: string, email: string, password: string) => string | null;
  login: (email: string, password: string) => string | null;
  logout: () => void;
  placeOrder: (input: { name: string; email: string; address: string; note: string }) => Order | null;
  upsertProduct: (product: Product) => void;
  adjustStock: (id: string, stock: number) => void;
  setAnnouncement: (text: string) => void;
  addPost: (post: Post) => void;
  addInquiry: (kind: string, name: string, email: string, message: string) => void;
};

export const useShop = create<ShopState>()(
  persist(
    (set, get) => ({
      products: seedProducts,
      posts: seedPosts,
      cart: [],
      wishlist: [],
      user: null,
      accounts: [],
      orders: [],
      inquiries: [],
      announcement: "Free shipping on orders over $75 · Custom colours welcome",
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      addToCart: (productId, color, qty = 1) => {
        const product = get().products.find((p) => p.id === productId);
        if (!product || product.stock < 1) return;
        set((s) => {
          const existing = s.cart.find((l) => l.productId === productId && l.color === color);
          const nextQty = Math.min(product.stock, (existing?.qty ?? 0) + qty);
          const cart = existing
            ? s.cart.map((l) => (l.productId === productId && l.color === color ? { ...l, qty: nextQty } : l))
            : [...s.cart, { productId, color, qty: nextQty }];
          return { cart };
        });
      },
      setQty: (productId, color, qty) =>
        set((s) => ({
          cart: qty <= 0 ? s.cart.filter((l) => !(l.productId === productId && l.color === color)) : s.cart.map((l) => (l.productId === productId && l.color === color ? { ...l, qty } : l)),
        })),
      removeLine: (productId, color) => set((s) => ({ cart: s.cart.filter((l) => !(l.productId === productId && l.color === color)) })),
      clearCart: () => set({ cart: [] }),
      toggleWish: (productId) =>
        set((s) => ({
          wishlist: s.wishlist.includes(productId) ? s.wishlist.filter((id) => id !== productId) : [...s.wishlist, productId],
        })),
      register: (name, email, password) => {
        const key = email.trim().toLowerCase();
        if (get().accounts.some((a) => a.email === key)) return "An account with that email already exists on this device.";
        const account = { name: name.trim(), email: key, password };
        set((s) => ({ accounts: [...s.accounts, account], user: { name: account.name, email: account.email } }));
        return null;
      },
      login: (email, password) => {
        const found = get().accounts.find((a) => a.email === email.trim().toLowerCase() && a.password === password);
        if (!found) return "Those details do not match an account on this device.";
        set({ user: { name: found.name, email: found.email } });
        return null;
      },
      logout: () => set({ user: null }),
      placeOrder: ({ name, email, address, note }) => {
        const { cart, products } = get();
        if (!cart.length) return null;
        const lines = cart.map((l) => {
          const p = products.find((x) => x.id === l.productId)!;
          return { productId: p.id, name: p.name, qty: l.qty, color: l.color, price: p.salePrice ?? p.price };
        });
        const sub = lines.reduce((n, l) => n + l.price * l.qty, 0);
        const shipping = sub >= 75 || sub === 0 ? 0 : 6;
        const order: Order = {
          id: "KB" + Math.floor(100000 + Math.random() * 900000),
          email: email.trim().toLowerCase(),
          name: name.trim(),
          lines,
          address,
          note,
          total: sub + shipping,
          status: "Placed",
          createdAt: new Date().toISOString(),
        };
        set((s) => ({
          orders: [order, ...s.orders],
          cart: [],
          products: s.products.map((p) => {
            const used = lines.filter((l) => l.productId === p.id).reduce((n, l) => n + l.qty, 0);
            return used ? { ...p, stock: Math.max(0, p.stock - used) } : p;
          }),
        }));
        return order;
      },
      upsertProduct: (product) =>
        set((s) => ({
          products: s.products.some((p) => p.id === product.id)
            ? s.products.map((p) => (p.id === product.id ? product : p))
            : [product, ...s.products],
        })),
      adjustStock: (id, stock) => set((s) => ({ products: s.products.map((p) => (p.id === id ? { ...p, stock } : p)) })),
      setAnnouncement: (text) => set({ announcement: text }),
      addPost: (post) => set((s) => ({ posts: [post, ...s.posts.filter((p) => p.slug !== post.slug)] })),
      addInquiry: (kind, name, email, message) =>
        set((s) => ({
          inquiries: [{ id: crypto.randomUUID(), kind, name, email, message, at: new Date().toISOString() }, ...s.inquiries],
        })),
    }),
    {
      name: "knots-bloom-shop",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

export function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export function unitPrice(p: Product) {
  return p.salePrice ?? p.price;
}
