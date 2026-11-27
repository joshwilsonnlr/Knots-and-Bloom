import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Knots & Bloom | Handmade Crochet Flowers, Gifts & Keepsakes" },
      { name: "description", content: "Shop handmade crochet flowers, thoughtful gifts, and small-batch keepsakes from Knots & Bloom. Explore the collection or ask about a custom creation." },
      { name: "theme-color", content: "#49382E" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Knots & Bloom | Handmade Crochet Flowers & Gifts" },
      { property: "og:description", content: "Thoughtfully handmade crochet flowers, gifts, and keepsakes — one stitch at a time." },
      { property: "og:image", content: "/og.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Knots & Bloom | Handmade Crochet Flowers & Gifts" },
      { name: "twitter:description", content: "Thoughtfully handmade crochet flowers, gifts, and keepsakes — one stitch at a time." },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600&family=Outfit:wght@300;400;500;600&display=swap" },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head><HeadContent /></head>
      <body><PreviewHostBridge /><AuthProvider><Outlet /></AuthProvider><Scripts /></body>
    </html>
  ),
});
