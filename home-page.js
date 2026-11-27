/**
 * Homepage-only cleanup for navigation rendered by the shared script.
 * These links are hidden in CSS and removed here for screen readers too.
 */
function removeUnavailableHomeLinks() {
  const header = document.getElementById("site-header");

  if (!header) {
    return;
  }

  const removeLinks = () => {
    const unavailableLinks = header.querySelectorAll(
      '.nav-links a[href*="category=flowers"], .nav-actions a[aria-label="Wishlist"]',
    );

    unavailableLinks.forEach((link) => link.remove());
  };

  // The shared script may render the header after this file starts.
  removeLinks();
  new MutationObserver(removeLinks).observe(header, {
    childList: true,
    subtree: true,
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", removeUnavailableHomeLinks, {
    once: true,
  });
} else {
  removeUnavailableHomeLinks();
}
