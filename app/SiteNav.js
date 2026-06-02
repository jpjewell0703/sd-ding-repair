// Site nav. Uses root-relative anchors so the links work from the home page
// and from the /examples/* pages alike.
export default function SiteNav() {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="/" className="brand">
          <img
            className="board"
            src="/logo.svg"
            alt="SD Ding Repair logo"
            width="40"
            height="40"
          />
          SD Ding Repair
        </a>
        <div className="nav-links">
          <a href="/#gallery">Gallery</a>
          <a href="/#services">Services</a>
          <a href="/#contact" className="nav-cta">
            Get a Quote
          </a>
        </div>
      </div>
    </nav>
  );
}
