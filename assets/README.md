# Photos

All real photos, pulled from @faithandfitness_422 on Instagram (and one
group photo cropped from a post with a verse overlay):

- `assets/logo.jpg` → nav + footer logo (from the Instagram profile photo)
- `assets/hero-1.jpg` … `hero-5.jpg` → homepage hero auto-carousel (candid/current photos, natural aspect ratio — not tied to a specific past class)
- `assets/moments/june-26.jpg`, `july-24.jpg`, `august-28.jpg`, `september-26.jpg` → Past Classes auto-carousel (one real flyer per past class, chronological, 4:5)
- `assets/moments/community.jpg` → portrait group photo next to the Hebrews 10:24 quote
- `assets/merch/tee-orchid.jpg`, `tee-ivory.jpg` → cropped from the merch preorder graphic
- `assets/merch/preorder-graphic.jpg` → the original uncropped merch graphic, kept for reference
- `assets/wordmark-flyer.png` → source art for the OG/link-card image
- `assets/og-image.jpg` → social share link-card image (1200x630)
- `assets/favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png` → browser tab / home-screen icons
- `assets/troika-logo.png` → Troika's own logo (pulled from troikastrengthandfitness.com), used in the membership plug

To replace any of these, drop a new file in and update the matching `<img src>` — no other changes needed.

Both carousels (`.hero-carousel`, `.moments-carousel`) auto-scroll continuously and pause on
wheel/touch/drag interaction, resuming a couple seconds after the user lets go (see
`initAutoScroll` in `js/main.js`). To add a slide, add a new `.auto-slide` block inside the
`.auto-carousel-track` **and** its duplicate later in the same track (content is doubled once
for a seamless loop — keep both copies in sync, same order). Past Classes should only ever hold
one real flyer per actual past class; general/candid photos belong in the hero carousel instead.
