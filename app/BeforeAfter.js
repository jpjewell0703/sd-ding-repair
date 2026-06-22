"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";

// Gallery cards sit in a grid up to 3 wide on desktop, full width on phones.
const BA_SIZES = "(max-width: 640px) 90vw, 400px";

// Interactive draggable before/after comparison slider.
// Falls back to colored placeholders when no image URLs are provided.
export default function BeforeAfter({ before, after, title }) {
  const [pos, setPos] = useState(90);
  const ref = useRef(null);
  // Track the active drag explicitly instead of trusting e.buttons, which some
  // browsers/devices report unreliably and can leave the handle stuck to the
  // cursor after the press ends.
  const dragging = useRef(false);
  const setFromClientX = useCallback((clientX) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  const onDown = (e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };
  const endDrag = (e) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };
  return (
    <div
      className="ba"
      ref={ref}
      style={{ "--pos": `${pos}%`, touchAction: "none" }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onLostPointerCapture={endDrag}
      role="slider"
      aria-label={`Before and after: ${title}`}
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
      }}
    >
      {/* After (full, underneath) */}
      <div className="ba-img ba-after">
        {after ? (
          <Image src={after} alt={`${title} after repair`} fill sizes={BA_SIZES} />
        ) : (
          "AFTER"
        )}
      </div>

      {/* Before (clipped, on top) */}
      <div className="ba-img ba-before">
        {before ? (
          <Image src={before} alt={`${title} before repair`} fill sizes={BA_SIZES} />
        ) : (
          "BEFORE"
        )}
      </div>

      <span className="ba-label before">BEFORE</span>
      <span className="ba-label after">AFTER</span>

      <div className="ba-handle">
        <span className="ba-knob">⇄</span>
      </div>
    </div>
  );
}
