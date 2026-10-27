import { useMemo, useState } from "react";
import {
  ChipGroup,
  EmptyState,
  GoalCard,
  MiniGameCarousel,
  Modal,
  OfferRow,
  ServiceAppBar,
  Shortcuts,
  type ShortcutKey,
} from "@/components";
import { filterOffers } from "@/lib/slots";
import type { FilterValue, Game, GoalOffer, Offer } from "@/lib/types";
import cfg from "@/data/offerwall.json";
import data from "@/data/offers.json";
import s from "./Offerwall.module.css";

const goal = data.goal as GoalOffer;
const quick = data.quick as Offer[];
const games = data.games as Game[];
const list = data.list as Offer[];

type Picked = { kind: "offer"; offer: Offer } | { kind: "goal"; goal: GoalOffer } | { kind: "game"; game: Game };

/**
 * 오퍼월 TO-BE · 완료 0회 · 실험군 (Figma 52:1844)
 *
 * 앱바 → 바로가기 → [1만원까지 모으는 법: 목표 오퍼 + 지금 바로 받기 3] → 가볍게 1원 받기 → 필터 → 일반 오퍼
 * 첫 뷰포트에 1원 게임 대신 "목표(1만원 약속)"와 "바로 받을 수 있는 금액"이 먼저 온다.
 */
export function Offerwall() {
  const [filter, setFilter] = useState<FilterValue>("top");
  const [picked, setPicked] = useState<Picked | null>(null);
  const [done, setDone] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => filterOffers(list, filter), [filter]);

  const complete = () => {
    if (picked?.kind === "offer") setDone((d) => new Set(d).add(picked.offer.id));
    setPicked(null);
  };

  return (
    <div className={s.screen}>
      <ServiceAppBar title={cfg.appBar.title} subtitle={cfg.appBar.subtitle} onClose={() => {}} />

      <div className={s.shortcuts}>
        <Shortcuts items={cfg.shortcuts as { key: ShortcutKey; label: string }[]} />
      </div>

      {/* 목표와 첫 적립 */}
      <section className={s.goalSection} aria-label={cfg.goalSection.title}>
        <h2 className={s.goalTitle}>{cfg.goalSection.title}</h2>
        <GoalCard goal={goal} cta={cfg.goalSection.goalCta} onClick={(g) => setPicked({ kind: "goal", goal: g })} />
        <h3 className={s.quickTitle}>{cfg.goalSection.quickTitle}</h3>
        <ul className={s.quickList}>
          {quick.map((o, i) => (
            <OfferRow
              key={o.id}
              offer={o}
              cta={cfg.goalSection.quickCta}
              variant="quick"
              last={i === quick.length - 1}
              done={done.has(o.id)}
              onClick={(offer) => setPicked({ kind: "offer", offer })}
            />
          ))}
        </ul>
      </section>

      {/* 가벼운 게임 */}
      <section className={s.games} aria-label={cfg.games.title}>
        <h2 className={s.gamesTitle}>{cfg.games.title}</h2>
        <MiniGameCarousel games={games} onClick={(game) => setPicked({ kind: "game", game })} />
      </section>

      <div className={s.divider} aria-hidden />

      {/* 필터 + 일반 오퍼 */}
      <div className={s.filters}>
        <ChipGroup
          options={cfg.filters as { value: FilterValue; label: string }[]}
          value={filter}
          onChange={setFilter}
          aria-label="오퍼 필터"
        />
      </div>
      {filtered.length === 0 ? (
        <EmptyState title="해당하는 오퍼가 아직 없어요" description="다른 필터를 눌러 보세요" />
      ) : (
        <ul className={s.list}>
          {filtered.map((o, i) => (
            <OfferRow
              key={o.id}
              offer={o}
              cta={cfg.list.cta}
              variant="list"
              last={i === filtered.length - 1}
              done={done.has(o.id)}
              onClick={(offer) => setPicked({ kind: "offer", offer })}
            />
          ))}
        </ul>
      )}

      {/* 오퍼 상세는 범위 밖 — 모달로 대체 */}
      <Modal
        open={!!picked}
        title={
          picked?.kind === "offer" ? picked.offer.title : picked?.kind === "goal" ? picked.goal.title : picked?.game.title ?? ""
        }
        onClose={() => setPicked(null)}
        ctaLabel={picked?.kind === "offer" ? "참여 완료로 표시" : "확인"}
        onCta={complete}
      >
        {picked?.kind === "offer" && (
          <>
            <strong>{picked.offer.reward.toLocaleString("ko-KR")}원 적립</strong>
            <p>
              난이도 {picked.offer.difficulty} · {picked.offer.note}. 실제 서비스에서는 광고주 랜딩으로 이동합니다.
            </p>
          </>
        )}
        {picked?.kind === "goal" && (
          <>
            <strong>{picked.goal.reward.toLocaleString("ko-KR")}원 적립</strong>
            <p>{picked.goal.note}. 아래 "지금 바로 받기"부터 시작하면 1만원까지 가까워져요.</p>
          </>
        )}
        {picked?.kind === "game" && (
          <>
            <strong>{picked.game.rewardLabel}</strong>
            <p>매일 참여할 수 있어요.</p>
          </>
        )}
      </Modal>
    </div>
  );
}
