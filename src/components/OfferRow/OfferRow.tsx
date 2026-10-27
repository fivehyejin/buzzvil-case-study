import { Button } from "@/components/Button/Button";
import { OfferIcon } from "@/components/OfferIcon/OfferIcon";
import type { Offer } from "@/lib/types";
import s from "./OfferRow.module.css";

/**
 * 오퍼 행 — "빠른 적립 오퍼"(H66, 흰 카드 안)와 "일반 오퍼"(pb10) 공용 (52:1844 관찰)
 * 아이콘 36 · 제목 13/700 "1분 가입 · 264원(파랑)" · 보조 11 "난이도 하 · 가입 즉시 지급" · 받기 W48 H32
 */
type Props = {
  offer: Offer;
  cta: string;
  /** quick: 고정 높이 66 / list: 하단 패딩 10 */
  variant?: "quick" | "list";
  last?: boolean;
  done?: boolean;
  onClick?: (o: Offer) => void;
};

export function OfferRow({ offer, cta, variant = "list", last = false, done = false, onClick }: Props) {
  return (
    <li className={[s.row, s[variant], last ? s.last : ""].join(" ")}>
      <OfferIcon name={offer.icon} />
      <div className={s.info}>
        <p className={s.title}>
          {offer.title} · <span className={s.reward}>{offer.reward.toLocaleString("ko-KR")}원</span>
        </p>
        <p className={s.note}>
          {offer.difficulty ? `난이도 ${offer.difficulty} · ` : ""}
          {offer.note}
        </p>
      </div>
      <Button variant="mini" onClick={() => onClick?.(offer)} disabled={done} aria-label={`${offer.title} ${cta}`}>
        {done ? "완료" : cta}
      </Button>
    </li>
  );
}
