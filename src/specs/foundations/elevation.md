# Elevation Foundation — Luisito Playa Grande

## Shadow Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-hard-sm` | `2px 2px 0 var(--color-text)` | Small interactive elements |
| `--shadow-hard` | `4px 4px 0 var(--color-text)` | Cards, buttons (default) |
| `--shadow-hard-lg` | `6px 6px 0 var(--color-text)` | Hover state, hero elements |
| `--shadow-glass` | `0 4px 24px rgba(44,36,32,0.06)` | Glass surfaces |
| `--shadow-glass-lg` | `0 4px 32px rgba(44,36,32,0.08)` | Header, panels |
| `--shadow-inset` | `inset 2px 2px 0 rgba(0,0,0,0.06)` | Input fields |
| `--shadow-inset-sm` | `inset 2px 2px 0 rgba(0,0,0,0.08)` | Deep inset (qty display) |

## Hard Shadow Pattern

The site uses a distinctive "hard shadow" (offset box-shadow matching text color) as its primary elevation system. This creates the signature Luisito brand feel.

## Interactive Elevation

Elements use a lift-on-hover pattern:
- Default: `4px 4px 0` → Hover: `6px 6px 0` with `translate(-2px, -2px)`
- Active/Pressed: `2px 2px 0` with `translate(1px, 1px)`
