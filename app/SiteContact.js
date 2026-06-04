import { PHONE, PHONE_HREF, EMAIL, IG } from "./contact-info";

// Bottom of the page = the tail half of a surfboard, flipped upside down so the
// three thruster fins point up. Each fin box is a contact link that sways like
// it's cutting water and pops its detail on hover.
const FINS = [
  {
    key: "email",
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    x: "33%",
    y: "70%",
    r: "-15deg",
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
    y: "80%",
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
    x: "67%",
    y: "70%",
    r: "15deg",
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
            <p>Pick a fin — text a photo of the damage for the fastest quote.</p>
          </div>

          <div className="board-tail">
            <svg
              className="board-tail-svg"
              viewBox="0 0 200 320"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="boardGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#1b3056" />
                  <stop offset="0.5" stopColor="#122a4e" />
                  <stop offset="1" stopColor="#0c1d3a" />
                </linearGradient>
              </defs>
              <path
                d="M40 0 C 33 120, 52 250, 100 304 C 148 250, 167 120, 160 0 Z"
                fill="url(#boardGrad)"
                stroke="rgba(150,194,255,0.35)"
                strokeWidth="1.5"
              />
              {/* stringer */}
              <line
                x1="100"
                y1="2"
                x2="100"
                y2="300"
                stroke="rgba(174,203,245,0.45)"
                strokeWidth="1.5"
              />
              {/* rail sheen */}
              <path
                d="M40 0 C 33 120, 52 250, 100 304"
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="2"
              />
            </svg>

            {FINS.map((f) => (
              <a
                key={f.key}
                className="fin"
                style={{ "--x": f.x, "--y": f.y, "--r": f.r }}
                href={f.href}
                {...(f.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <span className="fin-pop">{f.value}</span>
                <span className="fin-shape">
                  <svg viewBox="0 0 96 150" aria-hidden="true">
                    <defs>
                      <linearGradient id={`fin-${f.key}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#cdddf6" />
                        <stop offset="1" stopColor="#7ea6e8" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M22 150 C 9 95, 26 24, 71 13 C 77 60, 70 120, 75 150 Z"
                      fill={`url(#fin-${f.key})`}
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <svg
                    className="fin-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {f.icon}
                  </svg>
                </span>
                <span className="fin-tip">{f.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
