/** 패키지 참조 */
import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';

/** 컴포넌트 참조 */
import Header from './components/Header';

import IntroPage from './pages/IntroPage';
import MainPage from './pages/MainPage';
import ReceivePage from './pages/ReceivePage';
import ReviewPage from './pages/ReviewPage';
import NoticePage from './pages/NoticePage';
import FaqPage from './pages/FaqPage';
import InqueryPage from './pages/InqueryPage';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';

import Footer from './components/Footer';

const App = memo(() => {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' exact={true} element={<IntroPage />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/receive' element={<ReceivePage />} />
        <Route path='/review' element={<ReviewPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/customer/notice' element={<NoticePage />} />
        <Route path='/customer/faq' element={<FaqPage />} />
        <Route path='/customer/inqury' element={<InqueryPage />} />
      </Routes>

      <Footer />
    </>
  );
});

export default App;