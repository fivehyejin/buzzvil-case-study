import { RewardAmount, Badge } from "@/components/Badge/Badge";
import s from "./OfferCard.module.css";

/**
 * Rewards/OfferCard — W278 · 이미지 H116 · R12 · 면 #F5F5F5 (관찰)
 * 이미지 영역은 원본 사진이 아닌 편집형 아트. 실제 구현 시 오퍼 이미지로 교체.
 */
export type Offer = {
  id: string;
  brand: string;
  /** 참여 방식 한 줄, 예: "유튜브 구독하면" */
  action: string;
  reward: number;
  /** 한정 혜택 태그 (예: "오늘만") — 리워드 배지와 같은 줄에 두지 않음 */
  promo?: string;
  /** 아트 영역에 크게 들어갈 단어 (설명용) */
  artWord?: string;
};

type Props = {
  offer: Offer;
  onClick?: (offer: Offer) => void;
};

export function OfferCard({ offer, onClick }: Props) {
  return (
    <button type="button" className={s.card} onClick={() => onClick?.(offer)}>
      <div className={s.art} aria-hidden>
        {offer.promo && (
          <span className={s.promo}>
            <Badge kind="promo">{offer.promo}</Badge>
          </span>
        )}
        <span className={s.word}>{offer.artWord ?? offer.brand.slice(0, 2)}</span>
        <i className={s.blob1} />
        <i className={s.blob2} />
      </div>
      <div className={s.info}>
        <div className={s.text}>
          <span className={s.brand}>{offer.brand}</span>
          <span className={s.action}>{offer.action}</span>
        </div>
        <RewardAmount value={offer.reward} />
      </div>
    </button>
  );
}
