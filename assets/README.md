# Photos

All real photos, pulled from @faithandfitness_422 on Instagram (and one
group photo cropped from a post with a verse overlay):

- `assets/logo.jpg` → nav + footer logo (from the Instagram profile photo)
- `assets/hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg` → homepage hero carousel (3 slides, 4:3 crop)
- `assets/moments/july-24.jpg`, `august-28.jpg`, `september-26.jpg` → Past Classes carousel (flyer graphics)
- `assets/moments/community.jpg` → portrait group photo next to the Hebrews 10:24 quote
- `assets/merch/tee-orchid.jpg`, `tee-ivory.jpg` → cropped from the merch preorder graphic
- `assets/merch/preorder-graphic.jpg` → the original uncropped merch graphic, kept for reference
- `assets/wordmark-flyer.png` → source art for the OG/link-card image
- `assets/og-image.jpg` → social share link-card image (1200x630)
- `assets/favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png` → browser tab / home-screen icons

To replace any of these, drop a new file in and update the matching `<img src>` — no other changes needed. To add a slide to either carousel, add a new `.carousel-slide` block inside the matching `.carousel-track` in `index.html` — the carousel JS auto-detects slide count.
