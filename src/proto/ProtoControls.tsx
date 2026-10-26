import type { ProtoState } from "@/lib/types";
import s from "./Proto.module.css";

/**
 * 프로토타입 토글 — 화면 밖 컨트롤. 실제 제품 UI 아님.
 * spec/hypothesis.md 9번 "프로토타입 범위"의 토글과 1:1.
 */
type Props = {
  state: ProtoState;
  set: <K extends keyof ProtoState>(key: K, value: ProtoState[K]) => void;
};

export function ProtoControls({ state, set }: Props) {
  const existing = state.cohort === "existing";

  return (
    <div className={s.controls}>
      <Toggle
        label="화면"
        value={state.screen}
        onChange={(v) => set("screen", v)}
        options={[
          { value: "entry", label: "진입" },
          { value: "offerwall", label: "오퍼월" },
          { value: "hub", label: "참고·허브" },
          { value: "weekly", label: "참고·주간" },
        ]}
      />
      <Toggle
        label="코호트"
        value={state.cohort}
        onChange={(v) => set("cohort", v)}
        options={[
          { value: "new", label: "신규 (완료 0회)" },
          { value: "existing", label: "기존 (1회+)" },
        ]}
      />
      <Toggle
        label="그룹"
        value={existing ? "control" : state.group}
        onChange={(v) => set("group", v)}
        disabled={existing}
        hint={existing ? "기존은 항상 현행" : undefined}
        options={[
          { value: "test", label: "실험군 · 모듈" },
          { value: "control", label: "대조군 · 현행" },
        ]}
      />
      <Toggle
        label="진입 카피"
        value={state.entryCopy}
        onChange={(v) => set("entryCopy", v)}
        options={[
          { value: "control", label: "현행 · 단 한 번에" },
          { value: "variant", label: "2차안 · 최대 1만원" },
        ]}
      />
    </div>
  );
}

function Toggle<T extends string>({
  label,
  value,
  options,
  onChange,
  disabled,
  hint,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  disabled?: boolean;
  hint?: string;
}) {
  return (
    <div className={disabled ? s.groupDisabled : s.group}>
      <span className={s.label}>
        {label}
        {hint && <em className={s.hint}>{hint}</em>}
      </span>
      <div className={s.seg} role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={o.value === value}
            className={o.value === value ? s.segOn : s.segOff}
            disabled={disabled}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
