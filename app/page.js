import GalleryGrid from "./GalleryGrid";
import HeroBoard3D from "./HeroBoard3D";
import Reveal from "./Reveal";
import SiteNav from "./SiteNav";
import SiteContact from "./SiteContact";
import SiteFooter from "./SiteFooter";
import { repairs } from "./gallery-data";
import { categories } from "./services-data";

const steps = [
  "Send me a photo through any of the contact methods.",
  "Get your quote.",
  "Receive instructions and decide whether you want me to pick your board up, or if you'd rather drop your board off to me.",
  "Have your board repaired in 3 days or less.",
  "Pick up your board and pay after the repair.",
  "Tell your friends!!!",
];

export default function Home() {
  return (
    <>
      <div className="wave-bg" aria-hidden="true" />

      <SiteNav />

      {/* HERO */}
      <header className="hero" id="top">
        <HeroBoard3D />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">San Diego · Surfboard Ding Repair</span>
          <h1>
            Any ding fixed
            <br />
            <span className="accent">fast, strong, and cheap.</span>
          </h1>
          <p className="sub">
            Every kind of board, always strong and color matched — slide through
            the before &amp; afters.
          </p>
          <div className="hero-ctas">
            <span className="cta-stack">
              <a href="#contact" className="btn btn-primary">
                Get a Free Quote
              </a>
              <span className="cta-sub">contact</span>
            </span>
            <a href="#gallery" className="btn btn-ghost">
              See the Work
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

            <GalleryGrid repairs={repairs} />
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
                Poly and epoxy, soft-top and high-performance — if it surfs, it can
                be saved. Tap a category to see real before &amp; afters.
              </p>
            </div>
            <div className="services-grid">
              {categories.map((c, i) => (
                <Reveal key={c.slug} delay={(i % 3) * 80}>
                  <div className="service">
                    <h3>{c.name}</h3>
                    <p>{c.desc}</p>
                    <a className="service-link" href={`/examples/${c.slug}`}>
                      See examples →
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="services-cta">
              <a href="#gallery" className="btn btn-primary">
                Everything else → full gallery
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how-it-works" style={{ color: "var(--foam)" }}>
        <div className="section-pad">
          <div className="container">
            <div className="section-head">
              <span className="kicker">How It Works</span>
              <h2>From ding to dialed in 6 easy steps</h2>
              <p>
                No guesswork. Here&apos;s exactly what happens from the moment you
                reach out to the day you&apos;re back in the water.
              </p>
            </div>

            <ol className="steps-grid">
              {steps.map((s, i) => (
                <Reveal key={i} delay={(i % 3) * 80}>
                  <li className="step">
                    <span className="step-num">{i + 1}</span>
                    <p>{s}</p>
                  </li>
                </Reveal>
              ))}
            </ol>

            <div className="services-cta">
              <a href="#contact" className="btn btn-primary">
                Send a Photo &amp; Get Your Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteContact />
      <SiteFooter />
    </>
  );
}
