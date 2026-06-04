"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import BeforeAfter from "./BeforeAfter";

// On mobile the before/after gallery is long, so we show the first 2 cards and
// reveal 3 more at a time behind a "See more" button. On larger screens the
// grid shows everything at once and the button never appears.
const INITIAL = 2;
const STEP = 3;

export default function GalleryGrid({ repairs }) {
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(repairs.length);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => {
      if (mq.matches) {
        setIsMobile(true);
        setVisible((v) => (v === repairs.length ? INITIAL : v));
      } else {
        setIsMobile(false);
        setVisible(repairs.length);
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [repairs.length]);

  const shown = isMobile ? repairs.slice(0, visible) : repairs;
  const remaining = repairs.length - visible;

  return (
    <>
      <div className="gallery-grid">
        {shown.map((r, i) => (
          <Reveal key={r.id} delay={(i % 3) * 90}>
            <article className="card">
              <BeforeAfter before={r.before} after={r.after} title={r.title} />
              <div className="card-body">
                <span className="tag">{r.tag}</span>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {isMobile && remaining > 0 && (
        <div className="gallery-more">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() =>
              setVisible((v) => Math.min(v + STEP, repairs.length))
            }
          >
            See {Math.min(STEP, remaining)} more
          </button>
        </div>
      )}
    </>
  );
}
