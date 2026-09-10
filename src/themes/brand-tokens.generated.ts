/*
 * Generated TypeScript brand tokens. Do not edit directly.
 * Source: docs/brand-system/design-tokens.v3.generic.json
 * Source version: 0.3.0
 * Run: npm run brand:tokens
 */
export const brandTokenMeta = {
    "name": "Generic Personal Rebrand System",
    "version": "0.3.0",
    "concept": "Quiet interfaces. Bold moments.",
    "intent": "A reusable, project-agnostic branding and UI system for rebranding self-hosted or custom applications.",
    "principles": [
        "Project-agnostic and reusable",
        "Premium and minimal by default",
        "Light and dark themes must both be first-class",
        "Semantic tokens over raw values",
        "Whitespace before ornament",
        "Motion should clarify, not distract",
        "Accessibility is part of the visual system"
    ]
} as const;

export const brandThemeTokens = {
    "light": {
        "color": {
            "bg": {
                "canvas": "#FFFFFF",
                "subtle": "#F5F5F7",
                "soft": "#F7F8FA",
                "elevated": "#FFFFFF",
                "inverse": "#050505"
            },
            "surface": {
                "default": "#FFFFFF",
                "muted": "#F5F5F7",
                "raised": "#FFFFFF",
                "panel": "#FBFBFC",
                "dark": "#050505"
            },
            "text": {
                "primary": "#111111",
                "secondary": "#5F6368",
                "tertiary": "#8B9097",
                "inverse": "#FFFFFF",
                "link": "#0A6CFF"
            },
            "border": {
                "subtle": "#E6E7EA",
                "strong": "#D2D5DA",
                "focus": "#0A6CFF"
            },
            "accent": {
                "primary": "#0A6CFF",
                "primaryHover": "#005BD8",
                "cyan": "#3BC8FF",
                "violet": "#6E5CFF",
                "magenta": "#D84CA3",
                "orange": "#FF7A1A",
                "success": "#1E9E57",
                "warning": "#C98500",
                "danger": "#D92D20"
            },
            "chart": {
                "series1": "#0A6CFF",
                "series2": "#6E5CFF",
                "series3": "#3BC8FF",
                "series4": "#1E9E57",
                "series5": "#C98500",
                "series6": "#D92D20",
                "grid": "#E6E7EA"
            },
            "gradient": {
                "spectral": "linear-gradient(90deg,#0A6CFF 0%,#55C7FF 24%,#6E5CFF 50%,#D84CA3 73%,#FF7A1A 100%)",
                "haloBlue": "radial-gradient(circle at 50% 50%,rgba(48,115,255,.28),rgba(83,155,255,.12) 35%,rgba(255,255,255,0) 72%)",
                "haloSpectral": "conic-gradient(from 220deg at 50% 50%,rgba(10,108,255,.38),rgba(110,92,255,.26),rgba(216,76,163,.18),rgba(255,122,26,.16),rgba(10,108,255,.38))"
            }
        },
        "shadow": {
            "sm": "0 1px 2px rgba(0,0,0,.05)",
            "md": "0 8px 28px rgba(0,0,0,.08)",
            "lg": "0 22px 60px rgba(0,0,0,.12)",
            "glow": "0 0 80px rgba(46,116,255,.18)"
        }
    },
    "dark": {
        "color": {
            "bg": {
                "canvas": "#0A0A0B",
                "subtle": "#101113",
                "soft": "#15171A",
                "elevated": "#111214",
                "inverse": "#FFFFFF"
            },
            "surface": {
                "default": "#111214",
                "muted": "#15171A",
                "raised": "#181A1E",
                "panel": "#0D0E10",
                "dark": "#050505"
            },
            "text": {
                "primary": "#F5F7FA",
                "secondary": "#B2B8C0",
                "tertiary": "#858C95",
                "inverse": "#111111",
                "link": "#5EA1FF"
            },
            "border": {
                "subtle": "#25282D",
                "strong": "#343942",
                "focus": "#5EA1FF"
            },
            "accent": {
                "primary": "#5EA1FF",
                "primaryHover": "#87B8FF",
                "cyan": "#6DDCFF",
                "violet": "#9A8CFF",
                "magenta": "#F076C4",
                "orange": "#FFA24D",
                "success": "#54C27D",
                "warning": "#F0B450",
                "danger": "#FF8375"
            },
            "chart": {
                "series1": "#5EA1FF",
                "series2": "#9A8CFF",
                "series3": "#6DDCFF",
                "series4": "#54C27D",
                "series5": "#F0B450",
                "series6": "#FF8375",
                "grid": "#2A2E34"
            },
            "gradient": {
                "spectral": "linear-gradient(90deg,#5EA1FF 0%,#6DDCFF 24%,#9A8CFF 50%,#F076C4 73%,#FFA24D 100%)",
                "haloBlue": "radial-gradient(circle at 50% 50%,rgba(94,161,255,.28),rgba(94,161,255,.08) 36%,rgba(10,10,11,0) 74%)",
                "haloSpectral": "conic-gradient(from 220deg at 50% 50%,rgba(94,161,255,.42),rgba(154,140,255,.28),rgba(240,118,196,.24),rgba(255,162,77,.20),rgba(94,161,255,.42))"
            }
        },
        "shadow": {
            "sm": "0 1px 2px rgba(0,0,0,.28)",
            "md": "0 10px 30px rgba(0,0,0,.35)",
            "lg": "0 24px 68px rgba(0,0,0,.45)",
            "glow": "0 0 100px rgba(94,161,255,.20)"
        }
    }
} as const;

