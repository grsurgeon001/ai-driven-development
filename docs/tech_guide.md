의료 컨퍼런스 환자 등록 시스템 Technical Guide

🧱 1. 기술 스택 및 구조 개요

Framework: Next.js (App Router)

UI 라이브러리: ShadCN (Tailwind 기반)

스타일링: TailwindCSS

데이터베이스: SQLite (Drizzle ORM 사용)

스토리지 방식: 서버 파일시스템에 저장, DB에는 파일 경로만 저장

인증 방식: 사번/비밀번호 기반 인증

🔧 2. 디렉토리 구조

your-nextjs-project/
├── app/
│ ├── api/ # API 라우터 핸들러
│ ├── login/ # 로그인 페이지
│ ├── dashboard/ # 대시보드
│ ├── register/ # 환자 등록
│ └── profile/ # 사용자 프로필
├── components/
│ ├── ui/ # ShadCN UI 컴포넌트
│ ├── layout/ # 공통 레이아웃 컴포넌트
├── db/
│ ├── schema.ts # Drizzle ORM 스키마
│ └── index.ts # DB 연결
├── public/uploads/ # 파일 저장 경로
├── types/ # 공통 타입 정의
├── utils/ # 유틸리티 함수
│ └── upload.ts # 파일 업로드 유틸리티
├── drizzle.config.ts
├── next.config.js
├── middleware.ts
└── README.md

🔐 3. 인증 로직 (로그인)

사용자는 사번(6자리 숫자) 또는 이메일 + 비밀번호로 로그인

초기 비밀번호는 사전 등록되며, 첫 로그인 시 변경 가능

인증된 사용자만 접근 가능한 보호 라우트 적용

Server Action 또는 API 라우트에서 인증 체크

📁 4. 파일 및 이미지 업로드 처리

이미지 파일(JPG, PNG), 문서 파일(PDF, DOCX) 지원

업로드 경로: /public/uploads/

저장 방식: 파일은 서버 파일시스템, 경로는 DB에 저장

클립보드 기반 이미지 붙여넣기 처리:

클라이언트에서 ClipboardEvent → Blob 변환 → FormData 전송

🧩 5. API 명세 (예시)

POST /api/patient/fast

요청: { name: string, patientId: string }

응답: { success: boolean, patientId: string }

설명: 간이 환자 등록용 API, 기본 정보만 입력

GET /api/patient/search

요청 파라미터: ?keyword=string&isNew=true|false&status=done|discussing

응답: [{ id, name, patientId, conferenceType, isDiscussing, isDone }]

설명: 등록 환자 조건 검색 API, 필터 및 키워드 검색

POST /api/login

요청: { userId: string, password: string }

응답: { success: boolean, token?: string }

POST /api/patient

요청: { name, patientId, conferenceType, reasons[], filePaths[] }

응답: { success: boolean }

GET /api/patient?user=xxx&month=yyyy-mm

요청 파라미터 기반 필터

응답: [{ id, name, conferenceType, status, files: [path] }]

💾 6. 데이터베이스 스키마 (DrizzleORM)

table: users {
id: string;
name: string;
email: string;
employeeId: string;
passwordHash: string;
isAdmin: boolean;
}

table: patients {
id: string;
name: string;
patientId: string;
userId: string;
conferenceType: string;
reasons: string[];
isDiscussing: boolean;
isDone: boolean;
createdAt: datetime;
}

table: files {
id: string;
patientId: string;
filePath: string;
uploadedAt: datetime;
}

📌 7. 주요 고려 사항 및 권장 사항

모든 API는 인증된 사용자만 접근 허용

파일 업로드는 유효성 체크 및 예외 처리 필요

논의 상태 전환은 변경 이력 저장 고려

SQLite는 단일 파일 기반이므로 동시성 문제에 주의

🧭 7-1. 신규 반영 기능

Fast Register UI: 이름과 Patient ID만으로 빠르게 등록

환자 조회 UI: 필터 및 검색 조건 입력 폼, 신규등록 전용 필터 포함

클라이언트에서는 react-hook-form, useSearchParams 기반 조건 검색 구현

🔄 8. 향후 확장 사항

Electron 연동: 캡처 + OCR 등록 기능 (Drag Capture)

Supabase로 DB 마이그레이션 시 멀티 유저 지원 고려

이미지 분석 기반 필드 자동 추출 기능

📘 문서 버전: v1.0.0작성일: 2025-05-22
