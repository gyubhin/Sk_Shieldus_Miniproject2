# 📌 취미/스터디 그룹 매칭 플랫폼

## 1. 프로젝트 소개
이 프로젝트는 사용자가 취미/스터디 그룹을 생성·검색·참여하고, 그룹 내에서 게시글·댓글·이벤트를 관리할 수 있는 매칭 플랫폼입니다.  
Spring Boot 기반 REST API 서버로 구현되며, JWT 기반 인증과 권한 관리 기능을 포함합니다.

---

## 2. 🛠️ 기술 스택
- **Backend**: Java 17, Spring Boot, Spring Web (MVC), Spring Data JPA, Spring Security
- **Database**: MariaDB, H2 (테스트)
- **Build Tool**: Maven
- **Authentication**: JWT (Access Token + Refresh Token)
- **API Docs & Test**: Swagger, Postman
- **부가 라이브러리**: Lombok, Validation, DevTools
- **운영 및 모니터링**: Actuator, Spring Boot Admin Client

---

## 3. 📂 주요 기능
- **회원 관리**: 회원가입, 로그인, 내 정보 조회/수정, 회원 탈퇴
- **그룹 관리**: 그룹 생성, 검색, 상세 조회, 수정/삭제, 가입 신청/탈퇴
- **게시판**: 게시글 CRUD, 댓글 CRUD
- **이벤트 관리**: 이벤트 생성/조회/수정/삭제, 참석자 관리 (대기자 → 자동 승격)
- **카테고리 관리**: 그룹 카테고리 분류 제공