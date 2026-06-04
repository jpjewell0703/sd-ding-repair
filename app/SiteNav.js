"use client";

// Floating frosted pill nav. Detaches from the top edge and shrinks once the
// page scrolls, igloo-style. Root-relative anchors work from any page.
import { useEffect, useState } from "react";

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="nav-shell">
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="/" className="brand">
            <img
              className="board"
              src="/logo.svg"
              alt="SD Ding Repair logo"
              width="40"
              height="40"
            />
            SD Ding Repair
          </a>
          <div className="nav-links">
            <a href="/#gallery">Gallery</a>
            <a href="/#services">Services</a>
            <a href="/#how-it-works">How It Works</a>
            <a href="/#contact" className="nav-cta">
              Get a Quote
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
