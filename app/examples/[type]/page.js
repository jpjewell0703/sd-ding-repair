import { notFound } from "next/navigation";
import BeforeAfter from "../../BeforeAfter";
import Reveal from "../../Reveal";
import SiteNav from "../../SiteNav";
import SiteContact from "../../SiteContact";
import SiteFooter from "../../SiteFooter";
import { categories, getCategory } from "../../services-data";
import { getRepairsByCategory } from "../../gallery-data";

export function generateStaticParams() {
  return categories.map((c) => ({ type: c.slug }));
}

export async function generateMetadata({ params }) {
  const { type } = await params;
  const cat = getCategory(type);
  if (!cat) return {};
  return {
    title: `${cat.name} — SD Ding Repair`,
    description: cat.desc,
  };
}

export default async function ExamplesPage({ params }) {
  const { type } = await params;
  const cat = getCategory(type);
  if (!cat) notFound();

  const items = getRepairsByCategory(type);

  return (
    <>
      <div className="wave-bg" aria-hidden="true" />

      <SiteNav />

      <header className="page-hero">
        <div className="container">
          <a href="/#services" className="back-link">
            ← All services
          </a>
          <span className="eyebrow">Before &amp; After</span>
          <h1>{cat.name}</h1>
          <p className="sub">{cat.blurb}</p>
        </div>
      </header>

      <section className="section" style={{ color: "var(--foam)" }}>
        <div className="section-pad">
          <div className="container">
            {items.length > 0 ? (
              <div className="gallery-grid">
                {items.map((r, i) => (
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
            ) : (
              <p style={{ textAlign: "center", color: "var(--muted)" }}>
                More examples coming soon — reach out below and I&apos;ll send
                photos of past work.
              </p>
            )}

            <div className="services-cta">
              <a href="/#gallery" className="btn btn-ghost-dark">
                See the full gallery
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
