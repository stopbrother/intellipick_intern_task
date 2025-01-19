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
