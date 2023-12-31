# Sowith

## 서비스 소개
### <i>공간을 넘어, 감성을 나누다</i>

위치기반 SNS 서비스 쏘윗

<br>

## 팀원
|최나경|안동섭|강동훈|
| :---: | :---: | :---: |
| <img width="180" alt="최나경 프로필 이미지" src="https://github.com/FRONTENDSCHOOL5/final-10-Goodi/assets/97887376/c429a5b2-80fa-4c92-9898-cfea2faa4eb5"> | <img width="180"  alt="안동섭 프로필 이미지" src="https://avatars.githubusercontent.com/u/96939334?s=400&u=6a4e635ccb574702b10b9464ce61bba61abefc72&v=4"> | <img width="180" alt="강동훈 프로필 이미지" src="https://github.com/Sowith/sowith/assets/113353436/65edd243-0cc2-4bfe-b7a0-e3cfa29d83b9"> |
|팀장|팀원|팀원|
| [nkEllaaa](https://github.com/nkEllaaa) | [DongSup_Ahn](https://github.com/D-Sup) | [Hoon Kang](https://github.com/starcradle101) |

<br>

## 🛠️ 기술 스택

<table>
<tr>
 <td align="center">프론트</td>
 <td>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">&nbsp 
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=ffffff"/>&nbsp
   <img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=aws&logoColor=white"> 
  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>&nbsp 
 </td>
</tr>
<tr>
  <td align="center">서버</td>
  <td>
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=ffffff"/>&nbsp
  </td>
</tr>  
<tr>
 <td align="center">협업</td>
 <td>
    <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"/>&nbsp
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>&nbsp 
    <img src="https://img.shields.io/badge/Notion-5a5d69?style=for-the-badge&logo=Notion&logoColor=white"/>&nbsp
    <img src="https://img.shields.io/badge/Discord-4263f5?style=for-the-badge&logo=Discord&logoColor=white"/>&nbsp 
    <img src="https://img.shields.io/badge/Figma-d90f42?style=for-the-badge&logo=Figma&logoColor=white"/>&nbsp  
 </td>
</tr>
</table>

<br>

## Commit Convention
> 커밋 메세지의 끝에 <u>띄어쓰기 없이 이슈번호</u>를 함께 작성합니다.<br>
> 커밋 단위는 이슈의 to-do로 나눕니다.

`🛠️Feat:로그인 이메일 유효성검사 기능 구현(#3)`
<br>

|이모티콘|커밋 메세지|의미|
|:---:|:---:|---|
|🌱|`:seedling: Init: `|프로젝트 초기 생성|
|📚|`:books: Docs: `|리드미 수정 및 파일 추가|
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


##### [예시]
### Description
- 어떤 이슈인지 설명
### To-do
- 작업을 세세하게 나눠서 작성합니다.
- 작업 단위가 크다면 하나의 To-do가 하나의 커밋이 되도록합니다.
- 작업 단위가 작다면 작업 유형이 비슷한 To-do를 하나의 커밋으로 모아서 올립니다.
### 기타사항
- 팀원들에게 공유해야 할 사항이 있다면 작성합니다.
<br>
<br>

## Branch Flow
> 브랜치는 작업 유형별로 나눠 생성한 뒤 작업이 끝나면 삭제합니다.<br>

`feature/로그인-기능-구현/#3`

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
### 전달사항
#### 파일명
- 파일별 전달 내용
- 파일별 전달 내용
### 주요 변경 사항
- 통합 주요 변경 사항
### 추후 작업
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
