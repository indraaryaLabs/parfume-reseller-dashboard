import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-bright": "#3a3939",
        "on-tertiary": "#2f2e43",
        "on-surface": "#e5e2e1",
        "inverse-surface": "#e5e2e1",
        "on-background": "#e5e2e1",
        "on-tertiary-container": "#3e3e54",
        "on-primary": "#3d2e00",
        "on-secondary-container": "#ff9cb1",
        "outline": "#99907e",
        "on-tertiary-fixed": "#1a1a2e",
        "on-primary-fixed-variant": "#584400",
        "on-secondary": "#660029",
        "on-tertiary-fixed-variant": "#45455b",
        "error": "#ffb4ab",
        "on-surface-variant": "#d0c5b2",
        "surface-dim": "#131313",
        "primary-fixed-dim": "#e6c364",
        "tertiary": "#c6c4df",
        "secondary-fixed-dim": "#ffb1c0",
        "primary": "#e6c364",
        "surface-variant": "#353534",
        "tertiary-fixed-dim": "#c6c4df",
        "surface-tint": "#e6c364",
        "secondary": "#ffb1c0",
        "surface-container-high": "#2a2a2a",
        "background": "#131313",
        "inverse-primary": "#755b00",
        "primary-container": "#c9a84c",
        "inverse-on-surface": "#313030",
        "secondary-fixed": "#ffd9df",
        "on-secondary-fixed-variant": "#8d093d",
        "on-error-container": "#ffdad6",
        "surface-container-lowest": "#0e0e0e",
        "primary-fixed": "#ffe08f",
        "surface-container-highest": "#353534",
        "surface": "#131313",
        "on-error": "#690005",
        "tertiary-container": "#aba9c3",
        "on-secondary-fixed": "#3f0017",
        "tertiary-fixed": "#e2e0fc",
        "on-primary-container": "#503d00",
        "on-primary-fixed": "#241a00",
        "error-container": "#93000a",
        "outline-variant": "#4d4637",
        "surface-container": "#201f1f",
        "surface-container-low": "#1c1b1b",
        "secondary-container": "#910d40"
      },
      fontFamily: {
        "headline": ["Epilogue"],
        "body": ["Inter"],
        "label": ["Inter"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    forms,
    containerQueries,
  ],
}
