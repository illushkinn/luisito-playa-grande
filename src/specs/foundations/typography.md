# Typography Foundation — Luisito Playa Grande

## Font Stack

| Role | Font | Fallback |
|------|------|----------|
| Heading | Inter | system-ui, -apple-system, sans-serif |
| Body | Inter | system-ui, -apple-system, sans-serif |
| Accent | Caveat | cursive |

## Fluid Scale

| Element | `clamp()` value | Static fallback |
|---------|----------------|-----------------|
| h1 | `clamp(2.5rem, 6vw, 3.5rem)` | 2.5rem |
| h2 | `clamp(1.75rem, 4vw, 2.5rem)` | 1.75rem |
| h3 | `clamp(1.25rem, 2.5vw, 1.75rem)` | 1.25rem |
| h4 | `clamp(1rem, 2vw, 1.25rem)` | 1rem |
| Body | `clamp(0.875rem, 1.5vw, 1rem)` | 0.875rem |
| Small | `clamp(0.75rem, 1.25vw, 0.85rem)` | 0.75rem |

## Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Normal | 400 | Body text |
| Medium | 500 | Emphasized body |
| Semibold | 600 | Buttons, subheadings |
| Bold | 700 | Headings |
| Extrabold | 800 | Prices, strong emphasis |
| Black | 900 | Display text (hero year) |

## Text Rendering

- `-webkit-font-smoothing: antialiased` on `<body>`
- `text-wrap: balance` on h1-h3
- `text-wrap: pretty` on body paragraphs
- `font-variant-numeric: tabular-nums` on prices and counters

## Font Loading

- `font-display: swap` on all `@font-face` declarations
- Caveat fonts are preloaded via `<link rel="preload">`
- Google Fonts loaded with `display=swap` parameter
