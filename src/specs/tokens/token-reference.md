# Token Reference — Luisito Playa Grande

## How to Use Tokens

All tokens are defined in `src/tokens.css` and imported in `BaseLayout.astro`.

### In Astro components:
```astro
<style>
  .my-element {
    color: var(--color-primary);
    padding: var(--space-md);
    box-shadow: var(--shadow-hard);
  }
</style>
```

### In inline styles:
```html
<div style="background: var(--color-bg-alt); padding: var(--space-sm);">
```

## Token Categories

| Category | Prefix | Example |
|----------|--------|---------|
| Primitives | `--ds-*` | `--ds-color-brand-primary` |
| Color | `--color-*` | `--color-primary` |
| Space | `--space-*` | `--space-md` |
| Typography | `--font-*`, `--ds-font-*` | `--font-heading` |
| Radius | `--radius-*`, `--ds-radius-*` | `--radius-md` |
| Shadow | `--shadow-*`, `--ds-shadow-*` | `--shadow-hard` |
| Z-index | `--z-*`, `--ds-z-*` | `--z-modal` |
| Motion | `--motion-*`, `--ds-motion-*` | `--motion-fast` |
| Layout | `--max-width`, `--header-height` | `--max-width` |

## Migration Guide

### Old → New Token Mapping

| Old Token | New Token |
|-----------|-----------|
| `--color-primary` | `--color-primary` (unchanged) |
| `--card-bg` | `--color-card-bg` |
| `--glass-bg` | `--color-glass-bg` |
| `--glass-border` | (use `--ds-glass-border`) |
| `--glass-shadow` | `--shadow-glass` |
| `--glass-blur` | `--ds-glass-blur` |
| `--font-accent` | `--font-accent` now points to Caveat |

## Defining New Tokens

1. Add primitive to Layer 1 in `tokens.css`: `--ds-{category}-{name}`
2. Add semantic alias in Layer 2: `--{category}-{name}: var(--ds-{category}-{name})`
3. Use in components
