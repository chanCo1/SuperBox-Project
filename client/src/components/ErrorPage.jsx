import React, { memo } from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  position: fixed;
  background-color: #fff;
  width: 100%;
  height: 100vh;
  z-index: 9;

  h1 {
    font-size: 40px;
  }

  p {
    font-size: 20px;
  }
`;

const ErrorPage = memo((error) => {
  return (
    <ErrorContainer>
      <h1>{error.code} Error</h1>
      <p>{error.message}</p>
      <p>요청하신 페이지는 존재하지 않습니다.</p>
    </ErrorContainer>
  );
});

export default ErrorPage;