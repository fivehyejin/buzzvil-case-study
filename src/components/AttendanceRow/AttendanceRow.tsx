import { CircleCheck } from "lucide-react";
import { Button } from "@/components/Button/Button";
import s from "./AttendanceRow.module.css";

/**
 * Rewards/AttendanceRow — p16 · R16 · 흰 면 · 체크 30 · 제목 14/700 + 보조 11 · Compact CTA
 * 목록 안에서도 행동은 하나만.
 */
type Props = {
  title: string;
  description: string;
  checked?: boolean;
  loading?: boolean;
  onCheck?: () => void;
};

export function AttendanceRow({ title, description, checked = false, loading = false, onCheck }: Props) {
  return (
    <div className={s.row}>
      <CircleCheck
        size={30}
        strokeWidth={1.75}
        className={checked ? s.iconDone : s.icon}
        aria-hidden
      />
      <div className={s.text}>
        <span className={s.title}>{title}</span>
        <span className={s.desc}>{checked ? "오늘 출석 완료" : description}</span>
      </div>
      <Button variant="compact" onClick={onCheck} disabled={checked} loading={loading}>
        {checked ? "출석 완료" : "출석하기"}
      </Button>
    </div>
  );
}
