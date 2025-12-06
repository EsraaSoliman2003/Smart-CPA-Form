/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#016e5d",
        "primary-light": "#03a389",
        "primary-dark": "#014238",
        secondary: "#3b2e5a",
        "secondary-light": "#52446f",
        "secondary-dark": "#2a2240",
        accent: "#00d0a4",
        "accent-light": "#33dab6",
        "accent-dark": "#00a683",
        
        "gray-light": "#f8fafc",
        "gray": "#64748b",
        "gray-dark": "#334155",
        
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#3b82f6"
      },
      boxShadow: {
        "soft": "0 2px 10px rgba(0, 0, 0, 0.05)",
        "medium": "0 4px 20px rgba(0, 0, 0, 0.08)",
        "hard": "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      borderRadius: {
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.5rem"
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "spin-slow": "spin 3s linear infinite"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        }
      }
    },
  },
  plugins: [],
};
