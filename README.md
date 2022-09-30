# SuperBox

<img src="https://user-images.githubusercontent.com/94843131/190389462-fd69c295-0a9c-44a0-835f-3b90ac01e532.gif" width="400" height="350">

`SuperBox`는 택배 접수 대행 서비스 입니다. 

시용후기를 남기고, 사용자들과 소통할 수 있습니다.

[https://superbox-project.herokuapp.com](https://superbox-project.herokuapp.com)

<br />

### 테스트를 위한 공유 아이디

아이디: openid

비밀번호: 123qwe!@#


<br />

## 기획의도

기획 부터 배포까지 스스로 직접 해봄으로서 하나의 웹 페이지가 탄생하기 까지 전체적인 흐름을 파악하고, 클라이언트로 부터 입력받은 데이터를 서버를 통해 데이터베이스에 저장 및 호출 하기까지 즉, REST API에 대해 깊게 공부하기 위해 개인 프로젝트를 기획하였습니다.

## 개발기간
22/07/28 ~ 22/09/07 (약 5주)

## 주요기능

택배 접수 / 후기 게시판 / 1:1문의 / 마이페이지 / 개인정보관리 / 회원가입 / 로그인 & 로그아웃

<br />

## 개발환경

### Front-end

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React--Router-CA4245?style=for-the-badge&logo=React-Router&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)

### Back-end

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

### Deploy

![Heroku](https://img.shields.io/badge/heroku-430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

### Others

![Amazon S3](https://img.shields.io/badge/Amazon--S3-569A31.svg?style=for-the-badge&logo=Amazon-S3&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white)

<br />

## 기능소개

### 전체페이지

![Sep-16-2022 18-01-56](https://user-images.githubusercontent.com/94843131/190600257-c7460b7d-700f-43cc-96d2-25d0c3aca278.gif)

### 메인페이지

![SuperBox/main](https://user-images.githubusercontent.com/94843131/190402533-0775d508-db32-41c9-b3c4-1baeeb56b4e6.gif)

### 회원가입

![Sep-15-2022 21-40-08](https://user-images.githubusercontent.com/94843131/190406112-0c628fd0-ad0c-4fae-9e86-30f234e13d5c.gif)

### 로그인

![Sep-15-2022 21-44-27](https://user-images.githubusercontent.com/94843131/190406939-ec974de9-e39c-43f3-bbb1-ff8cb0b05a99.gif)









## 일자 별 구현 내용

7/28(목)
* 프로젝트 생성
* 프로젝트 진행을 위한 기본값 설정(GlobalStyles, Meta 등)
* 시작페이지 구현 완료

7/29(금)
* header 구현 시작
* header 구현 완료 (UI 및 Link 연결)
* footer UI 구현 시작
* footer 구현 완료

7/30(토)
* 메인페이지 구현 시작

7/31(일)
* 메인페이지 UI 구현 
* 메인페이지 scroll event 구현

8/1(월)
* 메인페이지 구현 완료
* 로그인 페이지 구현 시작

8/2(화)
* 로그인 유효성 검사
* 로그인 페이지 UI 구현 완료

8/3(수)
* 로그인 백엔드 시작
* 로그인 유효성 검사 업데이트
* 회원가입 페이지 구현 시작

8/4(목)
* 로그인 유효성 검사 업데이트
* 회원가입 백엔드 시작
* 회원가입 페이지 UI 완료

8/5(금)
* 회원가입 페이지 유효성 검사 구현
* 회원가입 리덕스 구현

8/6(토)
* 로그인, 회원가입 mysql 연동
* 회원가입시 비밀번호 암호화 구현
* 로그인, 회원가입 백엔드 구현 완료

8/7(일)
* 로그인시 JWT 발급 구현 완료
* 로컬스토리지에 토큰 저장 및 로그인 유지

8/8(월)
* 토큰 재발급 수정 -> 새로고침시 에러 해결
* 회원가입 및 로그인 구현 완료

8/9(화)
* 배송접수 구현 시작
* 주소찾기 구현
* 카카오맵 구현
* 주소찾기-카카오맵 연동 구현

8/10(수)
* 배송접수 UI 구현
* 배송접수 리덕스 구현
* 배송접수 백엔드 시작

8/11(목)
* 배송접수 UI 업데이트
* 배송접수 유효성 검사
* 배송접수 백엔드 서버 및 데이터 구현 완료

8/12(금)
* 배송접수 UI 업데이트 (슬라이드, 박스크기 안내)
* 배송접수 페이지 구현 완료

8/13(토)
* 자주찾는질문 UI 구현
* 1:1 문의 UI 구현

8/14(일)
* 1:1 문의 UI 업데이트
* 메인페이지 UI 업데이트
  
8/15(월)
* 1:1 문의 사용자 정보 호출 및 유효성 검사
* 1:1 문의 백엔드 서버 구현 시작

8/16(화)
* 1:1 문의 mysql 연동
* 1:1 문의 post 구현 완료
* 1:1 문의 이미지 첨부 - 미리보기 구현

8/17(수)
* 이미지 첨부파일 구현
  * formData에 첫 이미지는 전송되지 않고, 두 번째 파일을 전송해야 첫 번째 파일이 전송되는 문제 -> 따로 확인버튼을 만들어서 해결.
* 첨부파일 백엔드 구현

8/18(목)
* 1:1문의 첨부파일 프론트 수정
* 1:1문의 첨부파일 백엔드 수정

8/19(금)
* 후기 작성 페이지 UI
* 후기 작성 toastui editor 적용

8/20(토)
* 후기 작성 toastui 이미지 업로드 구현

8/21(일)
* 이미지 업로드 백엔드 연동
* 후기 작성 리덕스 시작

8/22(월)
* 후기 작성 post 구현
* 후기 데이터 get 구현
* 후기 게시판 UI 구현

8/23(화)
* 후기 상세보기 get 구현
* 후기 상세보기 UI 구현
* 후기 삭제 구현 (프론트 / 백)

8/24(수)
* 후기 수정 구현 (프론트 / 백)
* 수정됨 기능 추가 (시간 + 수정됨)

8/25(목)
* 조회수 업데이트 구현
* 좋아요 기능 시작

8/26(금)
* 좋아요 / 싫어요 기능 구현
* 댓글쓰기 UI
* 댓글쓰기 프론트 / 백 구현

8/27(토)
* 댓글 불러오기 구현

8/28(일)
* 댓글 수정하기 구현

8/29(월)
* 댓글 삭제하기 구현
* 후기 글 정렬 구현 (최신순/인기순/댓글순/조회순)
* 후기 검색 구현

8/30(화)
* pagination 구현
* 마이페이지 UI

8/31(수)
* 마이페이지 - 접수현황 UI
* 마이페이지 - 접수 취소 구현

9/1
* 마이페이지 - 사용후기 구현
* 마이페이지 - 1:1문의 구현

9/2
* 개인정보수정 UI
* 개인정보수정 구현

9/3
* 프로필 이미지 수정 구현
* 게시판 관련 프로필 이미지 연동

9/4
* 프로필 이미지 삭제

9/5
* 회원탈퇴 구현

9/6
* HEROKU 배포 테스트

9/7
* 배포완료
* 프로젝트 종료