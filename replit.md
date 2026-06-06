# Bombay Metal Exchange (BME) Website

## Overview

This is the official website for **Bombay Metal Exchange Ltd. (BME)**, the apex body of non-ferrous metals trade and industry in India since 1933. The site serves as a public-facing information portal for BME's 725+ members and the broader industry.

Key features include:
- Informational pages about BME's leadership, history, and products
- Live announcements fetched from a PostgreSQL database
- Contact/inquiry form that saves submissions to the database
- Events, gallery, circulars, conclave, knowledge hub, and membership pages
- Responsive design with a BME red and copper/gold color theme

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React (with Vite as the build tool)
- **Routing**: Wouter (lightweight client-side router)
- **State/Data Fetching**: TanStack React Query v5 for server state management
- **Forms**: React Hook Form with Zod validation via `@hookform/resolvers`
- **UI Components**: shadcn/ui component library (New York style) built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Fonts**: Playfair Display (serif/headings) + Plus Jakarta Sans (sans/body) from Google Fonts
- **Color Theme**: BME Red (`hsl(0 91% 55%)`) as primary, Copper/Gold (`hsl(30 85% 55%)`) as accent, dark charcoal as secondary

The frontend lives in `client/src/` with:
- `pages/` — one file per route (Home, About, Contact, Events, Gallery, etc.)
- `components/` — shared components (Navbar, Footer, PageHero, InquiryForm) + `ui/` folder for shadcn components
- `hooks/` — custom React Query hooks (`use-announcements.ts`, `use-inquiries.ts`)
- `lib/` — utility functions and queryClient setup

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript, run via `tsx` in development
- **Structure**: Single-server setup serving both API routes and static files
- **API Pattern**: REST endpoints defined under `/api/` prefix
- **Route contract**: Shared route definitions in `shared/routes.ts` using Zod schemas, consumed by both frontend and backend to ensure type safety

Key server files:
- `server/index.ts` — Express app setup, middleware, HTTP server creation
- `server/routes.ts` — API route registration, database seeding on startup
- `server/storage.ts` — `DatabaseStorage` class implementing `IStorage` interface for all DB operations
- `server/db.ts` — Drizzle ORM client connected to PostgreSQL via `node-postgres`

### Data Storage
- **Database**: PostgreSQL (connection via `DATABASE_URL` env variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-derived Zod validators
- **Schema** (`shared/schema.ts`) defines these tables:
  - `inquiries` — contact form submissions (name, email, subject, message)
  - `announcements` — news/announcements shown on the homepage (title, content, date)
  - `events` — upcoming/past events (title, description, location, eventDate, imageUrl, type)
  - `team` — team/leadership members (name, role, category, imageUrl, bio, order)
  - `circulars` — trade circulars/notices (title, description, fileUrl, date)
  - `gallery` — gallery images (id, imageUrl, category, title)
- **Migrations**: Stored in `./migrations/`, managed with `drizzle-kit push`

### Shared Code Pattern
The `shared/` directory contains code used by both frontend and backend:
- `shared/schema.ts` — Drizzle table definitions + Zod insert schemas
- `shared/routes.ts` — API route contracts (method, path, input schema, response schema)

This pattern avoids duplication and ensures the frontend and backend agree on data shapes at compile time.

### Authentication
No authentication system is currently implemented. The site is a public-facing information portal.

### Build & Deployment
- **Dev**: `tsx server/index.ts` with Vite middleware for HMR
- **Build**: Custom `script/build.ts` runs Vite for the client then esbuild to bundle the server into `dist/index.cjs`
- **Production**: `node dist/index.cjs` serves both API and static client files

## External Dependencies

### Frontend Libraries
| Library | Purpose |
|---|---|
| `wouter` | Client-side routing |
| `@tanstack/react-query` | Server state management and data fetching |
| `react-hook-form` + `@hookform/resolvers` | Form management with Zod validation |
| `radix-ui/*` | Accessible UI primitives (used by shadcn/ui) |
| `embla-carousel-react` | Carousel/slider component |
| `lucide-react` | Icon library |
| `date-fns` | Date formatting |
| `clsx` + `tailwind-merge` | Conditional class name utilities |

### Backend Libraries
| Library | Purpose |
|---|---|
| `express` v5 | HTTP server framework |
| `drizzle-orm` | Type-safe ORM for PostgreSQL |
| `drizzle-zod` | Zod schema generation from Drizzle tables |
| `pg` (node-postgres) | PostgreSQL driver |
| `zod` | Schema validation (shared with frontend) |

### Build Tools
| Tool | Purpose |
|---|---|
| `vite` + `@vitejs/plugin-react` | Frontend bundler and dev server |
| `esbuild` | Server bundler for production |
| `tsx` | TypeScript execution for dev server |
| `drizzle-kit` | Database schema migration CLI |

### Replit Plugins (dev only)
- `@replit/vite-plugin-runtime-error-modal` — Error overlay in development
- `@replit/vite-plugin-cartographer` — Replit-specific dev tooling
- `@replit/vite-plugin-dev-banner` — Dev environment banner

### External Services / Assets
- **Google Fonts**: Playfair Display + Plus Jakarta Sans (loaded via CDN in `index.html` and `index.css`)
- **Local assets**: BME event photos (bme1–bme14) and leadership photos stored in `attached_assets/` directory, imported directly into components for all page hero backgrounds, gallery, events, and conclave sections
- **Note**: Only Hemant K. Parekh's director photo still uses an Unsplash placeholder (no real photo provided yet)
- **Mobile responsiveness**: All 13+ pages optimized for mobile viewports with responsive grids, text sizing, spacing, touch-friendly sliders, and scrollable tab filters

### Environment Variables Required
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (required at startup) |