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
spec/            기획 문서 (수정 1순위)
src/tokens/      tokens.css · 디자인 토큰
src/components/  디자인 시스템 컴포넌트 (각 폴더: Name.tsx + Name.module.css)
src/screens/     화면 (Hub, WeeklyMission …) — spec/flows.md와 1:1
src/data/        목업 데이터 json
src/lib/         타입, 유틸
```

## 배포

Cloudflare Pages. GitHub 연결 후 Build `npm run build`, Output `dist`. 또는 `npx wrangler pages deploy dist`.

## 흔한 요청 → 어디를 고치나

| 요청 | 수정 위치 |
|---|---|
| 미션 문구·개수·진행도 바꾸기 | `src/data/missions.json` |
| 오퍼 카드 추가 | `src/data/offers.json` |
| 화면 플로우 바꾸기 | `spec/flows.md` → `src/screens/` |
| 색·간격 바꾸기 | `src/tokens/tokens.css` |
| 버튼 상태 추가 | `src/components/Button/` + spec 7번 기록 |
