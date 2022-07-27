import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';

import IntroPage from './pages/IntroPage';
import MainPage from './pages/MainPage';

const App = memo(() => {
  return (
    <>
      <Routes>
        <Route path='/' exact={true} element={<IntroPage />} />
        <Route path='/mainpage' element={<MainPage />} />
      </Routes>
    </>
  );
});

export default App;