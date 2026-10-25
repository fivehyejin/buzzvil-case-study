import s from "./Progress.module.css";

/**
 * Rewards/Progress — 1~5 분할 진행 바
 * 세그먼트 H8 · 간격 2 · R999 · 분수와 간격 8
 * Empty 회색 (관찰) / 채움 파랑 (제안) · 총 구간 = 미션 수
 */
type Props = {
  /** 완료 수 */
  done: number;
  /** 총 구간 수 (1–5 권장) */
  total: number;
  /** 분수 표기 숨김 */
  hideLabel?: boolean;
  className?: string;
};

export function Progress({ done, total, hideLabel, className }: Props) {
  const safeTotal = Math.max(1, total);
  const safeDone = Math.min(Math.max(0, done), safeTotal);
  return (
    <div
      className={[s.wrap, className ?? ""].join(" ")}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={safeTotal}
      aria-valuenow={safeDone}
      aria-label={`${safeTotal}개 중 ${safeDone}개 완료`}
    >
      <div className={s.track}>
        {Array.from({ length: safeTotal }, (_, i) => (
          <i key={i} className={i < safeDone ? s.filled : s.empty} />
        ))}
      </div>
      {!hideLabel && (
        <span className={s.label}>
          {safeDone}/{safeTotal}
        </span>
      )}
    </div>
  );
}
