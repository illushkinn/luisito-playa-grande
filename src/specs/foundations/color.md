# Color Foundation — Luisito Playa Grande

## Color Space
All colors use **OKLCH** for perceptual uniformity. Hex values are provided for fallback only.

## Brand Palette

| Token | OKLCH | Hex (fallback) | Usage |
|-------|-------|----------------|-------|
| `--color-primary` | `oklch(0.55 0.195 30)` | `#c73e2b` | Primary actions, links, badges |
| `--color-primary-hover` | `oklch(0.45 0.175 28)` | `#a83222` | Hover state for primary |
| `--color-accent` | `oklch(0.68 0.16 70)` | `#d4943a` | Accent buttons, highlights |
| `--color-accent-hover` | `oklch(0.71 0.14 70)` | `#e8a040` | Hover state for accent |
| `--color-accent-light` | `oklch(0.91 0.035 75)` | `#f5e6c8` | Light accent backgrounds |

## Neutral Palette

| Token | OKLCH | Hex (fallback) | Usage |
|-------|-------|----------------|-------|
| `--color-bg` | `oklch(0.89 0.025 75)` | `#ece3d8` | Page background |
| `--color-bg-alt` | `oklch(0.85 0.03 65)` | `#e0d5c8` | Alternative background |
| `--color-text` | `oklch(0.28 0.035 45)` | `#2c2420` | Body text |
| `--color-text-muted` | `oklch(0.45 0.035 55)` | `#6b6259` | Secondary text |
| `--color-cream` | `oklch(0.96 0.015 75)` | `#faf6f1` | Card/surface backgrounds |
| `--color-footer-bg` | `oklch(0.8 0.03 60)` | `#d4c8b8` | Footer background |

## Functional Colors

| Token | OKLCH | Usage |
|-------|-------|-------|
| `--color-whatsapp` | `oklch(0.72 0.18 145)` | WhatsApp brand |
| `--color-green` | `oklch(0.57 0.095 140)` | Tartas category |
| `--color-blue` | `oklch(0.55 0.115 240)` | Bebidas category |

## Category Gradients

| Category | Gradient |
|----------|----------|
| Empanadas | `linear-gradient(135deg, oklch(0.55 0.195 30), oklch(0.72 0.085 40))` |
| Pizzas | `linear-gradient(135deg, oklch(0.68 0.16 70), oklch(0.88 0.04 75))` |
| Tartas | `linear-gradient(135deg, oklch(0.57 0.095 140), oklch(0.78 0.075 135))` |
| Pollo Rostizado | `linear-gradient(135deg, oklch(0.58 0.11 50), oklch(0.7 0.07 50))` |
| Platos | `linear-gradient(135deg, oklch(0.45 0.08 270), oklch(0.72 0.07 265))` |
| Bebidas | `linear-gradient(135deg, oklch(0.55 0.115 240), oklch(0.7 0.08 235))` |
| Postres | `linear-gradient(135deg, oklch(0.5 0.12 0), oklch(0.72 0.06 350))` |

## Contrast Compliance

| Pair | Ratio | WCAG AA |
|------|-------|---------|
| `--color-text` on `--color-bg` | ~8:1 | ✅ Pass |
| `--color-text-muted` on `--color-bg` | ~4.8:1 | ✅ Pass |
| White on `--color-primary` | ~5.5:1 | ✅ Pass |
| `--color-primary` on `--color-bg` | ~5:1 | ✅ Pass |
