/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#25295B",  // Main primary color (blue-700)
          light: "#3B82F6",    // Light shade
          dark: "#1E3A8A",     // Dark shade
        },
        secondary: {
          DEFAULT: "#F59E0B",  // Amber-500
          light: "#FBBF24",
          dark: "#B45309",
        },
         tertiary: {
          DEFAULT: "#6b7280",  // Amber-500
          light: "#6b7280",
          dark: "#6b7280",
        },

        
        accent: "#10B981",     // Green-500
        muted: "#6B7280",      // Gray-500
        background: "#F3F4F6", // Light gray background
      },
    },
  },
  plugins: [],
}
