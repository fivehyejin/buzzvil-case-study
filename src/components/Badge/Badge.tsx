import type { ReactNode } from "react";
import s from "./Badge.module.css";

/**
 * Rewards/Badge
 * - reward : 리워드 값. 면 #E5EAFC · 글자 #4164FF 13/700 · R999 (관찰 "156원")
 * - promo  : 한정 혜택 태그. 빨강 면 · 흰 10/700 · R3 (제안) — reward와 혼용 금지
 * - count  : 알림 숫자. 빨강 · H18 · 99 초과 → 99+ (제안)
 * - dot    : 알림 점 6px (제안)
 */
type Props =
  | { kind: "reward"; children: ReactNode }
  | { kind: "promo"; children: ReactNode }
  | { kind: "count"; value: number }
  | { kind: "dot" };

export function Badge(p: Props) {
  switch (p.kind) {
    case "reward":
      return <span className={s.reward}>{p.children}</span>;
    case "promo":
      return <span className={s.promo}>{p.children}</span>;
    case "count":
      return (
        <span className={s.count} aria-label={`${p.value}개 알림`}>
          {p.value > 99 ? "99+" : p.value}
        </span>
      );
    case "dot":
      return <span className={s.dot} aria-label="새 알림" />;
  }
}

/** 단위를 금액과 한 묶음으로 — 리워드 배지 안에서 숫자는 Inter */
export function RewardAmount({ value, unit = "원" }: { value: number; unit?: string }) {
  return (
    <Badge kind="reward">
      <span className={s.num}>{value.toLocaleString("ko-KR")}</span>
      {unit}
    </Badge>
  );
}
