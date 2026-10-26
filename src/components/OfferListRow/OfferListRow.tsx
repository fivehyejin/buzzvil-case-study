import { ChevronRight } from "lucide-react";
import { RewardAmount } from "@/components/Badge/Badge";
import type { Offer } from "@/lib/types";
import s from "./OfferListRow.module.css";

/**
 * 오퍼월 리스트 행 — 현행 관찰 포맷
 * 브랜드 14/700 · 참여 방식 12 · 리워드 배지 · chevron. 행동과 금액이 분리돼 있음 (모듈과의 차이점).
 */
type Props = {
  offer: Offer;
  onClick?: (o: Offer) => void;
};

export function OfferListRow({ offer, onClick }: Props) {
  return (
    <li>
      <button type="button" className={s.row} onClick={() => onClick?.(offer)}>
        <span className={s.logo} aria-hidden>
          {offer.brand.slice(0, 1)}
        </span>
        <span className={s.text}>
          <span className={s.brand}>{offer.brand}</span>
          <span className={s.action}>{offer.action}</span>
        </span>
        <RewardAmount value={offer.reward} />
        <ChevronRight size={20} strokeWidth={1.75} className={s.chev} aria-hidden />
      </button>
    </li>
  );
}

export function OfferList({ offers, onClick }: { offers: Offer[]; onClick?: (o: Offer) => void }) {
  return (
    <ul className={s.list}>
      {offers.map((o) => (
        <OfferListRow key={o.id} offer={o} onClick={onClick} />
      ))}
    </ul>
  );
}
