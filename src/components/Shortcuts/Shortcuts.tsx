import { CalendarCheck, Gift, ListChecks, Ticket, type LucideIcon } from "lucide-react";
import s from "./Shortcuts.module.css";

/**
 * Rewards/Shortcuts — 4열 · 아이콘 28 · 레이블 11 · py18 (구성 제안)
 * 아이콘명은 Figma 레이어명(lucide)과 동일
 * dot: 알림 점 6px (Rewards/Badge/Dot) — 아이콘 우상단
 */
export type ShortcutKey = "daily" | "weekly" | "draw" | "attendance";

const ICONS: Record<ShortcutKey, LucideIcon> = {
  daily: Gift,
  weekly: ListChecks,
  draw: Ticket,
  attendance: CalendarCheck,
};

export type ShortcutItem = { key: ShortcutKey; label: string; dot?: boolean };

type Props = {
  items: ShortcutItem[];
  onSelect?: (key: ShortcutKey) => void;
};

export function Shortcuts({ items, onSelect }: Props) {
  return (
    <nav className={s.row} aria-label="바로가기">
      {items.map(({ key, label, dot }) => {
        const Icon = ICONS[key];
        return (
          <button key={key} type="button" className={s.item} onClick={() => onSelect?.(key)}>
            <span className={s.iconWrap}>
              <Icon size={28} strokeWidth={1.75} />
              {dot && <i className={s.dot} aria-label="새 소식" />}
            </span>
            <span className={s.label}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
