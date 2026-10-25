import { Button } from "@/components/Button/Button";
import s from "./DailyReward.module.css";

/**
 * Rewards/DailyReward — 회색 패널 #E0E0E0 · 중앙 선물 · 검정 CTA · 참여 주기 문구 (관찰 기반)
 * px32 py24 · R16
 */
type Props = {
  /** 오늘 이미 열었는지 */
  opened?: boolean;
  loading?: boolean;
  onOpen?: () => void;
};

export function DailyReward({ opened = false, loading = false, onOpen }: Props) {
  return (
    <section className={s.panel} aria-label="매일 선물">
      <GiftArt opened={opened} />
      <Button onClick={onOpen} disabled={opened} loading={loading}>
        {opened ? "내일 다시 참여해 주세요" : "선물상자를 열어보세요"}
      </Button>
      <p className={s.hint}>매일 한번 열 수 있어요</p>
    </section>
  );
}

/** 편집형 선물 일러스트 (리본·상자·뚜껑·띠) — Figma 레이어 구조를 그대로 SVG로 */
function GiftArt({ opened }: { opened: boolean }) {
  return (
    <svg
      className={opened ? s.giftOpened : s.gift}
      width="78"
      height="82"
      viewBox="0 0 78 82"
      aria-hidden
    >
      {/* 리본 */}
      <path
        d="M39 24c-6-10-18-16-22-10-3 5 6 9 22 10zm0 0c6-10 18-16 22-10 3 5-6 9-22 10z"
        fill="var(--promo-accent)"
      />
      {/* 상자 */}
      <rect x="9" y="27" width="60" height="53" rx="8" fill="var(--action-primary)" />
      {/* 뚜껑 */}
      <rect x="0" y="22" width="78" height="21" rx="6" fill="var(--text-strong)" />
      {/* 띠 */}
      <rect x="32" y="22" width="14" height="58" rx="3" fill="var(--promo-accent)" />
    </svg>
  );
}
