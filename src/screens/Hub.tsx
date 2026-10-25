import { useState } from "react";
import {
  AppBar,
  AttendanceRow,
  CapsuleDraw,
  DailyReward,
  Intro,
  Modal,
  OfferCard,
  Section,
  Shortcuts,
  type Offer,
  type ShortcutKey,
} from "@/components";
import { useFakeAction } from "@/lib/useFakeAction";
import type { NavProps } from "@/lib/types";
import hub from "@/data/hub.json";
import offersData from "@/data/offers.json";
import s from "./Screen.module.css";

const offers = offersData as Offer[];

export function Hub({ go }: NavProps) {
  const [opened, setOpened] = useState(false);
  const [checked, setChecked] = useState(false);
  const [draws, setDraws] = useState(hub.drawRemaining);
  const [result, setResult] = useState<{ title: string; headline: string; body: string } | null>(null);

  const openGift = useFakeAction(() => {
    setOpened(true);
    setResult({ title: "선물 도착", headline: "156원이\n적립됐어요", body: "내일 다시 선물상자를 열 수 있어요." });
  });
  const draw = useFakeAction(() => {
    setDraws((d) => d - 1);
    setResult({ title: "행운 뽑기", headline: "300원 캡슐이\n나왔어요", body: "적립 내역에서 확인할 수 있어요." });
  });
  const attend = useFakeAction(() => setChecked(true));

  const onShortcut = (k: ShortcutKey) => {
    if (k === "weekly") go("weekly");
    else document.getElementById(`sec-${k}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onOffer = (o: Offer) =>
    setResult({ title: o.brand, headline: `${o.action}\n${o.reward.toLocaleString()}원 적립`, body: "참여 조건과 지급 시점은 오퍼 상세에서 확인해 주세요." });

  return (
    <div className={s.screen}>
      <AppBar title={hub.appBarTitle} onClose={() => {}} />
      <div className={s.content}>
        <Intro title={hub.intro.title} description={hub.intro.description} />

        <Shortcuts items={hub.shortcuts as { key: ShortcutKey; label: string }[]} onSelect={onShortcut} />

        <div id="sec-daily">
          <DailyReward opened={opened} loading={openGift.loading} onOpen={openGift.run} />
        </div>

        <Section title={hub.offersTitle} bleed>
          <div className={s.hscroll}>
            {offers.map((o) => (
              <OfferCard key={o.id} offer={o} onClick={onOffer} />
            ))}
          </div>
        </Section>

        <div id="sec-draw">
          <Section title={hub.drawTitle}>
            <CapsuleDraw remaining={draws} loading={draw.loading} onDraw={draw.run} />
          </Section>
        </div>

        <div id="sec-attendance" className={s.attendanceBg}>
          <AttendanceRow
            title={hub.attendance.title}
            description={hub.attendance.description}
            checked={checked}
            loading={attend.loading}
            onCheck={attend.run}
          />
        </div>
      </div>

      <Modal open={!!result} title={result?.title ?? ""} onClose={() => setResult(null)}>
        <strong style={{ whiteSpace: "pre-line" }}>{result?.headline}</strong>
        <p>{result?.body}</p>
      </Modal>
    </div>
  );
}
