/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#1A75FF', // Primary
          600: '#0066FF',
          700: '#0052CC',
          800: '#003D99',
          900: '#002966',
        },
        secondary: {
          50: '#FFF2EC',
          100: '#FFE5D9',
          200: '#FFCBB3',
          300: '#FFB28D',
          400: '#FF9867',
          500: '#FF7E45', // Secondary
          600: '#FF6420',
          700: '#FA4900',
          800: '#D53E00',
          900: '#B03300',
        },
        accent: {
          50: '#E6FBF8',
          100: '#CCF8F2',
          200: '#99F0E5',
          300: '#66E9D8',
          400: '#33E1CB',
          500: '#00C3A5', // Accent
          600: '#009C84',
          700: '#007563',
          800: '#004E42',
          900: '#002721',
        },
        neutral: {
          50: '#F5F7FA', // Light gray
          100: '#EDF0F5',
          200: '#DFE3EB',
          300: '#C5CCD9',
          400: '#A2ADC0',
          500: '#8494AD',
          600: '#667A96',
          700: '#4D5B72',
          800: '#34404F',
          900: '#333333', // Dark gray
        },
        success: {
          50: '#E6F9EC',
          100: '#D1F3DC',
          500: '#28A745',
          700: '#1E7E34',
        },
        warning: {
          50: '#FFF8E6',
          100: '#FFF3CC',
          500: '#FFC107',
          700: '#C69500',
        },
        error: {
          50: '#FDEBEB',
          100: '#FAD7D7',
          500: '#DC3545',
          700: '#A71D2A',
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
        accent: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        'card': '0.75rem',
      },
      boxShadow: {
        'card': '0 4px 15px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 10px 25px rgba(0, 0, 0, 0.12)',
      },
      backgroundImage: {
        'hero-pattern': 'linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2))',
      }
    },
  },
  plugins: [],
};