# 무신사 머니 디자인 시스템 정리 (프로토타입 구현 기준)

> 출처: Figma `버즈빌_디자인시스템` (MUSINSA MONEY / UI STUDY · 화면 기반 재구성 · 비공식)
> 원본 문서가 명시한 전제: 색상과 반복 패턴은 **관찰값**, 치수·폰트·추가 상태는 **추정 또는 제안**.
> 실제 폰트는 식별 불가 → Noto Sans KR(한글) + Inter(숫자/라틴)로 대체.

---

## 1. 파운데이션 (02 보드)

### 1.1 색상 — Primitive

| 토큰 | 값 | 관찰/제안 |
|---|---|---|
| neutral/000 | `#FFFFFF` | 관찰 (배경) |
| neutral/050 | `#F5F5F5` | 관찰 (옅은 패널) |
| neutral/150 | `#E6E6E6` | 관찰 (경계, 진행 트랙) |
| neutral/200 | `#E0E0E0` | 관찰 (리워드 패널) |
| neutral/500 | `#888888` | 관찰 (보조 텍스트) |
| neutral/700 | `#555555` | 관찰 (본문 보조) |
| neutral/1000 | `#000000` | 관찰 (CTA, 본문) |
| blue/500 | `#4164FF` | 관찰 (리워드 강조) |
| blue/050 | `#E5EAFC` | 관찰 (리워드 배지 면) |
| red/500 | `#F04444` | **제안** (프로모션·알림) |
| state/disabled | `#D9D9D9` | **제안** |

### 1.2 색상 — Semantic 매핑

```
bg/default        → neutral/000   #FFFFFF
bg/subtle         → neutral/050   #F5F5F5
bg/reward-panel   → neutral/200   #E0E0E0
border/default    → neutral/150   #E6E6E6
progress/track    → neutral/150   #E6E6E6
action/primary    → neutral/1000  #000000
text/primary      → neutral/1000  #000000
text/strong       → #111111
text/secondary    → neutral/700   #555555
text/tertiary     → neutral/500   #888888
text/inverse      → neutral/000   #FFFFFF
reward/accent     → blue/500      #4164FF   (텍스트, 진행 채움)
reward/subtle     → blue/050      #E5EAFC   (배지 면)
promo/accent      → red/500       #F04444
state/disabled    → #D9D9D9
overlay           → #000000 @ 45%  (제안)
```

**사용 규칙**
- 파란색은 **리워드 값과 완료 진행**에만 사용. 그 외 강조는 검정.
- 빨강은 프로모션 태그·알림 카운트 전용. 빈 상태에 빨강 금지.
- 카드는 그림자 대신 **면 색상**으로 구분. 그림자는 CTA 주변에만 (`0 3px 8px rgba(0,0,0,.25)`).

### 1.3 타이포그래피 (크기 / 굵기 / 행간)

| 역할 | 스펙 | 예시 |
|---|---|---|
| 금액 / Display | 28 / 700 / 36 | 156원 |
| 섹션 제목 / Heading | 20 / 700 / 28 | 미션 수행하고 적립 |
| 앱바 제목 | 17 / 700 | 무신사 머니 |
| 행동 / Action | 16 / 700 / 24 | 선물상자를 열어보세요 |
| 본문 / Body | 14 / 400 / 22 | 매일 한번 열 수 있어요 |
| 보조 / Caption | 12 / 400 / 18 | 유튜브 구독하면 |
| 수치 / Counter | 12 / 500 / 18 (Inter) | 0/3 |
| 소형 CTA 레이블 | 13 / 700 | 참여하기 |
| 태그 | 10 / 700 | 추가 적립 |

### 1.4 간격 — 4px 단위

```
4   8   12   16   20   24   32   40   48
```
- 4–8 인라인 · 12–16 요소 사이 · **20 모바일 좌우 패딩** · 24–32 그룹 · 40–48 섹션
- 모바일 기준 화면 폭 **390**, 본문 폭 **350**

### 1.5 곡률

| 값 | 용도 |
|---|---|
| 4 | 태그 |
| 8 | 소형 버튼, 유틸리티 버튼, 툴팁 |
| 12 | Primary CTA, 오퍼 카드 |
| 16 | 패널 (보너스, 일일보상, 출석행, 모달) |
| 999 | 리워드 배지, 필터 칩 |

---

## 2. 컨트롤 (03 보드)

