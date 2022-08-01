/** 패키지 참조 */
import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 이미지 참조
import logo from '../assets/image/superbox-logo.png';

const LogoContainer = styled.div`
  position: relative;
  width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
  
  .logo {
    display: flex;
    width: 220px;
    align-items: center;
    
    img {
      width: 85px;
      height: 50px;
    }

    h1 {
      margin: 0 10px;
      color: #f3b017;
      font-size: 26px;
      font-weight: 500;
    }
  }
`;

const Logo = memo(() => {
  return (
    <LogoContainer>
      <Link to={'/main'} className="logo">
        <img src={logo} alt="supebox-logo" />
        <h1>SuperBox</h1>
      </Link>
    </LogoContainer>
  );
});

export default Logo;
