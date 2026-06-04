"use client";

import { useEffect, useState } from "react";

// Branded intro overlay: a 0→100 counter over the logo that wipes up to reveal
// the hero, masking the three.js / asset load on first paint. Rendered on the
// server too, so it covers content immediately with no flash.
export default function IntroLoader() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState("load"); // load → exit → gone

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const duration = reduced ? 350 : 1600;
    const start = performance.now();
    let raf = 0;

    document.body.classList.add("intro-lock");

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 2);
      setCount(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        document.body.classList.remove("intro-lock");
        setPhase("exit");
        window.setTimeout(() => setPhase("gone"), 850);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("intro-lock");
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`intro${phase === "exit" ? " intro-exit" : ""}`}
      aria-hidden="true"
    >
      <div className="intro-inner">
        <img
          className="intro-logo"
          src="/logo.svg"
          width="64"
          height="64"
          alt=""
        />
        <div className="intro-count">
          {count}
          <span>%</span>
        </div>
        <div className="intro-bar">
          <span style={{ width: `${count}%` }} />
        </div>
      </div>
    </div>
  );
}
