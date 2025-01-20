# JWT란 ?

JWT(Json Web Token)는 사용자 인증 및 정보 교환을 위한 json 기반의 토큰이다.

### 특징

- 토큰 자체에 사용자 정보를 포함하고 있어 서버가 사용자 정보를 저장할 필요가 없음
- Base64 인코딩된 문자열이며 변조가 불가능함

### JWT 구조

`Header.Payload.Signature`

```
// Header
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// Payload (데이터)
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
// Signature (서명)
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

1. Header
   - 어떤 방식으로 JWT를 암호화할 것인지 정의하는 부분
   - Base64 인코딩 후 JWT의 첫번째 부분이 됨
2. Payload (사용자 정보)
   - 사용자 정보, 만료 시간 등 인증에 필요한 데이터를 포함하는 부분
   - 마찬가지로 Base64 인코딩 됨
3. Signature (서명)

- JWT의 무결성을 보장하기 위한 부분
- Header + Payload를 특정 비밀 키로 해싱해서 생성
- 토큰을 변조해도 서버에서 해싱된 서명을 확인하면 변조 여부를 감지할 수 있음

### 사용하는 이유

1. 세션 기반 인증의 문제점

- 사용자가 로그인하면 서버는 세션을 생성하여 정보를 저장
- 사용자가 요청을 보낼때마다 서버가 세션을 확인
- 사용자가 많아질수록 서버 메모리가 부담됨 -> 확장성 문제 발생

2. JWT

- JWT는 토큰 자체에 사용자 정보가 포함되어 있음
- 서버에 세션을 저장할 필요 없이 인증이 가능 -> 무상태 인증 방식
- 확장성이 뛰어나서 분산 시스템(모바일, API서버 등)에 적합함
  즉, 세션 기반 인증은 서버에서 관리하는 방식이고
  JWT인증은 토큰을 가지고 다니면서 인증하는 방식이다.

### JWT 인증 처리 과정

1. 사용자가 로그인 정보를 입력 -> 로그인 요청을 보냄
2. 서버에서 로그인 정보를 확인 -> JWT 생성 -> 클라이언트에 반환
3. API 요청 -> JWT를 `Authorization` 헤더에 포함하여 보냄
4. 서버는 클라이언트가 보낸 JWT의 서명을 검증 -> 유효한 토큰인지 확인
5. 검증 통과 -> 요청 정상 처리 -> 데이터 반환

### 장점 / 단점

**장점**

- 서버가 세션을 저장할 필요 없음 (무상태 인증)
- 확장성이 뛰어나 분산 시스템에서 사용하기 적합
- API 인증 최적화
  **단점**
- 토큰이 탈취되면 보안 위험이 큼 -> HttpOnly 쿠키 사용 권장
- 세션 기반 인증과 달리 서버에서 특정 유저의 모든 토큰을 무효화하기 어려움
- 토큰이 길기 때문에 헤더에 포함하면 네트워크 오버헤드 증가

**JWT에 대해 정리하자면**

- 서버가 인증 정보를 저장하지 않고 클라이언트가 토큰을 가지고 다니면서 인증하는 방식
- `Header.Payload.Signature`구조로 변조 방지를 위한 서명이 포함
- 서버가 세션을 저장할 필요가 없고 확장성이 뛰어나 API인증에 최적화
- 보안상 위험이 있으므로 HttpOnly 쿠키를 사용이 권장됨

# Access Token & Refresh Token

### Access Token

- JWT 기반의 인증 토큰으로 사용자가 API 요청을 보낼때 사용됨
- API 요청시 `Authorization`헤더에 포함하여 전송
- 일반적으로 짧은 유효기간을 가짐 (15~60분)

### Refresh Token

- Access Token이 만료되었을때 새로운 Access Token을 발급하는 역할
- Access Token과 다르게 긴 유효기간을 가짐 (7~30일 이상)
- 보안 이슈로 `HttpOnly Cookie`에 저장하여 브라우저에서 접근하지 못하게 함

### Access Token을 짧게 유지하는 이유

- 보안 강화를 위해 수명을 짧게 설정하면 토큰이 유출되더라도 피해를 최소화할 수 있음

### Refresh Token 사용 이유

- `Access Token`이 만료되면 다시 로그인 해야하지만 `Refresh Token`을 사용하여 자동 로그아웃 없이 인증 갱신 가능
- 즉 로그아웃되지 않고 지속적으로 서비스를 이용할 수 있도록 해줌

### 인증 흐름

1. 사용자가 로그인 요청을 보냄
2. 서버에서 Access Token과 Refresh Token을 발급하여 반환
3. Access Token은 API 요청시 `Authorization` 헤더에 포함
4. Access Token이 만료되면 Refresh Token을 이용해 새로운 Access Token 발급
5. Refresh Token도 만료되면 다시 로그인 요청

### 차이점

**역할**

- Access Token: API 요청시 사용자 인증
- Refresh Token: Access Token이 만료되면 새로운 Access Token 바륵ㅂ
  **유효기간**
- Access Tokne: 짧음 (15~60분)
- Refresh Tokne: 김 (7~30일 이상)
  **저장 위치**
- Access Token: HttpOnly Cookie 또는 LocalStorage
- Refresh Token: HttpOnly Cooike
  **저장**
- Access Token: 프론트엔드
- Refresh Token: 서버

### 프론트엔드에서 JWT 관리

1. 로그인 후 토큰 저장

- Access Token -> HttpOnly Cookie 또는 LocalStorage 저장
- Refresh Token -> HttpOnly Cooike로 저장하여 브라우저에서 접근 불가

2. API 요청시 Access Token 포함
   `WithCredentials: true`
3. 만료시 Refresh Token으로 재발급
   `Bearer ${token}`

### JWT 보안 전략

- Access Token은 LocalStorage 대신 메모리 또는 HttpOnly Cookie에 저장하는것이 안전함
- Refresh Token은 반드시 HttpOnly Cooikie에 저장해야함

# 유닛 테스트 기술분석

## 유닛 테스트 (Unit Test)

- 유닛 테스트는 애플리케이션의 개별적인 단위(함수, 메서드, 모듈, 컴포넌트 등)를 테스트 하는 과정
- 단일 함수, 유틸리티 함수, 컴포넌트, 상태 관리 로직 등을 테스트 대상으로 삼을 수 있음

## 필요한 이유

1. 코드 품질 향상

- 코드가 의도한 대로 동작하는지 자동으로 검증 가능
- 특정 기능이 변경될 때 기존 기능이 깨지지 않는지 확인 가능

2. 빠른 오류 발견 및 디버깅

- 기능 추가시 기존 기능이 정상 작동하는지 확인 가능
- 작은 단위에서 버그를 찾아내므로 디버깅이 쉬움

3. 리팩토링과 유지보수 용이

- 안전하게 코드 리팩토링 가능
- 대규모 프로젝트에서도 안정성을 유지하며 개발 가능

4. 자동화된 테스트로 효율적인 개발 가능

- 수동 테스트 없이 코드 실행만으로 동작 여부 확인 가능
- CI/CD 환경에서 자동화된 테스트 수행 가능

## 유닛 테스트 라이브러리

1. Jest

- javascript/typescript 프로젝트에서 가장 많이 사용
- Meta(전 facebook)에서 만든 테스팅 프레임 워크
- expect를 사용한 다양한 매칭 함수 제공
- Mocking 기능이 내장되어 있어 API 요청 테스트에도 용이
- React, Vue, Node.js 등 다양한 환경에서 사용 가능

```
test("Hello Jest!", () => {
  expect(1 + 2).toBe(3);
});
```

2. React Testing Library

- React 컴포넌트를 사용자 관점에서 테스트하도록 설계됨
- DOM 요소를 직접 조작하지 않고 실제 사용자처럼 시뮬레이션하는 방식
- Jest와 함께 사용하여 컴포넌트 UI 테스트를 수행

```
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

