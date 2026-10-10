import Image from 'next/image';
import Link from 'next/link';
import { artworkUrl } from '../lib/pokeapi';
import { formatDexNumber, formatName } from '../lib/format';
import type { PokemonListItem } from '../lib/types';

export default function PokemonCard({ pokemon }: { pokemon: PokemonListItem }) {
  return (
    <Link
      href={`/pokemon/${pokemon.id}`}
      className="group block rounded-2xl border-2 border-ink bg-white p-3 transition-transform hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-chalk">
        <span className="absolute left-2 top-1 font-display text-sm font-bold text-ink/50">
          {formatDexNumber(pokemon.id)}
        </span>
        <Image
          src={artworkUrl(pokemon.id)}
          alt={formatName(pokemon.name)}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 180px"
          className="object-contain p-3 transition-transform group-hover:scale-105"
        />
      </div>
      <h2 className="mt-3 truncate font-display text-lg font-bold">{formatName(pokemon.name)}</h2>
    </Link>
  );
}
