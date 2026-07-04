/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      "colors": {
              "surface-tint": "#4edea3",
              "tertiary": "#bec6e0",
              "surface-bright": "#334155",
              "surface": "#111723",
              "primary-fixed-dim": "#4edea3",
              "on-primary-container": "#00422b",
              "secondary-fixed-dim": "#c0c1ff",
              "outline": "#86948a",
              "surface-container-lowest": "#010f1f",
              "on-tertiary-fixed": "#131b2e",
              "inverse-primary": "#006c49",
              "on-tertiary-fixed-variant": "#3f465c",
              "on-primary-fixed": "#002113",
              "inverse-on-surface": "#233143",
              "inverse-surface": "#d4e4fa",
              "error-container": "#93000a",
              "on-surface-variant": "#bbcabf",
              "surface-variant": "#273647",
              "surface-container-highest": "#273647",
              "secondary": "#c0c1ff",
              "on-error-container": "#ffdad6",
              "tertiary-fixed-dim": "#bec6e0",
              "tertiary-container": "#9ba2bb",
              "error": "#ffb4ab",
              "outline-variant": "#3c4a42",
              "primary-container": "#10b981",
              "on-tertiary": "#283044",
              "tertiary-fixed": "#dae2fd",
              "secondary-container": "#3131c0",
              "secondary-fixed": "#e1e0ff",
              "surface-container-high": "#1E293B",
              "surface-dim": "#111723",
              "on-secondary": "#1000a9",
              "on-primary-fixed-variant": "#005236",
              "surface-container-low": "#0d1c2d",
              "on-tertiary-container": "#31394d",
              "on-error": "#690005",
              "on-primary": "#003824",
              "primary-fixed": "#6ffbbe",
              "background": "#111723",
              "on-secondary-container": "#b0b2ff",
              "surface-container": "#1E293B",
              "on-secondary-fixed-variant": "#2f2ebe",
              "on-background": "#d4e4fa",
              "on-surface": "#d4e4fa",
              "primary": "#4edea3",
              "on-secondary-fixed": "#07006c"
      },
      "borderRadius": {
              "DEFAULT": "0.25rem",
              "lg": "0.5rem",
              "xl": "0.75rem",
              "full": "9999px"
      },
      "spacing": {
              "md": "24px",
              "xs": "8px",
              "base": "4px",
              "margin-mobile": "16px",
              "lg": "48px",
              "gutter": "24px",
              "margin-desktop": "40px",
              "sm": "16px",
              "xl": "80px"
      },
      "fontFamily": {
              "sans": ["Inter", "sans-serif"],
              "code": ["JetBrains Mono", "monospace"]
      },
      "fontSize": {
              "hero": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
              "page-title": ["36px", { "lineHeight": "44px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
              "section-heading": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
              "card-title": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
              "body": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
              "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
              "caption": ["12px", { "lineHeight": "16px", "fontWeight": "400" }],
              "button": ["15px", { "lineHeight": "24px", "fontWeight": "500" }],
              "nav": ["15px", { "lineHeight": "24px", "fontWeight": "500" }],
              "label": ["14px", { "lineHeight": "20px", "fontWeight": "500" }],
              "input": ["15px", { "lineHeight": "24px", "fontWeight": "400" }]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
