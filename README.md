# [NEXT-TEMPLATE 사용 설명서]

```
동기: 공통적으로 사용되는 함수나 초기 세팅을 매 프로젝트마다 해야하는 번거로움을 줄이기 위하여 프론트 Next template을 만들기로 결정하였습니다.
NEXACODE 프론트엔드 엔지니어라면 누구든 레포지토리 추가 개발이 가능하며, 개발 완료시 main에 push 해주시면 감사하겠습니다.

[기대효과]
1. 프론트엔드 엔지니어 부재 및 개발자 영입시, 인수인계가 효율적으로 진행 가능
2. 프로젝트 시작 시, 시간 단축 가능 (최대 3 - 7일정도 단축 & 잠재적 개발 시간 단축)
3. API RESPONSE 포맷을 미리 정의하여 백엔드와 요청 및 협업 진행 가능
```

---

## 프론트엔드 정의서

### gitlab

- 내부 프로젝트 / frontTemplate으로 프로젝트 추가
- frontTemplate 구조
  - nextTemplate
    - 필요로한 공통 기능 작업 / 스타일 / config / type(interface) / recoil (state)
  - reactTemplate
    - react 또한 next와 같게 존재 합니다.

### git 컨벤션

- git commit
  - 대분류: [feature / fix / hotfix]
    - feature: 페이지 및 컴포넌트 추가 생성 시
    - fix: 이미 존재하는 컴포넌트 수정 및 삭제 시
    - hotfix: 취약점 보완, 버그 수정 시
  - 중분류: - commit 내용 추가
  - 특이사항: commit시, feature와 fix가 동일하게 있을 시, feature를 대분류로 사용합니다. 단, hotfix는 feature보다 큰 분류 입니다. (hotfix > feature > fix)
  - 예시
    ```
    [feature]
    - login 페이지 추가 작업
    - signin 페이지 수정
    ```
- git branch
  - main: template 레포에 가장 상위 브랜치
  - peter/브랜치네임: 해당 개발자(peter)가 템플릿 개발시 사용하는 브랜치
  - bella/브랜치네임: 해당 개발자가(bella) 템플릿 개발시 사용하는 브랜치

### 이미지 파일명

- 대분류: [img / icon / logo]
  - img: 복작한 이미지.png || .jpg -> imgs 폴더
  - icon: 단순한 아이콘으로 되어있는 이미지.svg -> icons 폴더
  - logo: 해당 프로젝트의 logo.png || .svg -> logo 폴더
- 이미지 파일명 예시

  ```
  스네이크 케이스로 파일명 지정 부탁드립니다.
  - img_example.jpg
  - icon_example.svg
  ```

  ### env 정의

  - .env.development
    ```
    개발환경, 즉 로컬로 돌릴 때 사용하는 환경 파일입니다.
    ```
  - .env.production
    ```
    개발 이후, 빌드한 환경 파일 입니다.
    ```
  - /config
    ```
    환경 변수를 분리한 .env 파일을 관리하는 폴더입니다.
    ```

### 스타일

- tailwind.css
  - 컴포넌트의 공통적인 스타일을 적용시켜놓을 css 파일
  - 커스텀 예정입니다.
- 페이지명.module.css
  - 해당 페이지에서만 사용되는 css 파일

### 유틸

- commomUtils.ts
  - view에서 자주 사용할 것 같은 함수들을 모아 빼둔 파일
  ```
  스크롤 맨 위로 올리는 함수, API 요청 전 필수값들 모두 입력 했는지 확인하는 함수, 숫자 3자리씩 "," 함수, 유효성 검사 함수 등등
  ```
- requestUtils.ts
  - API 요청하는 공통 함수 (메소드에 따라 함수 분류) 파일
    ```
    GET, POST, PATCH, DELETE 함수로 분류
    ```
- refreshUtils.ts
  - API 요청 도중 accessToken 만료시, interceptor 하여 refreshToken으로 accessToken 발급 후 다시 함수 요청할 수 있게 도와주는 자동화 함수 파일

### 컴포넌트 작명

- atoms
  - 가장 제일 작은 단위의 시멘틱 태그를 사용한 공통 컴포넌트이며 대문자로 시작합니다.
- molecules
  - atoms의 컴포넌트보단 단위가 크며 페이지 보단 작은 단위의 컴포넌트로, 페이지와 직접적 연관되어 있습니다. 따라서 페이지 내에서 컴포넌트 단위로 동적인 view를 보여줘야한다면 molecules 폴더에 추가하시어 "use client"로 관리 부탁드리며 불러오실 페이지 명을 앞에 붙여주시고 Pascal Case로 작명 부탁드립니다.
  - 예시: abc/page.tsx에서 사용될 컴포넌트 -> molecules/AbcModal.tsx

### 파일 세분화 및 설명

```
├── README.md - 해당 프로젝트 설명 (추가적 업데이트 예정)
├── app - ssr page 관리
│   ├── (auth) - 로그인 이후 PrivateRoute가 필수인 페이지들
│   │   ├── main - 예시
│   │   │   └── page.tsx - /main 페이지
│   │   │   └── main.modult.css - 해당 폴더의 css 파일
│   ├── (sign) - 로그인 이전 페이지들
│   │   ├── sign.module.css - 로그인 이전 페이지 css 파일 (해당 페이지로 안 넣은 이유는 siginin과 signup의 스타일이 같을 것이라고 판단 했기 때문에 부모 파일로 뺌)
│   │   ├── signin - 로그인 페이지
│   │   │   └── page.tsx
│   │   └── signup - 회원가입 페이지
│   │       └── page.tsx
│   ├── error - 500 Erorr시 해당 페이지로 리다이렉트 예정
│   │   └── page.tsx
│   ├── example - 현재 만들어둔 함수 및 컴포넌트 예시 페이지
│   │   └── page.tsx
│   └── layout.tsx - 모든 페이지를 감싸는 최상위 파일
├── components
│   ├── atoms - 가장 작은 단위의 공통 컴포넌트 폴더
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── InvalidChkInput.tsx - 유효성 검사가 필요로한 input
│   │   ├── Label.tsx
│   │   ├── ObjInput.tsx - {key: value} or [{key:value, key:value}] 형식의 input
│   │   └── Pagination.tsx
│   ├── auth - token에 따른 필수 함수 파일
│   │   └── PrivateRouter.tsx - 로그인 유무에 따른 페이지 구분 파일
│   └── molecules - atom 보다는 크고 페이지 보다는 작은 컴포넌트 폴더 (페이지명 앞에 필수적으로 붙일 것)
│       ├── modals - 모달을 관리하는 폴더
│       ├── SignInAction.tsx
│       └── SignUpRegister.tsx
├── config - 개발환경 세팅 폴더
│   ├── config.common.ts
│   ├── config.development.ts
│   ├── config.export.ts
│   └── config.production.ts
├── data - view에서 사용되는 데이터를 관리하는 폴더
│   └── DInput.ts
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── assets
│   │   ├── icons
│   │   │   └── icon_accounts.png
│   │   ├── imgs
│   │   └── logo
│   ├── css
│   │   └── global.css
│   └── lottie
├── tailwind.config.ts
├── ts
│   ├── image.d.ts
│   └── window.d.ts
├── tsconfig.json
├── types - typescript의 interface를 관리하는 폴더
│   ├── IDatas.ts
│   ├── IFunction.ts
│   ├── IParameter.ts
│   └── IProps.ts
└── utils - 공통 유틸 함수를 관리하는 폴더
    ├── commonUtils.ts
    ├── refreshUtils.ts
    └── requestUtils.ts
```
