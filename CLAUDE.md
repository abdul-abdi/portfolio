# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start dev server (localhost:8080)
npm run build        # Production build
npm run lint         # ESLint checks
npm run test         # Run tests once
npm run test:watch   # Watch mode testing
npm run preview      # Preview production build
```

## Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS with custom design system (obsidian/cobalt palette)
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Animations:** Framer Motion (scroll-triggered, mouse-following effects)
- **Smooth Scrolling:** Lenis
- **Forms:** React Hook Form + Zod validation
- **Routing:** React Router DOM (hash-based section navigation)

## Architecture

### Section-Based Layout
The site is a single-page portfolio organized into distinct sections:
- `src/pages/Index.tsx` orchestrates section composition
- `src/components/sections/` contains modular page sections (Hero, About, Works, Playground, Contact)
- Navigation uses hash links (`#about`, `#works`, etc.) with smooth scrolling

### Animation Strategy
Heavy use of Framer Motion throughout:
- `useScroll` and `useTransform` for scroll-based animations
- Mouse position tracking for interactive effects
- Staggered letter animations in HeroSection
- `AnimatePresence` for page transitions

### Path Alias
All imports use `@/` prefix which resolves to `src/`:
```typescript
import { Button } from "@/components/ui/button"
```

### Component Patterns
- shadcn/ui components in `src/components/ui/` - these are copied into the project, not imported from a package
- Custom hooks in `src/hooks/` (useSmoothScroll, use-mobile, use-toast)
- `cn()` utility from `@/lib/utils` for merging Tailwind classes

## Design System

Custom Tailwind configuration includes:
- **Colors:** Obsidian (dark), Electric Cobalt (accent), Muted Slate
- **Animations:** fade-up, scale-up, slide-in-right, reveal-up keyframes
- **Dark mode:** Class-based (`dark:` prefix)
- **Font:** Inter

## TypeScript

Config is intentionally lenient (`noImplicitAny: false`, `strictNullChecks: false`) for rapid development.

## Testing

Vitest with JSDOM environment. Test files go in `src/` with `.test.ts(x)` or `.spec.ts(x)` suffix. Setup file at `src/test/setup.ts`.
