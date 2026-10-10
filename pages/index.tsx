import type { GetStaticProps } from 'next';
import { useMemo, useState } from 'react';
import Layout from '../components/Layout';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import { getPokemonList } from '../lib/pokeapi';
import type { PokemonListItem } from '../lib/types';

const PAGE_SIZE = 48;

interface HomeProps {
  pokemon: PokemonListItem[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const pokemon = await getPokemonList();
  // Rebuild the page in the background at most once a day (ISR)
  return { props: { pokemon }, revalidate: 60 * 60 * 24 };
};

export default function Home({ pokemon }: HomeProps) {
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^#/, '').replace(/\s+/g, '-');
    if (!q) return pokemon;
    return pokemon.filter((p) => p.name.includes(q) || String(p.id) === q);
  }, [pokemon, query]);

  const handleSearch = (value: string) => {
    setQuery(value);
    setVisibleCount(PAGE_SIZE); // start from the top for every new search
  };

  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visible.length;

  return (
    <Layout title="Pokémon Explorer">
      <section className="border-b-2 border-ink bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <h1 className="max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Find any Pokémon in the Pokédex
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink/70">
            {pokemon.length.toLocaleString()} Pokémon. Search by name or number, then open one to see
            its stats, abilities and moves.
          </p>
          <div className="mt-8">
            <SearchBar value={query} onChange={handleSearch} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="mb-6 text-sm font-semibold text-ink/70" aria-live="polite">
          {query ? `${filtered.length} result${filtered.length === 1 ? '' : 's'} for “${query}”` : `Showing ${visible.length} of ${filtered.length}`}
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-ink/40 p-10 text-center">
            <p className="font-display text-xl font-bold">No Pokémon match “{query}”</p>
            <p className="mt-2 text-ink/70">Check the spelling, or try a Pokédex number instead.</p>
            <button
              type="button"
              onClick={() => handleSearch('')}
              className="mt-5 rounded-full border-2 border-ink bg-dex px-5 py-2 font-bold text-white"
            >
              Clear search
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {visible.map((p) => (
              <li key={p.id}>
                <PokemonCard pokemon={p} />
              </li>
            ))}
          </ul>
        )}

        {remaining > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="rounded-full border-2 border-ink bg-ink px-6 py-3 font-bold text-white transition-colors hover:bg-dex"
            >
              Show {Math.min(PAGE_SIZE, remaining)} more
            </button>
          </div>
        )}
      </section>
    </Layout>
  );
}
