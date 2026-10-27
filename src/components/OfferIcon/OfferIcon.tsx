import {
  Gamepad2,
  Gift,
  Hand,
  ShieldCheck,
  Shuffle,
  TextCursor,
  UserRoundPlus,
  type LucideIcon,
} from "lucide-react";
import type { OfferIcon as IconName } from "@/lib/types";
import s from "./OfferIcon.module.css";

/** Figma 레이어명 = lucide 아이콘명 */
const ICONS: Record<IconName, LucideIcon> = {
  "user-round-plus": UserRoundPlus,
  "shield-check": ShieldCheck,
  gift: Gift,
  "gamepad-2": Gamepad2,
  "text-cursor": TextCursor,
  hand: Hand,
  shuffle: Shuffle,
};

/**
 * 오퍼 아이콘 — 36 박스(#F5F5F5 · R8) 안에 21 글리프 (관찰)
 * bare: 박스 없이 글리프만 (미니게임 카드)
 */
export function OfferIcon({ name, size = 21, bare = false }: { name: IconName; size?: number; bare?: boolean }) {
  const Icon = ICONS[name];
  if (bare) return <Icon size={size} strokeWidth={1.75} aria-hidden />;
  return (
    <span className={s.box} aria-hidden>
      <Icon size={size} strokeWidth={1.75} />
    </span>
  );
}
