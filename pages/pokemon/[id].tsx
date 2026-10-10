import type { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../components/Layout';
import StatBar from '../../components/StatBar';
import TypeBadge from '../../components/TypeBadge';
import { formatDexNumber, formatName } from '../../lib/format';
import { artworkUrl, getPokemon, TOTAL_POKEMON } from '../../lib/pokeapi';
import { typeColor } from '../../lib/typeColors';
import type { PokemonDetail } from '../../lib/types';

const INITIAL_MOVES = 24;

interface PokemonPageProps {
  pokemon: PokemonDetail;
}

// Pre-render the original 151 at build time; everything else is generated on first visit.
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: Array.from({ length: 151 }, (_, i) => ({ params: { id: String(i + 1) } })),
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps<PokemonPageProps, { id: string }> = async ({ params }) => {
  const id = Number(params?.id);

  if (!Number.isInteger(id) || id < 1 || id > TOTAL_POKEMON) {
    return { notFound: true };
  }

  try {
    const pokemon = await getPokemon(id);
    return { props: { pokemon }, revalidate: 60 * 60 * 24 };
  } catch {
    return { notFound: true };
  }
};

export default function PokemonPage({ pokemon }: PokemonPageProps) {
  const [showAllMoves, setShowAllMoves] = useState(false);

  const name = formatName(pokemon.name);
  const accent = typeColor(pokemon.types[0]);
  const totalStats = pokemon.stats.reduce((sum, s) => sum + s.value, 0);
  const moves = showAllMoves ? pokemon.moves : pokemon.moves.slice(0, INITIAL_MOVES);

  const prevId = pokemon.id > 1 ? pokemon.id - 1 : null;
  const nextId = pokemon.id < TOTAL_POKEMON ? pokemon.id + 1 : null;

  return (
    <Layout title={`${name} | Pokémon Explorer`} description={`Stats, abilities and moves for ${name}.`}>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <nav className="mb-6 flex items-center justify-between text-sm font-bold" aria-label="Pokémon navigation">
          <Link href="/" className="underline underline-offset-4">
            Back to all Pokémon
          </Link>
          <div className="flex gap-2">
            {prevId && (
              <Link href={`/pokemon/${prevId}`} className="rounded-full border-2 border-ink bg-white px-4 py-1.5">
                Previous
              </Link>
            )}
            {nextId && (
              <Link href={`/pokemon/${nextId}`} className="rounded-full border-2 border-ink bg-white px-4 py-1.5">
                Next
              </Link>
            )}
          </div>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          {/* Artwork panel, tinted with the Pokémon's primary type */}
          <section
            className="relative overflow-hidden rounded-3xl border-2 border-ink p-6"
            style={{ backgroundColor: accent }}
            aria-label={`${name} artwork`}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[9rem] font-extrabold leading-none text-white/35 sm:text-[12rem]"
            >
              {pokemon.id}
            </span>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <Image
                src={artworkUrl(pokemon.id)}
                alt={name}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 440px"
                className="object-contain drop-shadow-[0_12px_0_rgba(20,24,31,0.18)]"
              />
            </div>
          </section>

          {/* Details */}
          <div className="space-y-6">
            <section className="rounded-3xl border-2 border-ink bg-white p-6">
              <p className="font-display text-lg font-bold text-ink/50">{formatDexNumber(pokemon.id)}</p>
              <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{name}</h1>

              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Types">
                {pokemon.types.map((t) => (
                  <li key={t}>
                    <TypeBadge type={t} />
                  </li>
                ))}
              </ul>

              <dl className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="rounded-xl bg-chalk p-3">
                  <dt className="text-sm text-ink/60">Height</dt>
                  <dd className="font-display text-xl font-bold">{(pokemon.height / 10).toFixed(1)} m</dd>
                </div>
                <div className="rounded-xl bg-chalk p-3">
                  <dt className="text-sm text-ink/60">Weight</dt>
                  <dd className="font-display text-xl font-bold">{(pokemon.weight / 10).toFixed(1)} kg</dd>
                </div>
                <div className="rounded-xl bg-chalk p-3">
                  <dt className="text-sm text-ink/60">Base XP</dt>
                  <dd className="font-display text-xl font-bold">{pokemon.baseExperience ?? '-'}</dd>
                </div>
              </dl>
            </section>

            <section className="rounded-3xl border-2 border-ink bg-white p-6">
              <h2 className="font-display text-2xl font-bold">Abilities</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {pokemon.abilities.map((a) => (
                  <li key={a.name} className="rounded-full bg-chalk px-4 py-1.5 font-semibold">
                    {formatName(a.name)}
                    {a.isHidden && <span className="ml-2 text-sm font-normal text-ink/60">(hidden)</span>}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border-2 border-ink bg-white p-6">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-2xl font-bold">Base stats</h2>
                <p className="text-sm text-ink/60">
                  Total <span className="font-bold text-ink">{totalStats}</span>
                </p>
              </div>
              <dl className="mt-4 space-y-3">
                {pokemon.stats.map((s) => (
                  <StatBar key={s.name} name={s.name} value={s.value} color={accent} />
                ))}
              </dl>
            </section>
          </div>
        </div>

        <section className="mt-6 rounded-3xl border-2 border-ink bg-white p-6">
          <h2 className="font-display text-2xl font-bold">
            Moves <span className="text-ink/50">({pokemon.moves.length})</span>
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {moves.map((m) => (
              <li key={m} className="rounded-lg bg-chalk px-3 py-1 text-sm font-medium">
                {formatName(m)}
              </li>
            ))}
          </ul>
          {pokemon.moves.length > INITIAL_MOVES && (
            <button
              type="button"
              onClick={() => setShowAllMoves((v) => !v)}
              className="mt-5 rounded-full border-2 border-ink px-5 py-2 font-bold hover:bg-ink hover:text-white"
              aria-expanded={showAllMoves}
            >
              {showAllMoves ? 'Show fewer moves' : `Show all ${pokemon.moves.length} moves`}
            </button>
          )}
        </section>
      </div>
    </Layout>
  );
}
