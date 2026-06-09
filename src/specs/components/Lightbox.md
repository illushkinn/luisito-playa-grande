# Lightbox Component Spec

## Purpose
Full-screen image viewer overlay triggered by `[data-lightbox]` attribute.

## Key Features
- Dark overlay (85% black)
- Close button with blur effect
- Image at max 90vw × 85vh
- Close via: button, overlay click, Escape key

## Interactive States
- Close button hover: lighter background
- Enter/exit via class toggle on `.lightbox`

## Rendering Considerations
- `will-change: transform` on lightbox container
- Overlay uses `backdrop-filter` for performance
- Image uses `object-fit: contain`
