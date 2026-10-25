import { Info } from "lucide-react";
import { Button } from "@/components/Button/Button";
import { Progress } from "@/components/Progress/Progress";
import s from "./BonusPanel.module.css";

/**
 * Rewards/BonusPanel — p20 · R16 · 면 #F5F5F5 (구조 제안)
 * 제목 17/700 + ⓘ → 설명 13 → 5분할 진행 바 → Compact CTA
 */
type Props = {
  title: string;
  description: string;
  done: number;
  total: number;
  ctaLabel: string;
  onInfo?: () => void;
  onCta?: () => void;
};

export function BonusPanel({ title, description, done, total, ctaLabel, onInfo, onCta }: Props) {
  return (
    <section className={s.panel} aria-label={title}>
      <div className={s.head}>
        <h2 className={s.title}>{title}</h2>
        <button type="button" className={s.info} onClick={onInfo} aria-label={`${title} 안내`}>
          <Info size={18} strokeWidth={1.75} />
        </button>
      </div>
      <p className={s.desc}>{description}</p>
      <Progress done={done} total={total} />
      <Button variant="compact" onClick={onCta}>
        {ctaLabel}
      </Button>
    </section>
  );
}