export const brandSharedTokens = {
    "typography": {
        "fontFamily": {
            "sans": "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            "mono": "'SFMono-Regular', Consolas, 'Liberation Mono', monospace"
        },
        "scale": {
            "display": {
                "size": "clamp(3rem,7vw,7.5rem)",
                "weight": 500,
                "lineHeight": 0.94,
                "tracking": "-0.055em"
            },
            "h1": {
                "size": "clamp(2.5rem,5vw,5rem)",
                "weight": 500,
                "lineHeight": 1,
                "tracking": "-0.045em"
            },
            "h2": {
                "size": "clamp(2rem,3.5vw,3.75rem)",
                "weight": 500,
                "lineHeight": 1.04,
                "tracking": "-0.04em"
            },
            "h3": {
                "size": "1.75rem",
                "weight": 500,
                "lineHeight": 1.1,
                "tracking": "-0.025em"
            },
            "bodyLg": {
                "size": "1.25rem",
                "weight": 400,
                "lineHeight": 1.45
            },
            "body": {
                "size": "1rem",
                "weight": 400,
                "lineHeight": 1.55
            },
            "small": {
                "size": ".875rem",
                "weight": 400,
                "lineHeight": 1.45
            },
            "label": {
                "size": ".8125rem",
                "weight": 500,
                "lineHeight": 1.2,
                "tracking": "0"
            }
        }
    },
    "radius": {
        "xs": "8px",
        "sm": "12px",
        "md": "18px",
        "lg": "28px",
        "xl": "36px",
        "pill": "999px"
    },
    "space": {
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
        "16": "64px",
        "20": "80px",
        "24": "96px",
        "32": "128px"
    },
    "layout": {
        "contentWidth": "1180px",
        "maxWidth": "1440px",
        "gutter": "clamp(20px,4vw,64px)",
        "sectionY": "clamp(72px,10vw,160px)",
        "gridGap": "clamp(12px,1.5vw,24px)",
        "sidebarWidth": "280px",
        "headerHeight": "68px"
    },
    "motion": {
        "durations": {
            "fast": "120ms",
            "base": "220ms",
            "slow": "420ms"
        },
        "easing": {
            "standard": "cubic-bezier(.2,.8,.2,1)",
            "enter": "cubic-bezier(.16,1,.3,1)",
            "exit": "cubic-bezier(.4,0,1,1)"
        },
        "patterns": {
            "hover": "opacity, subtle translateY(-1px), or slight scale",
            "reveal": "opacity + translateY(6-12px)",
            "modal": "opacity + scale(.98 to 1)",
            "drawer": "translateX or translateY only",
            "reduceMotion": "remove movement, keep fade or instant change"
        }
    },
    "components": {
        "button": {
            "height": {
                "sm": "36px",
                "md": "44px",
                "lg": "52px"
            },
            "radius": "999px",
            "paddingX": {
                "sm": "16px",
                "md": "20px",
                "lg": "26px"
            }
        },
        "input": {
            "height": "48px",
            "radius": "14px",
            "borderWidth": "1px"
        },
        "textarea": {
            "radius": "16px",
            "padding": "14px 16px"
        },
        "select": {
            "height": "48px",
            "radius": "14px"
        },
        "card": {
            "radius": "28px",
            "padding": "clamp(24px,3vw,48px)",
            "borderWidth": "1px"
        },
        "modal": {
            "radius": "28px",
            "padding": "32px"
        },
        "table": {
            "rowHeight": "48px",
            "headerWeight": "500",
            "dividerStyle": "subtle"
        },
        "toast": {
            "radius": "18px",
            "padding": "16px 18px"
        },
        "tooltip": {
            "radius": "12px",
            "padding": "8px 10px"
        },
        "badge": {
            "radius": "999px",
            "padding": "6px 10px"
        },
        "tabs": {
            "height": "40px",
            "radius": "999px"
        },
        "chart": {
            "cornerRadius": "10px",
            "gridStrokeWidth": "1px",
            "legend": "only when needed"
        }
    }
} as const;

export type BrandThemeName = keyof typeof brandThemeTokens;
