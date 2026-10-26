import { useEffect, useState } from "react";

/**
 * 프로토타입 이벤트 트래킹 — spec/flows.md "이벤트" 표와 1:1
 * 실제 구현에서는 버즈빌 로그 파이프라인으로 대체.
 */
export type EventName =
  | "entry_click"
  | "offerwall_view"
  | "module_impression"
  | "slot_click"
  | "offer_click"
  | "game_click";

export type TrackedEvent = {
  seq: number;
  at: number;
  name: EventName;
  props: Record<string, string | number | boolean>;
};

type Listener = (events: TrackedEvent[]) => void;

let seq = 0;
let events: TrackedEvent[] = [];
const listeners = new Set<Listener>();

export function track(name: EventName, props: TrackedEvent["props"] = {}) {
  events = [...events, { seq: ++seq, at: Date.now(), name, props }].slice(-50);
  listeners.forEach((l) => l(events));
}

export function resetEvents() {
  events = [];
  listeners.forEach((l) => l(events));
}

export function useEvents() {
  const [list, setList] = useState(events);
  useEffect(() => {
    listeners.add(setList);
    setList(events); // 구독 전에 발화한 이벤트(마운트 시 view/impression) 반영
    return () => {
      listeners.delete(setList);
    };
  }, []);
  return list;
}
