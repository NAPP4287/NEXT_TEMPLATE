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
