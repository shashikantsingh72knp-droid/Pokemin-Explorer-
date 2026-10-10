export interface PokemonListItem {
  id: number;
  name: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number; // decimetres (as returned by the API)
  weight: number; // hectograms (as returned by the API)
  baseExperience: number | null;
  types: string[];
  abilities: { name: string; isHidden: boolean }[];
  stats: { name: string; value: number }[];
  moves: string[];
}
