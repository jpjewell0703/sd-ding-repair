"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Inertia smooth-scrolling (igloo-style glide). Also rewires in-page anchor
// links so #contact / #gallery ease there instead of jumping. Disabled for
// users who prefer reduced motion.
export default function SmoothScroll() {
  useEffect(() => {
    // Always start at the top on (re)load — stop the browser from restoring a
    // stale scroll position, which (with the late-loading 3D canvas shifting
    // layout) left refreshes scrolled partway down instead of on the hero.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      // lerp = responsiveness (higher feels snappier, less floaty/laggy)
      lerp: 0.12,
      wheelMultiplier: 1.1,
      smoothWheel: true,
    });
    lenis.scrollTo(0, { immediate: true });

    let raf = 0;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onAnchorClick = (e) => {
      const a = e.target.closest('a[href*="#"]');
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      if (url.pathname !== window.location.pathname) return; // let cross-page nav happen
      const target = document.getElementById(url.hash.slice(1));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.3 });
      history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
