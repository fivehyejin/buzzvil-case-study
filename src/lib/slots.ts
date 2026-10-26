import type { Offer } from "./types";

/**
 * "지금 바로 받기" 슬롯 선정 — spec/hypothesis.md 7번 채택안(정책)
 *
 * 1. 1원 게임 제외 (단가 0, 매출 기여 없음)
 * 2. 완료율 상위 topPct 로 1차 필터  ← 신규의 첫 참여가 시작되는 게 우선
 * 3. 그 안에서 단가순 정렬, count개
 * 4. count 미만이면 리스트 최상단 가입형으로 폴백
 *
 * 매일 재산출 전제. 프로토타입에서는 호출 시점에 계산.
 */
export type SlotOptions = { topPct: number; count: number };

export type Slot = { rank: number; offer: Offer; fallback: boolean };

export function rankSlots(offers: Offer[], { topPct, count }: SlotOptions): Slot[] {
  const candidates = offers.filter((o) => o.type !== "game");
  if (candidates.length === 0) return [];

  // 완료율 상위 topPct 임계값
  const sorted = [...candidates].sort((a, b) => b.completionRate - a.completionRate);
  const cutoffIndex = Math.max(0, Math.ceil(sorted.length * topPct) - 1);
  const threshold = sorted[cutoffIndex].completionRate;

  const eligible = candidates
    .filter((o) => o.completionRate >= threshold)
    .sort((a, b) => b.reward - a.reward || b.completionRate - a.completionRate);

  const picked: Slot[] = eligible.slice(0, count).map((offer, i) => ({ rank: i + 1, offer, fallback: false }));

  // 폴백: 리스트 최상단 가입형
  if (picked.length < count) {
    const taken = new Set(picked.map((s) => s.offer.id));
    const fallback = candidates.filter((o) => o.type === "signup" && !taken.has(o.id));
    for (const offer of fallback) {
      if (picked.length >= count) break;
      picked.push({ rank: picked.length + 1, offer, fallback: true });
    }
  }
  return picked;
}

/** 리스트 정렬 — 현행 관찰: 가입형 상단, 1만원대는 아래 */
export function orderList(offers: Offer[]): Offer[] {
  const typeOrder = { signup: 0, install: 1, purchase: 2, game: 3 } as const;
  return offers
    .filter((o) => o.type !== "game")
    .sort((a, b) => typeOrder[a.type] - typeOrder[b.type] || a.steps - b.steps || b.reward - a.reward);
}
