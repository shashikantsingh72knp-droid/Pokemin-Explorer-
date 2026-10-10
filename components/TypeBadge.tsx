import { formatName } from '../lib/format';
import { typeColor, typeTextColor } from '../lib/typeColors';

export default function TypeBadge({ type }: { type: string }) {
  return (
    <span
      className="rounded-full border-2 border-ink px-3 py-1 text-sm font-bold"
      style={{ backgroundColor: typeColor(type), color: typeTextColor(type) }}
    >
      {formatName(type)}
    </span>
  );
}