| 컴포넌트 | 스펙 | 상태 |
|---|---|---|
| **Button/Primary/Default** | H56 · R12 · 검정 면 · 흰 16/700 | 관찰 |
| **Button/Primary/Disabled** | H56 · 면 #D9D9D9 · 글자 #888 | 제안 (참여 불가 시) |
| **Button/Primary/Compact** | W104 · H36 · R8 · 13/700 | 제안 (목록 안 행동) |
| **Button/Utility** | 44×44 · 1px 경계 · R8 · 글리프 20–24 | 제안 (정보/닫기/뒤로/더보기) |
| **Chip/Selected** | H~38 · px16 py9 · R999 · 검정 면/흰 글자 13 | 제안 · 단일 선택 |
| **Chip/Default** | 흰 면 · 1px #E6E6E6 · 글자 #555 | 제안 |
| **Badge/Reward** | H28–32 · px10 py6 · R999 · 면 #E5EAFC · 글자 #4164FF 13/700 | 관찰 (156원) |
| **Badge/Promo** | H~22 · px6 py3 · R3 · 빨강 면 · 흰 10/700 | 제안 · 보상 배지와 혼용 금지 |
| **Badge/Count** | H18 · minW18 · R999 · 빨강 · Inter 10/700 · 99 초과는 99+ | 제안 |
| **Badge/Dot** | 6px 점 | 제안 |
| **Pagination** | Dot 6 · Gap 6 · 현재 검정 | 제안 |

> 원본 문서 경고: 기본 → 누름 → 처리 중 → 성공/실패 흐름은 캡처로 확인 불가. 프로토타입에서 눌림/로딩 상태는 직접 정의해야 함.

---

## 3. 화면 패턴 (04 보드)

조합 순서: **정보 → 참여 → 진행 → 보상**

