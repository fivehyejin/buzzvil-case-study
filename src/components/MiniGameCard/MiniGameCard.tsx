import { Badge } from "@/components/Badge/Badge";
import { OfferIcon } from "@/components/OfferIcon/OfferIcon";
import { useDragScroll } from "@/lib/useDragScroll";
import type { Game } from "@/lib/types";
import s from "./MiniGameCard.module.css";

/**
 * 미니게임 카드 — W144 · H64 · #F5F5F5 · R12 · p8 (52:1941 관찰)
 * 아이콘 24(글리프 20) · 제목 13/700 · 리워드 배지 "최대 5P" / "1원"
 */
export function MiniGameCard({ game, onClick }: { game: Game; onClick?: (g: Game) => void }) {
  return (
    <button type="button" className={s.card} onClick={() => onClick?.(game)}>
      <span className={s.icon}>
        <OfferIcon name={game.icon} size={20} bare />
      </span>
      <span className={s.text}>
        <span className={s.title}>{game.title}</span>
        <Badge kind="reward">{game.rewardLabel}</Badge>
      </span>
    </button>
  );
}

export function MiniGameCarousel({ games, onClick }: { games: Game[]; onClick?: (g: Game) => void }) {
  const { ref, handlers } = useDragScroll<HTMLDivElement>();
  return (
    <div className={s.wrap}>
      <div ref={ref} className={s.scroller} {...handlers}>
        {games.map((g) => (
          <MiniGameCard key={g.id} game={g} onClick={onClick} />
        ))}
      </div>
    </div>
  );
}
