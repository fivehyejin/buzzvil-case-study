import { ChevronLeft, X } from "lucide-react";
import s from "./AppBar.module.css";

/**
 * Rewards/AppBar — H56 · px20 · 제목 17/700 · 아이콘 22 (구성 제안)
 */
type Props = {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
};

export function AppBar({ title, onBack, onClose }: Props) {
  return (
    <header className={s.bar}>
      <button type="button" className={s.icon} onClick={onBack} aria-label="뒤로" disabled={!onBack}>
        <ChevronLeft size={22} strokeWidth={2} />
      </button>
      <h1 className={s.title}>{title}</h1>
      <button type="button" className={s.icon} onClick={onClose} aria-label="닫기" disabled={!onClose}>
        <X size={22} strokeWidth={2} />
      </button>
    </header>
  );
}
