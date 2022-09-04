/** 패키지 참조 */
import React, { memo, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { tokenVerify, setIsLogin } from './slices/UserSlice';

/** 컴포넌트 참조 */
import Header from './components/Header';

import IntroPage from './pages/IntroPage';
import MainPage from './pages/MainPage';
import ReceptionPage from './pages/ReceptionPage';

import ReviewPage from './pages/ReviewPage';
import ReviewWrite from './components/review/ReviewWrite';
import ReviewDetail from './components/review/ReviewDetail';
import ReviewEdit from './components/review/ReviewEdit';

import NoticePage from './pages/NoticePage';
import FaqPage from './pages/FaqPage';
import InquiryPage from './pages/InquiryPage';

import MyPage from './pages/MyPage';
import MypageReception from './components/mypage/MypageReception';
import MypageReview from './components/mypage/MypageReview';
import MypageInquiry from './components/mypage/MypageInquiry';
import MypageProfile from './components/mypage/MypageProfile';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './components/login/LoginPage';
import Error404Page from './components/Error404Page';

import Footer from './components/Footer';

const App = memo(() => {
  const dispatch = useDispatch();

  /** Store를 통해 상태값 호출 */
  const { memberData, loading, error, isLogin } = useSelector((state) => state.user);

  // 로그인 버튼 클릭시 사용할 boolean 값
  const [loginPageState, setLoginPageState] = useState(false);

  // 앱이 실행될 때 마다 토큰 유효성 검사 실행
  useEffect(() => {
    if (window.localStorage.getItem('accessToken')) {
      try {
        dispatch(tokenVerify());
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch(setIsLogin(false));
    }
  }, [dispatch]);

  return (
    <>
      <Header
        memberData={memberData}
        isLogin={isLogin}
        loginPageState={setLoginPageState}
        loading={loading}
      />

      {loginPageState && <LoginPage loginPageState={setLoginPageState} />}

      <Routes>
        {/* 첫 페이지 */}
        <Route path="/" exact={true} element={<IntroPage />} />

        {/* 메인페이지 페이지 */}
        <Route 
          path="/main"
          element={<MainPage loginPageState={setLoginPageState} />}
        />

        {/* 배송접수 페이지 */}
        <Route
          path="/reception"
          element={
            isLogin ? <ReceptionPage /> : <Error404Page error={error} />
          }
        />

        {/* 고객후기 페이지 */}
        <Route 
          path="/review"
          element={
            <ReviewPage memberData={memberData} isLogin={isLogin} loading={loading} />
          }
        />
        {/* 후기작성 */}
        <Route
          path="/review/review_write"
          element={
            <ReviewWrite memberData={memberData} isLogin={isLogin} loading={loading} />
          }
        />
        {/* 후기 상세보기 */}
        <Route
          path="/review/:review_no"
          element={
            <ReviewDetail memberData={memberData} isLogin={isLogin} />
          }
        />
        {/* 후기수정 */}
        <Route path="/review/edit/:review_no" element={<ReviewEdit />} />

        {/* 마이페이지 */}
        <Route
          path="/mypage"
          element={
            isLogin ? <MyPage /> : <Error404Page error={error} />
          }
        />
        {/* 내접수내역 */}
        <Route
          path="/mypage/reception"
          element={
            isLogin ? <MypageReception /> : <Error404Page error={error} />
          }
        />
        {/* 내가 쓴 후기 */}
        <Route
          path="/mypage/review"
          element={
            isLogin ? <MypageReview /> : <Error404Page error={error} />
          }
        />
        {/* 내가 쓴 1:1문의 */}
        <Route
          path="/mypage/inquiry"
          element={
            isLogin ? <MypageInquiry /> : <Error404Page error={error} />
          }
        />

        {/* <Route
          path="/mypage/information"
          element={
            isLogin ? <MypageProfile /> : <Error404Page error={error} />
          }
        /> */}

        {/* 회원가입 */}
        <Route
          path="/register"
          element={<RegisterPage loginPageState={setLoginPageState} />}
        />

        {/* 공지사항 */}
        {/* <Route path="/customer/notice" element={<NoticePage />} /> */}

        {/* 자주찾는질문 */}
        <Route path="/customer/faq" element={<FaqPage />} />

        {/* 1:1문의 */}
        <Route path="/customer/inquiry" element={<InquiryPage />} />

        {/* 잘못 된 주소로 접속 시 */}
        <Route path="/*" element={<Error404Page />} />
      </Routes>

      <Footer />
    </>
  );
});

export default App;
