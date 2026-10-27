import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/Button/Button";
import { OfferIcon } from "@/components/OfferIcon/OfferIcon";
import type { Offer } from "@/lib/types";
import s from "./OfferRow.module.css";

/**
 * 오퍼 행 — "빠른 적립 오퍼"(H66, 흰 카드 안)와 "일반 오퍼"(pb10) 공용 (52:1844 관찰)
 * 아이콘 36 · 제목 13/700 "1분 가입 · 264원(파랑)" · 보조 11 "난이도 하 · 가입 즉시 지급" · 받기 W48 H32
 *
 * 완료 전환 애니메이션(프로토타입 결정):
 *  - 버튼이 체크로 바뀌며 팝 (scale 1 → 1.15 → 1)
 *  - "+264원" 칩이 버튼 위로 떠오르며 사라짐 (700ms)
 *  - 아이콘 박스가 리워드 파랑으로 한 번 깜빡임
 */
type Props = {
  offer: Offer;
  cta: string;
  variant?: "quick" | "list";
  last?: boolean;
  done?: boolean;
  onClick?: (o: Offer) => void;
};

export function OfferRow({ offer, cta, variant = "list", last = false, done = false, onClick }: Props) {
  const [burst, setBurst] = useState(false);
  const prevDone = useRef(done);

  useEffect(() => {
    if (!prevDone.current && done) {
      setBurst(true);
      const t = window.setTimeout(() => setBurst(false), 900);
      return () => window.clearTimeout(t);
    }
    prevDone.current = done;
  }, [done]);

  return (
    <li className={[s.row, s[variant], last ? s.last : "", burst ? s.burst : ""].join(" ")}>
      <span className={s.iconWrap}>
        <OfferIcon name={offer.icon} />
      </span>
      <div className={s.info}>
        <p className={s.title}>
          {offer.title} · <span className={s.reward}>{offer.reward.toLocaleString("ko-KR")}원</span>
        </p>
        <p className={s.note}>
          {offer.difficulty ? `난이도 ${offer.difficulty} · ` : ""}
          {offer.note}
        </p>
      </div>
      <span className={s.action}>
        <Button
          variant="mini"
          className={done ? s.btnDone : s.btn}
          onClick={() => onClick?.(offer)}
          disabled={done}
          aria-label={done ? `${offer.title} 완료` : `${offer.title} ${cta}`}
        >
          {done ? <Check size={16} strokeWidth={2.5} /> : cta}
        </Button>
        {burst && (
          <span className={s.float} aria-hidden>
            +{offer.reward.toLocaleString("ko-KR")}원
          </span>
        )}
      </span>
    </li>
  );
}
