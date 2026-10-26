import { useCallback } from "react";
import { Entry } from "@/screens/Entry";
import { Offerwall } from "@/screens/Offerwall";
import { Hub } from "@/screens/reference/Hub";
import { WeeklyMission } from "@/screens/reference/WeeklyMission";
import { ProtoControls } from "@/proto/ProtoControls";
import { EventLog } from "@/proto/EventLog";
import { useProtoState } from "@/lib/useProtoState";
import type { Screen } from "@/lib/types";
import s from "./App.module.css";

/**
 * 390px 폰 프레임 + 프로토타입 컨트롤.
 * 화면 전환은 상태 하나로 — 진입 → 오퍼월 → (뒤로) 진입.
 */
export default function App() {
  const { state, set } = useProtoState();

  const go = useCallback((sc: Screen) => set("screen", sc), [set]);
  const back = useCallback(() => set("screen", "entry"), [set]);

  return (
    <div className={s.stage}>
      <ProtoControls state={state} set={set} />

      <div className={s.phone} key={`${state.screen}-${state.cohort}-${state.group}`}>
        {state.screen === "entry" && <Entry go={go} back={back} entryCopy={state.entryCopy} />}
        {state.screen === "offerwall" && <Offerwall go={go} back={back} cohort={state.cohort} group={state.group} />}
        {state.screen === "hub" && <Hub go={go} back={back} />}
        {state.screen === "weekly" && <WeeklyMission go={go} back={back} />}
      </div>

      <EventLog />
    </div>
  );
}
