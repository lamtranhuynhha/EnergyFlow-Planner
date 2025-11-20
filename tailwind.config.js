/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary backgrounds (dark mode)
        'primary-bg': '#0A0B0F',
        'secondary-bg': '#12141A',
        'card-bg': '#1A1C24',
        
        // Borders & dividers
        'border-light': 'rgba(255, 255, 255, 0.08)',
        'border-medium': 'rgba(255, 255, 255, 0.12)',
        
        // Text colors (adaptive)
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        
        // Accent colors
        'accent-blue': '#4A90E2',
        'accent-indigo': '#A7B8FF',
        
        // Glass effect
        'glass-bg': 'rgba(255, 255, 255, 0.05)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        'sans': ['Merriweather', 'Georgia', 'serif'],
        'display': ['Merriweather', 'Georgia', 'serif'],
        'heading': ['Brillant', 'Merriweather', 'serif'],
      },
      letterSpacing: {
        'tighter': '-0.02em',
        'tight': '-0.01em',
      },
      lineHeight: {
        'compact': '1.3',
        'normal': '1.4',
        'relaxed': '1.45',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '20px',
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.3)',
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.15)',
        'premium': '0 8px 40px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
