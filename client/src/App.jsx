/** 패키지 참조 */
import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';

/** 컴포넌트 참조 */
import Header from './components/Header';

import IntroPage from './pages/IntroPage';
import MainPage from './pages/MainPage';
import ReceivePage from './pages/ReceivePage';
import ReviewPage from './pages/ReviewPage';
import CostomerPage from './pages/CostomerPage';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';

const App = memo(() => {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' exact={true} element={<IntroPage />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/receive' element={<ReceivePage />} />
        <Route path='/review' element={<ReviewPage />} />
        <Route path='/customer' element={<CostomerPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  );
});

export default App;