"use client";

import { useEffect, useRef, useState } from "react";
import { repairs } from "./gallery-data";

// Board photos that float around the hero headline, igloo.inc-style: each card
// sits at its own depth and drifts subtly with the cursor (mouse parallax) on
// top of a gentle idle bob. The parallax lives on an outer wrapper so it never
// fights the float keyframes (which own the inner card's transform).
// `depth` = how far the card shifts with the mouse, in px — bigger = "closer".
const SPOTS = [
  { top: "5%", left: "0%", size: 150, float: "a", depth: 26 },
  { top: "40%", left: "-1%", size: 140, float: "b", depth: 20 },
  { bottom: "4%", left: "3%", size: 150, float: "c", depth: 24 },
  { top: "3%", right: "0%", size: 155, float: "a", depth: 28 },
  { top: "40%", right: "-1%", size: 150, float: "c", depth: 22 },
  { bottom: "5%", right: "4%", size: 160, float: "b", depth: 30 },
  { top: "2%", left: "25%", size: 115, float: "b", depth: 12 },
  { top: "4%", right: "22%", size: 120, float: "a", depth: 14 },
  { bottom: "3%", left: "19%", size: 105, float: "c", depth: 10 },
];

export default function HeroMontage() {
  const tiles = repairs.slice(0, 9);
  const rootRef = useRef(null);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const tick = () => {
      // ease current toward target for buttery, weighty motion
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      root.style.setProperty("--mx", cx.toFixed(3));
      root.style.setProperty("--my", cy.toFixed(3));
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001
        ? requestAnimationFrame(tick)
        : 0;
    };

    const onMove = (e) => {
      // normalized -0.5..0.5 from viewport center
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={`hero-montage${openId !== null ? " has-open" : ""}`}
      ref={rootRef}
    >
      <div className="hero-dust" aria-hidden="true" />
      <div
        className={`hero-backdrop${openId !== null ? " show" : ""}`}
        onClick={() => setOpenId(null)}
      />
      {tiles.map((r, i) => {
        const s = SPOTS[i % SPOTS.length];
        const open = openId === r.id;
        return (
          <div
            key={r.id}
            className={`hero-parallax${open ? " is-open" : ""}`}
            style={{
              top: s.top,
              left: s.left,
              right: s.right,
              bottom: s.bottom,
              width: s.size,
              height: Math.round(s.size * 0.78),
              "--d": `${s.depth}px`,
            }}
          >
            <button
              type="button"
              aria-label={open ? "Close enlarged photo" : "Enlarge photo"}
              className={`hero-card float-${s.float}`}
              style={{ animationDelay: `${i * -0.9}s` }}
              onClick={() => setOpenId(open ? null : r.id)}
            >
              {r.before && (
                <img className="hero-card-img" src={r.before} alt="" />
              )}
              {r.after && (
                <img
                  className="hero-card-img hero-card-after"
                  src={r.after}
                  alt=""
                  style={{ animationDelay: `${(i % 9) * 0.55}s` }}
                />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
