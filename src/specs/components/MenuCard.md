# MenuCard Component Spec

## Purpose
Card displaying a single menu item with image (or placeholder), name, price, and add-to-cart button.

## Props
- `id: string` — item identifier
- `name: string` — display name
- `price: number` — price in ARS
- `category: string` — category key
- `image?: string` — optional image URL

## Interactive States
- Card hover: lifts with `translate(-2px, -2px)` + larger shadow
- Button hover: lift + background change
- Button click: transforms + shadow reduces

## Rendering Considerations
- `aspect-ratio` on image container to prevent CLS
- `loading="lazy"` on images
- `transition` on specific properties only (transform, box-shadow, background)
