import "./globals.css";
import SmoothScroll from "./SmoothScroll";
import FancyFX from "./FancyFX";
import IntroLoader from "./IntroLoader";

export const metadata = {
  title: "SD Ding Repair — Surfboard Ding & Damage Repair in San Diego",
  description:
    "Professional surfboard ding repair in San Diego. Cracks, dings, fin boxes, snaps — fixed clean and water-ready. See before & afters.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "SD Ding Repair",
    description: "Professional surfboard ding repair in San Diego.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <IntroLoader />
        <SmoothScroll />
        <div className="grain" aria-hidden="true" />
        <FancyFX />
        {children}
      </body>
    </html>
  );
}
