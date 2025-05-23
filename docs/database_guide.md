**의료 컨퍼런스 환자 등록 시스템 Database 설계 가이드**

---

### 🧩 1. 개요

이 문서는 의료 컨퍼런스 대상 환자 등록 시스템의 데이터베이스 구조 및 DrizzleORM 기반 스키마 정의를 목적으로 합니다. 주요 기능 요건(PRD), 디자인 흐름, 기술 구현 가이드를 기반으로 효율적이고 무결성 있는 관계형 데이터베이스 모델을 설계합니다.

---

### 🔧 2. 데이터베이스 환경

- **DBMS**: SQLite
- **ORM**: DrizzleORM
- **연동 프레임워크**: Next.js (Edge/Server 지원)
- **파일 저장 정책**: 서버 파일시스템에 저장하고 DB에는 파일 경로만 저장

---

### 🧱 3. 테이블 설계

#### 3.1 `users` (사용자 테이블)

- `id` (PK, UUID)
- `employee_id` (UNIQUE, 6자리 숫자 사번)
- `name` (TEXT)
- `email` (TEXT, 초기 등록용)
- `password_hash` (TEXT)
- `is_admin` (BOOLEAN)
- `created_at` (DATETIME)

#### 3.2 `patients` (환자 테이블)

- `id` (PK, UUID)
- `name` (TEXT)
- `patient_id` (TEXT)
- `user_id` (FK → users.id)
- `conference_type` (TEXT) // ENUM: global, endoscopy, pathologic, radiologic
- `reasons` (TEXT\[]) // Multiselect: interesting case, uncommon case 등
- `is_discussing` (BOOLEAN)
- `is_done` (BOOLEAN)
- `is_fast_registered` (BOOLEAN) // 간이 등록 여부
- `submitted_at` (DATETIME)

#### 3.3 `files` (파일 경로 테이블)

- `id` (PK, UUID)
- `patient_id` (FK → patients.id)
- `file_path` (TEXT)
- `uploaded_at` (DATETIME)

---

### 🔐 4. 무결성 제약 및 관계 정의

- 사용자 삭제 시 해당 환자 데이터 유지 (`ON DELETE SET NULL` 고려)
- 파일은 환자 데이터 삭제 시 함께 삭제 (`ON DELETE CASCADE`)
- `conference_type`, `reasons` 필드 ENUM 또는 문자열 상수 통제 권장
- `patient_id`는 병원 시스템과 연동되므로 중복 가능 (UNIQUE 아님)

---

### 🚀 5. 인덱스 및 최적화 전략

- `users.employee_id`: UNIQUE 인덱스 (로그인 성능 확보)
- `patients.user_id`: 인덱스 (의사별 필터링 성능 확보)
- `files.patient_id`: 인덱스 (환자별 파일 조회 성능)

---

### 📌 6. 확장 고려 사항

- `patients.is_fast_registered`: Fast Register 기능을 위한 추가 필드

- 조회 조건 필터링 기능을 고려한 `created_at`, `conference_type`, `is_done`, `is_discussing` 컬럼 인덱스 추가 고려

- `reasons` 컬럼: 별도 테이블로 분리 시 다양한 다대다 연동 가능

- `conference_history`: 한 환자의 다양한 컨퍼런스 등록 이력 관리 시 테이블 분리

- Supabase 전환 시 ENUM 정의 및 JSON 필드 변환 고려

---

### ✅ 7. 테스트 체크리스트

- [ ] FK 관계 테스트 (users → patients → files)
- [ ] 유저별 환자 필터링 성능 확인
- [ ] 파일 업로드 및 삭제 시 DB와 파일 경로 동기화 테스트
- [ ] 중복 제출 방지 정책 (user_id + patient_id 조합 검사 등)
- [ ] 논의 상태 전환 로직 테스트 (is_discussing → is_done)

---

**📘 문서 버전: v1.0.0**
**작성일: 2025-05-22**
