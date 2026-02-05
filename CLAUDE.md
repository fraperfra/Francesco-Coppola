# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Italian real estate consultation website (Consulente Immobiliare Indipendente) - a React SPA for buying and selling property consultation services.

**Stack:** React 19 + TypeScript + Vite + Tailwind CSS (CDN) + Lucide React icons

## Development Commands

```bash
npm install      # Install dependencies
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

## Architecture

### Custom SPA Router (App.tsx)
The application uses a custom client-side router instead of React Router:
- Routes defined as `RouteConfig[]` array in App.tsx with path, component, SEO metadata, and JSON-LD schema
- Navigation uses `window.history.pushState()` with global click handler for link hijacking
- Dynamic `<title>`, meta tags, and structured data updated per route

### Key Directories
- **components/** - Reusable UI components (Navbar, Footer, Button, Hero, etc.)
- **pages/** - Page components including service detail pages
  - `BuyingServiceDetails.tsx` and `SellingServiceDetails.tsx` contain 6 sub-page components each
- **types.ts** - Shared TypeScript interfaces (ServiceCardProps, StepProps, etc.)

### Styling
Tailwind CSS loaded via CDN in index.html with custom brand colors (blue palette). No CSS files - all styling is inline with Tailwind utility classes.

### Deployment
Vercel with SPA rewrites configured in vercel.json (all routes -> index.html).

## Adding New Routes

1. Create page component in `pages/`
2. Add route to `routes` array in App.tsx with:
   - `path`, `component`, `label` (for nav), `title`, `description`
   - `showInNav: true` if it should appear in navigation
   - Optional `schema` for JSON-LD structured data

## Component Patterns

- Button component accepts `variant` prop: 'primary' | 'secondary' | 'outline' | 'white'
- Service cards use `ServiceCardProps` interface with Lucide icon, title, description
- Pages compose multiple reusable components (e.g., HomePage uses 18 components)

## Environment Variables

`.env.local` may contain API keys (currently `GEMINI_API_KEY` defined but unused).
