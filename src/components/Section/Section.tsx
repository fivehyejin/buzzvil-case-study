import type { ReactNode } from "react";
import s from "./Section.module.css";

/** 섹션명 20/700 + 콘텐츠. 좌우 gutter 20 */
export function Section({ title, children, bleed = false }: { title?: string; children: ReactNode; bleed?: boolean }) {
  return (
    <section className={s.section}>
      {title && <h2 className={s.title}>{title}</h2>}
      <div className={bleed ? s.bleed : undefined}>{children}</div>
    </section>
  );
}

/** 화면 상단 요약: 제목 20/700 + 설명 14 */
export function Intro({ title, description }: { title: string; description: string }) {
  return (
    <div className={s.intro}>
      <h2 className={s.introTitle}>{title}</h2>
      <p className={s.introDesc}>{description}</p>
    </div>
  );
}
