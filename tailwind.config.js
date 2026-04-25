/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        page: '#1a1a1a',
        phone: '#000000',
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(255, 255, 255, 0.4)',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        ink: {
          primary: '#FFFFFF',
          secondary: 'rgba(255, 255, 255, 0.7)',
          tertiary: 'rgba(255, 255, 255, 0.5)',
          meta: 'rgba(255, 255, 255, 0.6)',
        },
        cta: {
          DEFAULT: '#FFFFFF',
          fg: '#000000',
        },
      },
      fontFamily: {
        sf: [
          '-apple-system',
          'SF Pro Rounded',
          'SF Pro',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
      backgroundImage: {
        'phone-gradient':
          'linear-gradient(149deg, rgb(56, 51, 46) 7.7%, rgb(0, 0, 0) 41.5%, rgb(26, 26, 26) 92.3%)',
        'phone-glow':
          'radial-gradient(ellipse at 70% 10%, rgba(118, 100, 75, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(182, 136, 116, 0.05) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
}
