# Bized App — Universal Monorepo Implementation Plan

## Stack
- **Monorepo**: Turborepo
- **Web (PWA)**: Next.js 15.1.0 → `apps/next` (port 3002)
- **Native**: Expo SDK 52 → `apps/expo`
- **Shared Logic**: `@repo/logic` (Zod + TanStack Query)
- **Shared UI**: `@repo/app` (NativeWind v4 universal screens)
- **Styling**: NativeWind v4 (Tailwind CSS) · Design token: `#25D366` WhatsApp Green
- **Routing**: `@react-navigation/bottom-tabs` (Expo) · Next.js App Router (Web)
- **DB**: MongoDB (bizeddev)
- **Auth**: NextAuth v5

---

## Phase 1 — Monorepo Init ✅
- Turborepo scaffold with `apps/next` + `apps/expo`
- `packages/app`, `packages/ui`, `packages/logic`, `packages/typescript-config`, `packages/tailwind-config`

## Phase 2 — Dependency Wiring ✅
- NativeWind v4 configured for Next.js + Expo
- Webpack aliasing: `react-native → react-native-web`, `react-native-svg → react-native-svg-web`
- `@swc/helpers` correctly versioned (0.5.15 matching Next.js 15.1.0's internal version)
- `next.config.ts` with `transpilePackages` for all universal packages

## Phase 3 — Landing Page ✅
- Premium "WhatsApp Professional" landing page at `apps/next/app/page.tsx`
- Sections: Hero, Bento Grid (5 Features), PWA Storefront Preview, CTA Footer
- Live at `http://localhost:3002`

## Phase 4 — Environment Configuration ✅
- `.env.local` at root and `apps/next` with all credentials (MongoDB, Firebase, Stripe, Meta, NextAuth)

## Phase 5 — Core Domain Modules ✅

### @repo/logic Layer
| File | Contents |
|------|----------|
| `types/index.ts` | TypeScript interfaces for all 10 domains |
| `validation/index.ts` | Zod schemas + inferred input types for all 10 domains |
| `queries/index.ts` | TanStack Query hooks with centralized `queryKeys` |

### @repo/app Universal Screens (11 screens)
| Module | File |
|--------|------|
| Landing | `features/landing/screen.tsx` |
| Catalog | `features/catalog/screen.tsx` |
| Orders | `features/order/screen.tsx` |
| Payment Links | `features/payment-links/screen.tsx` |
| Broadcasts | `features/marketing/screen.tsx` |
| Bookings | `features/booking/screen.tsx` |
| Invoices | `features/invoice/screen.tsx` |
| Subscriptions | `features/subscriptions/screen.tsx` |
| Store | `features/store/screen.tsx` |
| User Profile | `features/user/screen.tsx` |
| Business Settings | `features/business/screen.tsx` |

### apps/next Routes
| Route | File |
|-------|------|
| `/` | `app/page.tsx` — Premium Landing Page |
| `/catalog` | `app/catalog/page.tsx` |
| `/orders` | `app/orders/page.tsx` |
| `/payment-links` | `app/payment-links/page.tsx` |
| `/marketing` | `app/marketing/page.tsx` |
| `/bookings` | `app/bookings/page.tsx` |
| `/invoices` | `app/invoices/page.tsx` |
| `/subscriptions` | `app/subscriptions/page.tsx` |
| `/store` | `app/store/page.tsx` |
| `/profile` | `app/profile/page.tsx` |
| `/business` | `app/business/page.tsx` |

### apps/expo Navigation
- Bottom Tab Navigator with 10 tabs (dark WhatsApp-styled bar)
- Stack screen for Business (modal)
- `@react-navigation/bottom-tabs` + `@react-navigation/native-stack`

---

## Phase 6 — Next Steps (TODO)
- [ ] API routes: Connect MongoDB collections to REST endpoints under `apps/next/app/api/`
- [ ] Auth flow: NextAuth with Credentials + Google provider
- [ ] Real data: Wire TanStack Query hooks with actual HTTP fetchers
- [ ] Dashboard: Analytics/overview screen with revenue, order, and broadcast stats
- [ ] WhatsApp Cloud API webhooks
- [ ] Stripe payment gateway integration
- [ ] Production build verification (`npm run build`)
- [ ] PWA manifest + service worker
