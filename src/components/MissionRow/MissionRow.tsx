import { ChevronRight } from "lucide-react";
import { Progress } from "@/components/Progress/Progress";
import s from "./MissionRow.module.css";

/**
 * Rewards/MissionRow — py17 · 제목 14/500 #555 → 분할 바 + 분수 (W225) → chevron 24 (관찰)
 */
export type Mission = {
  id: string;
  title: string;
  done: number;
  total: number;
  /** 보상 금액 (선택) — 원본 캡처에는 없어 행에는 표시하지 않음. 상세에서 사용 */
  reward?: number;
};

type Props = {
  mission: Mission;
  onClick?: (m: Mission) => void;
};

export function MissionRow({ mission, onClick }: Props) {
  const complete = mission.done >= mission.total;
  return (
    <li>
      <button type="button" className={s.row} onClick={() => onClick?.(mission)}>
        <div className={s.info}>
          <span className={complete ? s.titleDone : s.title}>{mission.title}</span>
          <Progress done={mission.done} total={mission.total} className={s.progress} />
        </div>
        <ChevronRight size={24} strokeWidth={1.75} className={s.chev} aria-hidden />
      </button>
    </li>
  );
}

export function MissionList({ missions, onClick }: { missions: Mission[]; onClick?: (m: Mission) => void }) {
  return (
    <ul className={s.list}>
      {missions.map((m) => (
        <MissionRow key={m.id} mission={m} onClick={onClick} />
      ))}
    </ul>
  );
}
