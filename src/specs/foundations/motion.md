# Motion Foundation — Luisito Playa Grande

## Duration Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--motion-fast` | 0.1s | Interactive transforms (hover, active) |
| `--motion-normal` | 0.15s | Color transitions, opacity |
| `--motion-slow` | 0.2s | Card lift transitions |
| `--motion-enter` | 0.25s | Enter animations (mobile slide, cart fade) |

## Easing Curves

| Token | Value | Usage |
|-------|-------|-------|
| `--motion-easing-enter` | `cubic-bezier(0.4, 0, 0.2, 1)` | Enter animations |
| `--motion-easing-exit` | `cubic-bezier(0.4, 0, 0.2, 1)` | Exit animations |
| `--motion-easing-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Spring-like effects |

## Performance Rules

1. NO `transition: all` — specify exact properties
2. `will-change` only on `transform`, `opacity`, `filter`
3. Animate only composite properties (`transform`, `opacity`)

## Enter Animation Pattern

- Split content into semantic chunks
- Stagger each with ~100ms delay
- Duration: 0.5s, ease: power2.out
- Use: translateY(40px) → translateY(0) with opacity 0→1

## Exit Animation Pattern

- Subtle fixed translateY (small, not full height)
- Opacity: 1→0
- Duration: 0.2s
- Softer than enters

## Scale on Press

- All interactive elements: `active: scale(0.96)`
- Combined with transform for hard shadow interaction
- Never use scale below 0.95
