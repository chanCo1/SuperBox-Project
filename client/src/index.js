/**
 * @filename: index.js
 * @author: 박찬우
 * @description: 프로그램 시작점.
 *               전역 스타일(GlobalStyles)과 전역 SEO 구성(Meta),
 *               Redux 저장소에 연결(Provider) 후 라우팅 범위를 설정(BrowerRouter)하고 
 *               프로그램을 시작(App)한다.
 */

/** 패키지 참조 */
import React from 'react';
import ReactDOM from 'react-dom/client';
// 라우팅 범위 설정
import { BrowserRouter } from 'react-router-dom';
// Redux 저장소에 연결
import { Provider } from 'react-redux';

// 전역 스타일 정의
import GlobalStyles from './GlobalStyles';
// 전역 SEO 구성
import Meta from './Meta';
// store 구독
import Store from './Store';
// 프로그램 시작
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <Meta />
    <Provider store={Store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);