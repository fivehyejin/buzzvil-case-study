# 화면 플로우

> `src/screens/`와 1:1. 화면을 추가·삭제·순서 변경할 때 여기서 먼저 정의한다.

## 현재 화면 (Figma 06 보드 기준 · 가설 반영 전)

| 화면 | 파일 | 목적 | 진입 | 주요 행동 |
|---|---|---|---|---|
| 리워드 허브 | `screens/Hub.tsx` | 오퍼월 진입점. 매일 보상·오퍼·뽑기·출석을 한 화면에서 노출 | 무신사 앱 → 머니 | 선물상자 열기 / 오퍼 참여 / 뽑기 / 출석 |
| 주간 미션 | `screens/WeeklyMission.tsx` | 주간 미션 목록과 보너스 진행 | 허브 → 바로가기 "주간 미션" | 미션 행 탭 → 참여 |

## 화면별 구성

### 리워드 허브
```
AppBar("무신사 머니")
허브 요약
Shortcuts (매일 선물 / 주간 미션 / 행운 뽑기 / 출석 체크)
DailyReward
오퍼 추천 → OfferCard 가로 스크롤   ← data/offers.json
행운 뽑기 → CapsuleDraw
AttendanceRow
```

### 주간 미션
```
AppBar("주간 미션")
주간 도입
BonusPanel (5분할)                   ← data/weekly.json
주간 미션 목록 → MissionRow × N      ← data/missions.json
LegalNote
```

## 미정 (가설 확정 후 결정)

- 미션 행 탭 시 이동: 상세 모달? 외부 랜딩? 즉시 참여?
- 선물상자 열기 후 결과 화면
- 오퍼 카드 탭 후 플로우