test("버튼 클릭 시 텍스트 변경", () => {
  render(<Button />);
  const button = screen.getByRole("button");

  fireEvent.click(button);
  expect(button).toHaveTextContent("Clicked!");
});
```

3. Vitest

- Jest와 비슷하지만 Vite 프로젝트에 최적화된 테스트 라이브러리
- Jest보다 테스트 실행 속도가 빠름

```
import { test, expect } from "vitest";
import { sum } from "./sum";

test("sum 함수 테스트", () => {
  expect(sum(2, 3)).toBe(5);
});
```

4. Cypress

- 유닛 테스트뿐만 아니라 E2E(End-to-End) 테스트까지 지원
- UI를 실제로 렌더링하고 이벤트를 트리거하여 테스트

```
describe("버튼 클릭 테스트", () => {
  it("버튼을 클릭하면 텍스트가 변경된다", () => {
    cy.visit("/"); // 페이지 접속
    cy.get("button").click();
    cy.contains("Clicked!");
  });
});
```

## 유닛 테스트 작성

1. 테스트 대상은 단일 기능에 집중

- 하나의 테스트는 하나의 기능만 검증
- 많은 기능을 한번에 테스트하면 유지보수가 어려움

2. Given-When-Then 패턴 사용

```
test("유저가 버튼을 클릭하면, 텍스트가 'Clicked!'로 변경된다.", () => {
  // Given: 초기 상태
  render(<Button />);
  const button = screen.getByRole("button");

  // When: 특정 동작 수행
  fireEvent.click(button);

  // Then: 기대하는 결과 확인
  expect(button).toHaveTextContent("Clicked!");
});
```

3. 가짜(Mock)데이터 & Mock 함수 사용

- 실제 API를 호출하지 않고 Mock Data를 사용하여 테스트

4. DOM 요소를 직접 조작하지 않고 사용자 관점에서 테스트
   `fireEvent.click(screen.getByRole("button"));`

## describe, it, test 차이점

**describe()** :

- 테스트 그룹을 정의
- 여러 관련 테스트를 그룹화
- 여러개의 it,test를 그룹화하는 용도
  **it()** :
- 특정 기능을 테스트
- 이것은 ~~해야한다
  **test()** :
- 특정 기능을 테스트
- it()과 동일한 기능을 제공

# 프론트엔드에서 에러 모니터링과 로그 수집이 필요한 이유

1. 사용자 경험 개선

- 웹app에서 예상치 못한 오류가 발생하면 사용자 경험이 저하됨
- 예를들어 특정 버튼이 동작하지 않거나 페이지 로그가 되지않는 문제가 생겼을때 신속하게 파악하고 대응할 수 있어야 함

2. 실시간 오류 감지 및 대응

- 프론트엔드에서 발생한 오류는 서버에서 감지되지 않음
- 네트워크 장애, 브라우저 호환성 문제, 특정 환경에서만 발생하는 버그 등 실시간으로 추적할 필요가 있음

3. 배포 후에도 안정적인 운영 유지

- 로컬 및 테스트 환경에서 발견되지 않았던 버그가 실제 운영 환경에서 발생할 수 있음
- 오류 로그를 자동으로 수집하면 배포 이후에도 문제를 지속적으로 모니터링하고 개선할 수 있음

4. 개발 및 유지보수 비용 절감

- 자동화된 모니터링 시스템을 구축하면 빠르게 버그를 수정하여 개발 생산성을 높일 수 있음

## 에러 모니터링 도구

1. Sentry

- 많이 사용되는 프론트엔드 및 백엔드 에러 모니터링 도구
- 에러 발생시 자동으로 로그를 수집하고 대시보드에서 확인 가능
- 배포된 환경에서도 사용자별, 브라우저별, 디바이스별로 오류를 추적할 수 있음
- 실시간 에러 트래킹 및 알림 기능 제공
- 특정 사용자 환경에서 발생한 오류까지 분석 가능
- 배포된 코드에서 Sourcemap을 활용하여 정확한 오류 위치 추적 가능

2. LogRocket

- 사용자의 실제 행동을 기록하여 오류 발생 원인을 분석
- 콘솔 로그, 네트워크 요청, Redux 상태 변화 등을 자동으로 수집
- 오류가 발생한 순간의 UI 상태를 녹화해서 디버깅 (영상처럼 재현 가능)
- Sentry와 함께 사용하면 더 강력한 오류 추적 가능

3. DataDog & New Relic

- 기업 환경에서 많이 사용하는 도구
- 프론트엔드뿐만 아니라 백엔드, 서버 성능까지 모니터링 가능
- API응답 속도, 페이지 로드 시간, 오류 발생률 등을 한눈에 볼 수 있음

## 에러 모니터링과 로그 수집을 위한 설정

1. 중요한 오류는 즉시 알림 설정

- 도구를 활용하여 오류 발생시 슬랙이나 이메일 알림을 받도록 설정

2. 로그를 구조화하여 분석 가능하게 만들기

- 로그 데이터를 json 형태로 저장하여 검색과 분석이 용이하도록 관리

3. 사용자 환경을 함께 기록하기

- 동일한 오류라도 특정 환경에서만 발생할 수 있으므로 에러 로그에 사용자 환경 정보도 포함

4. 크리티컬한 오류는 배포 전에 테스트하기

- 테스트 도구를 활용하여 일반적인 오류는 사전에 차단
