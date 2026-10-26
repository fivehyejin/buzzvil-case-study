import { useEffect } from "react";
import { Button } from "@/components/Button/Button";
import type { Slot } from "@/lib/slots";
import type { Offer } from "@/lib/types";
import s from "./QuickRewardModule.module.css";

/**
 * "지금 바로 받기" 모듈 — spec/hypothesis.md 7번 채택안(UI) ⑵⑶
 *
 * 헤더가 진입 약속("최대 1만원")을 이어받고, 슬롯 3개는 각각
 * 금액 · 소요 행동 · 동사 버튼을 한 카드에 둔다 (리스트와 달리 행동과 금액이 한 문장).
 *
 * 리스트와의 차이: 위치(스크롤 전) · 포맷 · 선정 기준(lib/slots.ts). 오퍼 자체는 같을 수 있음.
 */
type Props = {
  header: string;
  caption?: string;
  slots: Slot[];
  onImpression?: () => void;
  onSlotClick?: (slot: Slot) => void;
};

export function QuickRewardModule({ header, caption, slots, onImpression, onSlotClick }: Props) {
  useEffect(() => {
    onImpression?.();
    // 모듈이 처음 렌더될 때 한 번만
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={s.module} aria-label="지금 바로 받기">
      <div className={s.head}>
        <h2 className={s.header}>{header}</h2>
        {caption && <p className={s.caption}>{caption}</p>}
      </div>
      <ul className={s.slots}>
        {slots.map((slot) => (
          <SlotCard key={slot.offer.id} slot={slot} onClick={() => onSlotClick?.(slot)} />
        ))}
      </ul>
    </section>
  );
}

/** 슬롯 카드: "1분 가입하고 1,980원 받기" */
function SlotCard({ slot, onClick }: { slot: Slot; onClick: () => void }) {
  const o: Offer = slot.offer;
  return (
    <li className={s.card}>
      <button type="button" className={s.cardBody} onClick={onClick}>
        <span className={s.rank} aria-hidden>
          {slot.rank}
        </span>
        <span className={s.text}>
          <span className={s.sentence}>
            {o.effort}하고 <strong className={s.amount}>{o.reward.toLocaleString("ko-KR")}원</strong> 받기
          </span>
          <span className={s.brand}>
            {o.brand} · {o.action}
          </span>
        </span>
      </button>
      <Button variant="compact" onClick={onClick}>
        {o.verb}
      </Button>
    </li>
  );
}
