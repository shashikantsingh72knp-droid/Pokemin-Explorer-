import { formatStatName } from '../lib/format';

const MAX_BASE_STAT = 255;

interface StatBarProps {
  name: string;
  value: number;
  color: string;
}

export default function StatBar({ name, value, color }: StatBarProps) {
  const percent = Math.min(100, (value / MAX_BASE_STAT) * 100);

  return (
    <div className="grid grid-cols-[5.5rem_2.5rem_1fr] items-center gap-3">
      <dt className="text-sm font-semibold">{formatStatName(name)}</dt>
      <dd className="text-right font-display text-base font-bold tabular-nums">{value}</dd>
      <div
        className="h-3 overflow-hidden rounded-full border-2 border-ink bg-white"
        role="presentation"
      >
        <div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
