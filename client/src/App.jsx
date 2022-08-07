/** 패키지 참조 */
import React, { memo, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { tokenVerify, setIsLogin } from './slices/UserSlice';


/** 컴포넌트 참조 */
import Header from './components/Header';

import IntroPage from './pages/IntroPage';
import MainPage from './pages/MainPage';
import ReceivePage from './pages/ReceivePage';
import ReviewPage from './pages/ReviewPage';
import NoticePage from './pages/NoticePage';
import FaqPage from './pages/FaqPage';
import InquiryPage from './pages/InquiryPage';
import MyPage from './pages/MyPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './components/LoginPage';
import ErrorPage from './components/ErrorPage';

import Footer from './components/Footer';

const App = memo(() => {

  const dispatch = useDispatch();

  // 로그인 버튼 클릭시 사용할 boolean 값
  const [loginPageState, setLoginPageState] = useState(false);

  useEffect(() => {
    if(window.localStorage.getItem('accessToken')) {
      try {
        dispatch(tokenVerify());
      } catch(err) {
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
        <Route path='/' exact={true} element={<IntroPage />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/receive' element={<ReceivePage />} />
        <Route path='/review' element={<ReviewPage />} />
        <Route path='/mypage' element={<MyPage />} />
        {/* <Route path='/login' element={<LoginPage />} /> */}
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/customer/notice' element={<NoticePage />} />
        <Route path='/customer/faq' element={<FaqPage />} />
        <Route path='/customer/inquiry' element={<InquiryPage />} />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>

      <Footer />
    </>
  );
});

export default App;