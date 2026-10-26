import { useCallback, useEffect, useState } from "react";
import type { ProtoState } from "./types";

/**
 * 프로토타입 토글 상태 ↔ URL 쿼리 동기화.
 * PDF·슬랙에 특정 변형을 링크로 공유하기 위함.
 *   ?screen=offerwall&cohort=new&group=test&copy=control
 */
const DEFAULT: ProtoState = { screen: "entry", cohort: "new", group: "test", entryCopy: "control" };

function read(): ProtoState {
  const q = new URLSearchParams(window.location.search);
  const pick = <T extends string>(key: string, allowed: readonly T[], fallback: T): T => {
    const v = q.get(key);
    return allowed.includes(v as T) ? (v as T) : fallback;
  };
  return {
    screen: pick("screen", ["entry", "offerwall", "hub", "weekly"] as const, DEFAULT.screen),
    cohort: pick("cohort", ["new", "existing"] as const, DEFAULT.cohort),
    group: pick("group", ["test", "control"] as const, DEFAULT.group),
    entryCopy: pick("copy", ["control", "variant"] as const, DEFAULT.entryCopy),
  };
}

function write(s: ProtoState) {
  const q = new URLSearchParams({ screen: s.screen, cohort: s.cohort, group: s.group, copy: s.entryCopy });
  window.history.replaceState(null, "", `?${q.toString()}`);
}

export function useProtoState() {
  const [state, setState] = useState<ProtoState>(read);

  useEffect(() => write(state), [state]);

  const set = useCallback(<K extends keyof ProtoState>(key: K, value: ProtoState[K]) => {
    setState((s) => ({ ...s, [key]: value }));
  }, []);

  return { state, set };
}
