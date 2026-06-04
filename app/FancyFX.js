"use client";

import { useEffect, useRef } from "react";

// Pointer-driven flourishes, igloo-style:
//  • a soft glow that follows the cursor and lights the dark space
//  • glass cards tilt in 3D toward the cursor
//  • buttons are magnetic — they lean toward the cursor when you get close
// All delegated off the document so it keeps working across page navigations,
// and all disabled for touch / reduced-motion.
export default function FancyFX() {
  const glowRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    const glow = glowRef.current;
    let tilted = null;
    let frame = 0;
    let mx = 0;
    let my = 0;

    const apply = () => {
      frame = 0;

      // cursor glow
      if (glow) glow.style.transform = `translate3d(${mx}px, ${my}px, 0)`;

      // 3D tilt on the card under the cursor (but not while using the
      // before/after slider, whose drag math wants a square card)
      const hit = document.elementFromPoint(mx, my);
      const card = hit?.closest(".ba")
        ? null
        : hit?.closest(".card, .service");
      if (tilted && tilted !== card) {
        tilted.style.transform = "";
        tilted.style.transition = "";
        tilted = null;
      }
      if (card) {
        const r = card.getBoundingClientRect();
        const px = (mx - r.left) / r.width - 0.5;
        const py = (my - r.top) / r.height - 0.5;
        card.style.transition = "transform 0.12s ease-out";
        card.style.transform = `perspective(800px) rotateX(${(-py * 6).toFixed(
          2
        )}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-6px)`;
        tilted = card;
      }

      // magnetic buttons
      document.querySelectorAll(".btn, .nav-cta").forEach((b) => {
        const r = b.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.hypot(dx, dy);
        const radius = Math.max(r.width, r.height) * 0.9 + 40;
        if (dist < radius) {
          b.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`;
        } else if (b.style.transform) {
          b.style.transform = "";
        }
      });
    };

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="cursor-glow" ref={glowRef} aria-hidden="true" />;
}
