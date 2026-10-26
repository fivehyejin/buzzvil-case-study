import { useState } from "react";
import { AppBar, BonusPanel, Intro, LegalNote, MissionList, Modal, Section, type Mission } from "@/components";
import type { NavProps } from "@/lib/types";
import weekly from "@/data/weekly.json";
import missionsData from "@/data/missions.json";
import s from "../Screen.module.css";

export function WeeklyMission({ back }: NavProps) {
  const [missions, setMissions] = useState<Mission[]>(missionsData as Mission[]);
  const [info, setInfo] = useState(false);
  const [page, setPage] = useState(0);
  const [picked, setPicked] = useState<Mission | null>(null);

  const completed = missions.filter((m) => m.done >= m.total).length;

  // 프로토타입 동작: 미션 행 탭 → 안내 모달 → "참여하기" 누르면 진행도 +1
  const participate = () => {
    if (!picked) return;
    setMissions((ms) => ms.map((m) => (m.id === picked.id ? { ...m, done: Math.min(m.done + 1, m.total) } : m)));
    setPicked(null);
  };

  return (
    <div className={s.screen}>
      <AppBar title="주간 미션" onBack={back} onClose={back} />
      <div className={s.content}>
        <Intro title={weekly.intro.title} description={weekly.intro.description} />

        <BonusPanel
          title={weekly.bonus.title}
          description={weekly.bonus.description}
          done={completed}
          total={weekly.bonus.total}
          ctaLabel={weekly.bonus.ctaLabel}
          onInfo={() => {
            setPage(0);
            setInfo(true);
          }}
          onCta={() => document.getElementById("mission-list")?.scrollIntoView({ behavior: "smooth" })}
        />

        <div id="mission-list">
          <Section title={weekly.listTitle}>
            <MissionList missions={missions} onClick={setPicked} />
          </Section>
        </div>

        <div className={s.bleed}>
          <LegalNote items={weekly.legal} />
        </div>
      </div>

      {/* 보너스 안내 — 안내가 2장이라 페이지 점 사용 */}
      <Modal
        open={info}
        title={weekly.bonus.info.title}
        onClose={() => setInfo(false)}
        page={{ index: page, total: 2 }}
        ctaLabel={page === 0 ? "다음" : "확인"}
        onCta={() => (page === 0 ? setPage(1) : setInfo(false))}
      >
        {page === 0 ? (
          <>
            <strong style={{ whiteSpace: "pre-line" }}>{weekly.bonus.info.headline}</strong>
            <p>{weekly.bonus.info.body}</p>
          </>
        ) : (
          <>
            <strong>{`${weekly.bonus.total}개를 모두 완료하면\n보너스가 지급돼요`}</strong>
            <p>주간 초기화 시점과 지급 조건은 서비스 정책을 따릅니다.</p>
          </>
        )}
      </Modal>

      {/* 미션 상세 */}
      <Modal
        open={!!picked}
        title={picked?.title ?? ""}
        onClose={() => setPicked(null)}
        ctaLabel={picked && picked.done >= picked.total ? "완료됨" : "참여하기"}
        onCta={picked && picked.done >= picked.total ? () => setPicked(null) : participate}
      >
        <strong>{picked ? `${picked.done}/${picked.total} 완료 · ${picked.reward?.toLocaleString() ?? 0}원` : ""}</strong>
        <p>미션 조건을 충족하면 진행도가 올라가요. 모두 완료하면 리워드가 적립됩니다.</p>
      </Modal>
    </div>
  );
}
