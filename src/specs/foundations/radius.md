# Border Radius Foundation — Luisito Playa Grande

## Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 2px | Buttons, inputs, cards |
| `--radius-md` | 4px | Cards, modals, containers |
| `--radius-lg` | 8px | Larger containers, modals (mobile) |
| `--radius-xl` | 12px | Cart modal (mobile) |
| `--radius-full` | 50% | Circular elements |

## Concentric Radius Pattern

When nesting bordered elements, use: `outer = inner + padding`

Example: Card with `--radius-md` (4px) → inner button at `--radius-sm` (2px) with `--space-sm` (8px) padding
