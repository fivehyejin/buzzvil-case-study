import type { ButtonHTMLAttributes, ReactNode } from "react";
import s from "./Button.module.css";

/**
 * Rewards/Button
 * - primary : H56 · R12 · 검정 면 · 16/700 (관찰)
 * - compact : W104 · H36 · R8 · 13/700 (제안, 목록 안 행동)
 * - utility : 44×44 · 1px 경계 · R8 (제안, 아이콘 전용)
 * disabled : 면 #D9D9D9 · 글자 #888 (제안)
 *
 * 눌림(pressed) 상태는 원본에 없어 작업용으로 정의: 검정 면 90% 불투명 + scale .98
 */
type Variant = "primary" | "compact" | "utility";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  /** primary 전용: 가로 꽉 채우기 (기본 true) */
  block?: boolean;
  /** 로딩 중 — 레이블 대신 점 3개, 중복 탭 방지 */
  loading?: boolean;
  /** utility 전용 접근성 레이블 */
  "aria-label"?: string;
  children?: ReactNode;
};

export function Button({
  variant = "primary",
  block = variant === "primary",
  loading = false,
  disabled,
  className,
  children,
  ...rest
}: Props) {
  const cls = [s.base, s[variant], block ? s.block : "", loading ? s.loading : "", className ?? ""]
    .filter(Boolean)
    .join(" ");
  return (
    <button
      type="button"
      className={cls}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <span className={s.dots} aria-hidden>
          <i /><i /><i />
        </span>
      ) : (
        children
      )}
    </button>
  );
}
