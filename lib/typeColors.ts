export const TYPE_COLORS: Record<string, string> = {
  normal: '#9099A1',
  fire: '#F4813A',
  water: '#4F92E0',
  electric: '#F2CB2B',
  grass: '#5FB95A',
  ice: '#6FCFC4',
  fighting: '#CE416B',
  poison: '#B061CF',
  ground: '#D78555',
  flying: '#8FA9DE',
  psychic: '#F5726F',
  bug: '#91C12F',
  rock: '#C5B78C',
  ghost: '#5269AC',
  dragon: '#0B6DC3',
  dark: '#5A5465',
  steel: '#5A8EA2',
  fairy: '#EC8FE6',
};

export function typeColor(type: string): string {
  return TYPE_COLORS[type] ?? '#9099A1';
}

/** Light types need dark text for readable contrast. */
const LIGHT_TYPES = new Set(['electric', 'ice', 'rock', 'bug', 'flying', 'fairy', 'grass', 'normal']);
export function typeTextColor(type: string): string {
  return LIGHT_TYPES.has(type) ? '#14181F' : '#FFFFFF';
}
