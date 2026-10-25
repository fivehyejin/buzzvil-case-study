import s from "./Tooltip.module.css";

/**
 * Rewards/Tooltip — W310 · R8 · p16 · 검정 면 · 제목 13/700 + 본문 12 · 화살표 16×10 (제안)
 * 중요한 지급 조건은 툴팁 안에만 두지 않는다.
 */
type Props = {
  title: string;
  body: string;
  /** 화살표 가로 위치 (px, 기본 36) */
  arrowLeft?: number;
  className?: string;
};

export function Tooltip({ title, body, arrowLeft = 36, className }: Props) {
  return (
    <div className={[s.wrap, className ?? ""].join(" ")} role="note">
      <div className={s.bubble}>
        <strong className={s.title}>{title}</strong>
        <p className={s.body}>{body}</p>
      </div>
      <svg className={s.arrow} style={{ left: arrowLeft }} width="16" height="10" viewBox="0 0 16 10" aria-hidden>
        <path d="M0 0h16L8 10z" fill="var(--action-primary)" />
      </svg>
    </div>
  );
}
