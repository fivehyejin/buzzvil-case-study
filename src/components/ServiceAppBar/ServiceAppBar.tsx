import { X } from "lucide-react";
import s from "./ServiceAppBar.module.css";

/**
 * 서비스 앱바 — H72 · px20 · 좌 닫기 22 · 제목 16/700 + 부제 11 중앙 (52:1848 관찰)
 * 우측 22 자리는 중앙 정렬용 빈 공간.
 */
export function ServiceAppBar({ title, subtitle, onClose }: { title: string; subtitle: string; onClose?: () => void }) {
  return (
    <header className={s.bar}>
      <button type="button" className={s.icon} onClick={onClose} aria-label="닫기">
        <X size={22} strokeWidth={2} />
      </button>
      <div className={s.text}>
        <h1 className={s.title}>{title}</h1>
        <p className={s.sub}>{subtitle}</p>
      </div>
      <span className={s.spacer} aria-hidden />
    </header>
  );
}
