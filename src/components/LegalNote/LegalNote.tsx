import s from "./LegalNote.module.css";

/**
 * Rewards/LegalNote — 면 #F5F5F5 · p20 · 제목 12/700 · 본문 11 (제안 문구)
 * 운영 정책 문구는 법무·서비스 기준으로 교체.
 */
type Props = {
  title?: string;
  items: string[];
};

export function LegalNote({ title = "유의사항", items }: Props) {
  return (
    <section className={s.note} aria-label={title}>
      <h3 className={s.title}>{title}</h3>
      <ul className={s.list}>
        {items.map((t, i) => (
          <li key={i} className={s.item}>
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}
