"use client";

import { repairs } from "./gallery-data";

// Board photos that float around the hero headline. Each card is fully crisp
// (no dark overlay), gently drifts/bobs, and continuously cross-fades from the
// "before" shot to the "after" and back. Positioned around the edges so the
// centered headline stays clear. Animation lives in globals.css.
const SPOTS = [
  { top: "5%", left: "0%", size: 150, float: "a" },
  { top: "40%", left: "-1%", size: 140, float: "b" },
  { bottom: "4%", left: "3%", size: 150, float: "c" },
  { top: "3%", right: "0%", size: 155, float: "a" },
  { top: "40%", right: "-1%", size: 150, float: "c" },
  { bottom: "5%", right: "4%", size: 160, float: "b" },
  { top: "2%", left: "25%", size: 115, float: "b" },
  { top: "4%", right: "22%", size: 120, float: "a" },
  { bottom: "3%", left: "19%", size: 105, float: "c" },
];

export default function HeroMontage() {
  const tiles = repairs.slice(0, 9);
  return (
    <div className="hero-montage" aria-hidden="true">
      {tiles.map((r, i) => {
        const s = SPOTS[i % SPOTS.length];
        return (
          <div
            key={r.id}
            className={`hero-card float-${s.float}`}
            style={{
              top: s.top,
              left: s.left,
              right: s.right,
              bottom: s.bottom,
              width: s.size,
              height: Math.round(s.size * 0.78),
              animationDelay: `${i * -0.9}s`,
            }}
          >
            {r.before && <img className="hero-card-img" src={r.before} alt="" />}
            {r.after && (
              <img
                className="hero-card-img hero-card-after"
                src={r.after}
                alt=""
                style={{ animationDelay: `${(i % 9) * 0.55}s` }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
