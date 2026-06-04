import BeforeAfter from "./BeforeAfter";
import HeroMontage from "./HeroMontage";
import HeroBoard3D from "./HeroBoard3D";
import Reveal from "./Reveal";
import SiteNav from "./SiteNav";
import SiteContact from "./SiteContact";
import SiteFooter from "./SiteFooter";
import { repairs } from "./gallery-data";
import { categories } from "./services-data";

export default function Home() {
  return (
    <>
      <div className="wave-bg" aria-hidden="true" />

      <SiteNav />

      {/* HERO */}
      <header className="hero" id="top">
        <HeroMontage />
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
            <a href="#contact" className="btn btn-primary">
              Get a Free Quote
            </a>
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

      <SiteContact />
      <SiteFooter />
    </>
  );
}
