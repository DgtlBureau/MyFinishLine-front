# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start development server on localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

Docker build: `docker build -t myfinishline .`

## Architecture Overview

This is a Next.js 16 fitness challenge tracking application (MyFinishLine) using the App Router with React 19.

### Route Groups

The app uses Next.js route groups to apply different layouts:
- `(application)/app/` - Main authenticated app pages (homepage, profile, contracts, leaderboard, integrations)
- `(with-header)/` - Public pages with header (landing page, challenges, payment, FAQ)
- `(without-header)/` - Auth flows and legal pages (login, signup, verify, password reset, terms)

### State Management

Redux Toolkit with redux-persist for client-side state:
- Store: `app/lib/store.ts`
- Slices in `app/lib/features/`: user, activities, challenge, products, leaderboard, profile
- Typed hooks: `useAppDispatch`, `useAppSelector` from `app/lib/hooks.ts`
- Provider wrapper: `app/StoreProvider.tsx` (client component)

### API Structure

- Backend API base: `https://dev.myfinishline.io/back/api` (configured in `app/lib/utils/instance.ts`)
- API routes in `app/api/` proxy to backend and handle: auth, strava, fitbit, user, leaderboard, payment
- Payment integrations: Stripe and Paddle

### Key Integrations

- **Strava/Fitbit**: Activity syncing via OAuth flows in `app/api/strava/` and `app/api/fitbit/`
- **Maps**: Leaflet for challenge route visualization (`app/components/Map/`)
- **Payments**: Stripe (`@stripe/react-stripe-js`) and Paddle (`@paddle/paddle-js`)

### Component Organization

- `app/components/Application/` - In-app components (navbar, profile, settings, map, leaderboard)
- `app/components/Shared/` - Reusable UI primitives (Avatar, Modal, Loader, etc.)
- `app/components/ui/` - shadcn/ui components (new-york style)
- `app/components/Challenge*/` - Challenge-related page components

### UI Framework

- Tailwind CSS 4 with shadcn/ui (new-york style)
- Component aliases configured in `components.json`:
  - `@/app/components` for components
  - `@/app/components/ui` for UI primitives
  - `@/app/lib` for utilities

### Types

- Core domain types in `app/types.ts`: IActiveChallenge, IActivity, IContract, IReward, ILeaderboard
- Auth/user types in `app/types/auth.ts` and `app/types/user.ts`
