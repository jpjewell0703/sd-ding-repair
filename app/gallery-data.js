// Gallery items. Photos live in /public/gallery.
// `categories` link an item to the Services categories in services-data.js,
// which drives the /examples/[slug] pages.
// To add a real repair: drop a *-before / *-after pair into /public/gallery and
// add an entry here. Any entry with before/after = null shows a placeholder.

export const repairs = [
  {
    id: 1,
    title: "Massive Tail Damage",
    tag: "Full Restore",
    desc: "Heavily caved-in tail rebuilt, re-glassed, and faired back to a clean line.",
    before: "/gallery/massivetail.before.jpg",
    after: "/gallery/massivetail.after.jpg",
    categories: ["buckles", "dings-cracks"],
  },
  {
    id: 2,
    title: "Buckle / Compression Break",
    tag: "Buckle Repair",
    desc: "Buckled deck reinforced with a layered glass spine — back in the water solid.",
    before: "/gallery/buckle.before.jpg",
    after: "/gallery/buckle.after.jpg",
    categories: ["buckles"],
  },
  {
    id: 3,
    title: "Big Rail Ding",
    tag: "Rail Repair",
    desc: "Deep rail gouge filled, faired, and polished smooth.",
    before: "/gallery/bigraildingbefore.jpg",
    after: "/gallery/bigraildingafter.jpg",
    categories: ["rail-nose", "dings-cracks"],
  },
  {
    id: 4,
    title: "Crushed Rail",
    tag: "Rail Repair",
    desc: "Crushed rail section rebuilt and re-shaped to the original foil.",
    before: "/gallery/crushedrail.before.jpg",
    after: "/gallery/crushedrail.after.jpg",
    categories: ["rail-nose", "dings-cracks"],
  },
  {
    id: 5,
    title: "Nose Ding — Color Matched",
    tag: "Color Match",
    desc: "Nose ding repaired and blended to the board's original color.",
    before: "/gallery/nosedingcolormatch.before.jpg",
    after: "/gallery/nosedingcolormatch.after.jpg",
    categories: ["color-matching", "rail-nose", "dings-cracks"],
  },
  {
    id: 6,
    title: "Rail Repair — Color Matched",
    tag: "Color Match",
    desc: "Rail damage fixed and color-matched so the repair disappears.",
    before: "/gallery/railcolormatch.before.jpg",
    after: "/gallery/railcolormatch.after.jpg",
    categories: ["color-matching", "rail-nose"],
  },
  {
    id: 7,
    title: "Leash Plug Blowout",
    tag: "Leash Plug",
    desc: "Torn-out leash plug re-set and reinforced — stronger than new.",
    before: "/gallery/leashplug.before.jpg",
    after: "/gallery/leashplug.after.jpg",
    categories: ["fin-boxes", "fast-turnaround"],
  },
  {
    id: 8,
    title: "Tail Ding",
    tag: "Tail Repair",
    desc: "Chipped tail rebuilt and sealed watertight.",
    before: "/gallery/tailding.before.jpg",
    after: "/gallery/tailding.after.jpg",
    categories: ["dings-cracks", "fast-turnaround"],
  },
  {
    id: 9,
    title: "Rail Ding",
    tag: "Rail Repair",
    desc: "Classic rail ding cleaned up, glassed, and sanded flush.",
    before: "/gallery/railding.before.jpg",
    after: "/gallery/railding.after.jpg",
    categories: ["rail-nose", "dings-cracks", "fast-turnaround"],
  },
  {
    id: 10,
    title: "Tail Rebuild",
    tag: "Tail Repair",
    desc: "Damaged tail rebuilt, re-glassed, and faired back to a clean line.",
    before: "/gallery/newtail.before.jpg",
    after: "/gallery/newtail.after.jpg",
    categories: ["dings-cracks", "fast-turnaround"],
  },
];

export function getRepairsByCategory(slug) {
  return repairs.filter((r) => r.categories?.includes(slug));
}
