"use client";

import { repairs } from "./gallery-data";

// 3x3 grid of board photos behind the hero. Each tile shows the "before"
// shot and continuously cross-fades to the "after" and back, staggered so
// the grid ripples. Pure CSS animation (see .hero-tile-after in globals.css).
export default function HeroMontage() {
  const tiles = repairs.slice(0, 9);
  return (
    <div className="hero-montage" aria-hidden="true">
      {tiles.map((r, i) => (
        <div className="hero-tile" key={r.id}>
          {r.before && <img className="hero-tile-img" src={r.before} alt="" />}
          {r.after && (
            <img
              className="hero-tile-img hero-tile-after"
              src={r.after}
              alt=""
              style={{ animationDelay: `${(i % 9) * 0.55}s` }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
