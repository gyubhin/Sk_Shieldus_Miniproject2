# 1. Project Overview (프로젝트 개요)
- **프로젝트 이름**: Hobby Bub
- **프로젝트 설명**: 취미/스터디 그룹 매칭 플랫폼 프로젝트
- **도메인 영역**: 소셜 네트워킹, 그룹 매칭
- **핵심 비즈니스**: 사용자들이 관심사에 맞는 그룹을 생성, 검색, 가입하고 활동할 수 있는 플랫폼 제공
<br/>
<br/>

# 2. Team Members (팀원 및 팀 소개)

|                                                                       김규빈                                                                       |                                                                 곽병국                                                                 |                                                        남다겸                                                        |
|:-----------------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------:|
| <img src="https://github.com/gyubhin/HW/blob/main/profile/gyu.jpg?raw=true" alt="team_member" width="150"> | <img src="https://github.com/gyubhin/HW/blob/main/profile/guk.jpg?raw=true" alt="team_member" width="150"> | <img src="https://github.com/gyubhin/HW/blob/main/profile/nam.jpg?raw=true" alt="team_member" width="150"> |
|                                                                   PM (팀장, BE)                                                                   |                                                                 BE                                                                  | FE                                                                                                                |
|                                                      [GitHub](https://github.com/gyubhin)                                                       |                                               [GitHub](https://github.com/zmfhshs111)                                               | [GitHub](https://github.com/dagyeomi)                                                                             |

|                                                        백기봉                                                        |                                                                오지윤                                                                |                                                                 윤종윤                                                                 |
|:-----------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------:|
| <img src="https://github.com/gyubhin/HW/blob/main/profile/back.jpg?raw=true" alt="team_member" width="150"> | <img src="https://github.com/gyubhin/HW/blob/main/profile/ji.jpg?raw=true" alt="team_member" width="150"> | <img src="https://github.com/gyubhin/HW/blob/main/profile/jong.png?raw=true" alt="team_member" width="150"> |
| BE                                                                                                                 |                                                              부PM, BE                                                              |                                                                 풀스택                                                                 |
| [GitHub](https://github.com/labomb712)                                                                            |                                              [GitHub](https://github.com/OhJiYun-26)                                              |                                              [GitHub](https://github.com/yunyami0605)                                               |
  



# 3. Key Features (주요 기능)
- **회원 관리**:
  - 회원가입 및 로그인/로그아웃 (JWT 기반 인증)

  - 내 정보 조회 및 수정, 프로필 이미지 업로드/삭제

  - 회원 탈퇴 및 다른 회원 상세 조회

  - 내가 가입한 그룹 목록 조회
- **그룹 관리**:
  - 새로운 그룹 생성 및 그룹 검색/조회

  - 그룹 상세 정보 확인 및 수정

  - 그룹 삭제 및 커버 이미지 업로드/삭제

  - 그룹 가입 신청/탈퇴 및 그룹 멤버 관리 (목록 조회, 강퇴)
- **게시글 관리**:
  - 그룹 내 게시글 작성, 수정, 삭제

  - 게시글 목록 및 상세 조회

  - 게시글 이미지 업로드/삭제
- **댓글 관리**:
  - 게시글에 댓글 작성, 수정, 삭제

  - 게시글별 댓글 목록 조회
- **카테고리 관리**:
  - 카테고리 목록 조회

  - 카테고리별 그룹 탐색
- **이벤트 관리**:
  - 그룹 내 이벤트 생성, 수정, 삭제

  - 이벤트 목록 및 상세 조회

  - 이벤트 참석 신청/취소

  - 이벤트 참석자 목록 및 참석 상태 변경
  <br/>
  <br/>

# 4. Tasks & Responsibilities (작업 및 역할 분담)
|  |                                                                                                                   |                                                                                                                                                               |
|------|-------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 김규빈 (팀장, BE) | <img src="https://github.com/gyubhin/HW/blob/main/profile/gyu.jpg?raw=true" width="100">  | <ul><li>프로젝트 관리 및 문서화 작업</li><li>정모 관련 주요 기능 구현</li><li>그룹 검색 필터링 기능 구현</li><li>오류 수정 및 리팩토링</li></ul>                                                                                |
| 곽병국 (BE) | <img src="https://github.com/gyubhin/HW/blob/main/profile/guk.jpg?raw=true" width="100"> | <ul><li>팀의 백엔드 코드베이스 통합 및 버전 관리 총괄</li><li>그룹의 전체 생명주기(생성, 조회, 멤버 관리)를 아우르는 핵심 기능 설계 및 개발</li><li>사용자 경험 중심의 API 설계</li><li>전역예외처리,코드 품질 및 개발 환경 개선</li></ul> |
| 남다겸 (FE) | <img src="https://github.com/gyubhin/HW/blob/main/profile/nam.jpg?raw=true" width="100"> | <ul><li>로그인/회원가입/개인정보 페이지 개발</li><li>프론트 모달창 및 토스트 UI 구성</li><li>프로필 수정 및 API 연결</li></ul>                                                                    |
| 백기봉 (BE) | <img src="https://github.com/gyubhin/HW/blob/main/profile/back.jpg?raw=true" width="100"> | <ul><li>회원가입 및 인증 API 개발</li><li>데이터베이스 연동 및 소프트 삭제 기능 구현</li><li>그룹장 위임 및 그룹 삭제 기능 구현</li><li>JWT 비밀 키 수정 및 게시글 그룹 조회 구현</li></ul>                           |
| 오지윤 (BE) | <img src="https://github.com/gyubhin/HW/blob/main/profile/ji.jpg?raw=true" width="100">   | <ul><li>사용자, 그룹, 게시글 이미지 업로드/삭제 기능 개발</li><li>프론트 API 연결 및 기능 개발</li><li>공통 응답 구조 변경</li></ul>                                                                |
| 윤종윤 (풀스택) | <img src="https://github.com/gyubhin/HW/blob/main/profile/jong.png?raw=true" width="100"> | <ul><li>프론트 로그인/회원가입 페이지 구현</li><li>정모 및 참석자 관련 오류 수정 및 리팩토링</li><li>공통 응답 및 API 기능 개선</li><li>프론트 페이지 이벤트 및 mock API 개발</li></ul>                            |


<br/>
<br/>

# 5. Technology Stack (기술 스택)
## 5.1 Frotend
- react  
- typescript  
- zustand
- react-query
- axios
- scss module
- react-icons
- react-router-dom
- zod
- msw
- prettier
- vite
- eslint
<br/>

## 5.2 Backend
- maven
- Java 17 & Spring Boot
- Spring Web (MVC)
- Spring Data JPA
- Validation
- Lombok
- DevTools

- Database
    - MariaDB Driver
- 서버 모니터링 및 운영
    - Actuator
    - Spring Boot Admin Client
- 테스트 도구
    - postman
<br/>

## 5.3 Cooperation
- GitHub
- Notion
- Discord
<br/>

# 6. Project Structure (프로젝트 구조)  

## BackEnd  

csu-backend/  
├── .mvn/  
│   └── wrapper/  
│       └── maven-wrapper.properties  
├── src/  
│   ├── main/  
│   │   ├── java/  
│   │   │   └── com/csu/csu_backend/  
│   │   │       ├── CsuBackendApplication.java  # Spring Boot 메인 애플리케이션 파일  
│   │   │       ├── config/                     # Spring Security, CORS, Swagger 등 설정 파일  
│   │   │       ├── controller/                 # API 엔드포인트를 정의하는 컨트롤러  
│   │   │       │   └── dto/                    # 데이터 전송 객체 (DTOs)  
│   │   │       │       └── Response/  
│   │   │       ├── entity/                     # JPA 엔티티 (데이터베이스 테이블과 매핑)  
│   │   │       ├── exception/                  # 사용자 정의 예외 클래스  
│   │   │       ├── handler/                    # 전역 예외 처리 핸들러  
│   │   │       ├── repository/                 # Spring Data JPA 리포지토리 인터페이스  
│   │   │       ├── runner/                     # 애플리케이션 시작 시 데이터 초기화  
│   │   │       ├── security/                   # JWT 기반 인증 및 보안 관련 클래스  
│   │   │       └── service/                    # 비즈니스 로직을 처리하는 서비스  
│   │   └── resources/  
│   │       └── application.properties          # 애플리케이션 설정 파일  
│   └── test/  
│       └── java/  
│           └── com/csu/csu_backend/  
│               └── CsuBackendApplicationTests.java  
├── .gitattributes  
├── .gitignore  
├── mvnw  
├── mvnw.cmd  
├── pom.xml  
└── README.md  



## FrontEnd  
.  
├── App.tsx  
├── features : 도메인 기능 폴더  
│   ├── auth  
│   │   ├── _apis : api 호출 함수  
│   │   ├── _components : 컴포넌트  
│   │   ├── _constants : 상수  
│   │   ├── _hooks : react-query hook, custom 훅  
│   │   ├── _mocks : mock api 함수  
│   │   ├── _schemas : valid 검증 스키마  
│   │   ├── _stores : 클라이언트 전역 state 저장소  
│   │   ├── _types : 타입  
│   │   └── index.ts  
│   ├── category  
│   ├── comment  
│   ├── event  
│   ├── group  
│   ├── image  
│   ├── notice  
│   ├── post  
│   └── users  
├── libs : 유틸 함수  
├── main.tsx : 진입점  
├── mocks : mock api 설정  
├── pages : 페이지 폴더  
├── router : 라우팅  
├── shared  
│   ├── components : 공통 컴포넌트  
│   ├── constants : 공통 상수, queryKey  
│   ├── hooks : 공통 훅  
│   ├── setup : 공통 setup  
│   ├── stores : 클라이언트 zustand 저장소  
│   ├── styles : 공통 스타일 코드  
│   └── types : 공통 타입  
└── vite-env.d.ts  


# 7. Development Workflow (개발 워크플로우)
## 브랜치 전략 (Branch Strategy)
우리의 브랜치 전략은 Git Flow를 기반으로 하며, 다음과 같은 브랜치를 사용합니다.

- back/main, front/main Branch
    - 배포 가능한 상태의 코드를 유지합니다.
    - 모든 배포는 이 브랜치에서 이루어집니다.

- back/develop Branch
  - 새로운 기능(feature) 브랜치를 병합하는 통합 브랜치입니다.

  - 개발 단계에서 최신 기능과 변경 사항을 모아 테스트 및 통합 작업을 진행합니다.

  - 안정화가 완료되면 back/main 브랜치로 병합됩니다.
- feature/{name} Branch
    - 팀원 각자의 개발 브랜치입니다.
    - 모든 기능 개발은 이 브랜치에서 이루어집니다.

<br/>
<br/>

# 8. Git Convention 규칙

## 8.1 커밋 타입

| 타입       | 설명                                         |
| :--------- | :------------------------------------------- |
| `feat`     | 새로운 기능 구현                             |
| `fix`      | 버그 또는 오류 수정                          |
| `refactor` | 코드 리팩토링 (ex. 중복 코드 분리, 로직 개선) |
| `design`   | CSS 등 UI 디자인 변경                        |
| `comment`  | 필요한 주석 추가 및 변경                     |
| `style`    | 코드 포맷팅, 세미콜론 누락 등 기능 없는 변경 |
| `docs`     | README, WIKI 등 문서 개정                    |
| `test`     | 테스트 코드 추가, 수정, 삭제                 |
| `chore`    | 기타 변경 사항 (빌드, 패키지 매니저 등)        |
| `init`     | 초기 생성                                    |
| `rename`   | 파일/폴더 이름 수정 및 이동                   |
| `remove`   | 파일 삭제                                    |
| `!HOTFIX`  | 치명적 버그 긴급 수정                        |

## 8.2 작성 규칙

* 개조식 구문 사용: 간결하고 핵심적인 서술
* 변경 목적 명확히 기술
* Java Code Convention 준수

## 8.3 커밋 예시

```bash
feat: 회원 가입 API 구현
- 이메일/비밀번호 검증 로직 추가
- JWT 토큰 발급 기능 구현
```

<br/>
<br/>

# 9. Java Naming 규칙

## 9.1 패키지
- 소문자 사용
- 예: `controller`, `entity`, `service`, `repository`

## 9.2 클래스 / 인터페이스
- **클래스**: 대문자 카멜 케이스, 명사 사용
- **인터페이스**: 대문자 카멜 케이스, 명사 또는 형용사 사용
- **테스트 클래스**: 이름 끝에 `Test`

## 9.3 메서드
- 소문자 카멜 케이스 사용
- 동사 또는 전치사로 시작
```java
public String toString()
public String readBook()
```
## 9.4 상수  
- 대문자 + 언더스코어 사용
```java
public final String DEFAULT_SCORE = "1500";
```

## 9.5 변수  
- 소문자 카멜 케이스
- 한 글자 이름 금지 (임시 변수 제외)
```java
int userCount; // O
int a; // X
```
<br/>
<br/>

# 10. Java Declaration 규칙

## 10.1 Import  
- static import 제외하고 와일드카드(*) 금지

## 10.2 Modifier 순서
```java
public protected private abstract static final transient volatile synchronized native strictfp
```
## 10.3 Array
```java
int[] arr;
```

## 10.4 Long 타입
```java
long orderId = 100L;
```
<br/>
<br/>

# 11. Indentation  
- 탭 크기: 4 스페이스
  <br/>
  <br/>
# 12. Line Wrapping  
- 줄 너비 초과 시 줄바꿈
- 최대 줄 너비: 120자
- 줄 바꿈 후 1단계 이상 들여쓰기
  <br/>
  <br/>
# 13. Blank Lines/Import 순서  
import 선언 순서:
1. static imports
2. java.*
3. javax.*
4. org.*
5. net.*
6. com.* (8~10 제외)
7. 기타 패키지 
8. com.nhncorp.*
9. com.navercorp.*
10. com.naver.*
<br/>
<br/>  

# 14. Clean Code 규칙  
- 메서드 한 가지 기능 수행 
- 메서드 길이 15라인 초과 금지 
- 메서드 이름 의도 명확히 표현 (길어도 OK)
- static 메서드: 외부 호출 필요 없으면 private
<br/>
<br/>  

# 15. 프론트 네이밍 규칙  
- 변수, 상수, 함수, 훅: 카멜케이스 (camelCase)
- 컴포넌트, 타입: 파스칼케이스 (PascalCase)
