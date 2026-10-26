import { Bell, Search, ShoppingBag } from "lucide-react";
import { EntryBanner } from "@/components";
import { track } from "@/lib/track";
import type { EntryCopy, NavProps } from "@/lib/types";
import cfg from "@/data/offerwall.json";
import s from "./Entry.module.css";

/**
 * 진입 — 무신사 홈 스텁 (무신사 영역, 프로토타입용)
 * 진입점 ① 배너만 의미 있음. 나머지는 자리 표시.
 * entryCopy: control = "단 한 번에 최대 1만원" / variant = 2차안 "최대 1만원"
 */
export function Entry({ go, entryCopy }: NavProps & { entryCopy: EntryCopy }) {
  const copy = entryCopy === "variant" ? cfg.entry.copyVariant : cfg.entry.copyControl;

  return (
    <div className={s.screen}>
      <header className={s.top}>
        <span className={s.logo}>{cfg.entry.homeTitle}</span>
        <span className={s.icons}>
          <Search size={22} strokeWidth={1.75} />
          <Bell size={22} strokeWidth={1.75} />
          <ShoppingBag size={22} strokeWidth={1.75} />
        </span>
      </header>

      <div className={s.hero} aria-hidden />

      <div className={s.content}>
        <EntryBanner
          copy={copy}
          sub={cfg.entry.sub}
          cta={cfg.entry.cta}
          onClick={() => {
            track("entry_click", { entry: "①", copy });
            go("offerwall");
          }}
        />

        <div className={s.grid} aria-hidden>
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className={s.tile}>
              <div className={s.tileImg} />
              <div className={s.tileLine} />
              <div className={s.tileLineShort} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
