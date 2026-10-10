# Pokémon Explorer

A responsive Pokémon Explorer built with **Next.js (Pages Router)**, **TypeScript** and **Tailwind CSS**, using data from [PokéAPI](https://pokeapi.co).

## Features

- **Homepage**: all 1025 Pokémon with official artwork, shown 48 at a time with a "Show more" button.
- **Search**: instant client-side filter by name or Pokédex number (`pikachu`, `mr mime`, `25`, `#25`).
- **Detail page** (`/pokemon/[id]`): image, types, height/weight, abilities (incl. hidden), base stats with bars, and full move list.
- **Prev / Next** navigation between Pokémon.
- **Performance**: SSG + ISR. The list page and the first 151 detail pages are pre-rendered at build time; other Pokémon are generated on first request (`fallback: 'blocking'`) and revalidated daily. Images are optimised with `next/image`.
- **Accessibility**: labelled search, visible keyboard focus, `aria-live` result count, reduced-motion support.

## Run locally

Requirements: Node.js 18.17+ and npm.

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Project structure

```
components/   Layout, SearchBar, PokemonCard, TypeBadge, StatBar
lib/          pokeapi.ts (data fetching), types.ts, format.ts, typeColors.ts
pages/        index.tsx, pokemon/[id].tsx, 404.tsx, _app.tsx
styles/       globals.css (Tailwind)
```

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com). No environment variables are needed.
