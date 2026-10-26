# 화면 플로우

> `src/screens/`와 1:1. 화면을 추가·삭제·순서 변경할 때 여기서 먼저 정의한다.
> 근거: `spec/hypothesis.md` 7번 채택안.

## 과제 화면

| 화면 | 파일 | 목적 | 토글 |
|---|---|---|---|
| 진입 | `screens/Entry.tsx` | 무신사 홈 스텁. 진입점 ① 배너 "단 한 번에 최대 1만원"을 보여주고 오퍼월로 보냄 | 카피: 현행 / 2차안("최대 1만원") |
| 오퍼월 | `screens/Offerwall.tsx` | 첫 뷰포트. 가설이 바꾸는 유일한 화면 | 코호트: 신규 0회 / 기존 1회+ · 그룹: 실험군 / 대조군 |

### 오퍼월 · 대조군 (현행 · 기존 코호트는 항상 이것)
```
AppBar("무신사 머니")
1원 미니게임 캐러셀 (첫 뷰포트 절반)          ← data/offers.json type=game
필터 칩 (전체 / 가입 / 설치 / 구매)
리스트 "참여하고 적립" → OfferListRow × N       ← 가입형 상단, 1만원대는 스크롤·탭 후
LegalNote
```

### 오퍼월 · 실험군 (신규 코호트만)
```
AppBar("무신사 머니")
QuickRewardModule
  헤더 "최대 1만원 중, 지금 바로 받는 것부터"   ← data/offerwall.json module.header
  SlotCard × 3  (금액 · 소요 행동 · 동사 버튼)   ← lib/slots.ts rankSlots()
필터 칩
리스트 "참여하고 적립" → OfferListRow × N       ← 대조군과 동일
1원 미니게임 캐러셀                             ← 리스트 아래로 이동
LegalNote
```

실험군과 대조군의 차이는 **모듈 유무와 캐러셀 위치**뿐. 리스트·칩·오퍼 데이터는 같다.

## 이벤트 (검증설계 지표 ↔ 프로토타입)

| 이벤트 | 발화 시점 | 대응 지표 |
|---|---|---|
| `offerwall_view` | 오퍼월 진입 | 세션 수 (분모) |
| `module_impression` | 모듈 렌더 (실험군) | 모듈 노출 |
| `slot_click` | 슬롯 카드/버튼 탭 | 모듈 클릭률 · 첫 참여 중 슬롯 발생 비중 |
| `offer_click` | 리스트 행 탭 | 세션 참여율 (리스트 오퍼 클릭 ≥1) |
| `game_click` | 1원 게임 카드 탭 | 가드레일: 1원 게임 건수 |
| `entry_click` | 진입 배너 탭 | 진입점 ① 유입 |

## 참고 화면 (디자인 시스템 검증용 · 가설과 무관)

| 화면 | 파일 | 출처 |
|---|---|---|
| 리워드 허브 | `screens/reference/Hub.tsx` | Figma 06 보드 |
| 주간 미션 | `screens/reference/WeeklyMission.tsx` | Figma 06 보드 |

## 미정

- 슬롯 탭 후 플로우 (오퍼 상세 → 광고주 랜딩). 프로토타입은 모달로 대체.
- 완료율 상위 nn% 임계값. 프로토타입은 30%로 둠 (`data/offerwall.json`).
