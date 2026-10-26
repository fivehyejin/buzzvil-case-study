export type Screen = "entry" | "offerwall" | "hub" | "weekly";

/** 참여 이력 코호트 — 분기 축은 버즈빌 "완료 0회" 플래그 */
export type Cohort = "new" | "existing";

/** 실험 그룹 — 기존 코호트는 그룹 무관 항상 control */
export type Group = "test" | "control";

/** 진입점 ① 카피 — control: 현행 / variant: 2차안 */
export type EntryCopy = "control" | "variant";

export type OfferType = "game" | "signup" | "install" | "purchase";

export type Offer = {
  id: string;
  type: OfferType;
  brand: string;
  /** 참여 방식 한 줄, "~하면" 꼴 */
  action: string;
  /** 단가 (원) */
  reward: number;
  /** 소요 행동 라벨, e.g. "1분 가입" */
  effort: string;
  /** 완료까지 단계 수 */
  steps: number;
  /** 최근 nn일 클릭→완료율 (버즈빌 데이터) */
  completionRate: number;
  /** 동사 버튼 레이블 */
  verb: string;
  artWord?: string;
};

export type ProtoState = {
  screen: Screen;
  cohort: Cohort;
  group: Group;
  entryCopy: EntryCopy;
};

export type NavProps = {
  go: (s: Screen) => void;
  back: () => void;
};
