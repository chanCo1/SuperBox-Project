/** 패키지 및 컴포넌트 참조 */
import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Meta from '../Meta';

// 이미지 참조
import logo from '../assets/image/superbox-logo.png';

/** 인트로 페이지 전체 스타일 */
const IntroPageContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 99;

  .logo-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      width: 35em;
    }

    .title {
      color: #f3b017;
      font-size: 5em;
      margin: 10px 0;
      text-align: center;
    }

    p {
      margin: 0 0 20px 0;
      text-align: center;
      color: #5e5e5e;
      font-size: 1.1em;
      font-weight: 500;
    }

    .button {
      display: flex;
      justify-content: center;

      button {
        background-color: #fff;
        border: 1px solid #f3b017;
        border-radius: 20px;
        color: #f3b017;
        text-align: center;
        padding: 5px 30px;
        font-size: 1.3em;
        cursor: pointer;
        display: flex;
        justify-content: center;
        transition: 0.3s ease-in;

        &:hover {
          background-color: #f3b017;
          color: #fff;
        }
        &:active {
          transform: scale(0.9, 0.9);
        }
      }
    }
  }
`;

const IntroPage = memo(() => {
  const navigate = useNavigate();

  const onStartClick = useCallback(() => {
    navigate('/main');
  }, [navigate]);

  return (
    <>
      <Meta title={'SuperBox :: 반가워요!'} />

      <IntroPageContainer>
        <div className="logo-box">
          <img src={logo} alt="superbox-logo" />
          <h1 className="title">SuperBox</h1>
          <p>택배 접수 대행 서비스</p>

          <div className="button">
            <button onClick={onStartClick}>시작하기</button>
          </div>
        </div>
      </IntroPageContainer>
    </>
  );
});

export default IntroPage;
