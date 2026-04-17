import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        bg: {
          primary: '#080C14',
          secondary: '#0D1420',
          card: '#0F1826',
          elevated: '#141F30',
        },
        accent: {
          cyan: '#00D4FF',
          blue: '#0066FF',
          teal: '#00B4A6',
          glow: 'rgba(0,212,255,0.15)',
        },
        text: {
          primary: '#F0F6FF',
          secondary: '#94A3C4',
          muted: '#4A5A7A',
        },
        border: {
          subtle: 'rgba(0,212,255,0.08)',
          medium: 'rgba(0,212,255,0.2)',
          strong: 'rgba(0,212,255,0.4)',
        }
      },
      backgroundImage: {
        'hero-grid': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300D4FF' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 20px rgba(0,212,255,0.3)' },
          'to': { boxShadow: '0 0 40px rgba(0,212,255,0.6), 0 0 80px rgba(0,102,255,0.2)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        }
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(0,212,255,0.2)',
        'glow-md': '0 0 40px rgba(0,212,255,0.3)',
        'glow-lg': '0 0 80px rgba(0,212,255,0.4)',
        'card': '0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,212,255,0.08)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,212,255,0.2), 0 0 20px rgba(0,212,255,0.1)',
      }
    },
  },
  plugins: [],
}
export default config
