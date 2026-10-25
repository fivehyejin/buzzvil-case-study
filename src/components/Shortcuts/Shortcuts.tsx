import { CalendarCheck, Gift, ListChecks, Ticket, type LucideIcon } from "lucide-react";
import s from "./Shortcuts.module.css";

/**
 * Rewards/Shortcuts — 4열 · 아이콘 28 · 레이블 11 · py18 (구성 제안)
 * 아이콘명은 Figma 레이어명(lucide)과 동일
 */
export type ShortcutKey = "daily" | "weekly" | "draw" | "attendance";

const ICONS: Record<ShortcutKey, LucideIcon> = {
  daily: Gift,
  weekly: ListChecks,
  draw: Ticket,
  attendance: CalendarCheck,
};

type Item = { key: ShortcutKey; label: string; badge?: number };

type Props = {
  items: Item[];
  onSelect?: (key: ShortcutKey) => void;
};

export function Shortcuts({ items, onSelect }: Props) {
  return (
    <nav className={s.row} aria-label="바로가기">
      {items.map(({ key, label }) => {
        const Icon = ICONS[key];
        return (
          <button key={key} type="button" className={s.item} onClick={() => onSelect?.(key)}>
            <Icon size={28} strokeWidth={1.75} />
            <span className={s.label}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
