import React, { memo } from 'react';
import styled from 'styled-components';

import unsmile from '../assets/image/unsmile.png';

const ErrorContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 100%;
  height: 100vh;
  z-index: 9;

  h1 {
    font-size: 60px;
  }

  p {
    font-size: 20px;
  }
`;

const ErrorPage = memo((error) => {
  return (
    <ErrorContainer>
      <img className='logo' src={unsmile} alt="unsmile" />
      <h1>404 Error {error.code}</h1>
      <p>{error.message}</p>
      <p>요청하신 페이지는 존재하지 않거나 정상적인 접근이 아닙니다.</p>
    </ErrorContainer>
  );
});

export default ErrorPage;