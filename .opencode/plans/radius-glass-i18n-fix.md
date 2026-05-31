# Plan: Radius, glass, i18n fix & footer redesign

## 1. CSS Variables (BaseLayout.astro :root)

```css
--radius-sm: 4px;
--radius-md: 8px;
--card-bg: rgba(255, 255, 255, 0.85);
```

## 2. Cart button — fully transparent

`.btn--icon.cart-toggle`:
- background: transparent
- border: none
- outline: none

## 3. Spacing cart <-> language toggle

`.nav__controls`:
- gap: var(--space-sm)

## 4. Single consistent font

Nav uses `--font-display` (Bangers). Apply to all elements globally.

**CLARIFICATION NEEDED**: Bangers is all-caps display font. Options:
- A: Apply Bangers everywhere (literally)
- B: Apply Inter everywhere for consistency
- C: Use a single new warm font

## 5. Radius replacements

| File | Element | Old | New |
|------|---------|-----|-----|
| SplitHero | split-hero__cta | 12px | var(--radius-md) |
| SplitHero | split-hero__cta--wpp | 12px | var(--radius-md) |
| MenuCard | menu-card | none | var(--radius-md) |
| MenuCard | menu-card__btn | 8px | var(--radius-sm) |
| menu.astro | hero__cta | 12px | var(--radius-md) |
| contact.astro | contact__card | none | var(--radius-md) |
| contact.astro | hero__cta | 12px | var(--radius-md) |
| pedido.astro | hero__cta | 12px | var(--radius-md) |
| pedido.astro | cart-send | 12px | var(--radius-md) |
| pedido.astro | qty-btn | 6px | var(--radius-sm) |
| index.astro | destacado-card | none | var(--radius-md) |
| index.astro | destacado-card__btn | none | var(--radius-sm) |
| BaseLayout | cart-badge | 999px | var(--radius-md) |

## 6. Glass opacity (Opcion D)

- MenuCard: rgba(255,255,255,0.7) -> var(--card-bg)
- contact.astro: rgba(255,255,255,0.7) -> var(--card-bg)
- index.astro destacado-card: add glass bg var(--card-bg) + backdrop-filter

## 7. i18n line break

- es.json: hero.subtitle add \n after "Playa Grande. "
- en.json: same
- SplitHero: split-hero__subtitle add white-space: pre-line

## 8. Language toggle fix

Root cause: Astro static build - getLocale() returns "es" at build time.

Fix: Client-side swap via define:vars + window.applyLocale().
- Add data-i18n="key" to all translatable elements
- Embed locale JSONs in BaseLayout script
- LanguageSwitcher calls window.applyLocale(next) instead of reload

## 9. Footer redesign — warm local restaurant style

New structure:
- Brand statement: Luisito Playa Grande, Un clasico de Playa Grande desde 1955
- 3-column grid: Contacto | Horarios | Encontranos (with Instagram)
- WhatsApp CTA + Ver Carta button
- Copyright + "Hecho con amor en Mar del Plata"
- All text in black, glass background

i18n keys to add:
- footer.hours
- footer.madeIn = "Hecho con amor en Mar del Plata"

## 10. index.astro cleanup

- Remove inert border properties
- destacado-card__price -> var(--color-text) (black)
- Add glass bg + backdrop-filter to destacado-card

## Files modified (10)

1. src/layouts/BaseLayout.astro
2. src/components/LanguageSwitcher.astro
3. src/components/SplitHero.astro
4. src/components/MenuCard.astro
5. src/pages/index.astro
6. src/pages/menu.astro
7. src/pages/contact.astro
8. src/pages/pedido.astro
9. src/content/i18n/es.json
10. src/content/i18n/en.json

## Verification

- pnpm build — clean
- Vercel deploy
- Test language toggle
- Review footer on mobile/desktop
