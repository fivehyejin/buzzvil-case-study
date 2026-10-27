export type Difficulty = "하" | "중" | "상";

export type OfferIcon = "user-round-plus" | "shield-check" | "gift" | "gamepad-2" | "text-cursor" | "hand" | "shuffle";

export type Category = "signup" | "payment" | "game" | "card" | "subscribe" | "place";

export type Offer = {
  id: string;
  title: string;
  /** 단가 (원) */
  reward: number;
  /** 비우면 행에 "난이도 ·" 접두를 붙이지 않음 */
  difficulty?: Difficulty;
  /** 보조 설명, "가입 즉시 지급" 등 */
  note: string;
  icon: OfferIcon;
  category: Category;
  /** 소요 분 — "1분 컷" 필터 기준 */
  minutes: number;
};

export type GoalOffer = Omit<Offer, "category" | "minutes"> & { tags: string[] };

export type Game = {
  id: string;
  title: string;
  rewardLabel: string;
  icon: OfferIcon;
};

export type FilterValue = "top" | "subscribe" | "game" | "place" | "quick";
