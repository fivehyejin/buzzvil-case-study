# 무신사 머니 오퍼월 프로토타입

PM 과제용 동작 프로토타입. 무신사 머니(오퍼월) 화면 캡처를 재구성한 디자인 시스템 위에 React로 구현.

**가설**: 신규(참여 완료 0회) 유저가 첫 화면 스크롤 전에 완료율 상위 × 단가 상위 오퍼를 1원 게임보다 먼저 보면 신규 세션 참여율이 오른다. → `spec/hypothesis.md`

**프로토타입**: 개선안이 반영된 오퍼월 화면 1개 (TO-BE · 완료 0회 · 실험군). 목표 오퍼 + "지금 바로 받기" 3개가 첫 뷰포트에 오고 1원 게임은 아래로. 받기·필터가 실제로 동작.

```
npm install
npm run dev       # http://localhost:5173
npm run build     # dist/
```

## 구조

| 폴더 | 역할 |
|---|---|
| `spec/` | 문제정의·가설·검증설계(`hypothesis.md`), 화면 플로우(`flows.md`), 디자인 시스템 스펙(`design-system.md`) |
| `src/tokens/` | 디자인 토큰 (CSS 변수 단일 소스) |
| `src/components/` | 디자인 시스템 컴포넌트 17종 |
| `src/screens/` | 오퍼월 TO-BE 화면 (Figma 52:1844) |
| `src/data/` | 목업 데이터 — 문구·숫자는 여기서만 수정 |

작업 규칙은 `CLAUDE.md` 참고.

## 배포 (Cloudflare Workers · 정적 자산)

1. Cloudflare 대시보드 → Workers & Pages → Create → Workers → Import a repository → 이 레포 선택
2. Settings → Build: **Build command `npm run build`**, Deploy command `npx wrangler deploy`
3. 이후 `main` 푸시마다 자동 배포

로컬에서 직접: `npm run build && npx wrangler deploy`

## 디자인 근거

Figma `버즈빌_디자인시스템` (MUSINSA MONEY / UI STUDY). 색상·반복 패턴은 관찰값, 치수·폰트·추가 상태는 추정. 원본이 정의하지 않은 눌림/로딩/성공 상태와 미션 탭 동작은 프로토타입용으로 임의 정의했으며 `spec/design-system.md` 7번에 기록.
