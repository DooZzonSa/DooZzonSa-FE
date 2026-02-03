<h1 align="center">약간(YAKKAN) - 개인정보 약관 분석 서비스</h1>

<p align="center">
  <img width="2310" height="1484" alt="아스키톤-약간(YAKKAN) pptx" src="https://github.com/user-attachments/assets/520a36d0-5205-4873-bea4-c1e94db945ef" />
</p>

<p align="center">
  <b>약관이 ‘약간’ 이상할 때,<br/>
  위험한 지점만 콕 집어주는 개인정보 약관 분석 서비스</b>
</p>

<br/>

## 수상

🏆 **2026년도 제1회 대학 연합 해커톤 ASCII-THON**  장려상 — 우수 프로젝트 선정

## 📌 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | 약간(YAKKAN) - 개인정보 약관 분석 서비스 |
| **서비스 주제** | 비교 기반 개인정보 약관 위험도 분석 및 시각화 |
| **팀 구성** | Frontend 2명 · Backend 2명 |
| **개발 기간** | 2025.01.30 ~ 1.31 (아스키톤) |

## 📌 FE 팀원 소개



|<img src="https://avatars.githubusercontent.com/u/87813995?v=4" width="125" />|<img src="https://avatars.githubusercontent.com/u/127104536?v=4" width="125" />|
|:---------:|:---------:|
|[강명묵](https://github.com/ThinkMuk)|[김예린](https://github.com/yerroong)|
|Frontend|Frontend|


<br/>

## 💡 프로젝트 소개

### "우리는 약관을 읽고 있을까?"

대부분의 사람들은 약관을 읽지 않습니다. 읽지 않는 이유는 "귀찮아서"가 아니라 **이해하기 어렵기 때문**입니다.

특히 디지털 취약계층에게 약관은 정보 제공 문서가 아니라 사실상 **통과 의례**입니다. 그 결과:
- 과도한 개인정보 수집
- 활용 목적을 모른 채 동의
- 문제 발생 후에야 위험을 인지

**약간(YAKKAN)** 은 약관을 전부 읽게 하지 않습니다. 대신 묻습니다:

> "이 약관은 다른 서비스와 비교했을 때 어떤가?"

평균보다 많이 수집하는지, 흔하지 않은 정보를 요구하는지 **위험 신호만 빠르게 보여주고**, 판단은 사용자에게 맡깁니다.

<br/>

## 🎯 핵심 가치

### 기존 해결 방식의 한계
기존 서비스들은 약관을 요약하거나 쉬운 말로 풀어주는 데 집중합니다. 하지만 요약을 읽어도 여전히 남는 질문은:

> "이게 다른 서비스보다 위험한 건가?"

**비교 기준이 없으면, 사용자는 여전히 판단할 수 없습니다.**

### 약간의 접근 방식
- 약관을 '해석'하지 않고 **'비교'**한다
- 판단은 사용자가 하도록 설계
- 읽지 않아도, 속지 않게

<br/>

## ✨ 주요 기능

### 1️⃣ 약관 분석 (Core)

<img width="1920" height="1080" alt="아스키톤-약간(YAKKAN) pptx (1)" src="https://github.com/user-attachments/assets/7576b8af-a08b-4de8-af2a-aa3f5049b70d" />
<img width="1920" height="1080" alt="아스키톤-약간(YAKKAN) pptx (2)" src="https://github.com/user-attachments/assets/563cdb36-a10b-413c-b880-f2d7937f67f3" />
<img width="1920" height="1080" alt="아스키톤-약간(YAKKAN) pptx (3)" src="https://github.com/user-attachments/assets/d44e6c41-2b37-494d-bad1-fdd1e8bb15aa" />

<br/>

### 2️⃣ 악용 이슈 대시보드

<img width="1920" height="1080" alt="아스키톤-약간(YAKKAN) pptx (4)" src="https://github.com/user-attachments/assets/769d2614-2340-4c02-abd0-e34e7a0a7c5e" />
<img width="1920" height="1080" alt="아스키톤-약간(YAKKAN) pptx (5)" src="https://github.com/user-attachments/assets/54998ac3-d83d-4809-8b67-4c038013eec8" />

<br/>

### 3️⃣ 수집 통계 - 기준선 제공

<img width="1920" height="1080" alt="아스키톤-약간(YAKKAN) pptx (6)" src="https://github.com/user-attachments/assets/e2667932-f122-4512-802d-b2c504159c9d" />

<br/>

## 🛠️ 기술 스택

### Frontend
- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" width="18" /> **Framework:** Next.js
- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="18" /> **Language:** TypeScript
- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" width="18" /> **Styling:** Tailwind CSS
- 🧩 **Icons:** lucide-react
- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/eslint/eslint-original.svg" width="18" /> **Code Quality:** ESLint

### Architecture
- Client-side Rendering (CSR)
- RESTful API 연동
- 환경변수 기반 설정 관리

<br/>

## 📁 프로젝트 구조

```
DooZzonSa-FE/
├── app/
│   ├── (main)/              # 메인 페이지 (약관 분석)
│   │   └── page.tsx
│   ├── dashboard/           # 악용 이슈 대시보드
│   │   ├── page.tsx
│   │   └── types.ts
│   ├── visualization/       # 수집 통계 페이지
│   │   ├── page.tsx
│   │   ├── types.ts
│   │   └── constants.ts
│   ├── _components/         # 공통 컴포넌트
│   │   ├── common/
│   │   ├── dashboard/
│   │   └── main/
│   ├── _api/                # API 통신 로직
│   ├── layout.tsx           # 루트 레이아웃
│   └── globals.css          # 전역 스타일
├── public/                  # 정적 파일
├── .env.local              # 환경변수 (git 제외)
└── package.json
```

<br/>

## 🎨 주요 페이지

### 1. 메인 페이지 (`/`)
- 약관 텍스트 입력
- 분석 진행 상태 표시
- 분석 결과 표시

### 2. 대시보드 (`/dashboard`)
- 주간 요약 통계
- 개인정보 유출/약관 악용 이슈 목록
- 필터링 기능 (전체/정보 유출/약관 악용)

### 3. 수집 통계 (`/visualization`)
- 위험도별 개인정보 항목 분류
- 평균 수집률 시각화
- 개인정보 보호 팁

<br/>

## 🎯 기대 효과

약간(YAKKAN)은 사용자를 대신해 판단하지 않습니다. 대신:

- ✅ **비교 기준을 제공**하고
- ✅ **위험 신호를 강조**하고
- ✅ **스스로 결정할 수 있게** 합니다

이는 디지털 취약계층을 위한 **현실적인 보호 장치**입니다.

<br/>
