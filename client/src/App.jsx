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
import RegisterPage from './pages/RegisterPage';
import LoginPage from './components/login/LoginPage';
import Error404Page from './components/Error404Page';

import Footer from './components/Footer';

const App = memo(() => {
  const dispatch = useDispatch();

  /** Store를 통해 상태값 호출 */
  const { error, isLogin } = useSelector((state) => state.user);

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
      <Header loginPageState={setLoginPageState} />

      {loginPageState && <LoginPage loginPageState={setLoginPageState} />}

      <Routes>
        {/* 첫 페이지 */}
        <Route path="/" exact={true} element={<IntroPage />} />

        {/* 메인페이지 */}
        <Route path="/main" element={<MainPage loginPageState={setLoginPageState} />} />

        {/* 배송접수 */}
        <Route 
          path="/reception" 
          element={isLogin ? <ReceptionPage /> : <Error404Page error={error} />} 
        />
        
        {/* 고객후기 */}
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/review/review_write" element={<ReviewWrite />} />
        <Route path="/review/:review_no" element={<ReviewDetail />} />
        <Route path="/review/edit/:review_no" element={<ReviewEdit />} />

        {/* 마이페이지 */}
        <Route path="/mypage/*" element={<MyPage />} />

        {/* 회원가입 */}
        <Route
          path="/register"
          element={<RegisterPage loginPageState={setLoginPageState} />}
        />

        {/* 공지사항 */}
        <Route path="/customer/notice" element={<NoticePage />} />

        {/* 자주찾는질문 */}
        <Route path="/customer/faq" element={<FaqPage />} />

        {/* 1:1문의 */}
        <Route path="/customer/inquiry" element={<InquiryPage />} />
        {/* <Route 
          path="/customer/inquiry" 
          element={isLogin ? <InquiryPage /> : <ErrorPage error={error} />} 
        /> */}

        {/* 잘못 된 주소로 접속 시 */}
        <Route path="/*" element={<Error404Page />} />
      </Routes>

      <Footer />
    </>
  );
});

export default App;
