# SplitHero Component Spec

## Purpose
Full-width hero section with autoplay video background.

## Key Features
- Video background (mp4) with poster image fallback
- Full viewport width (offset for edge-to-edge)
- 75vh height (desktop), 100dvh (mobile)
- Border-bottom separator

## Responsive
- Desktop: 75vh
- Mobile (≤768px): 100dvh
- Uses `100dvh` for mobile dynamic viewport

## Rendering Considerations
- Video has `preload="auto"` and `poster` for LCP
- `fetchpriority="high"` on poster image
- No CLS: fixed height via `height` property
