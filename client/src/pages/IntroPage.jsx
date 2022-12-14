/** 패키지 및 컴포넌트 참조 */
import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Meta from '../Meta';

// 이미지 참조
import logo from '../assets/image/superbox-logo.png';

const IntroPage = memo(() => {
  const navigate = useNavigate();

  const onStartClick = useCallback(() => {
    navigate('/main');
  }, [navigate]);

  return (
    <>
      <Meta title={'SuperBox :: 반가워요!'} />

      <IntroPageContainer>
        <div className="logo-wrap">
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

/** 인트로 페이지 스타일 */
const IntroPageContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  overflow-x: hidden;
  z-index: 99;

  .logo-wrap {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      display: flex;
      justify-content: center;
      width: 30vw;
      animation: up-down 1.5s ease-in-out infinite alternate;

      @keyframes up-down {
        0% { transform: translateY(0px); }
        100% { transform: translateY(-30px); }
      }
    }

    .title {
      color: #f3b017;
      font-size: 4.5vw;
      margin: .8vw 0;
    }

    p {
      margin: 0 0 1vw 0;
      color: #5e5e5e;
      font-size: 1.5vw;
      font-weight: 500;
    }

    .button {
      button {
        background-color: #fff;
        border: 1px solid #f3b017;
        border-radius: 20px;
        color: #f3b017;
        padding: .2vw 1.8vw;
        font-size: 1.5vw;
        cursor: pointer;
        transition: 0.3s ease-in;

        &:hover {
          background-color: #f3b017;
          color: #fff;
        }
        &:active { transform: scale(0.9, 0.9); }
      }
    }
  }
 
  /** responsive */
  @media (max-width: 767px) {
    .logo-wrap {
      img { width: 70%; }

      .title { font-size: 15vw; }
      
      p { 
        font-size: 4vw;
        margin-bottom: 6vw;
      }
      
      .button {
        button { 
          font-size: 5vw;
          padding: 1vw 4vw;
        }
      }
    }
  }
`;