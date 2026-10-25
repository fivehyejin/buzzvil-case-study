import s from "./Chip.module.css";

/**
 * Rewards/Chip — 필터 칩 (제안)
 * px16 py9 · R999 · 13
 * selected: 검정 면/흰 글자 · default: 흰 면 + 1px 경계 · 단일 선택 권장
 */
type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  "aria-label"?: string;
};

export function ChipGroup<T extends string>({ options, value, onChange, ...rest }: Props<T>) {
  return (
    <div className={s.group} role="radiogroup" aria-label={rest["aria-label"]}>
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={selected}
            className={selected ? s.selected : s.chip}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
