# parfume-reseller-dashboard

A full-stack monorepo that runs a perfume reselling business end to end - a customer-facing storefront and an admin back office, powered by a single Express + PostgreSQL API.

<div align="center">
<img src="apps/web/src/assets/hero.png" alt="Parfume reseller storefront hero" width="720" />
</div>

## Features

**Storefront (customer side)**

- Product catalog with brand sections, search, and promo pages
- Product detail pages with fragrance metadata - top / mid / base notes, longevity, projection
- Cart, checkout with saved addresses, shipping methods, and payment options
- Order history and order tracking (status timeline + tracking number)
- Product reviews with verified-purchase flagging
- Email/password authentication and account registration

**Admin back office**

- Admin dashboard, sales analytics, and finance views (income/expense transactions)
- Product management (stock, status, pricing, images) and order management
- Store settings: appearance, payment methods (incl. QRIS), shipping methods, and notifications

**Shared platform**

- Role-based access (`customer` / `admin`) built on Better Auth, with dedicated auth and admin middleware
- Order status pipeline (`BARU -> DIPROSES -> DIKIRIM -> SELESAI`) with per-order event log
- Per-user settings: profile, addresses, appearance, notifications, security

## Architecture

This repository is an npm-workspaces monorepo with two applications that share one database:

```
.
├── apps/
│ ├── api/ # Express REST API (runs on :3001)
│ │ ├── src/auth/ # Better Auth configuration
│ │ ├── src/db/ # Drizzle ORM schema & database client
│ │ ├── src/middleware/ # requireAuth / admin guards
│ │ ├── src/routes/ # auth, products, cart, orders, reviews, addresses,
│ │ │ # promos, admin/finance, admin/analytics, admin/settings, settings
│ │ ├── src/services/ # business logic per domain
│ │ └── drizzle.config.ts
│ └── web/ # React SPA storefront + admin UI (runs on :5173)
│ ├── src/pages/ # storefront, admin, and settings pages
│ ├── src/components/ # header, layout, catalog, global search, admin chrome
│ └── src/context/ # store-wide client state
├── docker-compose.yml # local PostgreSQL 16
└── package.json # workspace root - `npm run dev` starts both apps
```

- **`apps/api`** - Express 5 REST API with a service/route layer per domain. Data access goes through Drizzle ORM; the schema models users and profiles, products and images, carts, orders (with items and events), reviews, addresses, promotions, financial transactions, and store configuration (payment, QRIS, shipping, notifications). Zod validates request payloads.
- **`apps/web`** - React 19 single-page app served by Vite. Server state is managed with TanStack Query, routing with React Router, and styling with Tailwind CSS. API access goes through a typed API/auth client layer (`src/lib/`).
- **`docker-compose.yml`** - spins up the PostgreSQL database for local development (`parfume_db`, matching the `.env.example` defaults).

## Tech stack

| Layer | Technology |
| --- | --- |
| API | Express 5, Better Auth, Zod |
| ORM / Database | Drizzle ORM, PostgreSQL 16 |
| Frontend | React 19, Vite, React Router 7 |
| Data fetching | TanStack Query, Axios |
| UI | Tailwind CSS 3 (forms + container queries plugins), Framer Motion |
| Tooling | TypeScript, tsx, Drizzle Kit, ESLint 9, Docker Compose |

## Getting started

**Prerequisites:** Node.js 20+, Docker (for PostgreSQL)

```bash
# 1. Clone
git clone https://github.com/indraaryaLabs/parfume-reseller-dashboard.git
cd parfume-reseller-dashboard

# 2. Start PostgreSQL
docker compose up -d

# 3. Configure the API
cp apps/api/.env.example apps/api/.env

# 4. Install dependencies (all workspaces)
npm install

# 5. Push the Drizzle schema to PostgreSQL
npm run db:push -w apps/api

# 6. Run API (:3001) and web (:5173) together
npm run dev
```

Open the storefront at <http://localhost:5173>. The API is available at <http://localhost:3001> - verify it with the health check at `/api/health`.

Useful commands inside `apps/api`:

```bash
npm run db:generate # generate Drizzle migrations from the schema
npm run db:push # apply the schema to the database
npm run db:studio # browse data in Drizzle Studio
npx tsx set-admin.ts # promote existing users to the admin role
```

## License

Released under the [MIT License](LICENSE).
