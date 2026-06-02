import WaveDivider from "./WaveDivider";
import { PHONE, PHONE_HREF, EMAIL, IG } from "./contact-info";

export default function SiteContact() {
  return (
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
              Text a photo of the damage for the fastest quote, or reach out any
              of these ways.
            </p>
          </div>

          <div className="contact-grid">
            <a className="contact-card" href={PHONE_HREF}>
              <span>
                <span className="label">Call or Text</span>
                <br />
                <span className="value">{PHONE}</span>
              </span>
            </a>
            <a className="contact-card" href={`mailto:${EMAIL}`}>
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
  );
}
