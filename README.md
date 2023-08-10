# Sowith

## 서비스 소개
### <i>공간을 넘어, 감성을 나누다</i>

위치기반 SNS 서비스 쏘윗

## 팀원
|최나경|안동섭|강동훈|
| :---: | :---: | :---: |
| <img width="180" alt="최나경 프로필 이미지" src="https://github.com/FRONTENDSCHOOL5/final-10-Goodi/assets/97887376/c429a5b2-80fa-4c92-9898-cfea2faa4eb5"> | <img width="180"  alt="안동섭 프로필 이미지" src="https://avatars.githubusercontent.com/u/96939334?s=400&u=6a4e635ccb574702b10b9464ce61bba61abefc72&v=4"> | <img width="180" alt="강동훈 프로필 이미지" src="https://github.com/starcradle101/starcradle101/assets/113353436/6e446c31-88ac-48b6-b6e4-4760fece3520"> |
| [nkEllaaa](https://github.com/nkEllaaa) | [DongSup_Ahn](https://github.com/D-Sup) | [Hoon Kang](https://github.com/starcradle101) |


## Commit Convention
> 커밋 메세지의 끝에 <u>띄어쓰기 없이 이슈번호</u>를 함께 작성합니다.<br>
> 커밋 단위는 이슈의 to-do로 나눕니다.

`🛠️Feat:로그인 이메일 유효성검사 기능 구현(#3)`
<br>

|이모티콘|커밋 메세지|의미|
|:---:|:---:|---|
|🌱|`:seedling: Init: `|프로젝트 초기 생성|
|📚|`:books: Docs: `|리드미 수정|
|🛠️|`:hammer_and_wrench: Feat `|새로운 기능 추가|
|🎨|`:art: Design: `|CSS등 사용자 UI 변경|
|🐞|`:lady_beetle: Fix: `|버그 수정|
|💬|`:speech_balloon: Comment: `|주석 추가 및 변경, 삭제|
|✍️|`:writing_hand: Rename: `|파일 또는 폴더명을 변경하거나 옮기는 작업|
|🗑️|`:wastebasket: Remove: `|파일 또는 폴더 삭제|
|♻️|`:recycle: Refactor: `|리팩토링|
|🌟|`:star2: Etc: `|기타사항|
|🚀|`:rocket: Release: `|배포|

## Issue Naming
> 이슈의 아이콘은 해당 사항에 맞게 커밋 컨벤션의 아이콘을 사용합니다.<br>

`🛠Feat:로그인 - 유효성 검사`<br>
`🐞Fix:로그인 - 유효성 검사 오류`<br>
`🎨Design:로그인 - 이메일 인풋창 레이아웃`<br>


## Branch Flow
> 브랜치는 작업 유형별로 나눠 생성한 뒤 작업이 끝나면 삭제합니다.<br>

`feature/로그인_기능_구현(#3)`

<br>

|브랜치|의미용|
|:---:|:---:|
|feature|작업 또는 기능 관련|
|bug|버그 수정 관련|
|release|배포 관련|
|hotfix|긴급하게 처리해야할 사고|

## PR template
> 각 줄은 불렛 포인트로 작성합니다.
###### 이슈번호 #xx
##### 전달사항
###### 파일명
- 파일별 전달 내용
- 파일별 전달 내용
##### 주요 변경 사항
- 통합 주요 변경 사항
##### 추후 작업
- 추후 보완하거나 작업할 내용

## Merge
> Draft Merge 전략 사용
> PR요청을 보내면 해당 PR에 대해 comment를 남기고 approve 합니다.
- comment에 들어갈 내용
  - PR에 대한 질문 
  - PR에 대한 개선점
  - PR에 대한 칭찬
  - 특이 사항 없을 시에는 코멘트에 `확인했습니다` 문구를 남깁니다.

## 폴더구조
```
📁 Sowith
├── 📁node_modules
├── .gitignore
├── .prettierrc.json
├── package-lock.json
├── package.json
├── README.md
├── 📁public
└── 📂src
      ├── 📁api
      ├── 📂assets
      ├── 📂components
            └── 📂common
      ├── 📁hooks
      ├── 📁pages
      └── 📂style
```
