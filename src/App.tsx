import { useCallback, useState } from "react";
import { Hub } from "@/screens/Hub";
import { WeeklyMission } from "@/screens/WeeklyMission";
import type { Screen } from "@/lib/types";
import s from "./App.module.css";

/**
 * 390px 폰 프레임 안에서 화면 전환.
 * 라우터 없이 스택 하나로 — 프로토타입 범위에서 충분.
 */
export default function App() {
  const [stack, setStack] = useState<Screen[]>(["hub"]);
  const current = stack[stack.length - 1];

  const go = useCallback((sc: Screen) => setStack((st) => [...st, sc]), []);
  const back = useCallback(() => setStack((st) => (st.length > 1 ? st.slice(0, -1) : st)), []);

  return (
    <div className={s.stage}>
      <div className={s.phone}>
        {current === "hub" && <Hub go={go} back={back} />}
        {current === "weekly" && <WeeklyMission go={go} back={back} />}
      </div>
      <p className={s.note}>무신사 머니 오퍼월 · 프로토타입 · 390px</p>
    </div>
  );
}
