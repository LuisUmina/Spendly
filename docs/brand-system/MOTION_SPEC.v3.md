# Motion Specification v0.3

## Philosophy
Motion exists to communicate:
- feedback
- hierarchy
- continuity
- state change

Motion must never feel ornamental for its own sake.

## Timing
- hover: 120ms
- standard transition: 220ms
- large reveal: 320–420ms

## Easing
- standard: cubic-bezier(.2,.8,.2,1)
- enter: cubic-bezier(.16,1,.3,1)
- exit: cubic-bezier(.4,0,1,1)

## Allowed motion patterns
### Hover
- slight opacity shift
- slight background shift
- micro translateY(-1px)
- very subtle scale

### Enter / reveal
- fade in
- translateY(6–12px)
- stagger only when it improves comprehension

### Modal
- fade + scale(.98 to 1)
- backdrop fade

### Drawer / sheet
- slide on a single axis
- fade backdrop

### Tabs / filters
- subtle color and background transition
- small motion allowed, but no dramatic shifting

### Skeleton / loading
- soft shimmer
- progress if known
- keep it restrained

## Avoid
- bouncy springy motion everywhere
- dramatic zooms
- parallax on core product screens
- long waits before content appears
- animation that blocks productivity

## Reduced motion
When prefers-reduced-motion is enabled:
- reduce all transforms
- use minimal fades or instant changes
- remove continuous decorative motion
