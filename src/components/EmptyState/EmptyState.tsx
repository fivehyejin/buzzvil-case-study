import { FileText } from "lucide-react";
import s from "./EmptyState.module.css";

/**
 * Rewards/EmptyState — 아이콘 34 · 제목 14 · 보조 12 · H230 중앙 (제안)
 * 빈 상태에 오류처럼 보이는 빨강 금지. 로딩/오류와 분리.
 */
type Props = {
  title?: string;
  description?: string;
};

export function EmptyState({
  title = "아직 적립 내역이 없어요",
  description = "미션에 참여하고 리워드를 모아보세요",
}: Props) {
  return (
    <div className={s.wrap} role="status">
      <FileText size={34} strokeWidth={1.5} className={s.icon} aria-hidden />
      <p className={s.title}>{title}</p>
      <p className={s.desc}>{description}</p>
    </div>
  );
}
