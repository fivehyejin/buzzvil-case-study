import { resetEvents, useEvents } from "@/lib/track";
import s from "./Proto.module.css";

/**
 * 이벤트 로그 — 검증설계 지표에 대응하는 이벤트가 실제로 발화하는지 확인용.
 * spec/flows.md "이벤트" 표 참고.
 */
export function EventLog() {
  const events = useEvents();
  const counts = events.reduce<Record<string, number>>((acc, e) => {
    acc[e.name] = (acc[e.name] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <section className={s.log} aria-label="이벤트 로그">
      <div className={s.logHead}>
        <span className={s.label}>이벤트 로그</span>
        <span className={s.counts}>
          {Object.entries(counts).map(([k, v]) => (
            <span key={k} className={s.count}>
              {k} <b>{v}</b>
            </span>
          ))}
        </span>
        <button type="button" className={s.reset} onClick={resetEvents} disabled={events.length === 0}>
          초기화
        </button>
      </div>
      <ol className={s.logList}>
        {events.length === 0 && <li className={s.logEmpty}>아직 발화한 이벤트가 없어요</li>}
        {[...events].reverse().map((e) => (
          <li key={e.seq} className={s.logRow}>
            <span className={s.logSeq}>#{e.seq}</span>
            <code className={s.logName}>{e.name}</code>
            <span className={s.logProps}>
              {Object.entries(e.props)
                .map(([k, v]) => `${k}=${v}`)
                .join("  ")}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
