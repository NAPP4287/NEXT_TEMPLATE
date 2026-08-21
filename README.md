# NEXT-TEMPLATE 사용 설명서

```
동기: 공통적으로 사용되는 함수나 초기 세팅을 매 프로젝트마다 해야하는 번거로움을 줄이기 위하여 프론트 Next template을 만들기로 결정하였습니다.
NEXACODE 프론트엔드 엔지니어라면 누구든 레포지토리 추가 개발이 가능하며, 개발 완료시 main에 push 해주시면 감사하겠습니다.

[기대효과]
1. 프론트엔드 엔지니어 부재 및 개발자 영입시, 인수인계가 효율적으로 진행 가능
2. 프로젝트 시작 시, 시간 단축 가능 (최대 3 - 7일정도 단축 & 잠재적 개발 시간 단축)
3. API RESPONSE 포맷을 미리 정의하여 백엔드와 요청 및 협업 진행 가능
```

**기술 스택**: Next.js 14.2.4 (App Router) · React 18 · TypeScript(strict) · Tailwind CSS 3.4 · Recoil 0.7 · CKEditor 5

---

## 목차

1. [빠른 시작](#1-빠른-시작)
2. [신규 프로젝트 시작 체크리스트](#2-신규-프로젝트-시작-체크리스트-)
3. [API 통신 & 에러/성공 처리 흐름](#3-api-통신--에러성공-처리-흐름-)
4. [폴더 구조](#4-폴더-구조)
5. [컨벤션](#5-컨벤션)
6. [스타일 시스템](#6-스타일-시스템)
7. [상태 관리](#7-상태-관리)
8. [컴포넌트 카탈로그](#8-컴포넌트-카탈로그)
9. [유틸 함수](#9-유틸-함수)
10. [예제 페이지](#10-예제-페이지)
11. [알려진 이슈 / TODO](#11-알려진-이슈--todo)

---

## 1. 빠른 시작

### 요구사항

- Node.js 18 이상 (검증 환경: v24.13.0)
- npm

### 설치 및 실행

```bash
npm install
npm run dev          # http://localhost:3000
```

### 스크립트

| 명령 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 (3000) |
| `npm run build` | `.env.production` 기준 프로덕션 빌드 |
| `npm run build:dev` | `env-cmd -f .env.development` 로 개발 환경 빌드 |
| `npm start` | 빌드 결과 실행 — **포트 3088** |
| `npm run start:dev` | 개발 환경 빌드 결과 실행 (3000) |
| `npm run lint` | `next lint` (`.eslintrc.json` → `next/core-web-vitals`) |

### 환경 변수

| 키 | 값 | 사용처 |
| --- | --- | --- |
| `NEXT_PUBLIC_RUN_MODE` | `development` \| `production` | `config/config.export.ts` 에서 dev/prod config 스위치 |
| `NEXT_PUBLIC_API_URL` | 백엔드 API URL | `config/config.development.ts`, `config/config.production.ts` |

- `.env.development` — 로컬 개발용 환경 파일
- `.env.production` — 빌드/배포용 환경 파일
- 두 파일 모두 **git에 추적**됩니다. `.gitignore`는 `.env*.local`만 무시하고 `.env.*` 라인은 주석 처리되어 있습니다.

### env → config 흐름

`/config` 폴더가 `.env`를 감싸서 앱 전체에 제공합니다. 소비 코드는 `process.env`를 직접 읽지 않고 항상 `Config()`를 씁니다.

```
.env.development / .env.production
  → config/config.development.ts / config.production.ts   (baseUrl, mode 주입)
  → config/config.common.ts  getConfigs({ baseUrl, mode })  → { baseUrl, mode, api: {} }
  → config/config.export.ts  Config()   ← NEXT_PUBLIC_RUN_MODE 로 분기
```

```ts
import Config from "@/config/config.export";

const reqUrl = Config().baseUrl;
```

---

## 2. 신규 프로젝트 시작 체크리스트 ★

이 템플릿을 클론해 새 프로젝트를 시작할 때 **반드시 손봐야 하는 지점**입니다.

| # | 파일 | 할 일 |
| --- | --- | --- |
| 1 | `.env.development` / `.env.production` | `NEXT_PUBLIC_API_URL`이 `"백엔드 API URL"` 플레이스홀더 상태입니다. 실제 값으로 교체 |
| 2 | `utils/requestUtils.ts` | 파일 상단 하드코딩 `testToken` 상수 제거. `createGetRequest` / `createPatchRequest` / `createDeleteRequest`가 쿠키의 `accessToken`이 아니라 `testToken`을 넘기고 있으므로 교체 (POST만 수정 완료) |
| 3 | `utils/refreshUtils.ts` | `refreshTokenFn`의 엔드포인트(`/admin/user/access-by-refresh`, `// 변경지점` 주석 위치)와 body의 하드코딩 JWT 교체. 응답 파싱 경로 `data.result.accessToken.value`도 백엔드 스펙에 맞춤 |
| 4 | `middleware.ts` | 로그인 가드 로직 전체가 주석 상태입니다 (`matcher`만 살아 있어 현재는 no-op). 프로젝트 인증 정책에 맞춰 주석 해제 |
| 5 | `app/page.tsx` | **파일이 없습니다.** `/` 진입 시 404이므로 메인 페이지를 추가해야 합니다 |
| 6 | `tailwind.config.ts` | `colors.primary` (`// 프로젝트별 primary 색상`)를 프로젝트 브랜드 색으로 교체 |
| 7 | `app/layout.tsx` | `metadata.title` / `description` 교체 |
| 8 | `data/DErrorStatus.ts` | 프로젝트에서 실제로 내려오는 status code 추가 (현재 401 / 403 / 404 / 500만 정의) |
| 9 | `components/atoms/DragFile.tsx` | 이미지가 아닌 파일 업로드 시 `"path 넣어주기"` 플레이스홀더를 실제 업로드 URL로 교체 |
| 10 | `next.config.mjs` | `env`에 `NEXT_PUBLIC_MODE`가 선언되어 있으나 코드에서 읽지 않고 `.env.*`에도 없는 잔재입니다. 실제 사용 키는 `NEXT_PUBLIC_RUN_MODE` |

---

## 3. API 통신 & 에러/성공 처리 흐름 ★

react-query · SWR · axios를 쓰지 않고, **`fetch`를 `Proxy`로 감싼 인터셉터** 방식입니다.

### 전체 흐름

```
page      createGetRequest("notice/list")             utils/requestUtils.ts
            └ 쿠키 accessToken + 공통 헤더 + no-store 캐시 정책 부착
          customFetch = Proxy(fetch)                  utils/refreshUtils.ts
            ├ 401  → refreshTokenFn()으로 accessToken 재발급 → setCookie → 원요청 1회 재시도
            └ !ok  → throw new Error("ERR_STATUS:{status} ERR_MSG:{message}")
page      catch (e) → setError(e.message)             states/stateFetch.ts  errorState
ErrorModal                                            components/molecules/modals/ErrorModal.tsx
            ├ /ERR_STATUS:(\d+)/ 로 status 파싱 → data/DErrorStatus.ts 에서 문구 조회
            └ 401: 쿠키 삭제 후 signin 이동 / 403: router.back() / 그 외: 화면 유지
```

`ERR_STATUS:{code} ERR_MSG:{msg}` 문자열 포맷이 `refreshUtils` ↔ `ErrorModal` 사이의 **계약**입니다. 이 포맷을 바꾸면 에러 모달이 status를 파싱하지 못합니다.

### 호출부에서 반드시 써야 하는 코드

`customFetch`는 실패 시 throw만 합니다. **호출하는 페이지에서 `catch` → `setError`를 해주지 않으면 에러 모달이 뜨지 않습니다.** 현재 레포에는 `errorState`에 값을 넣는 코드가 없으므로, 새 API 호출을 만들 때 아래 패턴을 그대로 사용하세요.

```tsx
"use client";
// react
import { useRouter } from "next/navigation";
// recoil
import { useSetRecoilState } from "recoil";
import { errorState, successState } from "@/states/stateFetch";
import { loadingModalState } from "@/states/stateModal";
// utils
import { createPostRequest } from "@/utils/requestUtils";

const router = useRouter();
const setError = useSetRecoilState(errorState);
const setSuccess = useSetRecoilState(successState);
const setLoading = useSetRecoilState(loadingModalState);

const handleSubmit = async () => {
  try {
    setLoading(true);
    const res = await createPostRequest("notice", { title, contents });
    setSuccess({ msg: "등록되었습니다.", action: () => router.push("/notice") });
  } catch (e: any) {
    setError(e.message); // "ERR_STATUS:400 ERR_MSG:..."
  } finally {
    setLoading(false);
  }
};
```

### 요청 함수 (`utils/requestUtils.ts`)

| 함수 | 시그니처 |
| --- | --- |
| GET | `createGetRequest(url)` |
| POST | `createPostRequest(url, body, type?)` |
| PATCH | `createPatchRequest(url, body)` |
| DELETE | `createDeleteRequest(url, body)` |

- `url`은 `baseUrl` 뒤에 붙는 경로만 넘깁니다 (`"notice/list"` → `{baseUrl}/notice/list`).
- 반환값은 `res.json()` **원본**입니다. 언랩·타이핑을 하지 않으므로 호출부에서 처리하세요.
- 공통 헤더: `accept`, `Content-type`, `Access-Control-Allow-Origin`, `Authorization: Bearer {accessToken}`.
- 모든 요청에 `Cache-Control: no-store` / `cache: "no-store"` / `next: { revalidate: 0 }` 가 적용됩니다 (Next 캐시 미사용).
- **파일 업로드**: `createPostRequest(url, formData, "file")` — `type === "file"`이면 `JSON.stringify`를 건너뛰고 `Content-type`을 생략해 브라우저가 multipart 경계를 직접 설정하게 합니다.
- `cookies-next`의 `getCookies()`를 쓰므로 **클라이언트 컴포넌트에서만** 사용하세요.

### 전역 모달 4종

네 모달 모두 `app/layout.tsx`에서 `dynamic(..., { ssr: false })`로 **한 번만** 마운트됩니다. 페이지에서 모달을 직접 렌더하지 않고 atom만 세팅하는 것이 컨벤션입니다.

| atom | 컴포넌트 | 용도 |
| --- | --- | --- |
| `errorState` | `ErrorModal` | API 에러 안내. status별 분기(401 로그아웃 / 403 뒤로가기) |
| `successState` | `SuccessModal` | 성공 안내. 닫을 때 `action()` 실행 → 이동·리프레시에 사용 |
| `loadingModalState` | `Loading` | 전체 화면 로딩 (`public/lottie/loading.json`) |
| `alertModalState` | `AlertModal` | 확인/취소 다이얼로그. `isOne: true`면 단일 버튼, `type`으로 제목 색 결정 |

```tsx
setAlertInfo({
  isOpen: true,
  isOne: false,
  title: "삭제",
  contents: "정말 삭제하시겠습니까?",
  type: "warning",
  lbtnTitle: "취소",
  rbtnTitle: "확인",
  action: () => handleDelete(),
});
```

---

## 4. 폴더 구조

`@/*` alias는 **레포 루트**를 가리킵니다 (`src/` 없음). 예: `@/components/atoms/Button`, `@/utils/commonUtils`.

```
├── README.md
├── middleware.ts               - 로그인 가드 (현재 본문 전체 주석 = no-op)
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json               - @/* → 레포 루트 alias
├── postcss.config.mjs          - tailwind, autoprefixer, (production) cssnano
├── .eslintrc.json
├── .env.development / .env.production
├── app                         - App Router (SSR page 관리)
│   ├── layout.tsx              - 최상위 레이아웃. global.css, RecoilRoot, 전역 모달 4종 마운트
│   ├── (sign)                  - 로그인 이전 페이지 그룹 (layout.tsx 없이 css만 공유)
│   │   ├── sign.module.css     - signin/signup 공통 css (스타일이 같을 것으로 판단해 부모로 분리)
│   │   ├── signin/page.tsx
│   │   └── signup/page.tsx
│   ├── error/page.tsx          - 500 에러 안내용 정적 페이지 (리다이렉트 대상)
│   └── example/page.tsx        - 공통 컴포넌트 및 유틸 사용 예시 페이지
├── components
│   ├── atoms                   - 가장 작은 단위의 공통 컴포넌트
│   │   ├── atoms.module.css
│   │   ├── Button.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Clipboard.tsx       - 클립보드 복사
│   │   ├── DragFile.tsx        - 드래그 앤 드롭 업로더
│   │   ├── FindFIle.tsx        - 파일찾기 버튼형 업로더
│   │   ├── Input.tsx
│   │   ├── InvalidChkInput.tsx - 유효성 검사가 필요한 input
│   │   ├── Label.tsx
│   │   ├── ObjInput.tsx        - {key: value} or [{key: value}] 형식의 input
│   │   ├── ObjSelect.tsx       - {key: value} or [{key: value}] 형식의 select
│   │   ├── Pagination.tsx      - URL query(page)와 동기화되는 페이지네이션
│   │   ├── Radio.tsx
│   │   └── Select.tsx
│   ├── molecules               - atoms보다 크고 page보다 작은 컴포넌트 (페이지명 prefix 필수)
│   │   ├── SignInAction.tsx
│   │   ├── SignUpRegister.tsx
│   │   └── modals              - 전역 모달 (layout.tsx에서 마운트)
│   │       ├── modal.module.css
│   │       ├── AlertModal.tsx
│   │       ├── ErrorModal.tsx
│   │       ├── Loading.tsx
│   │       └── SuccessModal.tsx
│   ├── template
│   │   └── MainTemplate.tsx    - 로그인 이후 페이지 공통 셸
│   └── edtior                  - CKEditor 5 래퍼 (폴더명 오타 상태, 11번 항목 참고)
│       ├── DEditor.ts          - 플러그인/툴바 EditorConfig
│       ├── EditorBox.tsx
│       └── editor.css
├── config                      - 환경 변수를 분리한 .env 파일을 관리하는 폴더
│   ├── config.common.ts
│   ├── config.development.ts
│   ├── config.export.ts
│   └── config.production.ts
├── data                        - view에서 사용되는 정적 데이터 (D prefix)
│   ├── DErrorStatus.ts         - HTTP status → 에러 문구 매핑
│   ├── DInput.ts               - 회원가입 input 정의
│   └── DSelect.ts              - select 더미 리스트
├── lib
│   └── RecoilRoot.tsx          - "use client" RecoilRoot 래퍼
├── states                      - Recoil atom (state prefix)
│   ├── stateFetch.ts           - errorState, successState
│   └── stateModal.ts           - alertModalState, loadingModalState
├── ts                          - ambient 타입 선언
│   ├── image.d.ts              - 이미지 파일 import
│   └── window.d.ts             - WebView bridge, 결제 SDK 등 window 확장
├── types                       - interface 관리 폴더 (I prefix)
│   ├── ICommon.ts
│   ├── IDatas.ts
│   ├── IFunctions.ts
│   ├── IParameter.ts
│   ├── IProps.ts               - 모든 컴포넌트 props + ColorType / FontSizeType
│   └── IStates.ts              - Recoil atom 타입
├── utils                       - 공통 유틸 함수
│   ├── commonUtils.ts
│   ├── refreshUtils.ts
│   └── requestUtils.ts
└── public
    ├── assets/icons            - icon_*.png / .svg
    ├── css
    │   ├── global.css          - @tailwind + 공통 유틸 클래스
    │   └── ckeditor5.css
    └── lottie/loading.json
```

### 라우트 현황

| 경로 | 파일 | 비고 |
| --- | --- | --- |
| `/signin` | `app/(sign)/signin/page.tsx` | |
| `/signup` | `app/(sign)/signup/page.tsx` | |
| `/example` | `app/example/page.tsx` | 컴포넌트·유틸 예시 |
| `/error` | `app/error/page.tsx` | Next 에러 바운더리가 아니라 리다이렉트용 정적 페이지 |
| `/` | — | **없음.** 프로젝트에서 `app/page.tsx` 추가 필요 |

---

## 5. 컨벤션

### git commit

- 대분류: `[feature]` / `[fix]` / `[hotfix]`
  - `feature`: 페이지 및 컴포넌트 추가 생성 시
  - `fix`: 이미 존재하는 컴포넌트 수정 및 삭제 시
  - `hotfix`: 취약점 보완, 버그 수정 시
- 중분류: commit 내용을 불릿으로 추가
- 특이사항: feature와 fix가 동일하게 있을 시 feature를 대분류로 사용합니다. 단 hotfix가 가장 큰 분류입니다. (`hotfix > feature > fix`)

```
[feature]
- login 페이지 추가 작업
- signin 페이지 수정
```

### git branch

- `main`: template 레포의 가장 상위 브랜치
- `개발자명/브랜치네임`: 해당 개발자가 템플릿 개발 시 사용하는 브랜치 (예: `peter/login`, `bella/editor`)

### 이미지 파일명

- 대분류: `img` / `icon` / `logo`
  - `img`: 복잡한 이미지 `.png` / `.jpg` → `imgs` 폴더
  - `icon`: 단순한 아이콘 이미지 `.svg` → `icons` 폴더
  - `logo`: 프로젝트 로고 `.png` / `.svg` → `logo` 폴더
- 스네이크 케이스로 파일명을 지정합니다.

```
- img_example.jpg
- icon_example.svg
```

### 컴포넌트 작명

- `atoms`: 가장 작은 단위의 시멘틱 태그를 사용한 공통 컴포넌트. 대문자로 시작합니다.
- `molecules`: atoms보다 크고 페이지보다 작은 단위로, 페이지와 직접 연관된 컴포넌트입니다. 페이지 내에서 컴포넌트 단위로 동적인 view를 보여줘야 한다면 molecules에 추가하고 `"use client"`로 관리하며, **불러올 페이지명을 앞에 붙여** Pascal Case로 작명합니다.
  - 예시: `abc/page.tsx`에서 사용될 컴포넌트 → `molecules/AbcModal.tsx`
- `template`: 로그인 이후 여러 페이지가 공유하는 셸
- `modals`: 전역 모달. `app/layout.tsx`에 마운트합니다.

### 코드 작성 규칙

실제 코드에서 지켜지고 있는 규칙들입니다.

- **import 그룹화**: 파일 상단 import를 `// react` / `// components` / `// utils` / `// recoil` / `// interface` / `// css` / `// img` 주석으로 묶습니다.
- **props 타이핑**: 컴포넌트는 단일 `props` 객체를 받고 `types/IProps.ts`의 `I*Props`로 타이핑한 뒤 첫 줄에서 구조분해합니다.

  ```tsx
  import { IButtonProps } from "@/types/IProps";

  const Button = (props: IButtonProps) => {
    const { title, bg, color, action, isRound } = props;
  ```

- **색상 prop**: `ColorType`을 문자열 보간으로 조립하지 않고 `Record<ColorType, string>` 조회 맵으로 해석합니다. Tailwind 스캐너가 완성된 클래스명을 보게 하려는 의도이므로 이 패턴을 유지하세요.
- **네이밍 prefix**: 정적 데이터는 `D`(`data/`), 인터페이스는 `I`(`types/`), Recoil atom 파일은 `state`(`states/`).
- **포맷**: Prettier 설정 파일은 없지만 사실상 Prettier 기본값(2 space, double quote, semicolon)을 따릅니다.

---

## 6. 스타일 시스템

### `public/css/global.css`

`@tailwind` 지시자와 전역 리셋, 공통 유틸 클래스를 담은 파일입니다. `public/`에서 서빙되며 `app/layout.tsx`에서 preload + import 합니다.

| 클래스 | 역할 |
| --- | --- |
| `.max-width` | `max-w-1920px` + 중앙 정렬 + 좌우 패딩 (layout의 최상위 래퍼) |
| `.mx-w-500` | 최대 500px 중앙 정렬 (폼 등) |
| `.flex-center` | `justify-center items-center` |
| `.flex-row-center` | `justify-center` |
| `.flex-col-center` | `items-center` |
| `.r-flex-center` | `flex-col` + 양방향 중앙 정렬 |
| `.r-flex-row-center` | `flex-col` + `items-center` |
| `.r-flex-col-center` | `flex-col` + `justify-center` |

`r-` prefix는 `flex-direction: column` 계열을 뜻합니다. 이 외에 `input[type=number]` 스피너 제거, placeholder 색상 등 전역 리셋이 포함됩니다.

### 디자인 토큰 (`tailwind.config.ts`)

| 종류 | 값 |
| --- | --- |
| colors | `white` `#ffffff`, `black` `#1a1a1a` |
| | `red.main` `#d60e00`, `red.light` `#fc8d83`, `red.md` `#fc7468` |
| | `green.main` `#00bd48`, `green.light` `#6ee69c`, `green.md` `#3ac26e` |
| | `primary.main` `#972aeb`, `primary.sub` `#ca85ff` ← **프로젝트별 교체** |
| | `gray.light` `#dedede`, `gray.md` `#8c8c8c`, `gray.dark` `#4f4f4f` |
| padding | `sm` 8px, `md` 12px, `df` 16px, `lg` 20px, `xlg` 36px |
| fontSize | `sm` .6rem, `md` .8rem, `df` 1rem, `lg` 1.4rem, `xlg` 1.6rem |
| maxWidth | `1920px` |
| animation | `animate-fadein` / `animate-fadeout` (0.2s, 모달 전환 전용) |

- `df`는 default를 뜻합니다.
- `keyframes` / `animation`은 `theme.extend`가 아니라 `theme` 직속에 정의되어 있어 **Tailwind 기본 애니메이션을 대체**합니다. `animate-spin` 등이 필요하면 `extend`로 옮기세요.
- `content` glob은 `./pages` · `./components` · `./app`만 커버합니다. `data/`나 `utils/`에 클래스 문자열을 두면 purge되므로 주의하세요.

### CSS Module

- 페이지 단위: `app/(sign)/sign.module.css`
- 공통 컴포넌트: `components/atoms/atoms.module.css`, `components/molecules/modals/modal.module.css`
- 에디터: `components/edtior/editor.css`, `public/css/ckeditor5.css`

페이지에서만 쓰는 스타일은 `페이지명.module.css`로 해당 폴더에 두고, 여러 페이지가 공유하면 부모 폴더로 올립니다.

---

## 7. 상태 관리

Recoil을 사용합니다. `lib/RecoilRoot.tsx`가 `"use client"` 래퍼로 `app/layout.tsx`를 감쌉니다.

| atom | 파일 | 타입 |
| --- | --- | --- |
| `errorState` | `states/stateFetch.ts` | `string \| null` — `ERR_STATUS:...` 원문 |
| `successState` | `states/stateFetch.ts` | `{ msg: string \| null, action?: Function \| null }` |
| `alertModalState` | `states/stateModal.ts` | `IAlertModalState` |
| `loadingModalState` | `states/stateModal.ts` | `boolean` |

### 새 전역 상태를 추가할 때

1. `states/state{도메인}.ts`에 `atom` 정의 (`key`는 전역 유일)
2. 객체 타입이면 `types/IStates.ts`에 인터페이스 추가
3. 전역 UI가 필요하면 해당 컴포넌트를 `app/layout.tsx`에 `dynamic(..., { ssr: false })`로 마운트

---

## 8. 컴포넌트 카탈로그

모든 props 인터페이스는 `types/IProps.ts`에 있습니다. 공용 타입:

- `ColorType` — `black` `white` `red-main` `red-light` `red-md` `green-main` `green-light` `green-md` `gray-main` `gray-light` `gray-md` `primary-main` `primary-sub`
- `FontSizeType` — `text-sm` `text-md` `text-df` `text-lg` `text-xlg`

모든 컴포넌트가 일회성 여백 조정용 `className?`을 받습니다.

### atoms

| 컴포넌트 | Props | 용도 / 알아둘 점 |
| --- | --- | --- |
| `Button` | `IButtonProps` | `bg` / `color` / `border`(ColorType), `action`, `isRound`, `disabled`. `img` + `imgPlace: "left" \| "right"`로 아이콘 배치 |
| `Input` | `IInputProps` | 제어 컴포넌트(`value` / `setValue`). `type="textarea"`면 `<textarea>` 렌더. `type="number"`는 `maxLength`가 네이티브로 동작하지 않아 수동 절단하고 `onWheel` 시 blur 처리 |
| `ObjInput` | `IObjInputProps` | `{key: value}` 및 `Array<{key: value}>` 상태용. `name`(+배열이면 `idx`)으로 슬롯 지정 |
| `InvalidChkInput` | `IInvaildChkInputProps` | `chkSignupInvalidInfo`로 자체 검증하고 `invalidTxt` 노출. `ssr` / `phone`은 `autoHypen` 자동 적용 |
| `Select` | `ISelectProps` | `list: Array<{ name, code }>` 단일 선택 |
| `ObjSelect` | `IObjSelectProps` | ObjInput과 동일한 `name` / `idx` 패턴의 select |
| `Checkbox` | `ICheckBoxProps` | `type: "single" \| "all"`. `allValue` / `setAllValue`로 전체선택 ↔ 개별선택 동기화 |
| `Radio` | `IRadioProps` | `appearance-none` 커스텀 라디오 |
| `Label` | `ILabelProps` | `isRequire: true`면 빨간 `*` 표시 |
| `Clipboard` | `IClipboardProps` | `copyTxt`를 복사하고 `action()` 실행 (보통 `successState` 세팅) |
| `FindFIle` | `IFindFileProps` | 버튼형 파일 선택 + 읽기전용 파일명 표시 |
| `Pagination` | `IPaginationProps` | 아래 참고 |
| `DragFile` | `IDragFileProps` | 아래 참고 |

#### `Pagination`

URL query와 동기화되는 페이지네이션입니다.

```tsx
<Pagination
  pagination={pagination}      // { currentPage, totalPage }
  setPagination={setPagination}
  showNum={5}                  // 한 번에 보여줄 페이지 버튼 개수
  path={"notice"}              // router.replace(`/${path}?page=${n}`)
/>
```

`useSearchParams().get("page")`로 초기값을 읽고, 클릭 시 state와 URL을 함께 갱신합니다. `useSearchParams`를 쓰므로 이 컴포넌트를 포함한 페이지는 **Suspense 경계 안**에 두세요.

#### `DragFile`

드래그 앤 드롭 + 클릭 업로더입니다.

```tsx
<DragFile
  accept={".jpg,.png"}
  type={"img"}                                        // img | vedio | doc | music
  values={file}                                       // { fileName, filePath }
  setValues={setFile}
  limitSize={{ unit: "MB", size: 5 }}
  limitImg={{ width: 400, height: 400, type: "over" }} // same | over | under | ratio
/>
```

확장자 · 용량 · 이미지 실측 크기를 검증하고, 실패 시 `alertModalState`로 안내합니다. 이미지는 base64 프리뷰를 만들고, 그 외 타입은 `type`에 맞는 `public/assets/icons/icon_file_*.png` 아이콘을 표시합니다.

### molecules

| 컴포넌트 | 비고 |
| --- | --- |
| `SignInAction` | 로그인 폼. `chkEmptyInfo` 가드, "아이디 저장" 쿠키, Enter 제출. **로그인 API 호출은 TODO** |
| `SignUpRegister` | `DSignupInput`을 순회해 `Label` + `InvalidChkInput` 렌더. **제출 핸들러는 TODO** |

두 컴포넌트는 완성품이 아니라 **복사해서 시작하는 지점**입니다.

### modals

`AlertModal` · `ErrorModal` · `Loading` · `SuccessModal`. 네 개 모두 같은 셸을 공유합니다.

- `modal.module.css`의 `.modalWrap`(배경) + `.modalContent`(본문)
- 첫 페인트에서 애니메이션이 튀지 않도록 `render` state로 억제
- 열릴 때 `document.body.style.overflow = "hidden"`
- 배경 클릭으로 닫히고, 본문은 `e.stopPropagation()`으로 보호

### template / editor

- `MainTemplate({ title, children })` — 로그인 이후 공통 셸. 현재 `title`은 사용하지 않는 placeholder이므로 프로젝트 헤더/사이드바를 여기에 채우세요.
- `EditorBox({ value, setValue })` — CKEditor 5 ClassicEditor. 툴바·플러그인 설정은 `components/edtior/DEditor.ts`의 `EditorConfig`에 있습니다. **`dynamic(..., { ssr: false })`로만 불러오세요.**

  ```tsx
  const DynamicEditorBox = dynamic(() => import("@/components/edtior/EditorBox"), {
    ssr: false,
  });
  ```

---

## 9. 유틸 함수

커스텀 훅은 없습니다 (`hooks/` 폴더 없음). 모든 로직은 일반 함수로 제공됩니다.

### `utils/commonUtils.ts`

| 함수 | 설명 |
| --- | --- |
| `handleScrollToTop()` | 스크롤을 맨 위로 (smooth) |
| `handleDateFormat(date)` | `Date` → `YYYY-MM-DD` |
| `handleTimeFormat(time)` | 상대 시간 — `방금 전` / `N분 전` / `N시간 전` / `N일 전`, 7일 초과 시 `handleDateFormat` |
| `autoHypen(value, name)` | 자동 하이픈 — `ssr`(6-7), `phone`(3-4-4) |
| `handleCountTil(val)` | 숫자 3자리마다 `,` |
| `chkSignupInvalidInfo(info)` | 유효성 검사 실패한 key 배열 반환 (`ssr` `email` `uId` `pwd` `phone` `name`) |
| `chkEmptyInfo(info, requireList)` | 필수값 누락 검사 → `"empty" \| "go"`. **API 요청 전 가드 컨벤션** |
| `changeTypeObj(obj, keys, type)` | 선택한 key들의 타입 변환 (`string` / `number` / `undefined` / `null`) |

```tsx
if (chkEmptyInfo(info, ["uId", "pwd"]) === "empty") {
  setAlertInfo({ isOpen: true, isOne: true, title: "알림", contents: "필수값을 입력해주세요.", type: "error", lbtnTitle: "확인", action: () => undefined });
  return;
}
```

### `utils/requestUtils.ts` · `utils/refreshUtils.ts`

[3. API 통신 & 에러/성공 처리 흐름](#3-api-통신--에러성공-처리-흐름-) 참고.

- `requestUtils.ts` — 메소드별 요청 함수 (GET / POST / PATCH / DELETE)
- `refreshUtils.ts` — accessToken 만료 시 interceptor로 refreshToken을 사용해 재발급 후 원요청을 재시도하는 `customFetch`

---

## 10. 예제 페이지

`app/example/page.tsx` (`/example`)는 atoms · 유틸 · 모달의 실제 사용 예시를 모아둔 페이지입니다. 새 컴포넌트나 유틸을 사용하기 전에 이 페이지를 먼저 확인하세요.

> **공통 컴포넌트를 추가하면 `/example`에도 사용 예시를 함께 추가해주세요.** 이 페이지가 템플릿의 살아있는 문서 역할을 합니다.

---

## 11. 알려진 이슈 / TODO

템플릿에 남아 있는 문제들입니다. 새 프로젝트를 시작한다면 1번은 먼저 해결해야 빌드가 됩니다.

1. **빌드 실패 요인** — `components/atoms/Clipboard.tsx`가 `react-copy-to-clipboard`를 import하지만 `package.json` · `package-lock.json` · `node_modules` 어디에도 없습니다. 새로 클론한 뒤 `npm install`하면 빌드가 깨집니다. (`npm i react-copy-to-clipboard @types/react-copy-to-clipboard` 또는 `navigator.clipboard`로 교체)
2. `data/DErrorStatus.ts`에 없는 status(400 · 422 등)가 내려오면 `ErrorModal`이 `DErrorStatus[statusCode].title`에서 `TypeError`로 죽습니다. fallback 항목이 필요합니다.
3. `utils/commonUtils.ts`의 `chkSignupInvalidInfo`는 `pwd_chk`를 검사하지만 `data/DInput.ts`와 폼은 `pwdChk`를 사용합니다. → 비밀번호 확인 검증이 동작하지 않습니다.
4. 정의되지 않은 Tailwind 클래스 — ①`Input` / `ObjInput` / `Select` / `ObjSelect`가 `primary-main`을 `text-blue-main` · `border-blue-main`으로 매핑하고 있습니다 (`Button`만 올바름). ②`ColorType`의 `gray-main`은 `text-gray-main` / `bg-gray-main`으로 매핑되지만 `tailwind.config.ts`에는 `gray.light` / `gray.md` / `gray.dark`만 정의되어 있습니다. ③`atoms.module.css`의 `bg-gray-bg` · `border-gray-bg`도 존재하지 않는 토큰입니다.
5. `ErrorModal`의 `router.replace("signin")`은 상대 경로입니다. `/signin`이어야 합니다.
6. `app/layout.tsx`에서 `RecoilRootWrapper`가 `<body>` 바깥을 감싸고 있습니다. 하이드레이션 이슈 가능성이 있어 `<body>` 안쪽으로 옮기는 것을 권장합니다.
7. import 경로에 묶여 있어 리네임 시 영향 범위가 있는 오타 — `components/edtior/`, `FindFIle.tsx`, `Checkbox.tsx` · `FindFIle.tsx`의 `"use clinet"`, `IMainTempleteProps`, `IDragFileProps`의 `vedio`. 별도 커밋으로 정리하는 것을 권장합니다.
