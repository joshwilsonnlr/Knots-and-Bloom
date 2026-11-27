# Knots & Bloom

A handmade crochet storefront built with plain **HTML, CSS, and JavaScript**. It is designed to work as a static GitHub Pages site.

## Pages

- `index.html` — storefront home
- `shop.html` — searchable, filterable collection and sorting
- `product.html?id=...` — product detail and image gallery
- `cart.html` — persistent browser shopping bag and quantity controls
- `checkout.html` — order request form (no payment is collected)
- `order-confirmation.html` — local demo request confirmation
- `about.html` — brand story
- `custom.html` — custom order inquiry by email draft
- `journal.html` and `article.html?id=...` — eight original crochet and gifting articles

## GitHub Pages

In repository **Settings → Pages**, choose **Deploy from a branch**, select `main`, and choose `/(root)`. The root `index.html` is the static website entry point. After a commit, allow Pages a few minutes to publish, then refresh the site.

## Run locally

Open `index.html` in a browser, or serve the repository root with any static file server. Product images are in `public/products/`.

## Demo checkout and image note

Cart contents persist in the visitor's browser. Checkout creates a local order request only: it **does not collect payment, reserve stock, or send an order to the business**. The maker must confirm availability, delivery, and payment separately. Configure a real commerce backend and payment provider before accepting online payments.

Instagram profile `@knotbloom58` is login-walled in the available environment. Existing repository product images are stand-ins until the owner replaces them with authorized images from brand posts.
