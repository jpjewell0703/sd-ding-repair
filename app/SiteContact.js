import { PHONE, PHONE_HREF, EMAIL, IG } from "./contact-info";

// Bottom of the page = a surfboard tail, cut off just above a single Futures
// longboard fin box (perforated flange + recessed center channel). The three
// contacts sit as inserts down the channel; each is a link that lights up and
// pops its detail on hover.
const INSERTS = [
  {
    key: "email",
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    y: "24%",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M4 7l8 6 8-6" />
      </>
    ),
  },
  {
    key: "phone",
    label: "Call / Text",
    value: PHONE,
    href: PHONE_HREF,
    y: "50%",
    icon: (
      <path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L17 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
    ),
  },
  {
    key: "insta",
    label: "Instagram",
    value: IG[0].handle,
    href: IG[0].url,
    external: true,
    y: "76%",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      </>
    ),
  },
];

// lamination holes down both flanges of the box
const HOLES = Array.from({ length: 13 }, (_, i) => 34 + i * 24.3);

export default function SiteContact() {
  return (
    <section className="section finbox-contact" id="contact">
      <div className="section-pad">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Get In Touch</span>
            <h2>Let&apos;s fix your board</h2>
            <p>Pick an insert — text a photo of the damage for the fastest quote.</p>
          </div>

          <div className="board-tail">
            {/* the board, cut off just above the box */}
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
                d="M36 4 C 30 70, 56 138, 100 157 C 144 138, 170 70, 164 4 Z"
                fill="url(#boardGrad)"
                stroke="rgba(150,194,255,0.4)"
                strokeWidth="1.3"
              />
              <path
                d="M36 4 C 30 70, 56 138, 100 157"
                fill="none"
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="2"
              />
            </svg>

            {/* Futures longboard fin box */}
            <div className="futures-box">
              <svg
                className="futures-svg"
                viewBox="0 0 90 360"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="flange" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#34373c" />
                    <stop offset="0.5" stopColor="#1c1e22" />
                    <stop offset="1" stopColor="#101115" />
                  </linearGradient>
                  <linearGradient id="channel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#070809" />
                    <stop offset="0.5" stopColor="#16181c" />
                    <stop offset="1" stopColor="#070809" />
                  </linearGradient>
                </defs>
                {/* flange plate */}
                <rect
                  x="3"
                  y="3"
                  width="84"
                  height="354"
                  rx="42"
                  fill="url(#flange)"
                  stroke="rgba(150,194,255,0.28)"
                  strokeWidth="1.2"
                />
                {/* lamination holes down both edges */}
                {HOLES.map((y, i) => (
                  <g key={i}>
                    <circle cx="14" cy={y} r="2.7" fill="#070809" />
                    <circle cx="76" cy={y} r="2.7" fill="#070809" />
                  </g>
                ))}
                {/* end screws */}
                <circle cx="45" cy="20" r="3.2" fill="#0a0b0d" stroke="#3a3d42" strokeWidth="1" />
                <circle cx="45" cy="340" r="3.2" fill="#0a0b0d" stroke="#3a3d42" strokeWidth="1" />
                {/* recessed center channel */}
                <rect
                  x="31"
                  y="30"
                  width="28"
                  height="300"
                  rx="14"
                  fill="url(#channel)"
                  stroke="rgba(0,0,0,0.8)"
                  strokeWidth="1.5"
                />
                <rect
                  x="34"
                  y="33"
                  width="22"
                  height="294"
                  rx="11"
                  fill="none"
                  stroke="rgba(150,194,255,0.12)"
                  strokeWidth="1"
                />
              </svg>

              {INSERTS.map((it) => (
                <a
                  key={it.key}
                  className="fbox-insert"
                  style={{ "--y": it.y }}
                  href={it.href}
                  {...(it.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-label={`${it.label}: ${it.value}`}
                >
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
                      {it.icon}
                    </svg>
                  </span>
                  <span className="fbox-pop">
                    <strong>{it.label}</strong>
                    {it.value}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
