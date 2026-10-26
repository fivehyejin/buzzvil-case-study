import { useRef, useState } from "react";
import { CalendarCheck, CircleHelp, Dices, Ticket, type LucideIcon } from "lucide-react";
import { RewardAmount } from "@/components/Badge/Badge";
import { Pagination } from "@/components/Modal/Modal";
import type { Offer } from "@/lib/types";
import s from "./MiniGameCarousel.module.css";

/**
 * 1원 미니게임 캐러셀 — 현행 관찰: 첫 뷰포트 절반을 차지
 * 카드 W278 · 아트 H116 (OfferCard와 같은 비례) · 가로 스크롤 + 페이지 점
 */
const ICONS: Record<string, LucideIcon> = {
  룰렛: Dices,
  퀴즈: CircleHelp,
  뽑기: Ticket,
  출석: CalendarCheck,
};

type Props = {
  title: string;
  caption?: string;
  games: Offer[];
  onClick?: (o: Offer) => void;
};

export function MiniGameCarousel({ title, caption, games, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    setPage(Math.round(el.scrollLeft / (278 + 12)));
  };

  return (
    <section className={s.wrap} aria-label={title}>
      <div className={s.head}>
        <h2 className={s.title}>{title}</h2>
        {caption && <span className={s.caption}>{caption}</span>}
      </div>
      <div ref={ref} className={s.scroller} onScroll={onScroll}>
        {games.map((g) => {
          const Icon = ICONS[g.brand] ?? Dices;
          return (
            <button key={g.id} type="button" className={s.card} onClick={() => onClick?.(g)}>
              <div className={s.art} aria-hidden>
                <Icon size={44} strokeWidth={1.5} />
                <span className={s.word}>{g.artWord ?? g.brand}</span>
              </div>
              <div className={s.info}>
                <span className={s.text}>
                  <span className={s.brand}>{g.action}</span>
                  <span className={s.sub}>{g.effort} · 매일 가능</span>
                </span>
                <RewardAmount value={g.reward} />
              </div>
            </button>
          );
        })}
      </div>
      <div className={s.pages}>
        <Pagination index={Math.min(page, games.length - 1)} total={games.length} />
      </div>
    </section>
  );
}
