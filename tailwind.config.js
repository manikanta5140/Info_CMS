/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          important: 'var(--color-text-important)',
      },
      backgroundColor: {
          'primary':"var(--color-primary)",
          'secondary': "var(--color-secondary)",
          'important': "var(--color-important)",
          'fill': "var(--color-fill)",
          button: "var(--color-button)",
          'button-hover': "var(--color-button-hover)",
          'button-cancel': "var(--color-button-cancel)",
          'button-cancel-hover': "var(--color-button-cancel-hover)",
          "button-muted": "var(--color-button-muted)"
      }
    }
  },
  plugins: [],
}

