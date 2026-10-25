import { Button } from "@/components/Button/Button";
import s from "./CapsuleDraw.module.css";

/**
 * Kit/CapsuleDraw — 캡슐 머신 아트 H300 + CTA 영역 H88 (06 보드 관찰)
 * 아트는 설명용 편집형 도식. 실제 구현 시 일러스트로 교체.
 */
type Props = {
  remaining: number;
  loading?: boolean;
  onDraw?: () => void;
};

export function CapsuleDraw({ remaining, loading = false, onDraw }: Props) {
  const out = remaining <= 0;
  return (
    <section className={s.wrap} aria-label="행운 뽑기">
      <div className={s.art} aria-hidden>
        <CapsuleArt />
      </div>
      <div className={s.cta}>
        <Button onClick={onDraw} disabled={out} loading={loading}>
          {out ? "오늘 뽑기 횟수를 모두 썼어요" : `행운 뽑기 ${remaining}회 남음`}
        </Button>
      </div>
    </section>
  );
}

function CapsuleArt() {
  return (
    <svg width="220" height="240" viewBox="0 0 220 240">
      {/* 돔 */}
      <path d="M30 120a80 80 0 0 1 160 0v10H30z" fill="var(--bg-default)" stroke="var(--border-default)" strokeWidth="2" />
      {/* 캡슐들 */}
      <circle cx="70" cy="100" r="18" fill="var(--reward-subtle)" />
      <circle cx="108" cy="82" r="20" fill="#ffe08a" />
      <circle cx="146" cy="104" r="16" fill="#ffd1d1" />
      <circle cx="110" cy="118" r="14" fill="#d9f2dc" />
      {/* 몸체 */}
      <rect x="30" y="130" width="160" height="90" rx="14" fill="var(--text-strong)" />
      {/* 손잡이 */}
      <circle cx="110" cy="165" r="18" fill="var(--bg-default)" />
      <rect x="107" y="150" width="6" height="30" rx="3" fill="var(--text-strong)" />
      {/* 배출구 */}
      <rect x="86" y="196" width="48" height="12" rx="6" fill="var(--bg-reward-panel)" />
    </svg>
  );
}
