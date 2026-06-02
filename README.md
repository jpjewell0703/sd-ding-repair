# SD Ding Repair

Surfboard ding & damage repair — San Diego. Marketing site with an interactive
before/after gallery and contact info.

Built with **Next.js** (App Router) and deployed on **Vercel**.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Adding real before/after photos

1. Drop two images into `public/gallery/`, e.g. `board1-before.jpg` and
   `board1-after.jpg`.
2. Open `app/gallery-data.js` and set the matching entry's `before` and `after`
   to those paths:

   ```js
   { id: 1, title: "...", tag: "...", desc: "...",
     before: "/gallery/board1-before.jpg",
     after:  "/gallery/board1-after.jpg" },
   ```

3. Add as many entries to the `repairs` array as you like. Any entry left with
   `before: null` / `after: null` shows a styled placeholder.

Push to `main` and Vercel redeploys automatically.

## Contact info

Phone, email, and the two Instagram handles live at the top of `app/page.js`.
