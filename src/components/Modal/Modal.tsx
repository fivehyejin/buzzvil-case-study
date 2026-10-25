import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/Button/Button";
import s from "./Modal.module.css";

/**
 * Rewards/Modal — 대화상자 326 / inset 24 / R16 · 제목 18/700 + × · 검정 CTA H56 · 오버레이 45% (제안)
 * 규칙: 제목과 주요 행동은 항상 보이게. 페이지 점은 안내가 여러 장일 때만.
 * 닫기·배경 탭 허용 여부는 정책 미정 → 기본 허용, prop으로 제어.
 */
type Props = {
  open: boolean;
  title: string;
  children: ReactNode;
  ctaLabel?: string;
  onCta?: () => void;
  onClose: () => void;
  /** 배경 탭으로 닫기 허용 (기본 true) */
  dismissible?: boolean;
  /** 안내가 여러 장일 때만: 현재/전체 */
  page?: { index: number; total: number };
};

export function Modal({ open, title, children, ctaLabel = "확인", onCta, onClose, dismissible = true, page }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismissible && onClose();
    window.addEventListener("keydown", onKey);
    ref.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dismissible, onClose]);

  if (!open) return null;

  return (
    <div className={s.overlay} onClick={dismissible ? onClose : undefined} role="presentation">
      <div
        ref={ref}
        className={s.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={s.head}>
          <h2 id="modal-title" className={s.title}>
            {title}
          </h2>
          <button type="button" className={s.close} onClick={onClose} aria-label="닫기">
            <X size={20} strokeWidth={2} />
          </button>
        </div>
        <div className={s.body}>{children}</div>
        {page && page.total > 1 && <Pagination index={page.index} total={page.total} />}
        <Button onClick={onCta ?? onClose}>{ctaLabel}</Button>
      </div>
    </div>
  );
}

/** Rewards/Pagination — Dot 6 · Gap 6 · 현재 검정 */
export function Pagination({ index, total }: { index: number; total: number }) {
  return (
    <div className={s.pages} aria-label={`${total}장 중 ${index + 1}장`}>
      {Array.from({ length: total }, (_, i) => (
        <i key={i} className={i === index ? s.dotOn : s.dot} />
      ))}
    </div>
  );
}
