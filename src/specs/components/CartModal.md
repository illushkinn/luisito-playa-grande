# CartModal Component Spec

## Purpose
Full-screen modal overlay for the shopping cart/order system.

## Key Features
- Shows empty state or cart contents
- Cart items with qty controls (+/-/remove)
- Service type selector (delivery/takeaway)
- Address field (shown for delivery)
- Notes field
- Clear cart + Send via WhatsApp
- GSAP-free animations (CSS only)
- Responsive sizing

## Interactive States
All buttons have hover/active transforms with hard shadows.
- `.qty-btn`: 36×36px (42×42px on mobile)
- `.cart-item__remove`: 36×36px (42×42px on mobile)
- `.cart-modal__close`: 36×36px
- `.cart-empty__cta`: standard button
- `.cart-clear`: full-width
- `.cart-send`: full-width with WhatsApp green

## Rendering Considerations
- `min-height` on cart-items container to prevent CLS
- Enter animation: `cart-fade-in` (scale + translateY)
- `will-change: transform` on modal content
