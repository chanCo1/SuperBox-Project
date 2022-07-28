/** 패키지 참조 */
import React, { memo, useState } from 'react';
import styled, { css } from 'styled-components';
import { NavLink, Link } from 'react-router-dom';

// 이미지 참조
import logo from '../assets/image/superbox-logo.png';

// 1회용 -> 나중에 수정
import { BiUserCircle } from 'react-icons/bi';

/** Header 부분 스타일 정의 */
const HeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  border-bottom: 4px solid #f3b017;

  .header-wrap {
    position: relative;
    width: 1080px;
    margin: auto;
    padding: 20px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      display: flex;
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

    .page-nav {
      display: flex;
      width: 50%;
      padding: 0;

      .NavLink {
        &:hover {
          text-decoration: underline #f3b017;
          text-underline-position: under;
          text-decoration-thickness: 5px;
        }

        li {
          color: #404040;
          font-size: 20px;
          margin-right: 30px;
        }
      }

      .active {
        text-decoration: underline #f3b017;
        text-underline-position: under;
        text-decoration-thickness: 5px;
      }
    }

    .login-button {
      background-color: #fff;
      border: 1px solid #f3b017;
      padding: 5px 20px;
      cursor: pointer;
      transition: ease .3s;
      border-radius: 5px;
      font-size: 16px;

      &:hover {
        background-color: #f3b017;
        color: #fff;
      }
      &:active {
        transform: scale(0.9, 0.9);
      }
    }
  }
`;

// 로그인 값이 true가 되면 css값 적용
const MyPage = styled.div`
  display: flex;
  justify-content: end;
  width: 10%;
  font-size: 2.5rem;
  cursor: pointer;
  opacity: 0;
  
  a {
    display: flex;

    .user-circle {
      color: #999;
      border-radius: 50%;
      transition: ease .3s;
  
      &:hover {
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
      }
      &:active {
        transform: scale(0.9, 0.9);
      }
    }
  }

  ${(props) => props.state && css`
    opacity: 1;
  `}
`;

const Header = memo(() => {
  const [login, setLogin] = useState(true);

  return (
    <HeaderContainer>
      <div className="header-wrap">

        <Link to={'/main'}>
          <div className="logo">
            <img src={logo} alt="superbox-logo" />
            <h1>SuperBox</h1>
          </div>
        </Link>

        <ul className="page-nav">
          <NavLink className="NavLink" to={'/receive'}><li>배송접수</li></NavLink>
          <NavLink className="NavLink" to={'/review'}><li>고객후기</li></NavLink>
          <NavLink className="NavLink" to={'/customer'}><li>고객센터</li></NavLink>
        </ul>

        <MyPage className="mypage" state={login}>
          <Link to={'/mypage'}>
            <BiUserCircle className='user-circle'/>
          </Link>
        </MyPage>

        <Link to={'/login'}>
          <button className='login-button'>로그인</button>
        </Link>
      </div>
    </HeaderContainer>
  );
});

export default Header;
