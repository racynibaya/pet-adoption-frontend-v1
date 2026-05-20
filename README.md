# KodaNest

A pet adoption web app — the frontend of a two-repo project. Browse adoptable pets, learn about shelters, save favorites, and submit adoption applications. Includes separate portals for adopters, shelter staff, and admins.

Built with **React 18**, **TypeScript**, **Vite**, **React Router v6**, and **Tailwind CSS v4**.

## Features

- **Public site** — Home, pets browse + detail, shelters browse + detail, about, contact, donate.
- **Adoption applications** — Multi-step apply flow at `/pets/:id/apply`.
- **Favorites** — Save pets to a slide-out drawer, persisted to `localStorage`.
- **Email verification** — `/verify-email` flow tied to signup.
- **Adopter portal** — `/users/me` dashboard.
- **Staff portal** — `/staff/*` with sidebar layout for managing pets and adoptions.
- **Admin command center** — `/admin/*` for shelter oversight.
- Custom design system ("Warm Dawn" palette: amber/teal/rose) with Lora + Plus Jakarta Sans typography.

## Tech Stack

| Layer       | Tool                              |
| ----------- | --------------------------------- |
| Framework   | React 18                          |
| Language    | TypeScript (strict)               |
| Build tool  | Vite 5                            |
| Routing     | React Router v6                   |
| Styling     | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Linting     | ESLint 9 + typescript-eslint      |
| Deploy      | Vercel (SPA rewrites in `vercel.json`) |

## Prerequisites

- **Node.js** 18+ and **npm**
- The companion backend repo (`pet-adoption-backend-v1`) running at `http://localhost:3000/api/v1`. Without it, the app falls back to mock data for pet listings.

## Getting Started

```bash
# install dependencies
npm install

# start the dev server (default: http://localhost:5173)
npm run dev
```

## Available Scripts

- `npm run dev` — start the Vite dev server.
- `npm run build` — type-check with `tsc` and produce a production build in `dist/`.
- `npm run preview` — preview the production build locally.

## Project Structure

```
src/
├── App.tsx              # Route tree (public / adopter / staff / admin)
├── main.tsx             # Entry point
├── components/          # Shared layouts and UI components
│   ├── layout/          # Public Navbar, Footer, Layout
│   ├── staff/           # Staff sidebar + StaffLayout
│   ├── user/            # Adopter portal layout
│   └── admin/           # Admin layout
├── context/             # React contexts (Staff, User, Favorites)
├── data/                # View-model types + mock data
├── icons/               # SVG icon components
├── pages/               # Route-level components
│   ├── Home, About, Contact, Donate, ...
│   ├── Apply/PetApply   # Adoption application flow
│   ├── Staff/           # Staff portal pages
│   ├── User/            # Adopter portal pages
│   ├── Admin/           # Admin pages
│   └── Auth/VerifyEmail
├── services/api.ts      # Single backend client (fetch + auth)
└── styles/              # global.css (design tokens) + staff.css
```

## Path Alias

`@/*` resolves to `src/*` — use it instead of long relative paths.

```ts
import Layout from '@/components/layout/Layout';
```

## Deployment

The repo is configured for Vercel. `vercel.json` rewrites all paths to `index.html` so client-side routes work on deep links.

## Backend

The frontend talks to a separate Node/Express backend (`pet-adoption-backend-v1`). The base URL is currently hardcoded to `http://localhost:3000/api/v1` in [src/services/api.ts](src/services/api.ts). Auth uses a short-lived bearer token (kept in memory + `sessionStorage`) and an HTTP-only refresh cookie.

## License

Private project — not published.
