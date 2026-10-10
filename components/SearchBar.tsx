interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl">
      <label htmlFor="pokemon-search" className="sr-only">
        Search Pokémon by name or number
      </label>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        id="pokemon-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name or number, e.g. pikachu or 25"
        autoComplete="off"
        className="w-full rounded-full border-2 border-ink bg-white py-3 pl-12 pr-4 text-base shadow-[4px_4px_0_0_#14181F] placeholder:text-ink/45"
      />
    </div>
  );
}
