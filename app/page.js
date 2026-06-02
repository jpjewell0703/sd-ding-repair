import BeforeAfter from "./BeforeAfter";
import Reveal from "./Reveal";
import { repairs } from "./gallery-data";

const PHONE = "609 705 8530";
const PHONE_HREF = "tel:+16097058530";
const EMAIL = "dingrepairsd@gmail.com";
const IG = [
  { handle: "@ucsddingrepair", url: "https://instagram.com/ucsddingrepair" },
  { handle: "@sdsudingrepair", url: "https://instagram.com/sdsudingrepair" },
];

function WaveDivider({ flip }) {
  return (
    <svg
      className="wave-divider"
      viewBox="0 0 1440 70"
      preserveAspectRatio="none"
      style={flip ? { transform: "scaleY(-1)" } : undefined}
      aria-hidden="true"
    >
      <path
        d="M0,32 C240,72 480,0 720,24 C960,48 1200,80 1440,40 L1440,70 L0,70 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <div className="wave-bg" aria-hidden="true" />

      {/* NAV */}
      <nav className="nav">
        <div className="container nav-inner">
          <a href="#top" className="brand">
            <span className="board">🏄</span> SD Ding Repair
          </a>
          <div className="nav-links">
            <a href="#gallery">Gallery</a>
            <a href="#services">Services</a>
            <a href="#contact" className="nav-cta">
              Get a Quote
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero" id="top">
        <div className="container">
          <span className="eyebrow">San Diego · Surfboard Ding Repair</span>
          <h1>
            Cracked, dinged, or snapped?
            <br />
            <span className="accent">Back in the water, fast.</span>
          </h1>
          <p className="sub">
            Clean, strong, color-matched repairs for every kind of board — from
            pressure dings to full snaps. Slide through the before &amp; afters.
          </p>
          <div className="hero-ctas">
            <a href="#contact" className="btn btn-primary">
              Get a Free Quote
            </a>
            <a href="#gallery" className="btn btn-ghost">
              See the Work ↓
            </a>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="num">100+</div>
              <div className="label">Boards Fixed</div>
            </div>
            <div className="stat">
              <div className="num">48hr</div>
              <div className="label">Avg Turnaround</div>
            </div>
          </div>
        </div>
      </header>

      {/* GALLERY */}
      <section className="section" id="gallery" style={{ color: "var(--foam)" }}>
        <div style={{ color: "var(--foam)" }}>
          <WaveDivider />
        </div>
        <div className="section-pad">
          <div className="container">
            <div className="section-head">
              <span className="kicker">Before &amp; After</span>
              <h2>Drag the slider. See the difference.</h2>
              <p>
                Every board comes in with a story. Grab a handle and slide to
                reveal the fix — left is the damage, right is the result.
              </p>
            </div>

            <div className="gallery-grid">
              {repairs.map((r, i) => (
                <Reveal key={r.id} delay={(i % 3) * 90}>
                  <article className="card">
                    <BeforeAfter
                      before={r.before}
                      after={r.after}
                      title={r.title}
                    />
                    <div className="card-body">
                      <span className="tag">{r.tag}</span>
                      <h3>{r.title}</h3>
                      <p>{r.desc}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section alt" id="services">
        <div className="section-pad">
          <div className="container">
            <div className="section-head">
              <span className="kicker">What I Fix</span>
              <h2>Every ding has a fix</h2>
              <p>
                Poly or epoxy, soft-top or high-performance — if it surfs, it can
                be saved.
              </p>
            </div>
            <div className="services-grid">
              {[
                ["💥", "Dings & Cracks", "Pressure dings, gouges, and stress cracks sealed watertight."],
                ["🛟", "Fin Boxes & Plugs", "Cracked or torn-out fin boxes re-set and reinforced."],
                ["🪚", "Snaps & Breaks", "Full breaks rejoined with a layered glass spine."],
                ["🎨", "Color Matching", "Repairs blended to your board's original color and finish."],
                ["🌊", "Rail & Nose Work", "Crunched noses and rail gouges faired back to factory lines."],
                ["⚡", "Fast Turnaround", "Most repairs back in your hands within a couple days."],
              ].map(([ic, h, p], i) => (
                <Reveal key={h} delay={(i % 3) * 80}>
                  <div className="service">
                    <div className="ic">{ic}</div>
                    <h3>{h}</h3>
                    <p>{p}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact" id="contact">
        <div style={{ color: "#073642" }}>
          <WaveDivider flip />
        </div>
        <div className="section-pad">
          <div className="container">
            <div className="section-head">
              <span className="kicker" style={{ color: "var(--teal-glow)" }}>
                Get In Touch
              </span>
              <h2 style={{ color: "var(--foam)" }}>Let&apos;s fix your board</h2>
              <p style={{ color: "rgba(247,251,251,0.78)" }}>
                Text a photo of the damage for the fastest quote, or reach out
                any of these ways.
              </p>
            </div>

            <div className="contact-grid">
              <a className="contact-card" href={PHONE_HREF}>
                <span className="ic">📞</span>
                <span>
                  <span className="label">Call or Text</span>
                  <br />
                  <span className="value">{PHONE}</span>
                </span>
              </a>
              <a className="contact-card" href={`mailto:${EMAIL}`}>
                <span className="ic">✉️</span>
                <span>
                  <span className="label">Email</span>
                  <br />
                  <span className="value">{EMAIL}</span>
                </span>
              </a>
              {IG.map((ig) => (
                <a
                  key={ig.handle}
                  className="contact-card"
                  href={ig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="ic">📸</span>
                  <span>
                    <span className="label">Instagram</span>
                    <br />
                    <span className="value">{ig.handle}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="socials">
            <a href={PHONE_HREF}>Call</a>
            <a href={`mailto:${EMAIL}`}>Email</a>
            {IG.map((ig) => (
              <a key={ig.handle} href={ig.url} target="_blank" rel="noopener noreferrer">
                {ig.handle}
              </a>
            ))}
          </div>
          <div>
            © {new Date().getFullYear()} SD Ding Repair · San Diego, CA · Surfboard
            Ding &amp; Damage Repair
          </div>
        </div>
      </footer>
    </>
  );
}