| 패턴 | 구조 | 스펙 |
|---|---|---|
| **AppBar** | ← 뒤로 · 제목 · × 닫기 | H56 · px20 · 제목 17/700 · 아이콘 22 |
| **Shortcuts** | 4열 아이콘+레이블 (매일 선물 / 주간 미션 / 행운 뽑기 / 출석 체크) | py18 · 아이콘 28 · 레이블 11 |
| **OfferCard** | 이미지(116) + 브랜드 14/700 + 참여방식 12 + 리워드 배지 | W278 · R12 · 면 #F5F5F5 |
| **MissionRow** | 제목 14/500 #555 → 분할 진행 바 + 분수 → 우측 chevron 24 | py17 · 진행 영역 W225 |
| **Progress (1–5분할)** | 세그먼트 H8 · 간격 2 · R999 · 분수와 간격 8 | Empty 회색 / Partial·Complete 파랑(제안) · **총 구간 = 미션 수** |
| **DailyReward** | 회색 패널(#E0E0E0) · 중앙 선물 일러스트 · 검정 CTA · 참여 주기 문구 14 | px32 py24 · R16 |
| **BonusPanel** | 제목 17/700 + ⓘ · 설명 13 · 5분할 진행 바 · Compact CTA | p20 · R16 · 면 #F5F5F5 |
| **AttendanceRow** | 체크 아이콘 30 · 제목 14/700 + 보조 11 · Compact CTA | p16 · R16 · 흰 면 · **행동은 하나만** |

---

## 4. 피드백·정보 (05 보드) — 전부 제안

| 패턴 | 스펙 |
|---|---|
| **Tooltip** | W310 · R8 · p16 · 검정 면 · 제목 13/700 + 본문 12 · 화살표 16×10 · 중요한 지급 조건은 툴팁에만 두지 않음 |
| **EmptyState** | 아이콘 34 · "아직 적립 내역이 없어요" 14 · 보조 12 · H230 중앙 정렬 · 로딩/오류와 분리 |
| **Modal** | 화면 390 / 대화상자 326 / inset 24 / R16 · 제목 18/700 + × · 본문 16/700 + 13 · 페이지 점(여러 장일 때만) · 검정 CTA H56 · 오버레이 #000 45% |
| **LegalNote** | 면 #F5F5F5 · p20 · 제목 12/700 · 본문 11 / 행간 ~18 · 불릿 |

**표현과 동작 규칙**
1. 모달의 제목과 주요 행동은 항상 보이게
2. 안내가 여러 장일 때만 페이지 점 사용
3. 닫기·배경 탭 허용 여부는 정책 확인
4. 빈 내역에 오류처럼 보이는 빨강 사용 금지
5. 운영 정책 문구는 실제 기준으로 교체

---

## 5. 적용 예시 화면 (06 보드) — 프로토타입 뼈대

### 리워드 허브 (390px)
```
AppBar("무신사 머니")
├ 허브 요약: 제목 20/700 + 설명 14
├ Shortcuts (4열)
├ DailyReward (선물상자 CTA)
├ 섹션 "오퍼 추천" → OfferCard (가로 스크롤)
├ 섹션 "행운 뽑기" → CapsuleDraw(아트 H300 + CTA 영역 H88)
└ AttendanceRow
```

### 주간 미션 (390px)
```
AppBar("주간 미션")
├ 주간 도입: 제목 20/700 + 설명 14
├ BonusPanel (5분할 진행)
├ 섹션 "주간 미션 목록" → MissionRow × 4 (1~4분할)
└ 유의사항(LegalNote)
```

---

## 6. 코드 토큰 초안 (`src/tokens/tokens.css`)

```css
:root {
  /* color */
  --bg-default: #FFFFFF;
  --bg-subtle: #F5F5F5;
  --bg-reward-panel: #E0E0E0;
  --border-default: #E6E6E6;
  --progress-track: #E6E6E6;
  --action-primary: #000000;
  --text-primary: #000000;
  --text-strong: #111111;
  --text-secondary: #555555;
  --text-tertiary: #888888;
  --text-inverse: #FFFFFF;
  --reward-accent: #4164FF;
  --reward-subtle: #E5EAFC;
  --promo-accent: #F04444;
  --state-disabled: #D9D9D9;
  --overlay: rgba(0,0,0,.45);

  /* space */
  --sp-4: 4px; --sp-8: 8px; --sp-12: 12px; --sp-16: 16px; --sp-20: 20px;
  --sp-24: 24px; --sp-32: 32px; --sp-40: 40px; --sp-48: 48px;

  /* radius */
  --r-4: 4px; --r-8: 8px; --r-12: 12px; --r-16: 16px; --r-pill: 999px;

  /* type */
  --font-kr: "Noto Sans KR", system-ui, sans-serif;
  --font-num: "Inter", var(--font-kr);
  --t-display: 700 28px/36px var(--font-kr);
  --t-heading: 700 20px/28px var(--font-kr);
  --t-appbar:  700 17px/24px var(--font-kr);
  --t-action:  700 16px/24px var(--font-kr);
  --t-body:    400 14px/22px var(--font-kr);
  --t-caption: 400 12px/18px var(--font-kr);
  --t-counter: 500 12px/18px var(--font-num);
  --t-cta-sm:  700 13px/18px var(--font-kr);
  --t-tag:     700 10px/14px var(--font-kr);

  /* layout */
  --screen-w: 390px;
  --content-w: 350px;
  --gutter: 20px;

  /* elevation */
  --shadow-cta: 0 3px 8px rgba(0,0,0,.25);
}
```

---

## 7. 프로토타입 구현 시 직접 정의해야 할 것 (원본이 미정으로 남긴 항목)

- 버튼 **눌림 / 로딩 / 성공 / 실패** 상태 (현재는 기본·비활성·소형만 있음)
- 진행 바 **부분 채움의 실제 운영 규칙** (파란 채움은 제안)
- 주간 **초기화 시점, 보너스 지급 조건**
- 미션 행 탭 시 **이동 동작** (상세? 외부 링크? 바로 참여?)
- 모달 **닫기·배경 탭 허용 여부**
- 완료 상태의 **지급 문구**와 **비활성 조건**

### 프로토타입에서 결정한 것 (2026-10-27)

| 항목 | 결정 | 위치 |
|---|---|---|
| 버튼 눌림 | scale .98 + opacity .9, 120ms | `Button.module.css` |
| 버튼 로딩 | 점 3개 펄스, 중복 탭 방지(`disabled`) | `Button.tsx` |
| 미션 행 탭 | 안내 모달 → 참여하기 (참고 화면에서만) | `reference/WeeklyMission.tsx` |
| 모달 닫기 | 배경 탭·ESC 허용 기본값, `dismissible` prop | `Modal.tsx` |
| 오퍼 탭 | 상세 화면은 범위 밖 → 모달로 대체 | `Offerwall.tsx` |

---

## 8. 과제용 추가 컴포넌트 (Figma 원본에 없음 · 기존 토큰으로 조합)

| 컴포넌트 | 조합 | 근거 |
|---|---|---|
| **QuickRewardModule** | 패널(R16 · #F5F5F5 · p20) + 헤더 17/700 + 슬롯 카드 ×3 | hypothesis 7번 채택안 UI ⑵⑶ |
| **SlotCard** (모듈 내부) | 흰 면 R12 · 순위 원형 22 · 문장 14/500(금액은 Inter 16/700 파랑) · 브랜드 캡션 12 · Compact CTA | "금액·소요 행동·동사 버튼을 한 카드에". 파랑은 리워드 값에만 |
| **OfferListRow** | 로고 44 R12 · 브랜드 14/700 · 참여방식 12 · 리워드 배지 · chevron 20 · py14 · 하단 1px 경계 | 현행 리스트 관찰 포맷. 행동과 금액이 분리됨 (모듈과의 차이) |
| **MiniGameCarousel** | OfferCard 비례(W278 · 아트 116) + 페이지 점 | 현행 첫 뷰포트 절반 관찰 |
| **EntryBanner** | 검정 면 R16 · 카피 20/700 · 흰 pill CTA | 무신사 영역 스텁. 실제 무신사 UI 아님 |

프로토타입 전용 UI(`src/proto/`: 토글 바, 이벤트 로그)는 디자인 시스템 밖. 화면 폭 420px 이하에서는 숨김.
