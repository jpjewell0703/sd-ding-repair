import { PHONE, PHONE_HREF, EMAIL, IG } from "./contact-info";

// Bottom of the page = a surfboard tail (squash tail) cut off just above a
// 2+1 fin setup: two toed-in Futures rail boxes + one center box. Each box is a
// contact link — hover lights the box and pops its detail.
const BOXES = [
  {
    key: "email",
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    x: "39%",
    y: "47%",
    rot: "8deg",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M4 7l8 6 8-6" />
      </>
    ),
  },
  {
    key: "insta",
    label: "Instagram",
    value: IG[0].handle,
    href: IG[0].url,
    external: true,
    x: "61%",
    y: "47%",
    rot: "-8deg",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    key: "phone",
    label: "Call / Text",
    value: PHONE,
    href: PHONE_HREF,
    x: "50%",
    y: "67%",
    rot: "0deg",
    icon: (
      <path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L17 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
    ),
  },
];

// lamination holes down both flanges of each box
const HOLES = Array.from({ length: 6 }, (_, i) => 24 + i * 20.4);

function FinBox({ box }) {
  return (
    <a
      className="finbox"
      style={{ "--x": box.x, "--y": box.y, "--rot": box.rot }}
      href={box.href}
      {...(box.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      aria-label={`${box.label}: ${box.value}`}
    >
      <svg className="finbox-svg" viewBox="0 0 44 150" aria-hidden="true">
        <defs>
          <linearGradient id={`flange-${box.key}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#34373c" />
            <stop offset="0.5" stopColor="#191b1f" />
            <stop offset="1" stopColor="#0d0e11" />
          </linearGradient>
          <linearGradient id={`chan-${box.key}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#060708" />
            <stop offset="0.5" stopColor="#15171b" />
            <stop offset="1" stopColor="#060708" />
          </linearGradient>
        </defs>
        {/* flange plate */}
        <rect
          x="3"
          y="3"
          width="38"
          height="144"
          rx="19"
          fill={`url(#flange-${box.key})`}
          stroke="rgba(150,194,255,0.28)"
          strokeWidth="1.1"
        />
        {/* lamination holes down both edges */}
        {HOLES.map((y, i) => (
          <g key={i}>
            <circle cx="11" cy={y} r="2.3" fill="#060708" />
            <circle cx="33" cy={y} r="2.3" fill="#060708" />
          </g>
        ))}
        {/* end screws */}
        <circle cx="22" cy="13" r="2.8" fill="#0a0b0d" stroke="#3a3d42" strokeWidth="0.9" />
        <circle cx="22" cy="137" r="2.8" fill="#0a0b0d" stroke="#3a3d42" strokeWidth="0.9" />
        {/* recessed center channel */}
        <rect
          x="15"
          y="18"
          width="14"
          height="114"
          rx="7"
          fill={`url(#chan-${box.key})`}
          stroke="rgba(0,0,0,0.85)"
          strokeWidth="1.3"
        />
        <rect
          x="17"
          y="20"
          width="10"
          height="110"
          rx="5"
          fill="none"
          stroke="rgba(150,194,255,0.12)"
          strokeWidth="0.9"
        />
      </svg>

      {/* icon disc seated in the channel (kept upright when the box is toed in) */}
      <span className="fbox-disc">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {box.icon}
        </svg>
      </span>

      {/* detail pops up above the box on hover */}
      <span className="fbox-pop">
        <strong>{box.label}</strong>
        {box.value}
      </span>
    </a>
  );
}

export default function SiteContact() {
  return (
    <section className="section finbox-contact" id="contact">
      <div className="section-pad">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Get In Touch</span>
            <h2>Let&apos;s fix your board</h2>
            <p>Tap a fin box — text a photo of the damage for the fastest quote.</p>
          </div>

          <div className="board-tail">
            {/* squash-tail board, cut off just above the fin boxes */}
            <svg
              className="board-tail-svg"
              viewBox="0 0 200 160"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="boardGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#1c3258" />
                  <stop offset="0.5" stopColor="#13294c" />
                  <stop offset="1" stopColor="#0c1d3a" />
                </linearGradient>
              </defs>
              <path
                d="M40 4 C 33 55, 45 110, 60 138 Q 64 150, 78 150 L 122 150 Q 136 150, 140 138 C 155 110, 167 55, 160 4 Z"
                fill="url(#boardGrad)"
                stroke="rgba(150,194,255,0.4)"
                strokeWidth="1.3"
              />
              {/* stringer */}
              <line
                x1="100"
                y1="4"
                x2="100"
                y2="150"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="1.2"
              />
              {/* rail gloss */}
              <path
                d="M40 4 C 33 55, 45 110, 60 138 Q 64 150, 78 150"
                fill="none"
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="2"
              />
            </svg>

            {BOXES.map((box) => (
              <FinBox key={box.key} box={box} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
