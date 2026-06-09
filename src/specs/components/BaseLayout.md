# BaseLayout Component Spec

## Purpose
Root layout wrapping all pages. Contains header, footer, cart modal, lightbox, WhatsApp float, noise overlay, and analytics.

## Key Features
- Fixed header with glass effect
- Desktop nav (inline) + mobile nav (slide-in panel)
- Cart toggle with badge
- Language switcher (ES/EN)
- Footer with contact info, hours, social links
- CartModal + Lightbox overlays
- WhatsApp floating button
- Noise texture overlay
- Vercel Analytics + Speed Insights
- GSAP ScrollTrigger for scroll effects

## Tokens Used
- Colors: all `--color-*` tokens
- Typography: `--font-heading`, `--font-body`, `--font-accent`
- Spacing: `--space-xs` through `--space-xl`
- Radius: `--radius-sm`, `--radius-md`
- Shadows: `--shadow-hard`, `--shadow-glass`, `--shadow-glass-lg`, `--shadow-inset-sm`
- Z-index: all `--ds-z-*` tokens
- Motion: `--motion-*` tokens

## Responsive Breakpoints
- 768px: mobile nav appears, header adjusts
- 480px: further mobile adjustments

## Rendering Considerations
- FOIT: Google Fonts with `display=swap`, preload Caveat fonts
- FOUC: Critical CSS inlined, deferred external CSS
- CLS: aspect-ratio on images, min-height on dynamic slots
- Font smoothing: `-webkit-font-smoothing: antialiased`
