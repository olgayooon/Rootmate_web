@AGENTS.md

# Rootmate Web — 프로젝트 문서

## 프로젝트 개요

Rootmate 웹사이트. 식물 씨앗 키트 판매 + 앱 소개 랜딩 페이지.
"식물을 돌보며, 나를 돌본다" — 식물 캐릭터가 매일 마음 건강 질문을 건네는 앱과 연동.

## 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS v4
- **애니메이션**: Framer Motion
- **배포 예정**: Vercel

## 디렉토리 구조

```
app/
  layout.tsx          # 루트 레이아웃 (메타데이터)
  globals.css         # 전역 스타일 (ahn2006 @font-face, .font-ahn-bold/medium/vietnam)
  page.tsx            # 랜딩 홈 (6개 섹션 조합)
  shop/
    page.tsx          # 키트 구매 페이지 (현재 준비중 placeholder)

components/
  NavBar.tsx          # 상단 고정 네비게이션 (스크롤 시 그림자)
  HeroSection.tsx     # 섹션 1 — Hero (2열, 앱 목업)
  ProblemSection.tsx  # 섹션 2 — 문제 제기 (공감 카드 3개)
  HowItWorksSection.tsx  # 섹션 3 — 서비스 소개 (3단계 카드)
  PlantsSection.tsx   # 섹션 4 — 식물 캐릭터 소개 (hover 그라디언트)
  GiftSection.tsx     # 섹션 5 — 선물 제안 (2열)
  CTASection.tsx      # 섹션 6 — 구매 CTA (다크 그린 배경)
  Footer.tsx          # 푸터

constants/
  colors.ts           # 앱과 동일한 컬러 시스템 (COLORS 객체)

public/
  fonts/
    ahn2006-B.ttf     # ASS 2006 Bold
    ahn2006-M.ttf     # ASS 2006 Medium
  images/
    plant-card.png
    characters/
      bajil/          # 바질 캐릭터 bajil_1~8.png
      tomato/         # 방울토마토 tomato_1~8.png
      tulip/          # 튤립 tulip_1~6.png
      bajil_profile.png
      tom_profile.png
      tul_profile.png
      vase.png
```

## 페이지 구조

### `/` — 랜딩 홈 (`app/page.tsx`)

한 페이지 스크롤. 섹션 순서:

