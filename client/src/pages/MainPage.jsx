import React, { memo } from 'react';
import styled from 'styled-components';

// 이미지 참조
import logo from '../assets/image/superbox-logo.png';
import receive from '../assets/image/receive-screenshot.png';

// 컴포넌트 참조
import Meta from '../Meta';

// 메인페이지 로고 섹션 스타일
const MainLogoContainer = styled.div`
  text-align: center;
  
  .main-logo-wrap {
    width: 1200px;
    margin: auto;
    padding: 225px 0 120px; 
    
    .logo {
      position: relative;
      width: 30rem;
    }
  
    h2 {
      color: #f3b017;
      font-size: 4rem;
      margin: 10px 0 40px;
    }
  
    p {
      font-size: 1.5rem;
      margin: 10px 0;
  
      span {
        color: #f3b017;
      }
    }
  }
`;

const MainReceiveContainer = styled.div`
  width: 100%;
  padding: 40px 0 0;
  background-color: #f7f8fb;

  .main-receive-wrap {
    position: relative;
    display: flex;
    width: 1200px;
    margin: auto;
    justify-content: space-between;

    .receive-text {
      padding: 40px 0;

      p:nth-child(1) {
        font-size: 1.5rem;
        margin: 0 0 30px;
      }
      p:nth-child(2) {
        font-size: 2.5rem;
        margin: 0;
      }
      p:nth-child(3) {
        font-size: 1.2rem;
      }
    }

    .receive-img {
      padding: 40px 0 0;
      width: 600px;

      img {
        width: 100%;
      }
    }
  }
`;

const MainPage = memo(() => {
  return (
    <>
      <Meta title={'SuperBox :: 메인페이지'} />

      <MainLogoContainer>
        <div className='main-logo-wrap'>
          <img className='logo' src={logo} alt="superbox-logo" />
          <h2>SuperBox</h2>
          <p>누구나 한번 쯤은 택배 상자를 받고 설레는 기분을 느꼈을거예요.</p>
          <p>그 기분, <span>SuperBox</span>를 통해 더 오래, 더 많이 느껴보세요.</p>
        </div>
      </MainLogoContainer>

      <MainReceiveContainer>
        <div className='main-receive-wrap'>
          <div className='receive-text'>
            <p>언제 어디서든<br />쉽고, 간편하게</p>
            <p>저희에게 설렘을 접수하세요.</p>
            <p>전국 어디든 원하시는 분에게 전달 해드립니다.</p>
          </div>
          <div className='receive-img'>
            <img src={receive} alt="receive-img" />
          </div>
        </div>
      </MainReceiveContainer>
    </>
  );
});

export default MainPage;