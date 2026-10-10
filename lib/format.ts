/** "mr-mime" -> "Mr Mime" */
export function formatName(name: string): string {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

/** 7 -> "#007" */
export function formatDexNumber(id: number): string {
  return `#${String(id).padStart(3, '0')}`;
}

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

export function formatStatName(name: string): string {
  return STAT_LABELS[name] ?? formatName(name);
}
