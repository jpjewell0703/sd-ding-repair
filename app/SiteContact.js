import { PHONE, PHONE_HREF, EMAIL, IG } from "./contact-info";

// Bottom of the page = the tail of a surfboard, cut off just above three
// FCS II-style fin boxes (single sleek slots). No fins — each empty box wears
// its contact logo and is a link that lights up + pops its detail on hover.
const BOXES = [
  {
    key: "email",
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    x: "37%",
    y: "40%",
    r: "-12deg",
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
    x: "50%",
    y: "58%",
    r: "0deg",
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
    x: "63%",
    y: "40%",
    r: "12deg",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      </>
    ),
  },
];

export default function SiteContact() {
  return (
    <section className="section finbox-contact" id="contact">
      <div className="section-pad">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Get In Touch</span>
            <h2>Let&apos;s fix your board</h2>
            <p>Pick a box — text a photo of the damage for the fastest quote.</p>
          </div>

          <div className="board-tail">
            <svg
              className="board-tail-svg"
              viewBox="0 0 200 150"
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
              {/* tail cut off just above the boxes (flat top edge) */}
              <path
                d="M34 4 C 28 60, 54 126, 100 145 C 146 126, 172 60, 166 4 Z"
                fill="url(#boardGrad)"
                stroke="rgba(150,194,255,0.4)"
                strokeWidth="1.4"
              />
              <line
                x1="100"
                y1="6"
                x2="100"
                y2="140"
                stroke="rgba(174,203,245,0.4)"
                strokeWidth="1.4"
              />
              {/* rail sheen */}
              <path
                d="M34 4 C 28 60, 54 126, 100 145"
                fill="none"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="2"
              />
            </svg>

            {BOXES.map((b) => (
              <a
                key={b.key}
                className="fcs-box"
                style={{ "--x": b.x, "--y": b.y, "--r": b.r }}
                href={b.href}
                {...(b.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                aria-label={`${b.label}: ${b.value}`}
              >
                <span className="fcs-pop">{b.value}</span>
                <span className="fcs-slot">
                  {/* FCS II look: one sleek slot, front cavity larger than back */}
                  <span className="fcs-cav fcs-cav-front">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {b.icon}
                    </svg>
                  </span>
                  <span className="fcs-cav fcs-cav-back" />
                </span>
                <span className="fcs-tip">{b.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
