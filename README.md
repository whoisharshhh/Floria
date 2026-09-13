# FLORIA — An Immersive World of Curious Creatures

Immersive Next.js experience: cinematic hero spotlight, scroll-driven frame storytelling, interactive discovery archive, and art-book colophon footer.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local development server |
| `npm run build` | Production build (static export) |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint with autofix |
| `npm run typecheck` | TypeScript `--noEmit` check |

## Architecture

See [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) for the full structure guide.

```
app/                    # Next.js App Router — thin routes only
  page.tsx              # `/` → <HomePage />
  layout.tsx            # fonts + metadata (from @/config/site)
  globals.css           # bridge → src/styles/globals.css
  extract/page.tsx      # internal frame-extraction tooling (dev only)
  api/extract-frame/    # internal frame-extraction API (dev only)

src/
  components/           # reusable UI (import via barrels)
    sections/Hero/      # full-viewport spotlight hero
    sections/Storytelling/
    sections/Discovery/
    layout/Footer/      # art-book colophon
    ui/Preloader/       # luxury editorial preloader
    viewer/             # 3D viewer placeholder
  features/home/        # `/` composition root (owns hero interaction)
  config/               # site metadata, links — single source of truth
  lib/                  # utils + frame-sequence helpers
  hooks/                # useIsMobile, useLockedScroll
  types/                # Specimen, BloomItem, FrameSequenceConfig
  styles/               # design-system stylesheet (source of truth)
```

Rules:

- Routes stay thin — logic lives in `src/features/*`.
- Components import config via `@/config/site`, never hardcoded strings.
- Shared types live in `@/types/floria`.
- Import via barrel files (`@/components`, `@/hooks`), not deep relative paths.

## Environment

Copy `.env.example` to `.env.local` when environment variables are introduced.
