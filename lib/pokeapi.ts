import type { PokemonDetail, PokemonListItem } from './types';

const BASE_URL = 'https://pokeapi.co/api/v2';

/** National dex entries that have official artwork (Gen 1-9). */
export const TOTAL_POKEMON = 1025;

export const artworkUrl = (id: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`PokeAPI request failed: ${res.status} ${path}`);
  }
  return res.json() as Promise<T>;
}

export async function getPokemonList(): Promise<PokemonListItem[]> {
  const data = await get<{ results: { name: string; url: string }[] }>(
    `/pokemon?limit=${TOTAL_POKEMON}`
  );

  return data.results.map((item) => ({
    // url looks like https://pokeapi.co/api/v2/pokemon/25/
    id: Number(item.url.split('/').filter(Boolean).pop()),
    name: item.name,
  }));
}

interface RawPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number | null;
  types: { slot: number; type: { name: string } }[];
  abilities: { ability: { name: string }; is_hidden: boolean }[];
  stats: { base_stat: number; stat: { name: string } }[];
  moves: { move: { name: string } }[];
}

export async function getPokemon(id: number): Promise<PokemonDetail> {
  const raw = await get<RawPokemon>(`/pokemon/${id}`);

  return {
    id: raw.id,
    name: raw.name,
    height: raw.height,
    weight: raw.weight,
    baseExperience: raw.base_experience,
    types: [...raw.types].sort((a, b) => a.slot - b.slot).map((t) => t.type.name),
    abilities: raw.abilities.map((a) => ({ name: a.ability.name, isHidden: a.is_hidden })),
    stats: raw.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
    moves: raw.moves.map((m) => m.move.name).sort(),
  };
}
