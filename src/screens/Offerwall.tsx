import { useLayoutEffect, useMemo, useState } from "react";
import { AppBar, ChipGroup, LegalNote, MiniGameCarousel, Modal, OfferList, QuickRewardModule, Section } from "@/components";
import { rankSlots, orderList, type Slot } from "@/lib/slots";
import { track } from "@/lib/track";
import type { Cohort, Group, NavProps, Offer, OfferType } from "@/lib/types";
import cfg from "@/data/offerwall.json";
import offersData from "@/data/offers.json";
import s from "./Screen.module.css";

const offers = offersData as Offer[];
type Filter = "all" | OfferType;

/**
 * 오퍼월 첫 화면 — 가설이 바꾸는 유일한 화면 (spec/flows.md)
 *
 * 대조군(현행): 1원 캐러셀 → 칩 → 리스트 → 유의사항
 * 실험군(신규만): 모듈 → 칩 → 리스트 → 1원 캐러셀 → 유의사항
 *
 * 기존 코호트(1회+)는 그룹 무관 항상 대조군 화면 = 음성 대조.
 */
export function Offerwall({ back, cohort, group }: NavProps & { cohort: Cohort; group: Group }) {
  const showModule = cohort === "new" && group === "test";

  const [filter, setFilter] = useState<Filter>("all");
  const [picked, setPicked] = useState<{ offer: Offer; via: "slot" | "list" | "game"; rank?: number } | null>(null);

  const games = useMemo(() => offers.filter((o) => o.type === "game"), []);
  const list = useMemo(() => {
    const ordered = orderList(offers);
    return filter === "all" ? ordered : ordered.filter((o) => o.type === filter);
  }, [filter]);
  const slots = useMemo(
    () => rankSlots(offers, { topPct: cfg.module.completionTopPct, count: cfg.module.slotCount }),
    [],
  );

  // layout effect: 자식(모듈)의 impression 보다 먼저 발화하도록
  useLayoutEffect(() => {
    track("offerwall_view", { cohort, group: cohort === "existing" ? "control" : group, variant: showModule ? "module" : "current" });
  }, [cohort, group, showModule]);

  const onSlot = (slot: Slot) => {
    track("slot_click", { rank: slot.rank, offerId: slot.offer.id, reward: slot.offer.reward, fallback: slot.fallback });
    setPicked({ offer: slot.offer, via: "slot", rank: slot.rank });
  };
  const onOffer = (offer: Offer) => {
    track("offer_click", { offerId: offer.id, reward: offer.reward, type: offer.type });
    setPicked({ offer, via: "list" });
  };
  const onGame = (offer: Offer) => {
    track("game_click", { offerId: offer.id });
    setPicked({ offer, via: "game" });
  };

  const carousel = (
    <div className={s.bleedX}>
      <MiniGameCarousel title={cfg.carousel.title} caption={cfg.carousel.caption} games={games} onClick={onGame} />
    </div>
  );

  const listBlock = (
    <Section title={cfg.list.title}>
      <ChipGroup
        options={cfg.list.filters as { value: Filter; label: string }[]}
        value={filter}
        onChange={setFilter}
        aria-label="오퍼 유형"
      />
      <OfferList offers={list} onClick={onOffer} />
    </Section>
  );

  return (
    <div className={s.screen}>
      <AppBar title={cfg.appBarTitle} onBack={back} onClose={back} />
      <div className={s.content}>
        {showModule ? (
          <>
            <QuickRewardModule
              header={cfg.module.header}
              caption={cfg.module.caption}
              slots={slots}
              onImpression={() => track("module_impression", { slots: slots.map((x) => x.offer.id).join(",") })}
              onSlotClick={onSlot}
            />
            {listBlock}
            {carousel}
          </>
        ) : (
          <>
            {carousel}
            {listBlock}
          </>
        )}
        <div className={s.bleed}>
          <LegalNote items={cfg.legal} />
        </div>
      </div>

      {/* 오퍼 상세는 범위 밖 — 모달로 대체 (spec/flows.md 미정) */}
      <Modal
        open={!!picked}
        title={picked?.offer.brand ?? ""}
        onClose={() => setPicked(null)}
        ctaLabel={picked ? `${picked.offer.verb}` : "확인"}
      >
        <strong>
          {picked?.offer.action} {picked?.offer.reward.toLocaleString("ko-KR")}원
        </strong>
        <p>
          {picked?.offer.effort} · {picked?.offer.steps}단계
          {picked?.via === "slot" && ` · 슬롯 ${picked.rank}번에서 진입`}
          {picked?.via === "list" && " · 리스트에서 진입"}
          {picked?.via === "game" && " · 1원 게임 (단가 0)"}
        </p>
      </Modal>
    </div>
  );
}
