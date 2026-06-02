import { PHONE_HREF, EMAIL, IG } from "./contact-info";

export default function SiteFooter() {
  return (
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
        <div style={{ marginTop: "0.4rem", opacity: 0.8 }}>
          A Sigma Sigma Holdings LLC company
        </div>
      </div>
    </footer>
  );
}
