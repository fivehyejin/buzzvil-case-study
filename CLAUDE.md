# 무신사 머니 오퍼월 프로토타입

PM 과제용 웹 프로토타입. 문제정의 → 가설 → 검증설계 → 프로토타입(이 레포) → PDF 4장 순으로 진행.

## 작업 규칙 (에이전트·사람 공통)

- **기획 레이어와 UI 레이어를 분리한다.**
  - 기획이 바뀌면 `spec/`과 `src/data/`를 먼저 고친다. 컴포넌트는 그 다음.
  - `spec/hypothesis.md` — 문제정의·가설·검증설계. 화면이 "왜 필요한지"의 근거.
  - `spec/flows.md` — 화면 목록, 각 화면의 목적, 성공 기준. 화면 추가/삭제는 여기서 시작.
  - `src/data/*.json` — 미션·오퍼·리워드 목업 데이터. 숫자·문구 바꾸는 건 여기만.
- **디자인 토큰은 `src/tokens/tokens.css` 하나뿐이다.** 색·간격·곡률·타이포를 컴포넌트에 하드코딩하지 않는다. 근거는 `spec/design-system.md`.
- **컴포넌트는 `spec/design-system.md`의 스펙을 따른다.** 파란색은 리워드 값과 완료 진행에만, 빨강은 프로모·알림에만, 그림자는 Primary CTA에만.
- 새 상태(눌림/로딩/성공/실패 등)를 추가할 때는 `spec/design-system.md` 7번 "원본이 미정으로 남긴 항목"에 결정 내용을 적는다.
- Tailwind 쓰지 않는다. CSS Modules + CSS 변수.

## 스택

Vite · React 18 · TypeScript · CSS Modules · lucide-react (아이콘명이 Figma 레이어명과 1:1)

```
npm run dev      # 로컬
npm run build    # dist/ 생성 (tsc 타입체크 포함)
```

## 구조

```
spec/                  기획 문서 (수정 1순위)
  hypothesis.md        문제정의·가설·검증설계 (확정)
  flows.md             화면 플로우 + 이벤트 표
  design-system.md     토큰·컴포넌트 스펙 + 프로토타입에서 결정한 것
src/tokens/            tokens.css · 디자인 토큰
src/components/        디자인 시스템 컴포넌트 (각 폴더: Name.tsx + Name.module.css)
src/screens/
  Entry.tsx            진입 (무신사 홈 스텁, 진입점 ① 배너)
  Offerwall.tsx        오퍼월 첫 화면 — 가설이 바꾸는 유일한 화면. 코호트·그룹으로 분기
  reference/           Figma 06 보드 참고 화면 (허브, 주간 미션) — 가설과 무관
src/data/
  offers.json          오퍼 (type·단가·완료율·소요행동·동사)
  offerwall.json       카피·모듈 설정·필터·유의사항
src/lib/
  slots.ts             슬롯 선정 정책 (완료율 상위 → 단가순 3개 → 폴백)
  track.ts             이벤트 트래킹 (flows.md 이벤트 표와 1:1)
  useProtoState.ts     토글 상태 ↔ URL 쿼리
src/proto/             프로토타입 전용 UI (토글 바, 이벤트 로그) — 제품 UI 아님
```

## 변형 링크

`?screen=offerwall&cohort=new&group=test` 처럼 쿼리로 특정 변형을 바로 열 수 있다. PDF·슬랙 공유용.

| 변형 | 쿼리 |
|---|---|
| 진입 (현행 카피) | `?screen=entry&copy=control` |
| 진입 (2차안) | `?screen=entry&copy=variant` |
| 오퍼월 대조군 | `?screen=offerwall&cohort=new&group=control` |
| 오퍼월 실험군 | `?screen=offerwall&cohort=new&group=test` |
| 오퍼월 기존 코호트 | `?screen=offerwall&cohort=existing` |

## 배포

Cloudflare Workers (정적 자산, `wrangler.toml`의 `[assets]`). GitHub 연결 프로젝트의 Build 설정: Build command `npm run build`, Deploy command `npx wrangler deploy`. 로컬에서는 `npm run build && npx wrangler deploy`.

## 흔한 요청 → 어디를 고치나

| 요청 | 수정 위치 |
|---|---|
| 모듈 헤더·캡션 문구 | `src/data/offerwall.json` → `module` |
| 진입 카피 (현행/2차안) | `src/data/offerwall.json` → `entry` |
| 오퍼 추가·단가·완료율 조정 | `src/data/offers.json` |
| 슬롯 개수·완료율 임계값 | `src/data/offerwall.json` → `module.slotCount / completionTopPct` |
| 슬롯 선정 규칙 자체 | `src/lib/slots.ts` + `spec/hypothesis.md` 7번 |
| 실험군 화면 구성 순서 | `spec/flows.md` → `src/screens/Offerwall.tsx` |
| 이벤트 추가 | `spec/flows.md` 이벤트 표 → `src/lib/track.ts` |
| 색·간격 바꾸기 | `src/tokens/tokens.css` |
| 버튼 상태 추가 | `src/components/Button/` + `spec/design-system.md` 7번 기록 |
