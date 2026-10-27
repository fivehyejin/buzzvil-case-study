import type { FilterValue, Offer } from "./types";

/**
 * 일반 오퍼 필터 — 칩 선택에 따라 리스트를 거른다.
 * 데이터에 해당 분류가 없으면 빈 배열 → 화면은 EmptyState.
 */
export function filterOffers(offers: Offer[], filter: FilterValue): Offer[] {
  switch (filter) {
    case "top":
      return offers; // 데이터 순서 = Figma 순서
    case "quick":
      return offers.filter((o) => o.minutes <= 1);
    case "game":
      return offers.filter((o) => o.category === "game");
    case "subscribe":
      return offers.filter((o) => o.category === "subscribe");
    case "place":
      return offers.filter((o) => o.category === "place");
  }
}
