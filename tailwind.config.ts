import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "4rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-primary)"],
        nunito: ["Nunito Sans", "sans-serif"],
        mono: ["var(--font-mono)"],
        jetbrains: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        // In-Sync Typography Scale
        'xs': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],      // 12px - Caption
        'sm': ['0.875rem', { lineHeight: '1.5' }],                                // 14px - Small
        'base': ['1rem', { lineHeight: '1.5' }],                                  // 16px - Body Regular
        'lg': ['1.125rem', { lineHeight: '1.6' }],                                // 18px - Body Large
        'xl': ['1.25rem', { lineHeight: '1.4' }],                                 // 20px - H4
        '2xl': ['1.5rem', { lineHeight: '1.3' }],                                 // 24px - H3 Mobile
        '3xl': ['1.75rem', { lineHeight: '1.3' }],                                // 28px - H3 Desktop / H2 Mobile
        '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],      // 36px - H2 Desktop
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],         // 48px - H1 Desktop
        '6xl': ['2rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],         // 32px - H1 Mobile
      },
      fontWeight: {
        light: '300',
        normal: '400',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          bg: "hsl(var(--success-bg))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          bg: "hsl(var(--warning-bg))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          bg: "hsl(var(--error-bg))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          bg: "hsl(var(--info-bg))",
        },
        surface: "hsl(var(--surface))",
        field: "hsl(var(--field))",
        connect: "hsl(var(--connect))",
        analytics: "hsl(var(--analytics))",
        lavender: "hsl(var(--lavender))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      spacing: {
        '1': 'var(--space-1)',    // 4px
        '2': 'var(--space-2)',    // 8px
        '3': 'var(--space-3)',    // 16px
        '4': 'var(--space-4)',    // 24px
        '5': 'var(--space-5)',    // 32px
        '6': 'var(--space-6)',    // 48px
        '7': 'var(--space-7)',    // 64px
        '8': 'var(--space-8)',    // 96px
      },
      borderRadius: {
        sm: 'var(--radius-sm)',      // 4px
        DEFAULT: 'var(--radius-md)',  // 8px
        md: 'var(--radius-md)',       // 8px
        lg: 'var(--radius-lg)',       // 16px
        full: 'var(--radius-full)',   // 9999px
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      transitionDuration: {
        instant: 'var(--duration-instant)',  // 100ms
        fast: 'var(--duration-fast)',        // 150ms
        DEFAULT: 'var(--duration-base)',     // 200ms
        base: 'var(--duration-base)',        // 200ms
        medium: 'var(--duration-medium)',    // 300ms
        slow: 'var(--duration-slow)',        // 400ms
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.0, 0, 0.2, 1)',
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.95)", opacity: "0" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "modal-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "modal-out": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.95)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "scale-out": "scale-out 0.2s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-out-right": "slide-out-right 0.3s ease-out",
        "modal-in": "modal-in 0.25s ease-out 0.05s",
        "modal-out": "modal-out 0.2s ease-in",
      },
      screens: {
        'xs': '480px',
        'sm': '768px',
        'md': '1024px',
        'lg': '1280px',
        'xl': '1440px',
        '2xl': '1920px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;