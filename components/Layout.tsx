import Head from 'next/head';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface LayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function Layout({
  title,
  description = 'Browse every Pokémon, search by name and see stats, abilities and moves.',
  children,
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="bg-dex text-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Pokémon Explorer home">
            {/* Pokéball mark built from CSS, no image request needed */}
            <span
              aria-hidden="true"
              className="relative block h-8 w-8 overflow-hidden rounded-full border-[3px] border-ink bg-white"
            >
              <span className="absolute inset-x-0 top-0 h-1/2 bg-dex-dark" />
              <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-ink bg-white" />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight">
              Pokémon Explorer
            </span>
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-ink/60 sm:px-6">
        Data from{' '}
        <a className="underline underline-offset-2" href="https://pokeapi.co" target="_blank" rel="noreferrer">
          PokéAPI
        </a>
        .
      </footer>
    </>
  );
}
