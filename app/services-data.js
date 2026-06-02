// Repair categories shown in the Services section. Each has its own
// /examples/[slug] page that filters the gallery by the matching slug
// (see `categories` on each item in gallery-data.js).

export const categories = [
  {
    slug: "dings-cracks",
    name: "Dings & Cracks",
    desc: "Pressure dings, gouges, and stress cracks sealed watertight.",
    blurb:
      "From small deck dings to deeper gouges and stress cracks — cleaned out, glassed, sanded flush, and sealed watertight so no water gets to the foam.",
  },
  {
    slug: "fin-boxes",
    name: "Fin Boxes & Plugs",
    desc: "Cracked fin boxes and torn-out leash plugs re-set and reinforced.",
    blurb:
      "Cracked or blown-out fin boxes and leash plugs re-set and reinforced — stronger than the day the board was built.",
  },
  {
    slug: "buckles",
    name: "Buckles",
    desc: "Buckled and compressed boards rejoined with a layered glass spine.",
    blurb:
      "Buckled and compression-broken boards rejoined with a layered glass spine that holds up to real surf — not just a patch.",
  },
  {
    slug: "color-matching",
    name: "Color Matching",
    desc: "Repairs blended to your board's original color and finish.",
    blurb:
      "Repairs blended to your board's original color and finish so the fix disappears into the board.",
  },
  {
    slug: "rail-nose",
    name: "Rail & Nose Work",
    desc: "Crunched noses and rail gouges faired back to factory lines.",
    blurb:
      "Crunched noses and chewed-up rails rebuilt and faired back to the board's original lines and foil.",
  },
  {
    slug: "fast-turnaround",
    name: "Fast Turnaround",
    desc: "Most repairs back in your hands within a couple days.",
    blurb:
      "Most repairs turned around within a couple of days — here are a few that went out fast and water-ready.",
  },
];

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug);
}
