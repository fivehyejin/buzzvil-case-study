import { Button } from "@/components/Button/Button";
import type { GoalOffer } from "@/lib/types";
import s from "./GoalCard.module.css";

/**
 * 목표 오퍼 카드 — 흰 면 · 1px #D9D9D9 · R12 · p16 (52:1878 관찰)
 * 태그(목표 · 난이도 상) → 제목 15/700 "KB 체크카드 발급 · 7,200원(파랑)" → 우측 "보기" outline
 */
type Props = {
  goal: GoalOffer;
  cta: string;
  onClick?: (g: GoalOffer) => void;
};

export function GoalCard({ goal, cta, onClick }: Props) {
  return (
    <div className={s.card}>
      <div className={s.body}>
        <div className={s.tags}>
          {goal.tags.map((t) => (
            <span key={t} className={s.tag}>
              {t}
            </span>
          ))}
        </div>
        <p className={s.title}>
          {goal.title} · <span className={s.reward}>{goal.reward.toLocaleString("ko-KR")}원</span>
        </p>
      </div>
      <Button variant="miniOutline" onClick={() => onClick?.(goal)} aria-label={`${goal.title} ${cta}`}>
        {cta}
      </Button>
    </div>
  );
}
