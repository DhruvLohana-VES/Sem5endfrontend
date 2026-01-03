/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Medical Primary - Calming Blue
        primary: {
          50: '#E8F4F8',
          100: '#D1E9F1',
          200: '#A3D3E3',
          300: '#75BDD5',
          400: '#47A7C7',
          500: '#0891B2', // Main - Cyan 600
          600: '#0E7490',
          700: '#155E75',
          800: '#164E63',
          900: '#083344',
        },
        // Medical Secondary - Trustworthy Navy
        secondary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB', // Main
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Success - Healthy Green
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981', // Main
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        // Warning - Attention Amber
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B', // Main
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Danger - Alert Red
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444', // Main
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        // Medical Accent - Healing Purple
        accent: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA', // Main
          700: '#7E22CE',
          800: '#6B21A8',
          900: '#581C87',
        },
        // Neutral Medical Grays
        medical: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'medical': '0 2px 8px rgba(8, 145, 178, 0.15)',
        'medical-lg': '0 8px 24px rgba(8, 145, 178, 0.2)',
      },
      borderRadius: {
        'card': '12px',
        'medical': '16px',
      },
      backgroundImage: {
        'gradient-medical': 'linear-gradient(135deg, #0891B2 0%, #2563EB 100%)',
        'gradient-success': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        'gradient-card': 'linear-gradient(to bottom right, #FFFFFF 0%, #F8FAFC 100%)',
      },
    },
  },
  plugins: [],
}
