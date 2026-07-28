# Project media

Every project card and case-study page renders a laptop or phone frame. Until a
real capture exists, the frame shows an abstract interface schematic. Drop files
here and the frame shows the actual product instead — no component changes
needed, just one edit in `src/lib/projectsData.ts`.

## 1. Record

Aim for **6–10 seconds** of a single meaningful flow, not a tour. Login →
dashboard → one real action beats scrolling through five screens.

- Web: Chrome DevTools → Cmd/Ctrl+Shift+P → "Capture screenshot" for the still;
  OBS or `ffmpeg -f x11grab` for the clip. Record at 1600×1000 (16:10).
- Mobile: `adb shell screenrecord` on Android, or QuickTime with a cable on iOS.
  Record at the device's native 9:19 aspect.

Use seeded/demo data. Never record real client data, customer names, or
credentials — this ends up on a public site.

## 2. Encode

```bash
SLUG=onebotads   # folder name = project slug

mkdir -p public/media/$SLUG

# Poster (also the video's first frame — keep them consistent)
ffmpeg -i raw.mov -vframes 1 -vf "scale=1600:-2" -q:v 3 public/media/$SLUG/poster.jpg

# WebM (VP9) — the primary, smallest file
ffmpeg -i raw.mov -an -t 10 -vf "scale=1600:-2,fps=30" \
  -c:v libvpx-vp9 -crf 34 -b:v 0 -g 30 public/media/$SLUG/demo.webm

# MP4 (H.264) — Safari fallback, also required for iOS autoplay
ffmpeg -i raw.mov -an -t 10 -vf "scale=1600:-2,fps=30" \
  -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart \
  public/media/$SLUG/demo.mp4
```

`-an` strips audio, which is what makes the clip eligible for muted autoplay.
`-g 30` keeps keyframes dense so scrubbing and looping stay smooth. Target under
**2 MB** per clip; if you are over, drop to `fps=24` or raise `-crf`.

## 3. Wire it up

In `src/lib/projectsData.ts`, add a `media` block to the project:

```ts
'onebotads': {
  // ...
  media: {
    poster: '/media/onebotads/poster.jpg',
    video: '/media/onebotads/demo.webm',
    alt: 'OneBotAds campaign dashboard syncing Meta and Google Ads data',
  },
},
```

The video only decodes while its device is on screen, is muted, loops, and is
skipped entirely for visitors with `prefers-reduced-motion` — they get the
poster.

## Priority

Do these three first; they carry the most weight with a recruiter:

1. `onebotads` — the SaaS console
2. `bricol-clic` — the marketplace, has a public repo to cross-reference
3. `obbo-mobile` — the one with a real impact number attached