| # | 컴포넌트 | 설명 |
|---|---------|------|
| 1 | HeroSection | 헤드카피 + 앱 목업, "키트 구매하기" + "나의 룻메이트 선택하기"(#plants 스크롤) 버튼, 하단 스크롤 화살표 |
| 2 | ProblemSection | 공감 포인트 3개 카드 (배경 #f3f4f1) |
| 3 | HowItWorksSection | 3단계 작동 방식 카드 |
| 4 | PlantsSection | 바질·방울토마토·튤립 캐릭터 소개 |
| 5 | GiftSection | 선물 제안 (배경 #f3f4f1) |
| 6 | CTASection | 구매 CTA (배경 #286905 다크 그린) |

### `/shop` — 키트 구매 (`app/shop/page.tsx`)

식물 씨앗 키트를 구매하는 페이지. 식물 선택 → 옵션 설정 → 주문 정보 입력 3단계 플로우.
결제 연동은 추후 진행. 현재는 주문 정보 입력까지의 UI만 구현.

#### 페이지 레이아웃

```
[NavBar]

[페이지 헤더]
  "씨앗 키트 주문하기"
  서브: "식물을 선택하고, 나만의 룻메이트를 만나요"

[3단계 진행 표시 (Step Indicator)]
  1단계: 식물 선택
  2단계: 옵션 설정
  3단계: 주문 정보

[단계별 컨텐츠 영역]
  현재 단계에 따라 컨텐츠 교체

[Footer]
```

#### 컴포넌트 구조

```
app/shop/
  page.tsx                  # 3단계 상태 관리, 단계별 컴포넌트 렌더링

components/shop/
  StepIndicator.tsx         # 상단 단계 표시 (1→2→3)
  Step1PlantSelect.tsx      # 식물 선택
  Step2Options.tsx          # 수량 + 선물 옵션
  Step3OrderForm.tsx        # 주문자 정보 입력
  OrderSummary.tsx          # 우측 고정 주문 요약 카드
```

#### Step 1 — 식물 선택

```
레이아웃: 3열 카드 그리드

식물 카드 3개 (바질 / 방울토마토 / 튤립):
  선택 전:
    배경: #FFFFFF
    테두리: 1.5px solid #303a1e
    radius: 32px
    padding: p-8

  선택 후:
    배경: linear-gradient(to bottom, #f3f4f1, #b5ff22)
    테두리: 2px solid #286905
    우상단 체크 뱃지: 원형 24px, 배경 #286905, 흰색 체크

카드 내부 구성:
  캐릭터 이모지 or 이미지: 80px
  식물명: font-ahn-bold 24px #191c1b
  태그라인: 16px #286905
  성격: 뱃지 형태 (배경 #f3f4f1, 테두리, radius 9999px, 13px)
  구분선
  관리 난이도: ⭐ Easy / Medium
  수확기간: ⏱️ n주 / n개월
  한 줄 소개: 14px #286905, 3줄 clamp

하단:
  [이 식물로 시작하기] 버튼 → 선택 시 활성화, 다음 단계 이동
```

#### Step 2 — 옵션 설정

```
레이아웃: 좌측 옵션 설정 (2/3) + 우측 주문 요약 카드 (1/3, 고정)

── 수량 선택 ──
라벨: "수량"
컨트롤: [ - ] [ 1 ] [ + ]
  버튼: 36px 원형, 테두리 1.5px #303a1e
  숫자: font-ahn-bold 20px
  최소 1, 최대 10

── 선물 옵션 ──
라벨: "선물로 보내기"
토글 스위치:
  OFF: 배경 #f3f4f1, 테두리 #303a1e
  ON:  배경 #286905

선물 ON 시 메시지 카드 입력 노출:
  라벨: "메시지 카드 (선택)"
  텍스트에리어:
    placeholder: "받는 분께 전할 말을 적어주세요. (최대 100자)"
    테두리: 1.5px solid #303a1e
    radius: 16px
    padding: p-4
    max-length: 100
    우하단 글자수 카운터: "0/100"

  받는 분 이름:
    라벨: "받는 분 이름"
    입력 필드 (선택 입력)
    placeholder: "이름을 적으면 메시지 카드에 함께 인쇄돼요"

── 배송 안내 ──
카드 형태 (배경 #f3f4f1, radius 16px, p-4):
  📦 구성품: 씨앗 봉투 · 화분 · 앱 연동 코드
  🚚 배송: 주문 후 3~5 영업일 이내 출고
  💳 결제: 다음 단계에서 진행

[다음 단계 →] 버튼 (하단)
```

#### Step 3 — 주문 정보 입력

```
레이아웃: 좌측 폼 (2/3) + 우측 주문 요약 카드 (1/3, 고정)

── 주문자 정보 ──
이름 (필수)
연락처 (필수): 010-0000-0000 형식 자동 하이픈
이메일 (필수): 앱 연동 코드 발송용
  서브텍스트: "앱 연동 코드가 이 이메일로 발송돼요"

── 배송지 정보 ──
받는 분 이름 (필수): 선물 시 자동 채워짐
받는 분 연락처 (필수)
주소 (필수):
  [주소 검색] 버튼 → 카카오 주소 API (추후 연동, 지금은 텍스트 입력)
  상세 주소 입력 필드

── 동의 항목 ──
체크박스 형태:
  [ ] (필수) 개인정보 수집 및 이용 동의
  [ ] (필수) 구매 조건 확인 및 결제 진행 동의
  [ ] (선택) 마케팅 정보 수신 동의

[주문하기] CTA 버튼:
  배경: linear-gradient(to bottom, #f3f4f1, #b5ff22)
  테두리: 1.5px solid #303a1e
  radius: 9999px
  크기: w-full py-5 text-[18px] font-ahn-bold
  필수 항목 미입력 시 비활성 (opacity-40)
  클릭 시: "준비 중입니다" 토스트 메시지 (결제 연동 전)
```

#### OrderSummary 카드 (Step 2, 3에서 우측 고정)

```
위치: sticky top-[100px]
배경: #FFFFFF
테두리: 1.5px solid #303a1e
radius: 32px
padding: p-8

구성:
  "주문 요약" 제목 (font-ahn-bold 20px)
  구분선

  선택한 식물:
    캐릭터 이모지 + 식물명 + 태그라인

  수량: n개

  선물 여부: 선물 / 직접 사용

  구분선

  가격 영역:
    키트 가격: n,000원 × n개
    배송비: 무료 (또는 3,000원)
    합계: n,000원 (font-ahn-bold 24px #286905)

  구성품 안내 (소형):
    📦 씨앗 봉투 · 화분 · 앱 코드 · 관리 카드

  (Step 3에서만) [주문하기] 버튼 반복 표시
```

#### StepIndicator 컴포넌트

```
위치: 페이지 헤더 하단, 컨텐츠 상단
레이아웃: 3개 단계 가로 배치

단계 아이템:
  완료: 원형 배경 #286905, 흰색 체크 아이콘, 텍스트 #286905
  현재: 원형 배경 linear-gradient #f3f4f1→#b5ff22, 테두리 #303a1e, 텍스트 #191c1b
  미완료: 원형 배경 #f3f4f1, 테두리 #303a1e, 텍스트 #ADADAD

연결선: 단계 사이 가로 선, 완료 구간은 #286905, 미완료는 #E0E0E0
```

#### 상태 관리 (`app/shop/page.tsx`)

```typescript
interface OrderState {
  step: 1 | 2 | 3
  plant: 'basil' | 'tomato' | 'tulip' | null
  quantity: number
  isGift: boolean
  giftMessage: string
  giftRecipientName: string
  orderer: {
    name: string
    phone: string
    email: string
  }
  delivery: {
    name: string
    phone: string
    address: string
    addressDetail: string
  }
  agreements: {
    privacy: boolean
    purchase: boolean
    marketing: boolean
  }
}

const initialOrderState: OrderState = {
  step: 1,
  plant: null,
  quantity: 1,
  isGift: false,
  giftMessage: '',
  giftRecipientName: '',
  orderer: { name: '', phone: '', email: '' },
  delivery: { name: '', phone: '', address: '', addressDetail: '' },
  agreements: { privacy: false, purchase: false, marketing: false },
}
```

#### 가격 정책 (임시)

```typescript
// constants/pricing.ts
export const PRICING = {
  kitPrice: 10,000,      // 키트 단가 (원)
  shippingFee: 2,000,       // 배송비 (무료)
}
```

#### 폼 유효성 검사 규칙

```
Step 1: plant !== null
Step 2: quantity >= 1 (선물 시 giftRecipientName 선택 사항)
Step 3:
  orderer.name: 1자 이상
  orderer.phone: 010-XXXX-XXXX 형식
  orderer.email: 이메일 형식 (@, . 포함)
  delivery.name: 1자 이상
  delivery.phone: 전화번호 형식
  delivery.address: 1자 이상
  agreements.privacy: true (필수)
  agreements.purchase: true (필수)
```

#### 주문 완료 처리

[주문하기] 클릭 시 `/shop/complete` 페이지로 이동.
결제 연동 전까지는 폼 데이터를 로컬에서만 처리하고 완료 페이지로 라우팅.
추후 결제 연동 시 API 호출 후 성공 응답을 받으면 완료 페이지로 이동하는 구조로 교체.

### `/shop/complete` — 주문 완료 (`app/shop/complete/page.tsx`)

주문하기 버튼 클릭 후 이동하는 완료 페이지.

#### 페이지 레이아웃

```
[NavBar]

[완료 컨텐츠 영역]
  중앙 정렬, min-h-screen, flex items-center justify-center

[Footer]
```

#### 완료 컨텐츠

```
레이아웃: 중앙 정렬, max-width 560px

식물 이모지 (선택한 식물 기준):
  크기: 80px
  애니메이션: 페이지 로드 시 위아래로 살짝 bounce (Framer Motion)

제목:
  "주문 신청이 완료됐어요." (font-ahn-bold 36px #191c1b)

안내 텍스트:
  "입력하신 이메일로 앱 연동 코드와 함께 안내드릴게요."
  (18px #286905, mt-4)

구분선 (mt-8 mb-8)

배송 안내 카드:
  배경: #f3f4f1
  테두리: 1.5px solid #303a1e
  radius: 24px
  padding: p-6
  내용:
    🚚 배송은 주문 후 3~5 영업일 이내에 출발해요.
    📱 앱 연동 코드는 이메일로 별도 발송돼요.
    📦 구성품: 씨앗 봉투 · 화분 · 앱 연동 코드
  각 항목: flex gap-3, 아이콘 + 텍스트 (16px #303a1e)

버튼 영역 (mt-10, flex gap-4):
  [홈으로 돌아가기]:
    배경: linear-gradient(to bottom, #f3f4f1, #b5ff22)
    테두리: 1.5px solid #303a1e
    radius: 9999px
    padding: px-8 py-4
    font-ahn-bold 16px
    → href="/"

  [앱 다운받기]:
    배경: #286905
    텍스트: #FFFFFF
    radius: 9999px
    padding: px-8 py-4
    font-ahn-bold 16px
    → href="#" (추후 앱스토어 URL로 교체)
```

#### 진입 애니메이션 (Framer Motion)

```typescript
// 컨텐츠 전체 fadeInUp
{ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: 'easeOut' } }

// 이모지 bounce (무한 반복)
{
  animate: { y: [0, -10, 0] },
  transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
}
```

#### 선택한 식물 이모지 표시

완료 페이지에서 선택한 식물 이모지를 보여주려면
URL 쿼리 파라미터로 식물 정보를 전달해줘.

```typescript
// Step 3에서 주문하기 클릭 시
router.push(`/shop/complete?plant=${orderState.plant}`)

// complete/page.tsx에서
const searchParams = useSearchParams()
const plant = searchParams.get('plant') // 'basil' | 'tomato' | 'tulip' | null

const plantEmoji = {
  basil: '🌿',
  tomato: '🍅',
  tulip: '🌷',
}[plant ?? 'basil'] ?? '🌱'
```

#### 디렉토리 구조 추가

```
app/shop/
  page.tsx          # 3단계 구매 플로우
  complete/
    page.tsx        # 주문 완료 페이지
```

#### 디자인 주의사항

- 모든 입력 필드: 테두리 1.5px solid #303a1e, radius 12px, padding p-3.5
- 포커스 시: outline none, 테두리 2px solid #286905
- 에러 시: 테두리 1.5px solid #ff6565, 하단 에러 메시지 12px #ff6565
- 모바일: Step 2, 3에서 OrderSummary 카드는 상단으로 이동 (sticky 해제)
- 단계 전환 시 Framer Motion AnimatePresence로 페이드 전환 (opacity 0→1, 0.25s)
- Step 3 배송지: "주문자 정보와 동일" 체크 시 이름/연락처 자동 채워짐 + readOnly
- Step 3 주소 검색 버튼 없음 (텍스트 직접 입력)
- PlantModal selfIntro: 편지 형태 (To. 나의 미래 메이트 헤더 / From. 식물명 푸터, 줄 그어진 노트 배경)

## 디자인 시스템

### 컬러 (`constants/colors.ts`)

```typescript
{
  bg:      '#FFFFFF',
  cardBg:  '#f3f4f1',
  green:   '#286905',
  lime:    '#b5ff22',
  outline: '#303a1e',
  text:    '#191c1b',
  red:     '#ff6565',
}
```

### 폰트

- **기본 body 폰트**: Paperlogy Regular (`public/fonts/Paperlogy-4Regular.ttf`, `@font-face` 등록)
- `.font-ahn-bold` — ahn2006-B (ASS 2006 Bold), fallback: Paperlogy
- `.font-ahn-medium` — ahn2006-M (ASS 2006 Medium), fallback: Paperlogy
- `.font-paperlogy-medium` — Paperlogy Medium (`public/fonts/Paperlogy-5Medium.ttf`, weight 500) — 버튼, 레이블, 뱃지 등에 사용

> `public/fonts/`에 있는 파일: `ahn2006-B.ttf`, `ahn2006-M.ttf`, `Paperlogy-4Regular.ttf`, `Paperlogy-5Medium.ttf`

### 공통 스타일 규칙

- 테두리: `1.5px solid #303a1e`
- 카드 radius: `32px`
- 카드 그라디언트: `linear-gradient(to bottom, #f3f4f1, #b5ff22)`
- 버튼 (취소/보조): `linear-gradient(to bottom, #f3f4f1, #ff6565)`
- 컨테이너: `max-width: 1200px`, `mx-auto`, `px-6`

### 애니메이션 (Framer Motion)

모든 섹션 진입 시 `fadeInUp`:
```typescript
{ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, ease: 'easeOut' } }
```
카드 순차 등장: `delay: i * 0.15` (ProblemSection) / `delay: i * 0.2` (HowItWorksSection)

## 링크 현황

| 버튼/링크 | 현재 | 교체 예정 |
|---------|------|---------|
| 키트 구매하기 | `/shop` | 실제 구매 페이지 |
| 앱 다운받기 | `#` | App Store / Play Store URL |
| 선물하기 → | `/shop` | 실제 구매 페이지 |
| App Store 배지 | `#` | 앱스토어 URL |
| Google Play 배지 | `#` | 플레이스토어 URL |
| Instagram | `#` | 인스타그램 URL |

## 이미지 교체 가이드

- **Hero 목업**: `HeroSection.tsx` — `<Image src="/images/plant-card.png" ...>` 부분을 실제 앱 스크린샷으로 교체
- **캐릭터 이미지**: `PlantsSection.tsx` — `plant.profileSrc` 경로 수정 (현재 `*_profile.png` 사용 중)
- **선물 일러스트**: `GiftSection.tsx` — 우측 카드 div를 `<Image>` 컴포넌트로 교체

## 개발 서버

```bash
npm run dev      # http://localhost:3000
npm run build    # 프로덕션 빌드
```