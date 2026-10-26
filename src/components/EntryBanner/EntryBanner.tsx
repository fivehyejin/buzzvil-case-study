import { ChevronRight } from "lucide-react";
import s from "./EntryBanner.module.css";

/**
 * 진입점 ① 배너 — 무신사 영역 (2차안에서 카피만 바뀜)
 * 프로토타입용 스텁. 실제 무신사 홈 UI가 아님.
 */
type Props = {
  copy: string;
  sub: string;
  cta: string;
  onClick: () => void;
};

export function EntryBanner({ copy, sub, cta, onClick }: Props) {
  return (
    <button type="button" className={s.banner} onClick={onClick}>
      <span className={s.text}>
        <span className={s.copy}>{copy}</span>
        <span className={s.sub}>{sub}</span>
      </span>
      <span className={s.cta}>
        {cta}
        <ChevronRight size={16} strokeWidth={2} />
      </span>
    </button>
  );
}
