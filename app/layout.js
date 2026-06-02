import "./globals.css";

export const metadata = {
  title: "SD Ding Repair — Surfboard Ding & Damage Repair in San Diego",
  description:
    "Professional surfboard ding repair in San Diego. Cracks, dings, fin boxes, snaps — fixed clean and water-ready. See before & afters.",
  openGraph: {
    title: "SD Ding Repair",
    description: "Professional surfboard ding repair in San Diego.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
